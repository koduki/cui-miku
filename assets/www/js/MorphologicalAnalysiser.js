/**
 *  MorphologicalAnalysiser.js
 *  Morphological Analysiser for PhoneGap(Android)
 *
 *
 *  @author koduki
 *  
 */
 
/**
 * class.
 */
function MorphologicalAnalysiser() {
}

/**
 * Initialize
 * 
 * @param successCallback
 * @param text
 */
MorphologicalAnalysiser.prototype.analyse = function(successCallback, text) {
     return cordova.exec(successCallback, null, "MorphologicalAnalysiser", "analyse", [text]);
};

/**
 * Load 
 */ 
cordova.addConstructor(function() {
    cordova.addPlugin("morphologicalAnalysiser", new MorphologicalAnalysiser());
});


