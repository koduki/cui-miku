(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.GoogleCalendar = (function() {

    function GoogleCalendar() {
      this.callAPI = __bind(this.callAPI, this);

      this.getRefreshToken = __bind(this.getRefreshToken, this);

      this.getCalendarList = __bind(this.getCalendarList, this);

      this.authorize = __bind(this.authorize, this);

      var _this = this;
      this.client_id = "150899810974-qv8fu9ck15n5cmojbrfd1r8o4l0leatk.apps.googleusercontent.com";
      this.scope = "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar";
      this.client_secret = 'NuHzWDgOqRQ3HIbtrTaJtZjE';
      window.plugins.childBrowser.onLocationChange = function(loc) {
        var code, code_match;
        code_match = loc.match(/&code=(.+)&*/);
        if (code_match) {
          code = code_match[1];
          alert(code);
          console.log(code);
          window.plugins.childBrowser.close();
          return _this.getRefreshToken(code);
        } else {
          return console.log("LocalChange unmatch:" + loc);
        }
      };
    }

    GoogleCalendar.prototype.authorize = function() {
      var url;
      url = "https://accounts.google.com/o/oauth2/auth?scope=" + this.scope + "&state=%2Fprofile&redirect_uri=https%3A%2F%2Flocalhost%2Foauth2callback&response_type=code&client_id=" + this.client_id + "&access_type=offline";
      return window.plugins.childBrowser.showWebPage(url, {
        showLocationBar: false
      });
    };

    GoogleCalendar.prototype.getCalendarList = function(access_token) {
      var url;
      url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList';
      return this.callAPI(url, access_token, {}, function(data) {
        alert(data.items[0].description);
        return onsole.log(data.items[0].description);
      });
    };

    GoogleCalendar.prototype.getRefreshToken = function(code) {
      var _this = this;
      return $.ajax({
        type: 'post',
        url: 'https://accounts.google.com/o/oauth2/token',
        data: {
          'client_id': this.client_id,
          'client_secret': this.client_secret,
          'redirect_uri': 'https://localhost/oauth2callback',
          'grant_type': 'authorization_code',
          'code': code
        },
        dataType: 'json',
        success: function(data) {
          window.resultStatus = data;
          alert(data.refresh_token);
          return alert(data.access_token);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          window.errorStatus = jqXHR;
          return console.log("failed:call google api:" + ", " + code + "," + _this.client_id + ", " + _this.client_secret + ", " + errorThrown);
        }
      });
    };

    GoogleCalendar.prototype.callAPI = function(url, access_token, data, success) {
      var _this = this;
      return $.ajax({
        url: url,
        data: data,
        headers: {
          'Authorization': 'OAuth ' + access_token
        },
        dataType: 'json',
        success: function(data) {
          return success(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          return console.log("failed:call google api:" + url + ", " + access_token + "," + jqXHR(+", " + textStatus + ", " + errorThrown));
        }
      });
    };

    return GoogleCalendar;

  })();

}).call(this);
