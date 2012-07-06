/**
 *  SpeechRecognizer.js
 *  Speech Recognizer PhoneGap plugin (Android)
 *
 *  @author Colin Turner
 *  @author Guillaume Charhon
 *  MIT Licensed
 */
 
/**
 * c'tor
 */
function MorphologicalAnalysiser() {
}

/**
 * Initialize
 * 
 * @param successCallback
 * @param errorCallback
 */
MorphologicalAnalysiser.prototype.init = function(successCallback, errorCallback) {
     return PhoneGap.exec(successCallback, errorCallback, "MorphologicalAnalysiser", "init", []);
};
MorphologicalAnalysiser.prototype.action = function(successCallback) {
     return PhoneGap.exec(successCallback, null, "MorphologicalAnalysiser", "execute", []);
};
MorphologicalAnalysiser.prototype.hoge = function() {
    return "abc";
}
/**
 * Load 
 */ 
cordova.addConstructor(function() {
    cordova.addPlugin("morphologicalAnalysiser", new MorphologicalAnalysiser());
});


