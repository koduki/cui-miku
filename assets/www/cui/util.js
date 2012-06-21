/*
 * utility functions.
 */

/**
 * true when user agent is ipad.
 * @return <boolean>
 */
var isTouch = function(){
   return navigator.userAgent.match(/iPad/i) != null
}

/**
 * initialize array.
 * @params <int> arrayt size.
 * @params <any> default vlaue.
 * @retrun <array>
 */
var array = function(size, defaultValue){
   return (new Array(size)).map(function(x){ return defaultValue});
}
