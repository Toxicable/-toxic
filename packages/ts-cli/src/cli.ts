import { exec, fork, ChildProcess, spawn } from 'child_process';
import * as path from 'path';
import * as webpack from 'webpack';
import * as fs from 'fs';
import { CliOptions } from './interfaces';
import { log } from './logger';
import * as commandLineArgs from 'command-line-args';
import { getOptions } from './args';
import { serve } from './serve';

export function main() {
  const options = getOptions();

  if (options.command === 'serve') {

    serve(options);

  }

  if (options.command === 'build') {

  }
}

