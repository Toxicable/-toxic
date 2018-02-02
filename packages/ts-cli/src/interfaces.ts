export interface ConfigFile {
  root: string;
  tsconfig: string;
  absoluteTsconfig?: string;
  main: string;
  absoluteMain?: string;
  outDir: string;
  absoluteOutDir?: string;
}

export interface CommandOptions {
  command: 'serve' | 'build';
}

export interface CliOptions {
  prod: boolean;
  dev: boolean;
}

export interface Options extends CliOptions, CommandOptions {
  configFile: ConfigFile;
  absoluteRoot: string;
}




