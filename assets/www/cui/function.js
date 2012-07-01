Function = {}

var showRss = function(flickWindow, url) {
    $.get(url, function(res, code) {
        var xml = $(res);
        var items = xml.find("item").map(function(i, x) {
            return {
                "title" : $(x).find("title").text(),
                "link" : $(x).find("link").text(),
                "description" : $(x).find("description").text(),
            }
        })

        items.each(function(i, item) {
            flickWindow.add(item.title, item.link, item.description.slice(0, 60))
        })
    });

    flickWindow.show()
}
Function.showNews = function(flickWindow) {
    var url = 'https://twitter.com/statuses/user_timeline/82492709.rss'
    url = "http://feeds.feedburner.com/hatena/b/hotentry"
    showRss(flickWindow, url)
}