import { Directive, Input, HostListener, HostBinding, ComponentRef, ViewContainerRef } from '@angular/core';
import { RouterLite } from './router';

@Directive({ selector: ':not(a)[rlLink]' })
export class RouterLiteLink {
  constructor(
    private router: RouterLite
  ) { }

  private targetUrl: string;

  @Input() set rlLink(value: string) {
    this.targetUrl = value;
  }

  @HostListener('click')
  onClick(): boolean {
    this.router.navigate(this.targetUrl);
    return true;
  }
}

@Directive({ selector: 'a[rlLink]' })
export class RouterLiteLinkWithHref {
  constructor(
    private router: RouterLite
  ) { }

  private targetUrl: string;

  @Input() set rlLink(value: string) {
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

@Directive({ selector: 'rl-outlet' })
export class RouterLiteOutlet {
  private currentComponent: ComponentRef<{}>;
  constructor(
    private vcr: ViewContainerRef,
    private router: RouterLite,
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


