
// === Matter test ===

// create aliases
var Engine = Matter.Engine,
	Render = Matter.Render,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Runner = Matter.Runner;

var textStr;
	
// canvas and engine	
var canvas = document.getElementById("render-canvas")
var context = canvas.getContext("2d");

var engine = Engine.create();
var boxes;

function reset(){
	textStr = document.getElementById("query").value;
	
	var engine = Engine.create();
	World.clear(engine.world);
	Engine.clear(engine);
	
	// boxes and ground
	boxes = [];
	
	for(var i=0; i < textStr.length; i++){
		boxes.unshift(Bodies.rectangle(canvas.width/2+60*Math.random(), canvas.height-50*i, 60, 60))
	}
	
	var ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true});

	// add items to world and run
	World.add(engine.world, boxes.concat([ground]));	
	Engine.run(engine);
}

// I'm lazy
setInterval(function(){
	// draw to canvas
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.strokeStyle = "#FF0000";
	context.strokeRect(0, 0, canvas.width, canvas.height);
	
	context.font = "60px Arial";
	
	for (var i=0; i < textStr.length; i++){
		context.save();
		context.translate(boxes[i].position.x-30, boxes[i].position.y-30);
		context.rotate(boxes[i].angle);
		context.translate(-boxes[i].position.x-30, -boxes[i].position.y+30);
		context.fillText(textStr[i], boxes[i].position.x, boxes[i].position.y);
		context.restore();
	}
}, 1);