<?php 
	if(!isset($_SESSION)) {
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
		$resp = "SELECT id FROM usuarios WHERE usuario = '".$_POST['usuario']."'";		
		$resp = $class->consulta($resp);			
		if($class->num_rows($resp) > 0) {		
			echo 2; // USUARIO REPETIDO
		} else {
			$dirFoto = '';

			if(isset($_FILES['file_1'])) {
				$temporal = $_FILES['file_1']['tmp_name'];
	            $extension = explode(".",  $_FILES['file_1']['name']); 
	            $extension = end($extension);                    			            
	            $nombre = $id.".".$extension;
	            $destino = './fotos/'.$nombre;			            
	            $root = getcwd();	
	            if(move_uploaded_file($temporal, $root.$destino)) {
	            	$dirFoto = $destino;
	            }      	
			}

			$resp = "INSERT INTO usuarios VALUES ('".$id."','".$_POST['tipoIdentificacion']."','".$_POST['identificacion']."','".$_POST['nombres']."','".$_POST['apellidos']."','".$_POST['fijo']."','".$_POST['movil']."','".$_POST['direccion']."','".$_POST['correo']."','".$_POST['genero']."','".$_POST['cargo']."','".$_POST['usuario']."','".$pass."','".$dirFoto."','0','".$_POST['estado']."','".$fecha."');";

			if($class->consulta($resp)) {
				echo 1;	// DATOS GUARDADOS
			} else {
				echo 4;	// ERROR EN LA BASE
			}			
		}								
	}

	if ($_POST['tipo'] == "Modificar Datos") {			
		$resp = "SELECT id FROM usuarios WHERE usuario = '".$_POST['usuario']."' AND NOT id = '".$_POST['id']."'";
		$resp = $class->consulta($resp);	
		if($class->num_rows($resp) > 0) {		
			echo 3; // USUARIO REPETIDO		
		} else {

			if(isset($_FILES['file_1'])) {
				$temporal = $_FILES['file_1']['tmp_name'];
	            $extension = explode(".",  $_FILES['file_1']['name']); 
	            $extension = end($extension);                    			            
	            $nombre = $_POST['id'].".".$extension;
	            $destino = './fotos/'.$nombre;			            
	            $root = getcwd();	
	            if(move_uploaded_file($temporal, $root.$destino)) {
	            	$dirFoto = $destino;
	            }      	
			}
			$resp = "UPDATE usuarios SET id_tipo_identificacion = '".$_POST['tipoIdentificacion']."', identificacion = '".$_POST['identificacion']."', nombres_completos = '".$_POST['nombres']."', apellidos_completos = '".$_POST['apellidos']."', telf_fijo = '".$_POST['fijo']."', telf_movil = '".$_POST['movil']."',direccion = '".$_POST['direccion']."', correo = '".$_POST['correo']."', genero = '".$_POST['genero']."', id_cargo = '".$_POST['cargo']."', usuario = '".$_POST['usuario']."', estado = '".$_POST['estado']."'  WHERE id = '".$_POST['id']."'";				
			if($class->consulta($resp)) {
				echo 1;	//Usuario Guardado			
			} else {
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