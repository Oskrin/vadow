<?php 	
	include_once('../../../admin/class.php');
	$class = new constante();
	$id = $class->idz();
	$fecha = $class->fecha_hora();
	$data = 0;

	if ($_POST['tipo'] == "Guardar Datos") {				
		$id = $class->idz();	
		$sql = "SELECT count(*)count FROM activo_fijo WHERE codigo = UPPER('".$_POST['codigo']."')";
		$sql = $class->consulta($sql);		
		while ($row = $class->fetch_array($sql)) {
			$data = $row[0];
		}
		if ($data != 0) {
			echo  "2";///REPETIDO
		} else {
			$sql = "INSERT INTO activo_fijo VALUES ('".$id."','".$_POST['codigo']."','".$_POST['descripcion']."','".$_POST['fechaAdquisicion']."','".$_POST['responsable']."','".$_POST['cuenta']."','".$_POST['formaAdquisicion']."','".$_POST['estadoBien']."','".$_POST['costo']."','".$_POST['serie']."','".$_POST['modelo']."','".$_POST['marca']."','".$_POST['vidaUtil']."','".$_POST['estado']."','".$fecha."','".$_POST['nombreActivo']."')";		
			//echo $sql;
			if($class->consulta($sql)){
				echo 1;	//DATOS Guardado			
			}else{
				echo 4;	//Error en la base
			}	
		}
		
	}
	
?>