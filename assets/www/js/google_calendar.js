(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.GoogleCalendar = (function() {

    function GoogleCalendar() {
      this.getEventList = __bind(this.getEventList, this);

      this.getCalendarList = __bind(this.getCalendarList, this);

      this.executeAPI = __bind(this.executeAPI, this);

      this.callAPI = __bind(this.callAPI, this);

      this.getAccessToken = __bind(this.getAccessToken, this);

      this.getRefreshToken = __bind(this.getRefreshToken, this);

      this.unauthorize = __bind(this.unauthorize, this);

      this.authorize = __bind(this.authorize, this);
      this.client_id = "150899810974-qv8fu9ck15n5cmojbrfd1r8o4l0leatk.apps.googleusercontent.com";
      this.scope = "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar";
      this.client_secret = 'NuHzWDgOqRQ3HIbtrTaJtZjE';
      this.token_key = "googleapi.calendar.refresh_token";
    }

    GoogleCalendar.prototype.authorize = function(success_callback) {
      var url,
        _this = this;
      url = "https://accounts.google.com/o/oauth2/auth?approval_prompt=force&scope=" + this.scope + "&state=%2Fprofile&redirect_uri=https%3A%2F%2Flocalhost%2Foauth2callback&response_type=code&client_id=" + this.client_id + "&access_type=offline";
      window.plugins.childBrowser.onLocationChange = function(loc) {
        var code, code_match;
        code_match = loc.match(/&code=(.+)&*/);
        if (code_match) {
          console.log("LocalChange match");
          code = code_match[1];
          console.log(code);
          window.plugins.childBrowser.close();
          return _this.getRefreshToken(code, success_callback);
        } else {
          return console.log("LocalChange unmatch:" + loc);
        }
      };
      return window.plugins.childBrowser.showWebPage(url, {
        showLocationBar: false
      });
    };

    GoogleCalendar.prototype.unauthorize = function() {
      console.log("remove:getRefreshToken");
      return window.localStorage.removeItem(this.token_key);
    };

    GoogleCalendar.prototype.getRefreshToken = function(code, success_callback) {
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
          var key, refresh_token;
          window.resultStatus = data;
          alert(data);
          for (key in data) {
            console.log("data." + key + ":" + data[key]);
          }
          refresh_token = data.refresh_token;
          window.localStorage.setItem(_this.token_key, refresh_token);
          console.log("success:getRefreshToken:" + refresh_token);
          return success_callback(refresh_token);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          window.errorStatus = jqXHR;
          return console.log("failed:getRefreshToken:" + " " + code + "," + _this.client_id + ", " + _this.client_secret + ", " + errorThrown);
        }
      });
    };

    GoogleCalendar.prototype.getAccessToken = function(refresh_token, success_callback) {
      var _this = this;
      console.log("start:getAccessToken: refreshToken=" + refresh_token);
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
          return success_callback(data.access_token);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          window.errorStatus = jqXHR;
          return console.log("failed:getAccessToken :" + " " + refresh_token + "," + _this.client_id + ", " + _this.client_secret + ", " + errorThrown);
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
          return console.log("failed:call google api:" + url + ", " + access_token + ", " + textStatus + ", " + errorThrown);
        }
      });
    };

    GoogleCalendar.prototype.executeAPI = function(url, data, success) {
      var refresh_token,
        _this = this;
      console.log(":url:" + url);
      refresh_token = window.localStorage.getItem(this.token_key);
      if ((refresh_token != null) && refresh_token !== void 0 && refresh_token !== 'undefined') {
        console.log("found refresh token: " + refresh_token + "___");
        return this.getAccessToken(refresh_token, function(access_token) {
          return _this.callAPI(url, access_token, data, success);
        });
      } else {
        console.log("not found refresh token");
        return this.authorize(function(refresh_token) {
          return _this.getAccessToken(refresh_token, function(access_token) {
            return _this.callAPI(url, access_token, data, success);
          });
        });
      }
    };

    GoogleCalendar.prototype.getCalendarList = function(callback) {
      var url;
      url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList';
      return this.executeAPI(url, {}, function(data) {
        return callback(data.items);
      });
    };

    GoogleCalendar.prototype.getEventList = function(calendar_id, start_datetime, end_datetime, callback) {
      var api_url, base_url, options, url;
      console.log('getEventList01:' + 'calendar_id=' + calendar_id + ', start_datetime=' + start_datetime + ', end_datetime=' + end_datetime);
      base_url = 'https://www.googleapis.com/calendar/v3';
      api_url = '/calendars/' + encodeURIComponent(calendar_id) + '/events';
      options = 'timeMin=' + encodeURIComponent(start_datetime) + '&timeMax=' + encodeURIComponent(end_datetime);
      url = base_url + api_url + '?' + options;
      console.log("getEventList02:" + url);
      return this.executeAPI(url, {}, function(data) {
        return callback(data);
      });
    };

    return GoogleCalendar;

  })();

}).call(this);
