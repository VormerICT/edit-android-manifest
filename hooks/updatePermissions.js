const fs = require("fs"),
      path = require("path"),
      et = require("elementtree"),
      plist = require('plist');
var rootDir;

const manifestPath = {
    cordovaAndroid6: 'platforms/android/AndroidManifest.xml',
    cordovaAndroid7: 'platforms/android/app/src/main/AndroidManifest.xml'
};

const configPath = '/platforms/android/app/src/main/res/xml/config.xml';

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
    
      return new et.ElementTree(et.XML(contents));
}

function getConfigXml(context) {
      var configXmlData;
      var androidPlatformDir = path.join(context.opts.projectRoot,'platforms', 'android');
      var oldConfigXMLLocation = path.join(androidPlatformDir, 'res', 'xml', 'config.xml');
      var newConfigXMLLocation = path.join(androidPlatformDir, 'app', 'src', 'main', 'res', 'xml', 'config.xml');
      var platformConfigurationFile;
      console.log("androidPlatformDir = " + androidPlatformDir);
      console.log("oldConfigXMLLocation" + oldConfigXMLLocation);
      console.log("newConfigXMLLocation" + newConfigXMLLocation);
      
      if (fs.existsSync(newConfigXMLLocation)) {
        // cordova-android >= 7.0.0
        platformConfigurationFile = newConfigXMLLocation;
            console.log("config.xml found at " + newConfigXMLLocation);
      } else {
        // cordova-android < 7.0.0
            console.log("config.xml found at " + oldConfigXMLLocation);
        platformConfigurationFile = oldConfigXMLLocation;
    }
      
      
      if(!configXmlData) {
            console.log("getConfigXml: Parsing " + platformConfigurationFile);
            configXmlData = parseElementtreeSync(platformConfigurationFile);
      }
      return configXmlData;
}

function getPreferences(configXML,platform){
      let preferencesData;
      preferencesData = {
            common: configXml.findall('preference')
      };
      let prefs = preferencesData.common || [];
      
                if(platform) {
                    if(!preferencesData[platform]) {
                        preferencesData[platform] = configXml.findall('platform[@name=\'' + platform + '\']/preference');
                    }
                    prefs = prefs.concat(preferencesData[platform]);
                }

                return prefs;;
}

module.exports = function(context) {
      debugger;
      let configXmlData, preferencesData;
      var configXML;
      const cordovaUtil = context.requireCordovaModule('cordova-lib/src/cordova/util');
      rootDir = cordovaUtil.isCordova();
      
      configXML = getConfigXml(context);
      console.log("Found configXml : ", configXML);
      
      fs.readdirSync('platforms').forEach( function (platform) {
                try {
                    platform = platform.trim().toLowerCase();
                    console.log("Processing settings for platform: "+ platform);
                    getPreferences(configXML,platform).forEach(function (preference) {
                    console.log("Preference found: " + preference);
                    });
                      
                    //platformConfig.updatePlatformConfig(platform);
                } catch (e) {
                    console.error(e);
                }
            });

}
