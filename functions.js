var refImage = new Image();
var dstImage = new Image();
var imgWidth;
var imgHeight;
var fileName;
var fileNameLayer;
var refDirectory = "stimuli/ref/";
var dstDirectory = "stimuli/dst_layers/";
var scenesListPath = "stimuli/set";
var sessionNumber = 1;

var scenesList;  // list of names in "stimuli/set{sessionNumber}.txt"
var scenesNumber;  // set to the number of files in the scenesList - 1 as we assume the last line is empty
var currentSceneNumber;
var currentSceneName;

var currentLayer = 0;
var totalLayers = 0;
var scenesCounter;
var totalSceneNumberPerUser = 3;

var userName;

var isFlickerActive;
var flickerTime = 0;

var flickerModeOn = true;
var exprimentFinished = false;

var resetCookie = false;

var directory;

var sceneTime = 91;
var currentTime;


function startFlicker()
{
	if(paint)
		return;
	
	if(!isFlickerActive)
	{
		// if(flickerTime != 0)
		document.getElementById('canvasDiv').style.zIndex  = "-1";
		
		// setTimeout(function(){
		// 	document.getElementById('canvasDiv').style.zIndex  = "0";
		// }, flickerTime);
		isFlickerActive = true;
	}
}

function stopFlicker()
{
	if(paint)
		return;
	
	if(isFlickerActive)
	{
		// if(flickerTime != 0)
		document.getElementById('canvasDiv').style.zIndex  = "0";
		
		// setTimeout(function(){
		// 	document.getElementById('canvasDiv').style.zIndex  = "0";
		// }, flickerTime);
		isFlickerActive = false;
	}
}

function getRandomSceneName()
{
	var temp = getCookie(userName + "counter");
	if(temp != "")
		scenesCounter = Number(temp);
	
	console.log("Scenes Counter: " + scenesCounter);
	if (scenesCounter == "")
	{		
		console.log("doesn't exist");
		scenesCounter = 1;
		setCookie(userName + "counter", scenesCounter, 360);
	}	
	
	if(scenesCounter > totalSceneNumberPerUser)
	{
		document.getElementById('submit').disabled = true;		
		document.getElementById('progressbar').style.width = '100%';
		return false;
	}
	
	var isExist;
	do
	{
		currentSceneNumber = Math.floor((Math.random() * scenesNumber)); 
		console.log("Current Scene Number: " + currentSceneNumber);
		fileName = scenesList[currentSceneNumber];
		
		console.log(directory);
		
			isExist = $.ajax({
			type: "POST",
			url: "checkIfExist.php",
			async: false,
			data: { 
				sceneName: fileName,
				userName: userName,
				directory: directory				
		  }
		}).done(function(o) {
			// console.log(isExist.responseText)
		});
		
		console.log(fileName);
		console.log(isExist);
	}
	while (isExist.responseText == "true ");	
	
	return true;
}

function getNextLevelScene()
{	
	var directory = dstDirectory + fileName;
	console.log("directory: " + directory);
	var temp = $.ajax({
			type: "POST",
			url: "countFiles.php",
			async: false,
			data: { 
				directory: directory,
			}
		}).done(function(o) {
			// console.log(isExist.responseText)
		});
		
	totalLayers = parseInt(temp.responseText);
	console.log("Total Layers: " + totalLayers);

    currentLayer = currentLayer + 1;  
    fileNameLayer = dstDirectory + fileName + "/" + fileName + "_l" + currentLayer.toString()  + '.png';
    console.log("File Name Layer: " + fileNameLayer);
	console.log("Current Layer: " + currentLayer);
	setNextLevelImage();		
}

function submitResults(){
		
	fuseCanvas();
	saveResults();
	
	scenesCounter = Number(scenesCounter) + 1;
	setCookie("counter", scenesCounter, 360);		
	
	setCookie(userName + "counter", scenesCounter, 360);
	
	location.reload();
}

function readImagesList()
{	
	var temp = getFileFromServer(scenesListPath + String(sessionNumber) + '.txt');	// reads the file at "stimuli/set{sessionNumber}.txt" which is assumed to contain the list of scenes with an empty line at the end
    if (temp === null) {
        console.log("Error occured during loading " + scenesListPath + "from serwer");
    }
    else 
	{
		scenesList = temp.split("\r\n");
		scenesNumber = scenesList.length - 1; //-1 is there to skip the last empty line sceneList file		
    }	
	console.log(temp);
}

function getFileFromServer(url) {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
	var textt = xhr.responseText;
	return textt;
}

function loadImage(){
	refImage.src = refDirectory + fileName + '.png';
	console.log("Load Image.. Ref Image: " + refImage.src);
	refImage.onload = function() { SetValues(); };
    dstImage.src = fileNameLayer;
	console.log("Load Image.. Dst Image: " + dstImage.src);
}

function setDivSizes()
{
	imgWidth = refImage.width;
	imgHeight = refImage.height;
	if(!flickerModeOn){
		document.getElementById('referenceDiv').style.height = imgHeight + "px";
		document.getElementById('referenceDiv').style.width = imgWidth + "px";
		document.getElementById('referenceDiv').style.backgroundImage  = "url(" + refImage.src + ")";
		console.log(document.getElementById('referenceDiv').style.backgroundImage);
		console.log(document.getElementById('referenceDiv').style.backgroundImage);
	}
	document.getElementById('distortionDiv').style.height = imgHeight + "px";
	document.getElementById('distortionDiv').style.width = imgWidth + "px";
	document.getElementById('distortionDiv').style.backgroundImage  = "url(" + dstImage.src + ")";
}

function setNextLevelImage()
{
	document.getElementById('distortionDiv').style.backgroundImage  = "none";
	setTimeout(function(){
		dstImage.src = fileNameLayer;
		console.log("Setting image... Dest Image Path: " + dstImage.src);
		document.getElementById('distortionDiv').style.backgroundImage  = "url(" + dstImage.src + ")";
		console.log("url(" + "./" + fileNameLayer + ")");
		console.log(document.getElementById('distortionDiv').style.backgroundImage);
	}, flickerTime);	
}

function SetValues(){	
	setDivSizes();	
	prepareCanvas();
}

function setUser()
{
	userName = getCookie("user");
	if(userName == "")
	{
		userName = generateUUID(); 
		userName = prompt("Type user name here", generateUUID());
		setCookie("user", userName + String(sessionNumber), 360);
	}
	
	var temp = getCookie(userName + "counter");
	if(temp != "")
		scenesCounter = Number(temp);
	else
		scenesCounter = 1;
		
	
	console.log("User name: " + userName);
	console.log("Scenes Counter: " + scenesCounter);
}

function reload()
{
	loadImage();
	setDivSizes();
	prepareCanvas();
}

function generateUUID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function onClickNextLevel()
{
	if(currentLayer < totalLayers )
		nextLevel();
	else
		submitResults();
}

function nextLevel() {
	
	if(exprimentFinished)
		return;
		
	fuseCanvas();
	saveResults();
	clearCanvas();		
	getNextLevelScene();
	currentTime = sceneTime;
}

function saveResults(){
		
	if(exprimentFinished)
		return;
	
	var imgData = layerContext.getImageData(0, 0, canvasWidth, canvasHeight);
	
	convertToBWImage();
		
	var dataURL = layerCanvas.toDataURL("image/png");		
	console.log(fileName);

	
	
	$.ajax({
	  type: "POST",
	  url: "upload.php",
	  async: false,
	  data: { 
		 imgBase64: dataURL,
		 sceneName: fileName,
		 userName: userName,
		 directory: directory,
		 level: currentLayer.toString()
	  }
	}).done(function(o) {
	  console.log('saved'); 
	});
	
	console.log(directory);	
	console.log(dataURL);

	layerContext.clearRect(0, 0, canvasWidth, canvasHeight);
	layerContext.putImageData(imgData, 0, 0);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function clearCookies() {
	resetCookie = false;
	location.href = location.href.replace("&reset=true", "");
	console.log(location.href);
	setCookie("user", "", 360);
	// location.reload();
}

$( document ).ready(function() {
	
	if(resetCookie)
		clearCookies();	 // clears the "user" cookie
		
	setOutDir();  // creates out dir depending on the mode (flicker or pairwise)
	
	setUser();  // sets user name to cookie ("user") or add an increment to the user name if the user name already exists
	readImagesList(); // reads the list of scenes from the file "stimuli/set{sessionNumber}.txt" and sets the scenesList and scenesNumber variables
	var proceed = getRandomSceneName(); // gets a random scene name from the scenesList and checks if the scene already exists in the out directory and sets the fileName and currentSceneNumber variable
	if(!proceed)
		return;
	getNextLevelScene()
	loadImage();
	
	
	setProgress();
	
	currentTime = sceneTime;
	
    console.log( "ready!" );
});

function setProgress()
{		
	
	var progress = (scenesCounter - 1)/totalSceneNumberPerUser * 100;
	console.log("Scenes Counter: " + scenesCounter);
	console.log("Total Scene Number Per User: " + totalSceneNumberPerUser);
	console.log("Progress: " + progress);
	document.getElementById('progressbar').style.width = String(progress) + '%';
}

function setOutDir()
{
	if(flickerModeOn)
		directory = "outputs_flicker/";
	else
		directory = "outputs_pairwise/"	
}

function myTimer() {
	// if(paint || currentTime == 0)
		// return;
	
	// currentTime = currentTime-1;
	// document.getElementById("timer").innerHTML = currentTime;
}