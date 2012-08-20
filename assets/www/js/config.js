(function() {

  window.Config = (function() {

    function Config() {}

    Config.prototype.externalApi = {
      googleCalendar: {
        enable: "true"
      }
    };

    Config.prototype.etc = {
      tts: {
        enable: false
      }
    };

    return Config;

  })();

  window.Config.load = function() {
    var parse;
    parse = function(obj, key) {
      var p, value;
      for (p in obj) {
        if (Object.prototype.toString.call(obj[p]) === "[object Object]") {
          parse(obj[p], key + "." + p);
        } else {
          value = window.localStorage.getItem(key + "." + p);
          obj[p] = value === "true" ? true : value === "false" ? false : value;
        }
      }
      return obj;
    };
    return parse(new Config, "config");
  };

  window.Config.save = function(obj) {
    var parse;
    parse = function(obj, key) {
      var p, _results;
      _results = [];
      for (p in obj) {
        if (Object.prototype.toString.call(obj[p]) === "[object Object]") {
          _results.push(parse(obj[p], key + "." + p));
        } else {
          _results.push(window.localStorage.setItem(key + "." + p, obj[p]));
        }
      }
      return _results;
    };
    return parse(obj, "config");
  };

}).call(this);
