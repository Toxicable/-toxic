# @toxicable/ts-cli

A CLI for building TS Backend Apps.

install: `yarn add @toxicable/ts-cli`


Commands:
* `ts-cli serve`

You will need a `.ts-cli.json` file in your root directory with these entries
```
{
  "root": ".",
  "tsConfigPath": "./tsconfig.app.json",
  "entryPoint": "./src/main.ts",
  "outputPath": "./dist/"
}  
```

TODO:
* `ts-cli build` For production builds
* `--prod` and `--dev` flags with config based off the Angular CLI
* `ts-cli new {app name}` for templating out a new project



