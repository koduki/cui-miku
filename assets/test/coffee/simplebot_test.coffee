module "SimpleBot spec\n"
test "MorphologicalAnalysiser.\n", ->
  bot = new window.SimpleBot()
  analysiser = window.morphologicalAnalysiser
  analysiser.analyse ((result) ->
    equal result[0].pronunciation, "ラーメン", "test pronunciation.\n"
    equal result[1].feature, "助詞,格助詞,一般,*,*,*", "test feature.\n"
    equal result[2].baseform, "食べる", "test baseform.\n"
  ), "ラーメンが食べたい"

test "chat parser - ニュース.\n", ->
  bot = new window.SimpleBot()
  deepEqual bot.parse('ニュース表示して'), ['ニュース表示',[]], '\n'
  deepEqual bot.parse('ニュースを表示して'), ['ニュース表示',[]], '\n'
  deepEqual bot.parse('今日のニュース表示'), ['ニュース表示',[]], '\n'

test "chat parser - 挨拶:朝.\n", ->
  bot = new window.SimpleBot()
  deepEqual bot.parse('おはよ'), ['挨拶:朝',[]], '\n'
  deepEqual bot.parse('おはよう'), ['挨拶:朝',[]], '\n'
  deepEqual bot.parse('おはようございます'), ['挨拶:朝',[]], '\n'
  
test "chat parser - 挨拶:昼.\n", ->
  bot = new window.SimpleBot()
  deepEqual bot.parse('こんにちは'), ['挨拶:昼',[]], '\n'
  deepEqual bot.parse('こんにちわ'), ['挨拶:昼',[]], '\n'
  
test "chat parser - 挨拶:夜.\n", ->
  bot = new window.SimpleBot()
  deepEqual bot.parse('おやすみ'), ['挨拶:夜',[]], '\n'
  deepEqual bot.parse('おやすみなさい'), ['挨拶:夜',[]], '\n'

test "chat parser - 得意なこと.\n", ->
  bot = new window.SimpleBot()
  deepEqual bot.parse('得意なこと'), ['得意なこと',[]], '\n'
  deepEqual bot.parse('得意なこと教えて'), ['得意なこと',[]], '\n'
  deepEqual bot.parse('特技を教えて'), ['得意なこと',[]], '\n'
  deepEqual bot.parse('特技は'), ['得意なこと',[]], '\n'

test "chat parser - 喜び.\n", ->
  bot = new window.SimpleBot()
  deepEqual bot.parse('可愛い'), ['喜び',[]], '\n'
  deepEqual bot.parse('かわいい'), ['喜び',[]], '\n'
  deepEqual bot.parse('すごいね'), ['喜び',[]], '\n'
  deepEqual bot.parse('凄いね'), ['喜び',[]], '\n'
  
test "chat parser - 地図検索.\n", ->
  bot = new window.SimpleBot()
  deepEqual bot.parse('近くのラーメン屋探して'), ['地図検索',['ラーメン']], '\n'
  
test "chat parser - その他.\n", ->
  bot = new window.SimpleBot()
  deepEqual bot.parse('ラーメン'), ['その他',['ラーメン']], '\n'
  deepEqual bot.parse('あいうえお'), ['その他',['あいうえお']], '\n'
