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
  command: 'serve' | 'build' | 'new';
}

export interface ServeOptions {
  prod: boolean;
  dev: boolean;
}

export interface NewOptions {
  app: boolean;
  lib: boolean;
}

export interface BuildOptions {
  prod: boolean;
  dev: boolean;
}

export interface Options {
  configFile: ConfigFile;
  absoluteRoot: string;
}




