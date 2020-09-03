<?php
	//base de datos simulada
	$imagenes = [];

	for($i = 1; $i <= 200; $i++){
		array_push($imagenes,[
			"url" => "http://picsum.photos/500?random=".$i
		]);
	}

	//API
	if(isset($_GET["i"]) && $_GET["i"] != ""){
		$indice = intval($_GET["i"]);

		$respuesta = [];

		$limite = $indice + 15 < count($imagenes) ? $indice + 15 : count($imagenes);

		for($i = $indice; $i < $limite; $i++){
			array_push($respuesta,$imagenes[$i]);
		}

		echo json_encode($respuesta);
	}
?>