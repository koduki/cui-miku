module("Sample TestTAP spec compliance\n");

test('Diagnostic2 lines\n', function() {
    var bot = new window.SimpleBot();
    var analysiser = window.morphologicalAnalysiser

    analysiser.analyse(function(result) {
        equal(result[0].pronunciation, "ラーメン", "test pronunciation.\n")
        equal(result[1].feature, "助詞,格助詞,一般,*,*,*", "test feature.\n")
    }, "ラーメンが食べたい")

});
