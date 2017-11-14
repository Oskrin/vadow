<?php  
	if(!isset($_SESSION)){
	    session_start();        
	}
	include_once('../admin/class.php');
	$class = new constante();

	if(isset($_POST['consultar_login_user'])) {
		// sesion empresa
		/*$res = $class->consulta("SELECT * FROM empresa WHERE estado = '1'");
		while ($row = $class->fetch_array($res)) {
			$_SESSION['empresaVadow'] = array(	'id'=>$row[0], 
												'ruc' => $row[1],
												'razon_social' => $row[2], 
												'nombre_comercial' => $row[3], 
												'actividad_economica' => $row[4], 
												'telefono1' => $row[7],
												'telefono2' => $row[8],
												'ciudad' => $row[9],
												'direccion_matriz' => $row[10],
												'direccion_establecimiento' => $row[11],
												'establecimiento' => $row[12],
												'punto_emision' => $row[13],
												'correo' => $row[14],
												'slogan' => $row[16],
												'imagen' => $row[17]);
		}*/
		// fin

		$resultado = $class->consulta("
										SELECT * FROM usuarios U  
										where U.usuario = '".$_POST['txt_nombre']."' and password = md5('".$_POST['txt_clave']."')");
		

		if($class->num_rows($resultado) == 1) {
			$row = $class->fetch_array($resultado);
			$_SESSION['userVadow'] = array(	'id'=>$row[0], 
										'name' => $row[3]. ' '.$row[4], 
										'usuario' => $row[11], 
										'cargo' => $row[10], 
										'imagen' => $row[13]);

			print_r(json_encode(array('status' => 'ok', 'id' => $row[0], 'name' => $row[3]. ' '.$row[4] , 'usuario' => $row[11], 'imagen' => $row[13])));
		} else {
			print_r(json_encode(array('status' => 'error', 'problem' => 'usuario invalido')));
		}		
	}
?>


