const fs = require("fs"),
      path = require("path"),
      et = require("elementtree"),
      plist = require('plist');
var rootDir;
var rootDir2;
const manifestPath = {
    cordovaAndroid6: 'platforms/android/AndroidManifest.xml',
    cordovaAndroid7: 'platforms/android/app/src/main/AndroidManifest.xml'
};
function getAndroidManifestFilePath(rootdir) {
    var cordovaAndroid6Path = path.join(rootdir, manifestPath.cordovaAndroid6);
    var cordovaAndroid7Path = path.join(rootdir, manifestPath.cordovaAndroid7);
    
    if(fs.existsSync(cordovaAndroid7Path)){
        return cordovaAndroid7Path;
    }else if(fs.existsSync(cordovaAndroid6Path)){
        return cordovaAndroid6Path;
    }else{
        throw "Can't find AndroidManifest.xml in platforms/Android";
    }
}

module.exports = function(context) {
  debugger;
  const cordovaUtil = context.requireCordovaModule('cordova-lib/src/cordova/util');
  rootDir = cordovaUtil.isCordova();
  rootDir2 = context.opts.projectRoot;
  
        console.log("Parameter argv found ",process.argv);
        console.log("Parameter env found ",process.env);
        console.log("Object context = ",context);
        console.log("Array context.opts.options.argv = ",context.opts.options.argv);
        console.log("Array context.opts.cordova.plugins = ", context.opts.cordova.plugins);
  console.log("RootDir = ", rootDir);
  console.log("RootDir2 = ", rootDir2);
  
}
