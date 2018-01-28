export interface ConfigFile {
  root: string;
  tsconfig: string;
  main: string;
  outDir: string;
}

export interface CommandOptions {
  command: 'serve';
}

export interface CliOptions {
  prod: boolean;
  dev: boolean;
}

export interface Options extends CliOptions, CommandOptions {
  configFile: ConfigFile;
  absoluteRoot: string;
}




