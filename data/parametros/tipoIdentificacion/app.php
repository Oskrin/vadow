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
		$sql = "SELECT count(*)count FROM tipo_identificacion WHERE codigo = UPPER('".$_POST['codigo']."')";
		$sql = $class->consulta($sql);

		while ($row = $class->fetch_array($sql)) {
			$data = $row[0];
		}

		if ($data != 0) {
			$data = "2"; // CODIGO REPETIDO
		} else {
			$sql = "SELECT count(*)count FROM tipo_identificacion WHERE nombre = UPPER('".$_POST['nombre']."')";
			$sql = $class->consulta($sql);

			while ($row = $class->fetch_array($sql)) {
				$data = $row[0];
			}
			
			if ($data != 0) {
				$data = "3"; // NOMBRE REPETIDO
			} else {
				$sql = "INSERT INTO tipo_identificacion VALUES ('".$id."','".$_POST['codigo']."','".$_POST['nombre']."','0', '".$_POST['estado']."','".$fecha."');";

				if($class->consulta($sql)) {
					$data = "1"; // DATOS AGREGADOS	
				} else {
					$data = "4"; // ERROR EN LA BASE
				}				
			}
		}
	} else {
	    if ($_POST['oper'] == "edit") {
	    	$sql = "SELECT count(*)count FROM tipo_identificacion WHERE codigo = UPPER('".$_POST['codigo']."') AND id NOT IN ('".$_POST['id']."')";
	    	$sql = $class->consulta($sql);	

			while ($row = $class->fetch_array($sql)) {
				$data = $row[0];
			}

			if ($data != 0) {
			 	$data = "2"; // CODIGO REPETIDO
			} else {
				$sql = "SELECT count(*)count FROM tipo_identificacion WHERE nombre = UPPER('".$_POST['nombre']."') AND id NOT IN ('".$_POST['id']."')";
		    	$sql = $class->consulta($sql);

				while ($row = $class->fetch_array($sql)) {
					$data = $row[0];
				}

				if ($data != 0) {
				 	$data = "3"; // NOMBRE REPETIDO
				} else {
					$sql = "UPDATE tipo_identificacion SET codigo = '".$_POST['codigo']."',nombre = '".$_POST['nombre']."', estado = '".$_POST['estado']."' WHERE id = '".$_POST['id']."'";

					if($class->consulta($sql)) {
						$data = "1"; // DATOS AGREGADOS
					} else {
						$data = "4"; // ERROR EN LA BASE
					}
		    	}
			}
	    }
	}

	echo $data;
?>