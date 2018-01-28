import * as commandLineArgs from 'command-line-args';
import * as fs from 'fs';
import * as path from 'path';
import { CliOptions, ConfigFile, CommandOptions, Options } from './interfaces';

const configFileName = '.ts-cli.json';

const commandOptionDefinitions: commandLineArgs.OptionDefinition[] = [
  { name: 'command', defaultOption: true }
];
const cliOptionDefinitions: commandLineArgs.OptionDefinition[] = [
  { name: 'prod', type: Boolean, defaultValue: false },
  { name: 'dev', type: Boolean, defaultValue: true },
];

export function getOptions(): Options {

  const commandOptions: CommandOptions = commandLineArgs(commandOptionDefinitions, { stopAtFirstUnknown: true } as any);
  const argv = commandOptions['_unknown'] || [];
  delete commandOptions['_unknown'];

  const cliOptions: CliOptions = commandLineArgs(cliOptionDefinitions, { argv });

  const cwd = process.cwd();
  const configFilePath = path.join(cwd, configFileName);

  const configFile: ConfigFile = JSON.parse(fs.readFileSync(configFilePath).toString());

  return Object.assign({}, commandOptions, cliOptions, {
    configFile,
    absoluteRoot: path.join(cwd, configFile.root)
   });
}
