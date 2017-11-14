import { Directive, Input, HostListener, HostBinding, ComponentRef, ViewContainerRef } from '@angular/core';
import { LiteRouter } from './router';

@Directive({ selector: ':not(a)[lrLink]' })
export class LiteRouterLink {
  constructor(
    private router: LiteRouter
  ) { }

  private targetUrl: string;

  @Input() set lrLink(value: string) {
    this.targetUrl = value;
  }

  @HostListener('click')
  onClick(): boolean {
    this.router.navigate(this.targetUrl);
    return true;
  }
}

@Directive({ selector: 'a[lrLink]' })
export class LiteRouterLinkWithHref {
  constructor(
    private router: LiteRouter
  ) { }

  private targetUrl: string;

  @Input() set lrLink(value: string) {
    this.targetUrl = value;
    this.href = value;
  }

  @HostBinding() href: string;
  @HostBinding('attr.target') @Input() target: string;

  @HostListener('click', ['$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey'])
  onClick(button: number, ctrlKey: boolean, metaKey: boolean, shiftKey: boolean): boolean {
    if (button !== 0 || ctrlKey || metaKey || shiftKey) {
      return true;
    }

    if (typeof this.target === 'string' && this.target !== '_self') {
      return true;
    }

    this.router.navigate(this.targetUrl);
    return false;
  }
}

@Directive({ selector: 'lr-outlet' })
export class LiteRouterOutlet {
  private currentComponent: ComponentRef<{}>;
  constructor(
    private vcr: ViewContainerRef,
    private router: LiteRouter,
  ) {
    this.router.activateComponent$
      .subscribe(factory => {
        if (factory) {
          if (this.currentComponent) {
            this.currentComponent.destroy();
          }
          this.currentComponent = this.vcr.createComponent(factory);
        }

      });
  }
}


