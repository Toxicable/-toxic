import * as commandLineArgs from 'command-line-args';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigFile, Options } from './interfaces';

const configFileName = '.ts-cli.json';

export function getOptions(): Options {
  const cwd = process.cwd();
  const configFilePath = path.join(cwd, configFileName);

  let configFile: ConfigFile = {} as ConfigFile;
  if (fs.existsSync(configFilePath)) {
    configFile = JSON.parse(fs.readFileSync(configFilePath).toString());
  }
  const absoluteRoot = path.join(cwd, configFile.root);

  configFile.absoluteMain = path.join(absoluteRoot, configFile.main);
  configFile.absoluteOutDir = path.join(absoluteRoot, configFile.outDir);
  configFile.absoluteTsconfig = path.join(absoluteRoot, configFile.tsconfig);

  const options: Options = {
    configFile,
    absoluteRoot,
  };

  return options;
}
