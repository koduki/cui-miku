module "Sample TestTAP spec compliance\n"
test "Diagnostic2 lines\n", ->
  bot = new window.SimpleBot()
  analysiser = window.morphologicalAnalysiser
  analysiser.analyse ((result) ->
    equal result[0].pronunciation, "ラーメン", "test pronunciation.\n"
    equal result[1].feature, "助詞,格助詞,一般,*,*,*", "test feature.\n"
    equal result[2].baseform, "食べる", "test baseform.\n"
  ), "ラーメンが食べたい"