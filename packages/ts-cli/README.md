# @toxicable/ts-cli

A CLI for building TS Backend Apps.

install: `yarn add @toxicable/ts-cli`


Commands:
* `ts-cli serve`

You will need a `.ts-cli.json` file in your root directory with these entries
See the demo directory for a full example
```
{
  "root": ".",
  "tsconfig": "./tsconfig.app.json",
  "main": "./src/main.ts",
  "outDir": "./dist/"
} 
```

TODO:
* `ts-cli build` For production builds
* `--prod` and `--dev` flags with config based off the Angular CLI
* `ts-cli new {app name}` for templating out a new project



