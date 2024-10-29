<!DOCTYPE html>
<html lang="en">

	<head>
		<title>Painting App</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="html5-canvas-drawing-app.js"></script>  
		<script type="text/javascript" src="functions.js"></script>
		<link rel="stylesheet" href="mystyle.css">
		<?php
			if(isset($_GET["reset"]))
			{
				$reset = $_GET["reset"];
				if($reset == "true")
					echo '<script>var resetCookie = true;</script>';
			}
		?>
		<script>
			
		</script>
		<?php 
			if(isset($_GET["mode"]))
			{
				$mode = $_GET["mode"];
				if($mode != "pairwise"){
					$mode = "flicker";					
					echo '<script>flickerModeOn = true;</script>';
				}
				elseif($mode == "pairwise")
					echo '<script>flickerModeOn = false;</script>';
			}
			else
			{				
				$mode = "pairwise";
			}
		?>
		<?php 
			if(isset($_GET["session"]))
			{
				$session = $_GET["session"];
				echo '<script>sessionNumber =' . $session . ';</script>';
			}
		?>
	</head>

	<body>
		<div class="container-fluid">
			<div id="scrollable" class="row <?php if($mode == "pairwise"){echo 'overflow';}?>">

			<div align="center">
			
				<div id="distortionDiv" class="container-image distort">
					<div id="canvasDiv" class="canvas transparent" style="z-index: 0;"></div>
					<div id="cursorCanvasDiv" class="canvas inverted" style="z-index: 1;"></div>
                    <div id="layerCanvasDiv" class="canvas transparent" style="z-index: 0;"></div>
				</div>
			
				<div id="referenceDiv" class="container-image reference"></div>
			
				<?php 
					if($mode == "pairwise"){
						echo '<div id="referenceDiv" class="container-image reference"></div>';
						
					}
				?>
				
			</div>
				
			</div>
		</div>
		
		<!--<div class="container" align="center">
			<h1 id="timer"><h1>
		</div>-->
		
		<div class="container">
			<div class="progress">
				<div id="progressbar" class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:0%">				
				</div>
			</div>
		</div>
		
		<div class="container">
            <div class="row text-center" style="margin-bottom:5px">
                Hold down <b>D</b> to activate the eraser or <b>F</b> to hide the mask.
            </div>
			<div class="row text-center"></button>
				<div >
					<button class="btn btn-primary" onClick="changeTool('marker')">Brush (B)</button>						
					<button class="btn btn-primary" onClick="changeTool('eraser')">Eraser (E)</button>	
					<button class="btn btn-primary" onClick="toggleLazyMouse()">Toggle lazy mouse (L)</button>		
					<button class="btn btn-primary" onClick="clearCanvas()">Clear painting (Delete)</button>
				</div>
			</div>
		</div>	
		
		<div class="container">
			<div class="row text-center">
				<button class="btn btn-primary" onClick="changeBrushSize(5)">Small size (1)</button>
				<button class="btn btn-primary" onClick="changeBrushSize(10)">Normal size (2)</button>
				<button class="btn btn-primary" onClick="changeBrushSize(20)">Big size (3)</button>
				<button class="btn btn-primary" onClick="changeBrushSize(40)">Huge size (4)</button>
			</div>
			<div class="row text-center" style="margin-top:5px";>
				You can also change brush size with <b>the mouse wheel</b> or key shortcuts: <b>-/+</b>.
				<?php if($mode == "flicker"){
					echo '<br>To flicker between images press <b>f</b> key.';
				} ?>
			</div>
		</div>
		
		<div class="container">
			<div class="row text-center">
				<button class="btn btn-primary btn-block" id="submit" onClick="onClickNextLevel()">Proceed (P)</button>
				<!-- <button class="btn btn-danger btn-block" id="newUser" onClick="clearCookies()">New user</button> -->					
			</div>
		</div>
		

	</body>
</html>
