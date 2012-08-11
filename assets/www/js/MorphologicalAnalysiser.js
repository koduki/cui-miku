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
if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.tts) {
    window.plugins.morphologicalAnalysiser = new MorphologicalAnalysiser();
}

