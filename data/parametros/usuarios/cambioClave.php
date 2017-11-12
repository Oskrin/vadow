<?php 
	if(!isset($_SESSION)){
        session_start();        
    }

	include_once('../../../admin/class.php');
	$class = new constante();
	$id = $class->idz();
	$fecha = $class->fecha_hora();	

	$sql = "SELECT * FROM usuarios WHERE id='".$_SESSION['userAccion']['id']."' and password = md5('".$_POST['anterior']."')";

	//echo $sql;
	$sql = $class->consulta($sql);		
	if($class->num_rows($sql) > 0) {		
		$sql = "UPDATE usuarios SET password = md5('".$_POST['nueva']."') where id = '".$_SESSION['userAccion']['id']."'";
		if($class->consulta($sql)){
			echo 1;	//Usuario Modificado			
		}else{
			echo 3;	//Error en la base
		}
	}else{
		echo 2;///clave incorrecta
	}
	
?>