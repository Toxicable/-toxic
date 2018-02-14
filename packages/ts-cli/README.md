# @toxicable/ts-cli

A CLI for building TS Server Side Apps.

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
