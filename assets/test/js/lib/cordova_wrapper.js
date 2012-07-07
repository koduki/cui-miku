function Cordova() {
}

var constructors = []

Cordova.prototype.addConstructor = function(callback) {
    constructors.push(callback)
}

Cordova.prototype.addPlugin = function(name, obj) {
    window[name] = obj
}

Cordova.prototype.exec = function(success, fail, name, action, args) {
    var result = exec(action, args, null);
    if (result.getMessage().equals("OK")) {
        if (success != null) {
            var r = result.getResult() + "";
            success(eval(r));
        }
    } else {
        if (fail != null) {
            var r = result.getResult() + "";
            fail(eval(r));
        }
    }
}
Cordova.prototype.init = function() {
    for (var i = 0; i < constructors.length; i++) {
        constructors[i]();
    }
}
cordova = new Cordova();

