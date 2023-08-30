# How to Deploy JavaScript Libraries/Dependencies as a DX Module

## Overview
This project contains the sample codes that you may use as a template for deploying JavaScript libraries/dependencies as a DX Module.

## PreRequisites
Check the list of pre-requisites [here](https://opensource.hcltechsw.com/digital-experience/CF214/guide_me/tutorials/scriptapps/pre_requisites/).

## How To Build and Deploy This Sample DX Module
1. Set the rootProject.name in the [settings.gradle](DxModule/settings.gradle) file. It will be used as the name of the DX Module (war file, ear file, etc.) and the names and ids in the deployment descriptors (web context path, etc.)
    ```
   rootProject.name = 'Reactv18r2'
    ```
2. Set the DXClient parameters in [gradle.properties](DxModule/gradle.properties) to point to the target DX endpoint and profile.
    ```
   dxProtocol=https
   dxHostname=localhost
   dxPort=10041
   dxProfileName=wp_profile
    ```
3. Build and deploy the DX Module. Follow the steps listed [here](https://opensource.hcltechsw.com/digital-experience/CF214/guide_me/tutorials/scriptapps/common-setup/build-and-deploy/build_and_deploy_dx_modules/).
4. Verify and link the DX Module to a DX Theme. Follow the steps listed [here](https://opensource.hcltechsw.com/digital-experience/CF214/guide_me/tutorials/scriptapps/common-setup/post-deployment/verify_link_module_to_theme/).


## How To Configure DX Module Bundling for New or Existing ReactJS Application
For the detailed discussion of the important scripts and configuration that you'll need for your own projects, follow this [How-To Guide](https://opensource.hcltechsw.com/digital-experience/CF214/guide_me/tutorials/scriptapps/how_to/02_dependencies_as_module/).


## Support

In case of questions or issues please raise via Issues tab in this github repository. HCL Support will make every reasonable effort to assist in problem resolution of any issues found in this software.
