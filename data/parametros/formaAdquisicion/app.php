<?php 
	if(!isset($_SESSION)) {
        session_start();        
    }  
	
	include_once('../../../admin/class.php');
	$class = new constante();
	$fecha = $class->fecha_hora();

	$data = 0;

	if(isset($_POST['tipo']) == 'adquisicion'){
		$lista = array();
		$sql = "SELECT id,nombre FROM forma_adquisicion where estado = '1' order by id asc";
		$sql = $class->consulta($sql);							
		while ($row = $class->fetch_array($sql)) {
			$lista[] = array('id' => $row[0], 'nombre' => $row[1]);
		}
		print_r(json_encode($lista));
	}else{
		if ($_POST['oper'] == "add") {
			$sql = "SELECT count(*)count FROM forma_adquisicion WHERE nombre = UPPER('".$_POST['nombre']."')";
			$sql = $class->consulta($sql);		
			while ($row = $class->fetch_array($sql)) {
				$data = $row[0];
			}
			if ($data != 0) {
				$data = "2";///REPETIDO
			} else {
				$sql = "INSERT INTO forma_adquisicion (nombre,estado,fecha_creacion) VALUES ('".$_POST['nombre']."','".$_POST['estado']."','".$fecha."');";
				
				if($class->consulta($sql)){
					$data = "1";////DATOS GUARDADOS	
				}else{
					$data = "4";//ERROR EN LA BASE
				}
				
			}
		} else {
		    if ($_POST['oper'] == "edit") {
		    	$sql = "SELECT count(*)count FROM forma_adquisicion WHERE nombre = UPPER('".$_POST['nombre']."') AND id NOT IN ('".$_POST['id']."')";	
				$sql = $class->consulta($sql);			
		    	
				while ($row = $class->fetch_array($sql)) {
					$data = $row[0];
				}

				if ($data != 0) {
				 	$data = "2";///REPETIDO
				} else {		
					$sql = "UPDATE forma_adquisicion SET nombre = '".$_POST['nombre']."', estado = '".$_POST['estado']."' WHERE id = '".$_POST['id']."'";	
					if($class->consulta($sql)){
						$data = "1";///DATOS GUARDADOS
					}else{
						$data = "4";//ERROR EN LA BASE
					}
				}
		    }
		}    
		echo $data;
	}	
?>