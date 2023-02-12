<?php

	
	$url= "http://localhost:3030/api/v1/recomendPoi/" . $_REQUEST['id'];

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
