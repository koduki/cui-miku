module "SimpleBot spec\n"
test "MorphologicalAnalysiser.\n", ->
  bot = new window.SimpleBot()
  analysiser = window.plugins.morphologicalAnalysiser
  analysiser.analyse ((result) ->
    equal result[0].pronunciation, "ラーメン", "test pronunciation.\n"
    equal result[1].feature, "助詞,格助詞,一般,*,*,*", "test feature.\n"
    equal result[2].baseform, "食べる", "test baseform.\n"
  ), "ラーメンが食べたい"

test "chat parser - ニュース.\n", ->
  bot = new window.SimpleBot()
  bot.parse 'ニュース表示して', (actual) -> deepEqual actual, ['ニュース表示',[]], '\n'
  bot.parse 'ニュースを表示して', (actual) -> deepEqual actual, ['ニュース表示',[]], '\n'
  bot.parse '今日のニュース表示', (actual) -> deepEqual actual, ['ニュース表示',[]], '\n'

test "chat parser - 挨拶:朝.\n", ->
  bot = new window.SimpleBot()
  bot.parse 'おはよ', (actual) -> deepEqual actual, ['挨拶:朝',[]], '\n'
  bot.parse 'おはよう', (actual) -> deepEqual actual, ['挨拶:朝',[]], '\n'
  bot.parse 'おはようございます', (actual) -> deepEqual actual, ['挨拶:朝',[]], '\n'
  
test "chat parser - 挨拶:昼.\n", ->
  bot = new window.SimpleBot()
  bot.parse 'こんにちは', (actual) -> deepEqual actual, ['挨拶:昼',[]], '\n'
  bot.parse 'こんにちわ', (actual) -> deepEqual actual, ['挨拶:昼',[]], '\n'
  
test "chat parser - 挨拶:夜.\n", ->
  bot = new window.SimpleBot()
  bot.parse 'おやすみ', (actual) -> deepEqual actual, ['挨拶:夜',[]], '\n'
  bot.parse 'おやすみなさい', (actual) -> deepEqual actual, ['挨拶:夜',[]], '\n'

test "chat parser - 得意なこと.\n", ->
  bot = new window.SimpleBot()
  bot.parse '得意なこと', (actual) -> deepEqual actual, ['得意なこと',[]], '\n'
  bot.parse '得意なこと教えて', (actual) -> deepEqual actual, ['得意なこと',[]], '\n'
  bot.parse '特技を教えて', (actual) -> deepEqual actual, ['得意なこと',[]], '\n'
  bot.parse '特技は', (actual) -> deepEqual actual, ['得意なこと',[]], '\n'

test "chat parser - 喜び.\n", ->
  bot = new window.SimpleBot()
  bot.parse '可愛い', (actual) -> deepEqual actual, ['喜び',[]], '\n'
  bot.parse 'かわいい', (actual) -> deepEqual actual, ['喜び',[]], '\n'
  bot.parse 'すごいね', (actual) -> deepEqual actual, ['喜び',[]], '\n'
  bot.parse '凄いね', (actual) -> deepEqual actual, ['喜び',[]], '\n'
  
test "chat parser - 地図検索.\n", ->
  bot = new window.SimpleBot()
  bot.parse '近くのラーメン屋探して', (actual) -> deepEqual actual, ['地図検索',['ラーメン']], '\n'
  bot.parse '近くにあるコンビニを教えて', (actual) -> deepEqual actual, ['地図検索',['コンビニ']], '\n'
  bot.parse '近くの駅調べて', (actual) -> deepEqual actual, ['地図検索',['駅']], '\n'

test "chat parser - 予定取得.\n", ->
  bot = new window.SimpleBot()
  bot.parse '今日の予定を教えて', (actual) -> deepEqual actual, ['予定取得',['今日']], '\n'
  bot.parse '明日予定いあったっけ', (actual) -> deepEqual actual, ['予定取得',['明日']], '\n'
  bot.parse '日曜日予定いある', (actual) -> deepEqual actual, ['予定取得',['日曜日']], '\n'

test "chat parser - その他.\n", ->
  bot = new window.SimpleBot()
  bot.parse 'ラーメン', (actual) -> deepEqual actual, ['その他',['ラーメン']], '\n'
  bot.parse 'あいうえお', (actual) -> deepEqual actual, ['その他',['あいうえお']], '\n'
