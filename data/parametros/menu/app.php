<?php 
	if(!isset($_SESSION)) {
        session_start();        
    }  
	
	include_once('../../../admin/class.php');
	$class = new constante();
	$id = $class->idz();
	$fecha = $class->fecha_hora();

	$data = 0;

	if ($_POST['oper'] == "add") {
		$sql = "SELECT count(*)count FROM menu WHERE nombre = '".utf8_encode($_POST['nombre'])."'";
		$sql = $class->consulta($sql);		
		while ($row = $class->fetch_array($sql)) {
			$data = $row[0];
		}
		if ($data != 0) {
			$data = "3";
		} else {
			$sql = "SELECT count(*)count FROM menu WHERE titulo = '".utf8_encode($_POST['titulo'])."'";
			$sql = $class->consulta($sql);		
			while ($row = $class->fetch_array($sql)) {
				$data = $row[0];
			}
			if ($data != 0) {
				$data = "2";///NOMBRE REPETIDO
			}else{
				$sql = "INSERT INTO menu VALUES ('".$id."','".utf8_encode($_POST['nombre'])."','".utf8_encode($_POST['titulo'])."','".$_POST['estado']."','".$_POST['icono']."','".$fecha."');";
				//echo $sql;
				if($class->consulta($sql)){
					$data = "1";//DATOS AGREGADOS	
				}else{
					$data = "4";//ERROR EN LA BASE
				}
			}	
		}
	} else {
	    if ($_POST['oper'] == "edit") {
	    	$sql = "SELECT count(*)count FROM menu WHERE nombre = '".utf8_encode($_POST['nombre'])."' AND id NOT IN ('".$_POST['id']."')";	
			$sql = $class->consulta($sql);	
			while ($row = $class->fetch_array($sql)) {
				$data = $row[0];
			}
			if ($data != 0) {				
			 	$data = "2";//NOMBRE REPETIDO
			} else {
				$sql = "SELECT count(*)count FROM menu WHERE titulo = '".utf8_encode($_POST['titulo'])."' AND id NOT IN ('".$_POST['id']."')";	
				$sql = $class->consulta($sql);					    	
				while ($row = $class->fetch_array($sql)) {
					$data = $row[0];
				}
				if ($data != 0) {
				 	$data = "3";//TITULO REPETIDO
				}else{
					$sql = "UPDATE menu SET nombre = '".utf8_encode($_POST['nombre'])."',titulo = '".utf8_encode($_POST['titulo'])."',estado = '".$_POST['estado']."',icono = '".$_POST['icono']."' WHERE id = '".$_POST['id']."'";											
					if($class->consulta($sql)){
						$data = "1";//DATOS AGREGADOS
					}else{
						$data = "4";//ERROR EN LA BASE
					}
				}
			}
	    }
	}    
	echo $data;
?>