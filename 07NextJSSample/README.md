# How To Deploy a NextJS App as a DX Script Application

# General Information
This project contains the sample codes that you may use as a template for deploying Multiple Script Applications that will share dependencies via a DX Module. 

## PreRequisites
Check the list of pre-requisites [here](https://opensource.hcltechsw.com/digital-experience/CF214/guide_me/tutorials/scriptapps/pre_requisites/).

## Additional PreRequisites

1. BUN command-line executable installation: https://bun.sh/docs/installation

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
   - DX Module: DxModule/build/libs/store/logs/logger.log
   - ScriptApp: NextJsScriptApp/store/logs/logger.log

4. Verify and link the _VideoJS-Youtube_ DX Module to a DX Theme. Follow the steps listed [here](https://opensource.hcltechsw.com/digital-experience/CF214/guide_me/tutorials/scriptapps/common-setup/post-deployment/verify_link_module_to_theme/).

5. Prepare your target DX page that will host the ScriptApp. Follow the steps listed [here](https://opensource.hcltechsw.com/digital-experience/CF214/guide_me/tutorials/scriptapps/common-setup/post-deployment/prepare_dx_page/).

6. Add the ScriptApp (matching the wcmContentName in the package.json config) into the target DX test page. Follow the steps listed [here](https://opensource.hcltechsw.com/digital-experience/CF214/guide_me/tutorials/scriptapps/common-setup/post-deployment/add_scriptapp_to_page/).
   - <NextJSSample> (from wcmContentName in NextJsScriptApp/package.json)

# How To Bundle and Deploy ScriptApps 
For the detailed discussion of the important scripts and configuration that you'll need for your own projects, follow this [How-To Guide](https://opensource.hcltechsw.com/digital-experience/CF214/guide_me/tutorials/scriptapps/how_to/04_apps_sharing_dependencies/).

# How to Route DX Requests and NextJS Server Side Requests via NGINX
Since NextJS has some sever side renderings, the services that can answer these requests are not executed by DX. There needs to be an application like NGINX that can route/proxy the request to the correct application server.
The NextJS application still needs to be run alongside the DX application server(s).  You may use the included NGINX configuration sample as a guide for your development or production setup. Similar principles may be utilized when you configure your Docker, Kubernetes and cloud deployments.
[ReverseProxyLoadBalancer/nginx-localhost-site.cfg](ReverseProxyLoadBalancer/nginx-localhost-site.cfg)
## Route /wps requests to DX port:
``` 
    location ~ \/(wps)\/.* {
      access_log off;
      proxy_pass http://localhost:10039;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
``` 
## Route /_next requests to NextJS backend port:
``` 
    location ~ \/(_next)\/.* {
      proxy_set_header    Host $host;
      proxy_set_header    X-Real-IP $remote_addr;
      proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header    X-Forwarded-Proto $scheme;
      rewrite /_next/(.*) /_next/$1  break;
      proxy_pass      http://localhost:3000;
      proxy_read_timeout  90;
      expires -1;
      add_header 'Cache-Control' 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
    }
``` 

## Support

In case of questions or issues please raise via Issues tab in this github repository. HCL Support will make every reasonable effort to assist in problem resolution of any issues found in this software.

