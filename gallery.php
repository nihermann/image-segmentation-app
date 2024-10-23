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
		<link rel="stylesheet" href="mystyle.css">
		
		<?php
			$myfile = fopen("./stimuli/scenes.txt", "r") or die("Unable to open file!");
			$temp = fread($myfile,filesize("./stimuli/scenes.txt"));
			fclose($myfile);
			
			$scenesList = explode("\r\n", $temp);
			array_pop($scenesList);
			// var_dump($scenesList);			
		?>
		
	</head>

	<body>
	
		<div class="container-fluid">
			<?php foreach ($scenesList as $scene)
			{
				$fi = new FilesystemIterator('stimuli/dst_layers/' . $scene, FilesystemIterator::SKIP_DOTS);
				$layersNumber = iterator_count($fi);
				echo '<div class = "row">';
					echo '<div class="jumbotron text-center">
						<h2>'. $scene .'</h2>      
					</div>';
					echo '<div class = "col-lg-6">';
						echo '<div class = "text-center">ref_' . $scene . '</div>';
						echo '<img class = "img img-responsive horiontal-margin" src="stimuli/ref/' . $scene . '.png"></img>';
					echo '</div>';
					for ($i = 1; $i <= $layersNumber; $i++) {
						echo '<div class = "col-lg-6">';
							echo '<div class = "text-center">l' . $i . '_' . $scene . '</div>';
							echo '<img class = "img img-responsive horiontal-margin" src="stimuli/dst_layers/' . $scene . '/' . $scene . '_l' . $i . '.png"></img>';
						echo '</div>';
					}
				echo '</div>';
				echo '<br><br><br>';
			}
			?>
		</div>
		
	</body>
	
</html>
