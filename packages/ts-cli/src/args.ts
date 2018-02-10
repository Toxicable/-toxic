import * as commandLineArgs from 'command-line-args';
import * as fs from 'fs';
import * as path from 'path';
import { ServeOptions, ConfigFile, CommandOptions, Options } from './interfaces';

const configFileName = '.ts-cli.json';

const commandOptionDefinitions: commandLineArgs.OptionDefinition[] = [
  { name: 'command', defaultOption: true }
];
const serveOptionDefinitions: commandLineArgs.OptionDefinition[] = [
  { name: 'prod', type: Boolean, defaultValue: false },
  { name: 'dev', type: Boolean, defaultValue: true },
];
const buildOptionDefinitions: commandLineArgs.OptionDefinition[] = [
  { name: 'prod', type: Boolean, defaultValue: false },
  { name: 'dev', type: Boolean, defaultValue: true },
];
const newOptionDefinitions: commandLineArgs.OptionDefinition[] = [
  { name: 'app', defaultValue: true },
  { name: 'lib', defaultValue: false},
];

export function getOptions(): Options {

  const commandOptions: CommandOptions = commandLineArgs(commandOptionDefinitions, { stopAtFirstUnknown: true } as any);
  const argv = commandOptions['_unknown'] || [];
  delete commandOptions['_unknown'];

  const cwd = process.cwd();
  const configFilePath = path.join(cwd, configFileName);

  let configFile: ConfigFile = {} as ConfigFile;
  if (fs.existsSync(configFilePath)) {
    configFile = JSON.parse(fs.readFileSync(configFilePath).toString());
  }
  const absoluteRoot = configFile.root ? path.join(cwd, configFile.root) : '';

  if (absoluteRoot) {
    configFile.absoluteMain = path.join(absoluteRoot, configFile.main);
    configFile.absoluteOutDir = path.join(absoluteRoot, configFile.outDir);
    configFile.absoluteTsconfig = path.join(absoluteRoot, configFile.tsconfig);
  }

  const options: Options = {
    configFile,
    absoluteRoot,
    commandOptions,
    serveOptions: null,
    buildOptions: null,
    newOptions: null,
  };

  if (commandOptions.command === 'serve') {
    options.serveOptions = commandLineArgs(serveOptionDefinitions, { argv });
  }
  if (commandOptions.command === 'new') {
    options.newOptions = commandLineArgs(newOptionDefinitions, { argv });
  }
  if (commandOptions.command === 'build') {
    options.buildOptions = commandLineArgs(buildOptionDefinitions, { argv });
  }

  return options;
}
