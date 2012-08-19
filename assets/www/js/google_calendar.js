(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.GoogleCalendar = (function() {

    function GoogleCalendar() {
      this.getCalendarList = __bind(this.getCalendarList, this);

      this.executeAPI = __bind(this.executeAPI, this);

      this.callAPI = __bind(this.callAPI, this);

      this.getAccessToken = __bind(this.getAccessToken, this);

      this.getRefreshToken = __bind(this.getRefreshToken, this);

      this.authorize = __bind(this.authorize, this);
      this.client_id = "150899810974-qv8fu9ck15n5cmojbrfd1r8o4l0leatk.apps.googleusercontent.com";
      this.scope = "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar";
      this.client_secret = 'NuHzWDgOqRQ3HIbtrTaJtZjE';
    }

    GoogleCalendar.prototype.authorize = function(success) {
      var url,
        _this = this;
      url = "https://accounts.google.com/o/oauth2/auth?scope=" + this.scope + "&state=%2Fprofile&redirect_uri=https%3A%2F%2Flocalhost%2Foauth2callback&response_type=code&client_id=" + this.client_id + "&access_type=offline";
      window.plugins.childBrowser.onLocationChange = function(loc) {
        var code, code_match;
        code_match = loc.match(/&code=(.+)&*/);
        if (code_match) {
          code = code_match[1];
          console.log(code);
          window.plugins.childBrowser.close();
          return _this.getRefreshToken(code, success);
        } else {
          return console.log("LocalChange unmatch:" + loc);
        }
      };
      return window.plugins.childBrowser.showWebPage(url, {
        showLocationBar: false
      });
    };

    GoogleCalendar.prototype.getRefreshToken = function(code, success) {
      var _this = this;
      console.log("start:getRefreshToken");
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
          var refresh_token;
          window.resultStatus = data;
          refresh_token = data.refresh_token;
          window.localStorage.setItem("googleapi.calendar.refresh_token", refresh_token);
          return success(refresh_token);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          window.errorStatus = jqXHR;
          return console.log("failed:getRefreshToken:" + ", " + code + "," + _this.client_id + ", " + _this.client_secret + ", " + errorThrown);
        }
      });
    };

    GoogleCalendar.prototype.getAccessToken = function(refresh_token, success) {
      var _this = this;
      console.log("start:getAccessToken");
      return $.ajax({
        type: 'post',
        url: 'https://accounts.google.com/o/oauth2/token',
        data: {
          'client_id': this.client_id,
          'client_secret': this.client_secret,
          'grant_type': 'refresh_token',
          'refresh_token': refresh_token
        },
        dataType: 'json',
        success: function(data) {
          window.resultStatus = data;
          return success(data.access_token);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          window.errorStatus = jqXHR;
          return console.log("failed:getAccessToken :" + ", " + refresh_token + "," + _this.client_id + ", " + _this.client_secret + ", " + errorThrown);
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
          window.errorStatus = jqXHR;
          return console.log("failed:call google api:" + url + ", " + access_token + "," + jqXHR(+", " + textStatus + ", " + errorThrown));
        }
      });
    };

    GoogleCalendar.prototype.executeAPI = function(url, data, success) {
      var refresh_token,
        _this = this;
      refresh_token = window.localStorage.getItem("googleapi.calendar.refresh_token");
      if (refresh_token === null) {
        console.log("not found refresh token");
        return this.authorize(function(refresh_token) {
          return _this.getAccessToken(refresh_token, function(access_token) {
            return _this.callAPI(url, access_token, data, success);
          });
        });
      } else {
        console.log("found refresh token");
        return this.getAccessToken(refresh_token, function(access_token) {
          return _this.callAPI(url, access_token, data, success);
        });
      }
    };

    GoogleCalendar.prototype.getCalendarList = function() {
      var url;
      url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList';
      return this.executeAPI(url, {}, function(data) {
        alert(data.items[0].description);
        return console.log(data.items[0].description);
      });
    };

    return GoogleCalendar;

  })();

}).call(this);
