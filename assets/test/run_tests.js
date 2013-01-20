load("qunit-tap/vendor/qunit/qunit/qunit.js");
load("qunit-tap/lib/qunit-tap.js");
load("js/lib/cordova_wrapper.js");

// load plugins.
load("../www/js/MorphologicalAnalysiser.js");
cordova.init()

// load test target.
load("../www/cui/simplebot.js");
load("../www/dateutils.js");

qunitTap(QUnit, print, {noPlan: true});

QUnit.init();
QUnit.config.updateRate = 0;

// load test case.
load("js/simplebot_test.js");
load("js/dateutils_test.js");

QUnit.start();
