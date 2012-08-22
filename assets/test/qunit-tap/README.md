QUnit-TAP - a TAP Output Producer Plugin for QUnit
================================


NEWS
---------------------------------------
* (2012/03/18) Note for CommonJS users (includes Node.js users): QUnit's module export path has changed since QUnit 1.3.0, so you should fix 'require' path to get QUnit Object from 'require' module. (for details, see [my fix](https://github.com/twada/qunit-tap/commit/4799002ae1b9d8a1721da448b98f3dd0d89159d6).)
* (2012/01/01, 2012/01/05) Slightly changed 'expected and actual result' format on version 1.0.7 and version 1.0.8 to gain readability and follow testing framework naming convention.
* (2011/03/25) Usage has changed. Please see USAGE section.


DESCRIPTION
---------------------------------------
QUnit-TAP is a simple plugin for [QUnit](http://docs.jquery.com/QUnit) to produce [TAP](http://testanything.org/) output, to run tests on CLI.

With QUnit-TAP you can test your QUnit test scripts on your terminal, and you can use TAP Consumers like [prove](http://perldoc.perl.org/prove.html) for test automation.

QUnit-TAP runs under headless browsers like [phantomjs](http://code.google.com/p/phantomjs/), command-line js environments (like [SpiderMonkey](https://developer.mozilla.org/en/SpiderMonkey) or [Rhino](https://developer.mozilla.org/en/Rhino)), and [CommonJS](http://commonjs.org/) environments (like [node.js](http://nodejs.org/) or [narwhal](http://narwhaljs.org/)), and of cource, runs under real browser too.


DOWNLOAD
---------------------------------------
* Just download [qunit-tap.js](http://github.com/twada/qunit-tap/raw/master/lib/qunit-tap.js)
* or download archives from [qunit-tap tags](https://github.com/twada/qunit-tap/tags)
* or `git clone git://github.com/twada/qunit-tap.git`
* or `npm install qunit-tap` if you use npm.

You can use QUnit-TAP,

* as a single file, copy lib/qunit-tap.js to anywhere you like.
* as git submodule.
* as a node.js package (via npm).


USAGE
---------------------------------------
Three steps to use QUnit-TAP.

1. load/require qunit.js
2. load/require qunit-tap.js
3. Call `qunitTap` function with two or three arguments. The first argument is QUnit reference, the second is print-like function for TAP output. And the third argument is object to customize default behavior. (Note that the first and second argument is mandatory, and the third argument is optional.)

### usage example 1 : embed QUnit-TAP in your HTML (e.g. to run with PhantomJS)
    <script type="text/javascript" src="path/to/qunit.js"></script>
    <script type="text/javascript" src="path/to/qunit-tap.js"></script>
    <script>
      qunitTap(QUnit, function() { console.log.apply(console, arguments); }, {noPlan: true});
    </script>
    <script type="text/javascript" src="path/to/your_test.js"></script>
    <script type="text/javascript" src="path/to/your_test2.js"></script>

### usage example 2 : use QUnit-TAP with Rhino/SpiderMonkey
    load("path/to/qunit.js");
    load("path/to/qunit-tap.js");

    // enable TAP output
    qunitTap(QUnit, print);  //NOTE: 'print' is Rhino/SpiderMonkey's built-in function

    // or customize default behavior
    // qunitTap(QUnit, print, {noPlan: true, showDetailsOnFailure: false});

    // configure QUnit to run under non-browser env.
    QUnit.init();
    QUnit.config.updateRate = 0;

    load("path/to/your_test.js");
    load("path/to/your_test2.js");

    QUnit.start();

### usage example 3 : use QUnit-TAP with Node.js
    var util = require("util"),
        QUnit = require('./path/to/qunit'),
        qunitTap = require('qunit-tap').qunitTap;
    qunitTap(QUnit, util.puts, { noPlan: true });
    QUnit.init();
    QUnit.config.updateRate = 0;


CONFIGURATION OPTIONS
---------------------------------------
`qunitTap` function takes third optional argument as options object to customize default behavior. Customization props are,

* noPlan : If true, print test plan line at the bottom after all the test points have run. Inspired by Perl's "no_plan" feature. Default is false.
* showDetailsOnFailure : If true, show 'expected' and 'actual' on failure output. Default is true.


TAP OUTPUT EXAMPLE
---------------------------------------
    # module: math module
    # test: add
    ok 1
    ok 2
    ok 3 - passing 3 args
    ok 4 - just one arg
    ok 5 - no args
    not ok 6 - expected: '7' got: '1'
    not ok 7 - with message, expected: '7' got: '1'
    ok 8
    ok 9 - with message
    not ok 10
    not ok 11 - with message
    # module: incr module
    # test: increment
    ok 12
    ok 13
    # module: TAP spec compliance
    # test: Diagnostic lines
    ok 14 - with\r
    # multiline
    # message
    not ok 15 - with\r
    # multiline
    # message, expected: 'foo\r
    # bar' got: 'foo
    # bar'
    not ok 16 - with\r
    # multiline
    # message, expected: 'foo
    # bar' got: 'foo\r
    # bar'
    1..16


RUNNING EXAMPLES
---------------------------------------
### prepare
    $ git clone git://github.com/twada/qunit-tap.git
    $ cd qunit-tap
    $ git submodule update --init 


### to run with PhantomJS

    # assume you have built and installed phantomjs
    $ cd sample/js/
    $ ./phantomjs_test.sh

    # with prove
    $ prove phantomjs_test.sh

for details, see [phantomjs_test.sh](http://github.com/twada/qunit-tap/tree/master/sample/js/phantomjs_test.sh)


### to run with Rhino/SpiderMonkey

    # assume you are using rhino
    $ cd sample/js/
    $ rhino run_tests.js

for details, see [sample/js/](http://github.com/twada/qunit-tap/tree/master/sample/js/)


### to run under CommonJS environment (includes Node.js)

    # assume you are using node.js
    $ cd sample/commonjs/
    $ node test/math_test.js
    $ node test/incr_test.js

    # with prove
    $ prove --exec=/usr/local/bin/node test/*.js

for details, see [sample/commonjs/](http://github.com/twada/qunit-tap/tree/master/sample/commonjs/)


TROUBLE SHOOTING
---------------------------------------
If you are using Node.js (or any CommonJS env) and have an error like this,

    $ node test/incr_test.js 
    
    node.js:201
            throw e; // process.nextTick error, or 'error' event on first tick
                  ^
    Error: should pass QUnit object reference. Please check QUnit's "require" path if you are using Node.js (or any CommonJS env).
        at qunitTap (/path/to/qunit-tap.js:22:15)
        at Object.<anonymous> (/path/to/using_qunit_via_require_module.js)
        ....
    $

Check QUnit's version you are using. QUnit's module export path has changed since QUnit 1.3.0, so you should fix 'require' path to get QUnit Object from 'require' module. 

      var util = require("util"),
    -     QUnit = require('./path/to/qunit').QUnit,
    +     QUnit = require('./path/to/qunit'),
          qunitTap = require('qunit-tap').qunitTap;
      qunitTap(QUnit, util.puts, { noPlan: true });
      QUnit.init();
      QUnit.config.updateRate = 0;

for details, see [my fix](https://github.com/twada/qunit-tap/commit/4799002ae1b9d8a1721da448b98f3dd0d89159d6).


TESTED ENVIRONMENTS
---------------------------------------
* [phantomjs](http://code.google.com/p/phantomjs/)
* [SpiderMonkey](https://developer.mozilla.org/en/SpiderMonkey)
* [Rhino](https://developer.mozilla.org/en/Rhino)
* [node.js](http://nodejs.org/)
* [narwhal](http://narwhaljs.org/)


AUTHOR
---------------------------------------
Takuto Wada (takuto.wada at gmail dot com)


CONTRIBUTORS
---------------------------------------
* [Nikita Vasilyev](http://github.com/NV)
* [Hiroki Kondo](http://github.com/kompiro)
* [Keiji Yoshimi](http://github.com/walf443)
* [Hiroki Honda](http://github.com/Cside)


LICENSE
---------------------------------------
Dual licensed under the MIT and GPLv2 licenses.
