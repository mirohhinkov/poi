<?php

	$post_array = array("id" => $_REQUEST["id"]);

	$ch = curl_init("http://localhost:3030/api/v1/recomend");

	curl_setopt($ch, CURLOPT_POSTFIELDS, $postRequest);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	// curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	// curl_setopt($ch,CURLOPT_POST, true);
	// curl_setopt($ch,CURLOPT_POSTFIELDS, $post_fields);
	// // curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type" => "application/x-www-form-urlencoded; charset=UTF-8"));
	// curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept" => "application/json, text/plain, */*",
	// "Content-Type" => "application/json"));
	// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	// curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	// curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	

	$output["responce"] = $decode;
	
	header("Content-Type: application/json; charset=UTF-8");

	echo json_encode($decode); 

?>
