export interface ConfigFile {
  tsConfigPath: string;
  entryPoint: string;
  outputPath: string;
  root: string;
}

export interface CommandOptions {
  command: 'serve';
}

export interface CliOptions {
  prod: boolean;
  dev: boolean;
  project: string;
}

export interface Options extends CliOptions, CommandOptions {
  configFile: ConfigFile;
  absoluteRoot: string;
}




