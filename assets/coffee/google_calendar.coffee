class window.GoogleCalendar
  constructor:() ->
    @client_id = "150899810974-qv8fu9ck15n5cmojbrfd1r8o4l0leatk.apps.googleusercontent.com"
    @scope = "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar"
    @client_secret = 'NuHzWDgOqRQ3HIbtrTaJtZjE'
    @token_key = "googleapi.calendar.refresh_token"

  authorize:(success_callback) => 
    url = "https://accounts.google.com/o/oauth2/auth?approval_prompt=force&scope=#{@scope}&state=%2Fprofile&redirect_uri=https%3A%2F%2Flocalhost%2Foauth2callback&response_type=code&client_id=#{@client_id}&access_type=offline";
    window.plugins.childBrowser.onLocationChange = (loc) =>
      code_match = loc.match(/&code=(.+)&*/)
      if code_match
        console.log("LocalChange match");
        code = code_match[1]
        console.log(code)
        window.plugins.childBrowser.close()
        @getRefreshToken(code, success_callback)
      else
        console.log("LocalChange unmatch:" + loc);
 
    window.plugins.childBrowser.showWebPage url,{
      showLocationBar : false
    }

  unauthorize:() => 
    console.log("remove:getRefreshToken")
    window.localStorage.removeItem(@token_key)

  getRefreshToken:(code, success_callback) =>
    console.log("start:getRefreshToken")
    $.ajax
      type:'post'
      url : 'https://accounts.google.com/o/oauth2/token'
      data : 
        'client_id':@client_id
        'client_secret':@client_secret
        'redirect_uri':'https://localhost/oauth2callback'
        'grant_type':'authorization_code'
        'code':code
      dataType : 'json'
      success:(data) =>
        window.resultStatus = data
        alert(data)
        for key of data
          console.log "data.#{key}:#{data[key]}"
        refresh_token = data.refresh_token
        window.localStorage.setItem(@token_key, refresh_token)
        console.log("success:getRefreshToken:" + refresh_token)
        success_callback(refresh_token)
      error:(jqXHR, textStatus, errorThrown) =>
        window.errorStatus = jqXHR
        console.log("failed:getRefreshToken:" + " " + code + ","+ @client_id + ", " + @client_secret + ", " + errorThrown)

  getAccessToken:(refresh_token, success_callback) =>
    console.log("start:getAccessToken: refreshToken=" + refresh_token)
    $.ajax
      type:'post'
      url : 'https://accounts.google.com/o/oauth2/token'
      data : 
        'client_id':@client_id
        'client_secret':@client_secret
        'grant_type':'refresh_token'
        'refresh_token':refresh_token
      dataType : 'json'
      success:(data) =>
        window.resultStatus = data
        success_callback(data.access_token)
      error:(jqXHR, textStatus, errorThrown) =>
        window.errorStatus = jqXHR
        console.log("failed:getAccessToken :" + " " + refresh_token + ","+ @client_id + ", " + @client_secret + ", " + errorThrown)

  callAPI:(url, access_token, data, success) =>
    $.ajax
      url : url
      data : data
      headers : {'Authorization':'OAuth ' + access_token }
      dataType : 'json',
      success : (data) => success(data)
      error:(jqXHR, textStatus, errorThrown) =>
        window.errorStatus = jqXHR
        console.log("failed:call google api:" + url + ", " + access_token + ", "+ textStatus + ", " + errorThrown)

  executeAPI:(url, data, success) =>
    console.log(":url:" + url)
    refresh_token = window.localStorage.getItem(@token_key)

    if refresh_token? and refresh_token != undefined and refresh_token != 'undefined'
      console.log("found refresh token: " + refresh_token + "___")
      @getAccessToken refresh_token, (access_token) =>
        @callAPI(url, access_token, data, success)
    else
      console.log("not found refresh token")
      @authorize (refresh_token) => 
        @getAccessToken refresh_token, (access_token) =>
          @callAPI(url, access_token, data, success)

  getCalendarList:(callback) => 
    url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList'
    @executeAPI url, {}, (data) ->
      callback data.items

  getEventList:(calendar_id, start_datetime, end_datetime, callback) => 
    console.log('getEventList01:' + 'calendar_id=' + calendar_id + ', start_datetime=' + start_datetime + ', end_datetime=' + end_datetime);
    base_url = 'https://www.googleapis.com/calendar/v3'
    api_url = '/calendars/' + encodeURIComponent(calendar_id) + '/events';
    options = 'timeMin=' + encodeURIComponent(start_datetime) + '&timeMax=' + encodeURIComponent(end_datetime);
    url = base_url + api_url + '?' + options
    console.log("getEventList02:" + url)
    @executeAPI url, {}, (data) ->
      callback data