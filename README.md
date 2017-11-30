# (WIP) SAPUI5 Starter Kit

developed for [MHP](https://www.mhp.com) by Sebastian Mantsch, Eike Vogel & [Mark Deppe](http://www.mark-deppe.de/)

<center><img src="https://www.mhp.com/fileadmin/www.mhp.com/template/public/images/MHP_Logo_RGB.svg"/></center>

This starter kit is intended to help developers create, check, version, and upload SAPUI5 projects to the SAP system. It has been developed especially for use in Webstorm, but can also be applied to other IDEs if necessary.

Supported features are:
* Syntax checks with [ESLint](https://eslint.org/) and rules adapted for SAPUI5 developments
* Includes the two NPM packages [ui5-codecompletion](https://www.npmjs.com/package/ui5-codecompletion) and [ui5-schemas](https://www.npmjs.com/package/ui5-schemas) (configuration will be explained later)
* Automatic generation of pre-component, minification of JavaScript files and automated upload to the SAP system with [grunt](https://gruntjs.com/)

<b>Content</b>

* [Prerequisites](#chapter-1)
* [Installation](#chapter-2)
* [Usage](#chapter-3)
    * [Using ESLint](#chapter-3-1)
    * [Using grunt to build and upload project to SAP System](#chapter-3-2)
* [FAQ](#chapter-4)


## Prerequisites <a id="chapter-1"></a>
* IDE for JavaScript development (this kit has been developed and tested in Webstorm)
* Installed [node.js](https://nodejs.org)
* Windows OS for automated upload into SAP System (since [node-rfc](https://www.npmjs.com/package/node-rfc) is not working for Mac OS & ARM
* Installed [SAP NW RFC Library](http://sap.github.io/node-rfc/install.html#sap-nw-rfc-library-installation) (You need an SAP Marketplace Account)

## Installation <a id="chapter-2"></a>
1. Download or clone this Kit into your local repository
2. Open the project in Webstorm or other IDE
3. Make sure you have node configured in your IDE & SAP NW RFC library added to your OS classpath
4. Open IDE terminal or node.js command prompt (in this case you have to go to your repository manually)
5. Install the npm packages
```
npm install
```
6. Wait until all packages are installed

After this you should install also the two UI5 packages
```
npm run ui5
```
If this is not working, look into the [FAQ](#FAQ) section.

***Important:***
If you want to use some version control tool like GIT or SVN, than you have to make sure, that the local folders and files are not commited. Add these files/folders to the SVN ignore list or use the provided .gitignore file.
The following files/folders are important to ignore:
* .tmp
* .ui5
* node_modules
* target

## Usage <a id="chapter-3"></a>
### Using ESLint <a id="chapter-3-1"></a>
### Using grunt to build and upload project to SAP System <a id="chapter-3-2"></a>
## FAQ <a id="chapter-4"></a>
