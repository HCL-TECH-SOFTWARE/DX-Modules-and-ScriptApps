# How To Deploy Multiple Apps with Shared Dependencies

## Overview
This guide shows how to deploy multiple React Script Apps with common dependencies. [Webpack](https://webpack.js.org/) is used to package the React Script Apps and node dependencies.

## PreRequisites
1. Follow the online guide on how to install HCL DXClient [DX9.5](https://help.hcltechsw.com/digital-experience/9.5/containerization/dxclient.html). Please note that the DX and/or DXClient link provided here may be superseded, you may use a newer version if available.

2. The full deployment of the DX Module described in the guide [How to Deploy JavaScript Libraries/Dependencies as a DX Module](../02DependenciesAsModule) must be done. The generated [DLL Manifest](../02DependenciesAsModule/dx-dll-manifest.json) in the [DX Module folder](../02DependenciesAsModule) is going to be referenced in this project's sample app.
3. Add the 'Script Application Library' to the list of visible libraries in your DX Library Explorer. Follow the series of links via the Web Content menu: Preferences -> Edit Shared Settings. Don't forget to click on the OK button.  
   ![](readme_imgs/01WebContentEditSharedSettings.png)
   ![](readme_imgs/02LibrarySelection.png)
   ![](readme_imgs/03ScriptApplicationLibrary.png)


## Setup

1. Refer to the guide below on how to create/setup a react script to exclude its dependencies:

   a. [How to deploy a React Script App excluding its dependencies](../03AppsExcludingDependencies/README.MD).

   b. [How to create and deploy a React Script App using Create React App excluding its dependencies](../01WebpackWithDependencies/README.md)

2. To deploy the app scripts: Execute the npm script dx-deploy-app, pre-set with the DX admin username and password.

   npm install
   npm run build
   dxUsername=<username> dxPassword=<password> npm run dx-deploy-app


