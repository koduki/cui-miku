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
Function.getSchedule = (date) ->
  date
