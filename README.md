# Nodegamesjs-forge 1.0.3 by willmil11
## If you're lost
You're suposed to use this tool with <a href="https://www.npmjs.com/package/nodegamesjs">Nodegames</a>
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
## Warning
This packages your game to executable(s) but it packages those with node.js 12.0.0 because nexe doesn't support newer node.js versions yet and this tool uses nexe to package your games easily. This doesn't apply if you use the --build flag as it will package with your current node.js version.
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
## Untested stuff
- The executable for macos
- The executable for windows
## Tested stuff
- The executable for linux
## Goals
- Fix known bugs
- Test the executable for macos
- Test the executable for windows
## Changelog
### 1.0.3
- Changed the readme a little.
### 1.0.2
- Upgraded 1.0.1's warning
### 1.0.1
- Added warning in the readme
### 1.0.0
- Initial release
