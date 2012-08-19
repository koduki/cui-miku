(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Config = (function() {

    function Config() {
      this.save = __bind(this.save, this);

    }

    Config.prototype.save = function() {
      return window.localStorage.setItem("config", JSON.stringify(this));
    };

    Config.prototype.externalApi = {
      googleCalendar: false
    };

    Config.prototype.etc = {
      tts: false
    };

    return Config;

  })();

  window.Config.load = function() {
    var config;
    config = window.localStorage.getItem("config");
    if (config === null) {
      return new Config();
    } else {
      return JSON.parse(config);
    }
  };

}).call(this);
