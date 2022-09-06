# How To Make Multiple DX ScriptApps Use Shared Components From Themes
# General Information
This project contains the sample codes that you may use as a template for deploying Multiple Script Applications with a group of dependencies that may be conflicting with another group (i.e: same libraries but different versions).

The included sample codes combine NPM, Gradle and Webpack configuration to achieve the following:
- Be able to resolve all shared libraries or Node modules within Integrated Development Environments (IDEs i.e: Visual Studio Code and Intellij). Leverage on full features like autocompletion of properties and functions of components even if they are defined in a separate project for the bundled modules.
- Be able to debug and run the DX ScriptApps locally during development (i.e: npm start).
- Be able to deploy all DX ScriptApps and their shared DX Modules into the target DX Core instance (dev/staging/prod).
- Components bundled and deployed in DX Modules are only going to be loaded once during page rendering, even when used by multiple dependent DX ScriptApps.

# 3rd-Party Components Credits
The following components are used in the sample codes for this guide:
- HTMLElements Smart Table:
    - https://www.webcomponents.org/element/HTMLElements/smart-table
    - https://www.htmlelements.com/react/demos/table/overview/
- HTMLElements Smart Tabs:
    - https://www.webcomponents.org/element/HTMLElements/smart-tabs
    - https://www.htmlelements.com/react/demos/tabs/overview/

## PreRequisites
Check the list of pre-requisites [here](https://pages.git.cwp.pnp-hcl.com/CWPdoc/dx-mkdocs/in-progress/guide_me/tutorials/scriptapps/pre_requisites/).

#  How To Build and Deploy This Sample Applications
1. Set the DXClient parameters in [gradle.properties](gradle.properties) to point to the target DX endpoint and profile.
    ```
   dxProtocol=https
   dxHostname=localhost
   dxPort=10041
   dxProfileName=wp_profile
    ```
2. Invoke the deployAll task of the Gradle project. (Use gradle.bat for Windows and gradlew for Linux and Mac)
    ``` 
    cd DxModule
    ./gradlew deployAll -DdxUsername=<username> -DdxPassword=<password>
    ``` 
    ``` 
    > Task :deployDxModule
    cd build/libs/
    dxclient deploy-application --dxUsername **** --dxPassword **** --dxConnectUsername **** --dxConnectPassword **** --applicationFile ReactNSmartComponentsV4.ear --applicationName ReactNSmartComponentsV4 --dxProtocol https --hostname localhost --dxPort 10041 --dxProfileName wp_profile
    ...
    ...
    > Task :deployAllScriptApps
     Task deployAllScriptApps Done
    
    > Task :deployAll
     Task deployAll Done
    
    BUILD SUCCESSFUL in 2m 17s
    ```
5. In case of errors, check the details in the DXClient logs in the
    - DX Module: build/libs/store/logs/logger.log
    - 1st ScriptApp: ScriptApp01/store/logs/logger.log
    - 2nd ScriptApp: ScriptApp02/store/logs/logger.log
6. Verify and link the _ReactNSmartComponentsV4_ DX Module to a DX Theme. Follow the steps listed [here](https://pages.git.cwp.pnp-hcl.com/CWPdoc/dx-mkdocs/in-progress/guide_me/tutorials/scriptapps/common-setup/post-deployment/verify_link_module_to_theme/).
8. Prepare your target DX page that will host the ScriptApp. Follow the steps listed [here](https://pages.git.cwp.pnp-hcl.com/CWPdoc/dx-mkdocs/in-progress/guide_me/tutorials/scriptapps/common-setup/post-deployment/prepare_dx_page/).
9. Add the ScriptApps into the target DX test page. Follow the steps listed [here](https://pages.git.cwp.pnp-hcl.com/CWPdoc/dx-mkdocs/in-progress/guide_me/tutorials/scriptapps/common-setup/post-deployment/add_scriptapp_to_page/).
    - 06 Component 1st (from wcmContentName in ScriptApp01/package.json)
    - 06 Component 2nd (from wcmContentName in ScriptApp02/package.json)

# How To Bundle and Deploy Multiple New or Existing DX ScriptApps with Shared Components in a DX Theme
For the detailed discussion of the important scripts and configuration that you'll need for your own projects, follow this [How-To Guide](https://pages.git.cwp.pnp-hcl.com/CWPdoc/dx-mkdocs/in-progress/guide_me/tutorials/scriptapps/how_to/06_theme_component_in_app/).

## Support

In case of questions or issues please raise via Issues tab in this github repository. HCL Support will make every reasonable effort to assist in problem resolution of any issues found in this software.
