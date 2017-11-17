<?php 	
	include_once('../../../admin/class.php');
	$class = new constante();	
	$fecha = $class->fecha_hora();
	$data = 0;

	if(isset($_GET['cargarDatos'])){
		require_once '../../../dist/phpExcel/Classes/PHPExcel.php';
		$resp = "0";
		if($_FILES){
			$file_name = $_FILES['file_1']['name'];
		    $file_size = $_FILES['file_1']['size'];
		    $file_tmp = $_FILES['file_1']['tmp_name'];
		    $file_type = $_FILES['file_1']['type'];
		    $file_ext = explode(".", $_FILES['file_1']['name']); 
		    $extension = end($file_ext);
		    $inputFileType = PHPExcel_IOFactory::identify($file_tmp);
			$objReader = PHPExcel_IOFactory::createReader($inputFileType);
			$objPHPExcel = $objReader->load($file_tmp);
			$sheet = $objPHPExcel->getSheet(0); 
			$highestRow = $sheet->getHighestRow(); 
			$highestColumn = $sheet->getHighestColumn();
			for ($row_excel = 1; $row_excel <= $highestRow; $row_excel++){ 
				$sql = "select id,item, id_bien from  catalogo_bienes where item = '".$sheet->getCell("A".$row_excel)->getValue()."' and id_bien = '".$sheet->getCell("B".$row_excel)->getValue()."'";
				$sql = $class->consulta($sql);		
				if($class->num_rows($sql) > 0) {		
     				while ($row = $class->fetch_array($sql)) {
     					$sql_catalogo = "UPDATE catalogo_bienes set item = '".$sheet->getCell("A".$row_excel)->getValue()."', id_bien = '".$sheet->getCell("B".$row_excel)->getValue()."', descripcion = '".utf8_encode($sheet->getCell("C".$row_excel)->getValue())."', fecha_actualizacion = '".$fecha."' where id = '".$row[0]."'";
     						$class->consulta($sql_catalogo);		
     				}	
     			}else{     				
     				$sql_catalogo = "insert into catalogo_bienes (item, id_bien,descripcion,estado,fecha_creacion,fecha_actualizacion) values ('".$sheet->getCell("A".$row_excel)->getValue()."', '".$sheet->getCell("B".$row_excel)->getValue()."', '".utf8_encode($sheet->getCell("C".$row_excel)->getValue())."','1', '".$fecha."','".$fecha."')";
     				$class->consulta($sql_catalogo);
     			}
     			$resp = '1';	
			}
		    
		}else{
			$resp = "0"; //no existe archivo
		}	

		echo $resp;
	}else{
		if ($_POST['oper'] == "add") {
			$sql = "SELECT count(*)count FROM catalogo_bienes WHERE id_bien = UPPER('".$_POST['id_bien']."')";
			$sql = $class->consulta($sql);
			while ($row = $class->fetch_array($sql)) {
				$data = $row[0];			
			}
			if ($data != 0) {
				$data = "2"; //ID REPETIDO
			} else {
				$sql = "INSERT INTO catalogo_bienes (item,id_bien,descripcion,estado,fecha_creacion,fecha_actualizacion) VALUES ('".$_POST['item']."','".$_POST['id_bien']."','".utf8_encode($_POST['descripcion'])."','".$_POST['estado']."','".$fecha."','".$fecha."')";
				if($class->consulta($sql)) {
					$data = "1"; // DATOS GUARDADOS	
				} else {
					$data = "4"; // ERROR EN LA BASE
				}
			}
			echo $data;
		} else {
		    if ($_POST['oper'] == "edit") {
		    	$sql = "SELECT count(*)count FROM catalogo_bienes WHERE id_bien = UPPER('".$_POST['id_bien']."') AND id NOT IN ('".$_POST['id']."')";	
					$sql = $class->consulta($sql);	
				$sql = $class->consulta($sql);					    	
				while ($row = $class->fetch_array($sql)) {
					$data = $row[0];
				}
				if ($data != 0) {
				 	$data = "2"; // ITEM REPETIDO
				} else {						
					$sql = "UPDATE catalogo_bienes SET item = '".$_POST['item']."',id_bien = '".$_POST['id_bien']."',descripcion = '".$_POST['descripcion']."', estado = '".$_POST['estado']."', fecha_actualizacion  = '".$fecha."' WHERE id = '".$_POST['id']."'";

					if($class->consulta($sql)) {
						$data = "1"; // DATOS GUARDADOS
					} else {
						$data = "4"; // ERROR EN LA BASE
					}					
				}
				echo $data;
		    }
		}
	}

	
?>