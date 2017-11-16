<?php 	
	include_once('../../../admin/class.php');
	$class = new constante();
	$id = $class->idz();
	$fecha = $class->fecha_hora();
	$data = 0;

	if ($_POST['oper'] == "add") {
		$sql = "SELECT count(*)count FROM bodega WHERE ubicacion = UPPER('".$_POST['ubicacion']."')";
		$sql = $class->consulta($sql);		
		while ($row = $class->fetch_array($sql)) {
			$data = $row[0];
		}

		if ($data != 0) {
			$data = "2"; //REPETIDO
		} else {
			$sql = "INSERT INTO bodega VALUES ('".$id."','".$_POST['codigo']."','".$_POST['ubicacion']."','".$_POST['estado']."','".$fecha."')";

			if($class->consulta($sql)) {
				$data = "1"; // DATOS GUARDADOS	
			} else {
				$data = "4"; // ERROR EN LA BASE
			}
		}
	} else {
	    if ($_POST['oper'] == "edit") {
	    	$sql = "SELECT count(*)count FROM bodega WHERE ubicacion = UPPER('".$_POST['ubicacion']."') AND id NOT IN ('".$_POST['id']."')";	
			$sql = $class->consulta($sql);			
	    	
			while ($row = $class->fetch_array($sql)) {
				$data = $row[0];
			}

			if ($data != 0) {
			 	$data = "2"; // REPETIDO
			} else {		
				$sql = "UPDATE bodega SET ubicacion = '".$_POST['ubicacion']."', estado = '".$_POST['estado']."', codigo  = '".$_POST['codigo']."' WHERE id = '".$_POST['id']."'";

				if($class->consulta($sql)) {
					$data = "1"; // DATOS GUARDADOS
				} else {
					$data = "4"; // ERROR EN LA BASE
				}
			}
	    }
	}

	echo $data;
?>