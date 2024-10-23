<?php    
	define('UPLOAD_DIR', 'outputs/');
	$img = $_POST['imgBase64'];
	$sceneName = $_POST['sceneName'];
	$userName = $_POST['userName'];
	$directory = $_POST['directory'];
	$level = $_POST['level'];
	
	
	// echo getcwd();
	// $myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
	// fwrite($myfile, $sceneName);
	// fclose($myfile);
	
	// $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator('outputs/a/'));

	// foreach($iterator as $item) {
		// chmod($item, 0777);
	// }
	
	
	$old = umask(0); 
	mkdir(getcwd() . "/" . $directory, 0777);
	mkdir(getcwd() . "/" . $directory . $userName, 0777);
	mkdir(getcwd() . "/" . $directory . $userName . '/' . $sceneName, 0777);
	umask($old); 
	
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$file = getcwd() . "/" .  $directory . $userName . '/' . $sceneName . '/' . $level . '.png';
	$success = file_put_contents($file, $data);
	print $success ? $file : 'Unable to save the file.';
?> 