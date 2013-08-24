require(["fileutil"], function(FileUtil) {
	alert("hello");
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
	console.log("Hello")
	console.log(FileUtil)
	  console.log(sub2.getName());
	  console.log(sub1.greeting());
	  console.log(sub2.greeting());
});