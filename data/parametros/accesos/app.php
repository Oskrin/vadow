<?php 
	if(!isset($_SESSION)){
        session_start();        
    }

	include_once('../../../admin/class.php');
	$class = new constante();
	$id = $class->idz();
	$fecha = $class->fecha_hora();
	

	if (isset($_POST['btn_guardar']) == "btn_guardar") {		
		$pass = md5($_POST['clave2']);								
		$resp = "SELECT id FROM user WHERE userName = '".$_POST['nombre_usuario']."'";
		
		$resp = $class->consulta($resp);	
		
		if($class->num_rows($resp) > 0) {		
			echo 3;///Nombre Usuario Repetido		
		}else{
			$resp = "INSERT INTO user VALUES ('".$id."','".$_POST['primer_nombre']."','".$_POST['apellidos']."','".$_POST['nombre_usuario']."','".$_POST['correo']."','".$pass."','".$fecha."','".$_POST['select_nivel']."','".$_POST['select_genero']."');";
			
			if($class->consulta($resp)){
				echo 1;	//Usuario Guardado			
			}else{
				echo 4;	//Error en la base
			}			
		}								
	}

	if (isset($_POST['btn_modificar']) == "btn_modificar") {			
		$resp = "SELECT id FROM user WHERE userName = '".$_POST['nombre_usuario']."' AND NOT id = '".$_POST['id_usuario']."'";
		$resp = $class->consulta($resp);	
		if($class->num_rows($resp) > 0) {		
			echo 3;///Nombre Usuario Repetido		
		}else{
			$resp = "UPDATE user SET firtsName = '".$_POST['primer_nombre']."', lastName = '".$_POST['apellidos']."', userName = '".$_POST['nombre_usuario']."', emailUser = '".$_POST['correo']."', fechaCreacion = '".$fecha."', idNivel = '".$_POST['select_nivel']."', genero = '".$_POST['select_genero']."' WHERE id = '".$_POST['id_usuario']."'";				
			if($class->consulta($resp)){
				echo 1;	//Usuario Guardado			
			}else{
				echo 4;	//Error en la base
			}		
		}							
	}
	
	if (isset($_POST['llenar_nivel'])) {		
		$sql = "SELECT id, nombre FROM nivel order by id asc";
		$sql = $class->consulta($sql);		
		print'<option value=""> </option>';
		while ($row = $class->fetch_array($sql)) {
			print '<option value="'.$row[0].'">'.$row[1].'</option>';
		}
	}
?>