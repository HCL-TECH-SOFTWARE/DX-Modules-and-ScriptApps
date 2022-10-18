# Woodburn Insurance DX Module

# File structure

```
📦woodburn-insurance-module
 ┣ 📂gradle                     - The files being used by the Gradle wrapper
 ┃ ┗ 📂wrapper
 ┃ ┃ ┣ 📜gradle-wrapper.jar
 ┃ ┃ ┗ 📜gradle-wrapper.properties
 ┣ 📂src
 ┃ ┗ 📂main
 ┃ ┃ ┗ 📂config
 ┃ ┃ ┃ ┣ 📂ear                  - Template files that will be used when building the EAR file which will be deployed to WebSphere. 
 ┃ ┃ ┃ ┃ ┗ 📂META-INF
 ┃ ┃ ┃ ┃ ┃ ┗ 📜WebSphere.policy
 ┃ ┃ ┃ ┗ 📂war                  - Template files that will be used when building the WAR file inside the EAR file.
 ┃ ┃ ┃ ┃ ┣ 📂WEB-INF
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ibm-web-bnd.xmi
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ibm-web-ext.xmi
 ┃ ┃ ┃ ┃ ┃ ┗ 📜plugin.xml
 ┃ ┃ ┃ ┃ ┗ 📜web.xml
 ┃ ┃ ┗ 📂webapp                 - Directory for web app modules, components and services
 ┣ 📜.gitignore
 ┣ 📜README.MD
 ┣ 📜build.gradle               - This file is the build program being used to build the EAR file which will be deployed to the WebSphere.
 ┣ 📜gradle.properties          - The environment property variables being used by the Gradle program.
 ┣ 📜gradlew                    - The wrapper that you will be using to run the program without needing the Gradle installed on a non-Windows machine.
 ┣ 📜gradlew.bat                - The wrapper that you will be using to run the program without needing the Gradle installed on a Windows machine.
 ┣ 📜index.js                   - Exports the modules you are using; this is used by the webpack.
 ┣ 📜package-lock.json
 ┣ 📜package.json               - The usual package.json of NPM
 ┣ 📜settings.gradle            - The environment settings variables being used by the Gradle program.
 ┗ 📜webpack.dx-module.js       - This is the webpack profile configuration that is being used by package.json.
 ```

## Setup

Refer to the guide below on how to create/setup a DX Module:

a. [How to Deploy JavaScript Libraries/Dependencies as a DX Module](../../../02DependenciesAsModule/README.MD).

b. [How To Deploy Apps with Different Dependency Versions](../../../05AppsWithDiffDepVersions/README.md)

## Optional: Typescript

The following will describe how to use typescript in DX Module.
## Optional Setup
1. Install typescript and ts-loader:
    ```
    npm i typescript ts-loader -D
    ```

2. Create a tsconfig.json.

    ```
    {
        "compilerOptions": {
            "outDir": "./dist/",
            "noImplicitAny": true,
            "module": "es6",
            "target": "es5",
            "allowJs": true,
            "moduleResolution": "node",
            "resolveJsonModule": true,
            "esModuleInterop": true
        }
    }
    ```

3. Update the DX module's webpack [config](SubModuleReact/webpack.dxmodules.js) for typescript files.
    ```
    module.exports = {
        ...
        module: {
            rules: [
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ]
        },
        ...
        resolve: {
            extensions: ['.ts', '.js', '.json']
        }
    };
    ```

## How to use the sample service providers in script app:
[InsuranceDataProvider.ts](SubModuleReact/services/InsuranceDataProvider.ts)

    InsuranceProvider.getInsuranceByZipCode(XXXX)

    Return Value:
    [
        {
            "type": "Life Insurance",
            "id": 1
        },
        {
            "type": "Home Insurance",
            "id": 2
        },
        {
            "type": "Auto Insurance",
            "id": 3
        }
    ]


[UserDataProvider.ts](SubModuleReact/services/UserDataProvider.ts)

    UserProvider.getUserByEmail(XXXXXXX@XXXXX.com)

    Return Value:
    {
        "id": X,
        "first_name": "XXXX XXXXX",
        "last_name": "XXXXX",
        "email": "XXXXXXX.XXXXX@XXXXX.com"
    }
