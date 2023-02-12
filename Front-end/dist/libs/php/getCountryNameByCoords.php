<?php

	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	session_start();

	$executionStartTime = microtime(true);
	
	$url= "http://api.geonames.org/countryCodeJSON?lat=" . $_REQUEST['lat'] . "&lng=" . $_REQUEST['lng'] . "&username=mirohhin";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	

	$output['responce'] = $decode;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($decode); 

?>
