const fs = require("fs"),
      path = require("path"),
      et = require("elementtree"),
      plist = require('plist');
var rootDir;

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

// Parses a given file into an elementtree object
function parseElementtreeSync(filename) {
      var contents = fs.readFileSync(filename, 'utf-8');
      if(contents) {
            //Windows is the BOM. Skip the Byte Order Mark.
            contents = contents.substring(contents.indexOf('<'));
      }
      return new et.ElementTree(et.XML(contents));
}

function getConfigXml() {
      var configXmlData;
      if(!configXmlData) {
            console.log("getConfigXml: Parsing " + path.join(rootDir, 'config.xml'));
            configXmlData = parseElementtreeSync(path.join(rootDir, 'config.xml'));
      }
      return configXmlData;
}

module.exports = function(context) {
      debugger;
      let configXmlData, preferencesData;
      const cordovaUtil = context.requireCordovaModule('cordova-lib/src/cordova/util');
      rootDir = cordovaUtil.isCordova();
      
      console.log("rootDir = ",rootDir);
      
      try {
            const configXml = getConfigXml();
      } 
      catch(e) {
            console.error(e);
      }
      
      
      console.log("Found configXml : "+ configXml);
      console.log("ReadDirSync......");
      fs.readdirSync('platforms').forEach( function (platform) {
                try {
                    platform = platform.trim().toLowerCase();
                    console.log("Processing settings for platform: "+ platform);
                    //platformConfig.updatePlatformConfig(platform);
                } catch (e) {
                    console.error(e);
                }
            });
      
      
      
      //preferencesData[platform] = configXml.findall('platform[@name=\'' + platform + '\']/preference');
      
      
  
  
}
