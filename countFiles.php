<?php    
	$directory = $_POST['directory'];
	$fi = new FilesystemIterator($directory, FilesystemIterator::SKIP_DOTS);
	printf("%d", iterator_count($fi));
?> 
