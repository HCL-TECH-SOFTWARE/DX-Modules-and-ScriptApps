# How To Deploy Multiple DX Script Applications with Shared Dependencies

# General Information
This project contains the sample codes that you may use as a template for deploying Multiple Script Applications that will share dependencies via a DX Module. 

## PreRequisites
Check the list of pre-requisites [here](https://opensource.hcltechsw.com/digital-experience/cf207/guide_me/tutorials/scriptapps/pre_requisites/).

#  How To Build and Deploy This Sample Applications
1. Set the DXClient parameters in [DxModule/gradle.properties](DxModule/gradle.properties) to point to the target DX endpoint and profile.
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
    ...
    > Task :deployDxModule
    cd build/libs/
    dxclient deploy-application --dxUsername **** --dxPassword **** --dxConnectUsername **** --dxConnectPassword **** --applicationFile ReactNReactDOMv18r2.ear --applicationName ReactNReactDOMv18r2 --dxProtocol https --hostname localhost --dxPort 10041 --dxProfileName wp_profile
    ...
    ...
    > Task :deployAllScriptApps
     Task deployAllScriptApps Done
    
    > Task :deployAll
     Task deployAll Done
    
    BUILD SUCCESSFUL in 2m 17s
```

3. In case of errors, check the details in the DXClient logs in the 
   - DX Module: build/libs/store/logs/logger.log
   - 1st ScriptApp: ScriptApp01/store/logs/logger.log
   - 2nd ScriptApp: ScriptApp02/store/logs/logger.log

4. Verify and link the _ReactNReactDOMv18r2_ DX Module to a DX Theme. Follow the steps listed [here](https://opensource.hcltechsw.com/digital-experience/cf206/guide_me/tutorials/scriptapps/common-setup/post-deployment/verify_link_module_to_theme/).

5. Prepare your target DX page that will host the ScriptApp. Follow the steps listed [here](https://opensource.hcltechsw.com/digital-experience/cf206/guide_me/tutorials/scriptapps/common-setup/post-deployment/prepare_dx_page/).

6. Add the ScriptApp (matching the wcmContentName in the package.json config) into the target DX test page. Follow the steps listed [here](https://opensource.hcltechsw.com/digital-experience/cf206/guide_me/tutorials/scriptapps/common-setup/post-deployment/add_scriptapp_to_page/).
   - <04 Script App 1st> (from wcmContentName in ScriptApp01/package.json)
   - <04 Script App 2nd> (from wcmContentName in ScriptApp02/package.json)

# How To Bundle and Deploy Multiple New or Existing DX ScriptApps with Shared Dependencies
For the detailed discussion of the important scripts and configuration that you'll need for your own projects, follow this [How-To Guide](https://opensource.hcltechsw.com/digital-experience/cf206/guide_me/tutorials/scriptapps/how_to/04_apps_sharing_dependencies/).

## Support

In case of questions or issues please raise via Issues tab in this github repository. HCL Support will make every reasonable effort to assist in problem resolution of any issues found in this software.
