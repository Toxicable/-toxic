import { getOptions } from './args';
import { serve } from './serve';
import { makeNewApp } from './new';
import * as sc from 'subcommander';
import { createConsoleLogger } from '@angular-devkit/core/node';
import { logging } from '@angular-devkit/core';


export function main() {

  const logger = createConsoleLogger();

  sc.command('version', {
    desc: 'ts-cli version',
    callback: () => {
      console.log('0.0.0.0.0.0.0.00000.000000000.00000000000 SUPER BETA ALPHAAAAA');
    }
  });

  sc.command('serve', {
    desc: 'serves',
    callback: () => {
      const options = getOptions();
      serve(logger, options);
    }
  });

  sc.command('new', {
    desc: 'Creates a new App',
    callback: options => {
      if (options.app) {
        makeNewApp(logger, options.name);
      }
    }
  }).option('name', {
    desc: 'The Name of the project',
  }).option('app', {
    desc: 'An Appcalication',
    flag: true,
    default: true
  }).option('lib', {
    desc: 'Generate a Lib',
    flag: true,
    default: false
  });

  sc.command('build', {
    desc: 'Builds the application',
    callback: () => {
      logger.info( 'not immplemented yet');
    }
  });

  let args = process.argv.slice(2);
  if (args.length === 0) {
    args = ['--help'];
  }

  sc.parse(args);

}

