var canvas;
var context;
var cursorCanvas;
var cursorContext;
var layerCanvas;
var layerContext;

var canvasWidth;
var canvasHeight;
var clickX = new Array();
var clickY = new Array();
var paint = false;
var curColor = "#FF0000";
var curTool = "marker";
var curBrushSize = 10;
var scrollValue; 
var brushSizeStep = 4;

var brushOffsetX = 5;
var brushOffsetY = 20;

var mouseX;
var mouseY;

var isLazyMouse = false;
var clickedMousePosX;
var clickedMousePosY;
var lazyMouseStep = 50;

var canvasDivPosition;
	

/**
* Creates a canvas element, adds events, and draws the canvas for the first time.
*/
function prepareCanvas(){
	canvasWidth = imgWidth;
	canvasHeight = imgHeight;
	drawingAreaWidth = imgWidth;
	drawingAreaHeight = imgHeight;
	
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	var canvasDiv = document.getElementById('canvasDiv');
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d"); 
	
	var cursorCanvasDiv = document.getElementById('cursorCanvasDiv');
	cursorCanvas = document.createElement('canvas');
	cursorCanvas.setAttribute('width', canvasWidth);
	cursorCanvas.setAttribute('height', canvasHeight);
	cursorCanvas.setAttribute('id', 'cursorCanvas');
	cursorCanvasDiv.appendChild(cursorCanvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
		cursorCanvas = G_vmlCanvasManager.initElement(cursorCanvas);
	}
	cursorContext = cursorCanvas.getContext("2d"); 
    
    var layerCanvasDiv = document.getElementById('layerCanvasDiv');
	layerCanvas = document.createElement('canvas');
	layerCanvas.setAttribute('width', canvasWidth);
	layerCanvas.setAttribute('height', canvasHeight);
	layerCanvas.setAttribute('id', 'layerCanvas');
	layerCanvasDiv.appendChild(layerCanvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
		layerCanvas = G_vmlCanvasManager.initElement(layerCanvas);
	}
	layerContext = layerCanvas.getContext("2d"); 	
	
	canvasDivPosition = $('#cursorCanvas').offset();
    
	// Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
	// Add mouse events
	// ----------------
	$('#cursorCanvas').mousedown(function(e)
	{
		if(currentTime == 0)
			return;
		
		scrollValue = document.getElementById('scrollable').scrollLeft;
		// Mouse down location
		mouseX = e.pageX - this.offsetLeft + scrollValue - brushOffsetX - canvasDivPosition.left;
		mouseY = e.pageY - this.offsetTop - brushOffsetY;		
		clickedMousePosX = mouseX;
		clickedMousePosY = mouseY;
		paint = true;
		addClick(mouseX, mouseY, true);
		addClick(mouseX + 0.01, mouseY, true);  // 0.01 is a magic number - really it allows to draw even when you're not moving the mouse;
		redraw();
	});
	
	$('#cursorCanvas').mousemove(function(e){

		// console.log(clickedMousePosX);
		scrollValue = document.getElementById('scrollable').scrollLeft;	
		mouseX = e.pageX - this.offsetLeft + scrollValue - brushOffsetX - canvasDivPosition.left;
		console.log(canvasDivPosition.left);
		mouseY = e.pageY - this.offsetTop - brushOffsetY;
		if(isLazyMouse != true)
			if(paint==true){
				addClick(mouseX, mouseY, true);			
				redraw();
			}
		else
			addClick(clickedMousePosX, clickedMousePosY, true);
		
		if(!paint)
		{
			clickedMousePosX = mouseX;
			clickedMousePosY = mouseY;
		}
		
		drawCircle();
	});
	
	$('#cursorCanvas').mouseup(function(e){
		
		if(currentTime == 0)
			return;
		
		paint = false;
	  	redraw();
	});
	
	$('#cursorCanvas').mouseleave(function(e){
		// paint = true;
	});
	
	$('#cursorCanvas').bind('mousewheel', function(e) {
		if(e.originalEvent.wheelDelta / 120 > 0)
			incrementBrushSize(brushSizeStep);
		else 			
			incrementBrushSize(-brushSizeStep);
		drawCircle();
		e.preventDefault();
	});
	
	$(document).mouseup(function(e){
		paint = false;
	});
	
	document.onkeydown=function(e){
		switch(e.key) {
			case "1":				
				changeBrushSize(5);
				break;
			case "2":				
				changeBrushSize(10)
				break;
			case "3":				
				changeBrushSize(20)
				break;
			case "4":				
				changeBrushSize(40)
				break;
			case "z":				
				curTool = "eraser";
				break;
			case "b":				
				curTool = "marker";
				break;
			case "e":				
				curTool = "eraser";
				break;
			case "l":				
				toggleLazyMouse();
				break;
			case "Delete":				
				clearCanvas();
				break;
			case "[":
			case "-":				
				incrementBrushSize(-brushSizeStep);
				break;
			case "]":
			case "=":
			case "+":						
				incrementBrushSize(brushSizeStep);
				break;
			case "p":
				onClickNextLevel();
				break;
			case "f":
				if(!flickerModeOn)
					return;
				startFlicker();
				break;
		}
		drawCircle();
	};
	
	document.onkeyup=function(e){
		switch(e.key) {
			case "z":				
				curTool = "marker"
				break;
			case "f":
				if(!flickerModeOn)
					return;
				stopFlicker();
				break;
		}
		
		drawCircle();
	};
	
	window.setInterval(lazyMouse, 10);
	window.setInterval(function(){ myTimer() }, 1000);
}

function lazyMouse(){
	if(isLazyMouse && paint)
	{
		var diffX = (mouseX - clickedMousePosX)/lazyMouseStep;
		var diffY = (mouseY - clickedMousePosY)/lazyMouseStep;
		clickedMousePosX = clickedMousePosX + diffX;
		clickedMousePosY = clickedMousePosY + diffY;
		addClick(clickedMousePosX, clickedMousePosY, true);			
		redraw();		
		drawCircle();
	}	
}

function destroyCanvas(all){
    canvas.parentNode.removeChild(canvas);
    cursorCanvas.parentNode.removeChild(cursorCanvas);
    if(all == true)
    {
        layerCanvas.parentNode.removeChild(layerCanvas);    
    }
}

/**
* Adds a point to the drawing array.
* @param x
* @param y
* @param dragging
*/
function addClick(x, y){
	clickX.push(x);
	clickY.push(y);
}

/**
* Clears the canvas.
*/
function clearCanvas(){
	context.clearRect(0, 0, canvasWidth, canvasHeight);
}

/**
* Redraws the canvas.
*/
function redraw(){
	var radius;
	var i = clickX.length-1;
	for(; i < clickX.length; i++)
	{
		context.beginPath();
		if(i){
			context.moveTo(clickX[i-1], clickY[i-1]);
		}else{
			context.moveTo(clickX[i], clickY[i]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		
		if(curTool == "eraser"){
			context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
			context.strokeStyle = "rgba(255,255,255,1)";
		}else{
			context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
			context.strokeStyle = curColor;
		}
		context.lineJoin = "round";
		context.lineWidth = curBrushSize;
		context.stroke();		
	}
}

function changeBrushSize(brushSize){	
	curBrushSize = brushSize;
}

function incrementBrushSize(step){	
	curBrushSize = curBrushSize + step;
	if(curBrushSize <= 1)
		curBrushSize = 1;
}

function changeTool(tool){
	curTool = tool;
}

function toggleLazyMouse(){
	isLazyMouse = !isLazyMouse;
}

function drawCircle(){
	
	cursorContext.clearRect(0, 0, canvas.width, canvas.height);	
	cursorContext.globalCompositeOperation = "source-over";
	cursorContext.strokeStyle = '#FFFFFF';
	var radius = curBrushSize /2;
	cursorContext.lineWidth = 2;
	
	if(curTool == "eraser")
		cursorContext.setLineDash([5, 5]);
	if(curTool == "marker")
		cursorContext.setLineDash([0]);

	if(!isLazyMouse){		
		cursorContext.beginPath();
		cursorContext.arc(mouseX, mouseY, radius, 0, 2 * Math.PI, false);
		cursorContext.stroke();	
	}
	else{
		cursorContext.beginPath();
		cursorContext.arc(mouseX, mouseY, 5, 0, 2 * Math.PI, false);
		cursorContext.closePath();
		cursorContext.stroke();	
		cursorContext.beginPath();
		cursorContext.arc(clickedMousePosX, clickedMousePosY, radius, 0, 2 * Math.PI, false);
		cursorContext.closePath();
		cursorContext.stroke();	
		cursorContext.beginPath();
		cursorContext.moveTo(mouseX,mouseY);
		cursorContext.lineTo(clickedMousePosX,clickedMousePosY);
		cursorContext.closePath();
		cursorContext.stroke();	
	}
	
	cursorContext.globalCompositeOperation = "source-in";
	cursorContext.drawImage(dstImage, 0, 0);
}

function convertToBWImage(){
	layerContext.globalCompositeOperation = "source-in";
	layerContext.beginPath();
	layerContext.rect(0, 0, imgWidth, imgHeight);
	layerContext.fillStyle = "white";	
	layerContext.fill();
	layerContext.globalCompositeOperation = "destination-over";
	layerContext.beginPath();
	layerContext.rect(0, 0, imgWidth, imgHeight);
	layerContext.fillStyle = "black";	
	layerContext.fill();
}



function fuseCanvas(){
    layerContext.drawImage(canvas, 0, 0);
}


