const path = require("path");
const { DllReferencePlugin } = require('webpack');

module.exports = {
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        if (!isServer){
            const newconfig = config.plugins.push(
                new DllReferencePlugin({
                    context: path.resolve(__dirname, '../DxModule/generic-dx-submodule'),
                    manifest: require('../DxModule/generic-dx-submodule/dx-dll-manifest.json'),
                }),
            );
        }
        return config
    },
}