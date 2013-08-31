window.Function = {}
showRss = (flickWindow, url) ->
  $.get url, (res, code) ->
    xml = $(res)
    items = xml.find("item").map((i, x) ->
      title: $(x).find("title").text()
      link: $(x).find("link").text()
      description: $(x).find("description").text()
    )
    items.each (i, item) ->
      flickWindow.add item.title, item.link, item.description.slice(0, 60)

  flickWindow.show()

# Open News FlickWindow.
Function.showNews = (flickWindow) ->
  url = "https://twitter.com/statuses/user_timeline/82492709.rss"
  url = "http://feeds.feedburner.com/hatena/b/hotentry"
  showRss flickWindow, url

# Open GoogleMap Window.
Function.searchMap = (keyword) ->
  url = 'http://maps.google.co.jp/maps?q=' + encodeURIComponent(keyword) + '&hl=ja&ie=UTF8&sll=' + window.Location.latitude + "," + window.Location.longitude + '&ll=' + window.Location.latitude + "," + window.Location.longitude;
  console.log("searchMap:url=" + url)
  window.open(url)

# Open Schedule FlickWindow.
Function.showSchedule = (date, success, fail) ->
  console.log("getschedule:date=" + date)
  cal = new GoogleCalendar()
  items = cal.getCalendarList (items) ->
    start_datetime = date.toFormat('YYYY-MM-DD') + 'T00:00:00Z'
    end_datetime = date.addDays(1).toFormat('YYYY-MM-DD') + 'T00:00:00Z'
    cal.getEventList items[1].id, start_datetime, end_datetime, (data) -> 
      items = data.items
      window.items2 = items
      if items?
        success()
        item = items[0]

        s_datetime = item.start.dateTime.replace(":00+09:00", "") 
        e_datetime = item.end.dateTime.replace(":00+09:00", "")
        place = if item.location?
          item.location
        else
          "なし"
  
        detail = $("<table />")
        detail.append($("<tr />")
                  .append("<th>開始:</th>")
                  .append("<td>" + s_datetime + "</td>")
        )
        detail.append($("<tr />")
                  .append("<th>終了:</th>")
                  .append("<td>" + e_datetime + "</td>")
        )
        detail.append($("<tr />")
                  .append("<th>場所:</th>")
                  .append("<td>" + place + "</td>")
        )
  
        flickWindow = new FlickWindow(180, 300)
        flickWindow.add item.summary, item.htmlLink, "<table>" + detail.html() + "</table>"
        flickWindow.show()
      else
        console.log("not found schedule.")
        fail()

Function.playmusic = () ->
	getBaseURL = () -> 
		str = window.location.pathname;
		i = str.lastIndexOf('/');
		str.substring(0, i + 1);
		
	url = getBaseURL() + "sound/melt.mp3";
	onsuccess = () ->
		console.log("playAudio():Audio Success");
	onerror = (err) ->
		console.log("playAudio():Audio Error: " + err);
	console.log("media:" + url)
	my_media = new Media(url, onsuccess, onerror)
	my_media.play();