# How to create build environment

## Windows

 1. Install Git for Windows - https://git-scm.com/
 1. install Node.js - https://nodejs.org/
 2. install Python - https://www.python.org/downloads/
 3. install Ghostscript - https://www.ghostscript.com/releases/gsdnld.html
   - set binary directory of Ghostscript in `GS4JSHOME` environment variable 
   - for example, execute `$Env:GS4JS_HOME="C:\Program Files\gs\gs10.00.0\bin"` on PowerShell
 4. execute `npm install` command in top directory of the repository
 5. execute `npm install` in `react-app` directory
 5. execute `npm install` in `api-server` directory
 5. copy config.json.sample to config.json and edit it

# How to run test servers
 
 1. set `development` in `EBM_MODE` environment variable
   - for example, execute `$Env:EBM_MODE="development"` on PowerShell
 2. run  `npm start` in `api-server` directory
 3. run `npm start` in `react-app` directory
 4. open `http://localhost:3333/` in Web browser
 
 
