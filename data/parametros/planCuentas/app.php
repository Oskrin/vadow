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
			for ($row_excel = 2; $row_excel <= $highestRow; $row_excel++){ 
				$sql = "select id,codigo,cuenta,nivel,debito,credito,devengado,cobrado from  plan_cuentas where codigo = '".$sheet->getCell("A".$row_excel)->getValue()."'";
				$sql = $class->consulta($sql);		
				if($class->num_rows($sql) > 0) {		
     				while ($row = $class->fetch_array($sql)) {
     					$sql_catalogo = "UPDATE plan_cuentas set codigo = '".$sheet->getCell("A".$row_excel)->getValue()."', cuenta = '".$sheet->getCell("B".$row_excel)->getValue()."', nivel = '".utf8_encode($sheet->getCell("C".$row_excel)->getValue())."',debito = '".utf8_encode($sheet->getCell("D".$row_excel)->getValue())."', credito = '".utf8_encode($sheet->getCell("E".$row_excel)->getValue())."', devengado = '".utf8_encode($sheet->getCell("F".$row_excel)->getValue())."', cobrado = '".utf8_encode($sheet->getCell("G".$row_excel)->getValue())."',  fecha_actualizacion = '".$fecha."' where id = '".$row[0]."'";
     						$class->consulta($sql_catalogo);		
     				}	
     			}else{     				
     				$sql_catalogo = "insert into plan_cuentas (codigo, cuenta, nivel, debito, credito, devengado, cobrado, fecha_creacion, estado, fecha_actualizacion) values ('".utf8_encode($sheet->getCell("A".$row_excel)->getValue())."', '".utf8_encode($sheet->getCell("B".$row_excel)->getValue())."', '".utf8_encode(utf8_encode($sheet->getCell("C".$row_excel)->getValue()))."','".utf8_encode(utf8_encode($sheet->getCell("D".$row_excel)->getValue()))."', '".utf8_encode(utf8_encode($sheet->getCell("E".$row_excel)->getValue()))."', '".utf8_encode(utf8_encode($sheet->getCell("F".$row_excel)->getValue()))."', '".utf8_encode(utf8_encode($sheet->getCell("G".$row_excel)->getValue()))."','".$fecha."', '1', '".$fecha."')";
     				$class->consulta($sql_catalogo);
     			}
     			$resp = '1';	
			}
		    
		}else{
			$resp = "0"; //no existe archivo
		}	

		echo $resp;
	}else{
		if (isset($_POST['tipo']) == "cargarPlan") {
    		$lista = array();
			$sql = "SELECT id,codigo,cuenta FROM plan_cuentas where estado = '1' order by codigo asc";
			$sql = $class->consulta($sql);							
			while ($row = $class->fetch_array($sql)) {
				$lista[] = array('id' => $row[0], 'nombre' => ($row[1] .' - '.$row[2]));
			}
			print_r(json_encode($lista));
    	}else{
			if ($_POST['oper'] == "add") {
				$sql = "SELECT count(*)count FROM plan_cuentas WHERE codigo = UPPER('".$_POST['codigo']."')";
				$sql = $class->consulta($sql);
				while ($row = $class->fetch_array($sql)) {
					$data = $row[0];			
				}
				if ($data != 0) {
					$data = "2"; //ID REPETIDO
				} else {
					$sql = "INSERT INTO plan_cuentas (codigo, cuenta, nivel, debito, credito, devengado, cobrado, fecha_creacion, estado, fecha_actualizacion) VALUES ('".$_POST['codigo']."','".utf8_encode($_POST['cuenta'])."','".$_POST['nivel']."','".$_POST['debito']."','".$_POST['credito']."','".$_POST['devengado']."','".$_POST['cobrado']."','".$fecha."','".$_POST['estado']."','".$fecha."')";
					//echo $sql;
					if($class->consulta($sql)) {
						$data = "1"; // DATOS GUARDADOS	
					} else {
						$data = "4"; // ERROR EN LA BASE
					}
				}
				echo $data;
			} else {
			    if ($_POST['oper'] == "edit") {
			    	$sql = "SELECT count(*)count FROM plan_cuentas WHERE codigo = UPPER('".$_POST['codigo']."') AND id NOT IN ('".$_POST['id']."')";	
					
					$sql = $class->consulta($sql);					    	
					while ($row = $class->fetch_array($sql)) {
						$data = $row[0];
					}
					if ($data != 0) {
					 	$data = "2"; // ITEM REPETIDO
					} else {						
						$sql = "UPDATE plan_cuentas SET codigo = '".$_POST['codigo']."',cuenta = '".$_POST['cuenta']."',nivel = '".$_POST['nivel']."', debito = '".$_POST['debito']."',credito = '".$_POST['credito']."',devengado = '".$_POST['devengado']."',cobrado = '".$_POST['cobrado']."',  fecha_actualizacion  = '".$fecha."', estado = '".$_POST['estado']."' WHERE id = '".$_POST['id']."'";

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
	}

	
?>