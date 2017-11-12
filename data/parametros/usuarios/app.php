<?php 
	if(!isset($_SESSION)){
        session_start();        
    }

	include_once('../../../admin/class.php');
	$class = new constante();
	$id = $class->idz();
	$fecha = $class->fecha_hora();
	
	if ($_POST['tipo'] == "cargarTipoIdentificacion") {				
		$lista = array();
		$sql = "SELECT id,codigo, nombre FROM tipo_identificacion where estado = '1' order by id asc";
		$sql = $class->consulta($sql);							
		while ($row = $class->fetch_array($sql)) {
			$lista[] = array('id' => $row[0], 'nombre' => ($row[1] .' - '.$row[2]));
		}
		print_r(json_encode($lista));
	}	
	if ($_POST['tipo'] == "Guardar Datos") {		
		$pass = md5($_POST['clave']);								
		$resp = "SELECT id FROM usuarios WHERE nombre_usuario = '".$_POST['usuario']."'";		
		$resp = $class->consulta($resp);			
		if($class->num_rows($resp) > 0) {		
			echo 2;///USUARIO REPETIDO
		}else{
			$resp = "INSERT INTO usuarios VALUES ('".$id."','".$_POST['nombres']."','".$_POST['apellidos']."','".$_POST['usuario']."','".$_POST['correo']."','".$pass."','".$_POST['cargo']."','".$_POST['genero']."','".$_POST['direccion']."','".$_POST['tipoIdentificacion']."','".$_POST['identificacion']."','0','".$fecha."','".$_POST['estado']."');";	
			//echo $resp;
			if($class->consulta($resp)){
				echo 1;	//DATOS GUARDADOS
			}else{
				echo 4;	//ERROR EN LA BASE
			}			
		}								
	}

	if ($_POST['tipo'] == "Modificar Datos") {			
		$resp = "SELECT id FROM usuarios WHERE nombre_usuario = '".$_POST['usuario']."' AND NOT id = '".$_POST['id']."'";
		$resp = $class->consulta($resp);	
		if($class->num_rows($resp) > 0) {		
			echo 3;///Nombre Usuario Repetido		
		}else{
			$resp = "UPDATE usuarios SET nombre_completo = '".$_POST['nombres']."', apellido_completo = '".$_POST['apellidos']."', nombre_usuario = '".$_POST['usuario']."', correo = '".$_POST['correo']."',  id_cargo = '".$_POST['cargo']."', genero = '".$_POST['genero']."',direccion = '".$_POST['direccion']."',id_tipo_identificacion = '".$_POST['tipoIdentificacion']."', identificacion = '".$_POST['identificacion']."', estado = '".$_POST['estado']."'  WHERE id = '".$_POST['id']."'";				
			if($class->consulta($resp)){
				echo 1;	//Usuario Guardado			
			}else{
				echo 4;	//Error en la base
			}		
		}							
	}
	
	if ($_POST['tipo'] == "cargarCargos") {		
		$sql = "SELECT id, nombre_cargo FROM cargos order by id asc";
		$sql = $class->consulta($sql);		
		while ($row = $class->fetch_array($sql)) {
			$lista[] = array('id' => $row[0], 'nombre' => $row[1]);
		}
		print_r(json_encode($lista));
	}
?>