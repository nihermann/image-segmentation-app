<?php    
	$sceneName = $_POST['sceneName'];
	$userName = $_POST['userName'];
	$directory = $_POST['directory'];
	if(is_dir($directory . $userName . '/' . $sceneName))
		echo "true";
	else
		echo "false";
	// echo 'outputs/' . $userName . '/' . $sceneName;
?> 