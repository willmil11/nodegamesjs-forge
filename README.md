# Nodegamesjs-forge
## Installation
You'll need to have node.js and npm installed on your device and an internet connection to use this tool, then run in a terminal:
```bash
npm install -g nodegamesjs-forge
```
## Update
To update the tool, run in a terminal:
```bash
npm update -g nodegamesjs-forge
```
## Usage
To package a nodegames game to executables for 64bit devices, run in the root directory of your game:
```bash
nodegamesjs-forge
```
This will create a directory called output with an executable for linux, one for windows and another for macos all for 64bits devices. However if you want to create executables for 32bit devices, run:
```bash
nodegamesjs-forge x86
```
This will create a directory called output with an executable for linux, one for windows and another for macos all for 32bits devices. There are multiple ways to use the command to do those 2 actions, you can see them by running:
```bash
nodegamesjs-forge --help
```
You can also run the command with the --build argument which will create a directory called build and create an executable that works for your machine (can take 30+min)
```bash
nodegamesjs-forge --build
```
## Github
You can visit the <a href="https://github.com/willmil11/nodegamesjs-forge">github page</a>
## Bugs
If you find any bugs, please report them <a href="https://github.com/willmil11/nodegamesjs-forge/issues">here</a>
## Known bugs
- If you run the executable in a directory with a parent directory that contains a node_modules directory, the executable will crash
## Changelog
### 1.0.0
- Initial release