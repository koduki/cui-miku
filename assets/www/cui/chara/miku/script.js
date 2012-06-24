var INTERVAL = 1700;

//
// define image.
//
var 通常 = 'cui/chara/miku/images/001_s.png';
var 怒り = 'cui/chara/miku/images/002_s.png';
var 喜び = 'cui/chara/miku/images/003_s.png';

//
// define part.
//
var 頭 = {"left":180, "top":40,  "width":100, "height":80};
var 胸 = {"left":160, "top":300, "width":120,  "height":60};

//
// define actions.
//
var actions = [
   {"part":胸, "action":["touch"],                 "img":怒り, "msg":"Hなのはいけないと思います！"},
   {"part":頭, "action":["nadenade", {"count":5}], "img":喜び, "msg":"♪〜"}
];
var showArea = function(area){
	var obj = $("<div />").appendTo("#sprite");
	obj
	.css("position", "absolute")
	.css("width", area["width"] + "px")
	.css("height", area["height"] + "px")
	.css("left", area["left"] + "px")
	.css("top", area["top"] + "px")
	.css("z-index", 100)
	.css("background-color","red")
}

$(function(){
   // initialize
   var sprite = new Sprite();
   sprite.dlg = new Dialog(390, 70, 200, 60, '20px', "black", "white", '24px');
   sprite.image(通常);
   
   sprite.dlg.show("おはようございますー♪", INTERVAL);   

   // regist actions.
   actions.map(function(action){ 
      sprite[action.action[0]](action.part, action.action[1], function(e){
         sprite.motion(action.img, INTERVAL);
         sprite.dlg.show(action.msg, INTERVAL);   
      });            
   });

});

