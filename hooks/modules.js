const fs = require("fs"), path = require("path");

module.exports = {
   
   getPlatformConfigurationFile: function(context) {
      var androidPlatformDir = path.join(context.opts.projectRoot,'platforms', 'android');
      var oldConfigXMLLocation = path.join(androidPlatformDir, 'res', 'xml', 'config.xml');
      var newConfigXMLLocation = path.join(androidPlatformDir, 'app', 'src', 'main', 'res', 'xml', 'config.xml');
      var platformConfigurationFile;
      
      if (fs.existsSync(newConfigXMLLocation)) {
        // cordova-android >= 7.0.0
        platformConfigurationFile = newConfigXMLLocation;
            console.log("config.xml found at " + newConfigXMLLocation);
      } else {
        // cordova-android < 7.0.0
            console.log("config.xml found at " + oldConfigXMLLocation);
        platformConfigurationFile = oldConfigXMLLocation;
      }
      return platformConfigurationFile;
   }
}
