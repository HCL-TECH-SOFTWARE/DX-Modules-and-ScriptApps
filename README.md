# DX ScriptApps How-To Guides

## Overview
The following guides will describe the steps on how to bundle and deploy DX ScriptApps. 

For DX pages that will only have a single ScriptApp, an option is available to deploy the built application as a whole with the usual inclusion of its dependencies. 

For DX pages that will have multiple ScriptApps, it is recommended to do a code-splitting. You may deploy common libraries/dependencies as one DX module and then exclude them in the application's packaging and deployment.

Each guide below will have their own sample bundler and deployment codes for reference. 

## Guides

### 01 - [How To Deploy a React App to DX as a ScriptApp](01WebpackWithDependencies)

### 02 - [How To Deploy JavaScript Libraries/Dependencies as a DX Module](02DependenciesAsModule)

### 03 - [How To Deploy DX ScriptApps Without Its Dependencies](03AppsExcludingDependencies)

### 04 - [How To Deploy Multiple DX ScriptApps with Shared Dependencies](04AppsWithSharedDependencies)

### 05 - [How To Deploy Multiple DX ScriptApps with Different Dependency Versions](05AppsWithDiffDepVersions)

### 06 - [How To Make Multiple DX ScriptApps Use Shared Components From Themes](06ThemeComponentInApp)

