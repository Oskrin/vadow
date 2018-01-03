<?php 	
	include_once('../../../admin/class.php');
	include_once('../../../admin/funciones_generales.php');
	$class = new constante();
	$id = $class->idz();
	$fecha = $class->fecha_hora();	
	$data = 0;

	if ($_POST['tipo'] == "Guardar Datos") {	
		$sql = "SELECT count(*)count FROM activo_fijo WHERE codigo = UPPER('".$_POST['codigo']."')";
		$sql = $class->consulta($sql);		
		while ($row = $class->fetch_array($sql)) {
			$data = $row[0];
		}
		if ($data != 0) {
			echo  "2";///REPETIDO
		} else {
			$sql = "INSERT INTO activo_fijo (codigo,descripcion,fecha_adquisicion,responsable,id_cuenta,id_adquisicion,id_estado_bien,costo,numero_serie,modelo,marca,vida,estado,fecha_creacion,nombre_activo,id_bodega,valor_residual,numero_verificador)VALUES ('".$_POST['codigo']."','".$_POST['descripcion']."','".$_POST['fechaAdquisicion']."','".$_POST['responsable']."','".$_POST['cuenta']."','".$_POST['formaAdquisicion']."','".$_POST['estadoBien']."','".$_POST['costo']."','".$_POST['serie']."','".$_POST['modelo']."','".$_POST['marca']."','".$_POST['vidaUtil']."','".$_POST['estado']."','".$fecha."','".$_POST['nombreActivo']."','".$_POST['bodega']."','".$_POST['residual']."','0')";
			//echo $sql;
			if($class->consulta($sql)){
				$id_activo = 0;
				$sql_id = "select id from activo_fijo where codigo = '".$_POST['codigo']."'";
				$sql_id = $class->consulta($sql_id);		
				while ($row_id = $class->fetch_array($sql_id)) {
					$id_activo = $row_id[0];
				}
				///proceso de depreciacion			
				$fecha_2 = strtotime($_POST['fechaAdquisicion']);				
				$tiempo = $_POST['vidaUtil'];
				$costo = $_POST['costo'];
				$residual = $_POST['residual'];
				$depreciacionMes = 0;
				$depreciacionAcumulada = 0;
				$costoTotal = $costo - $residual;
				$valorLibros = $costoTotal;				
				$costoTotal = $costoTotal / $tiempo;
				$costoTotal = $costoTotal / 12;
				$costoTotal = $costoTotal / 30;
				$depreciacionMes = $costoTotal * 30;
				$nuevafecha = $fecha_2 ;
				//number_format($costoTotal, 2, '.', '');;
				$tiempo = $tiempo * 12;///tiempo en meses
				for($i = 0; $i < $tiempo; $i++){
					$depreciacionAcumulada = $depreciacionAcumulada + $depreciacionMes;					
					$valorLibros = $valorLibros - $depreciacionMes;						
					$nuevafecha = strtotime ( '+1 month' , strtotime ( $nuevafecha ) ) ;
					$nuevafecha = date ( 'd-m-Y' , $nuevafecha );
					$sql_depre = "insert into depreciacion (id_activo,fecha,depreciacion,depre_acumulada,valor_libros,estado) values ('".$id_activo."','".$nuevafecha."','".number_format($depreciacionMes, 2, '.', '')."','".number_format($depreciacionAcumulada, 2, '.', '')."','".number_format($valorLibros, 2, '.', '')."','0')";
					if($class->consulta($sql_depre)){
						$data = 1;//DATOS Guardado
					}else{
						$data = 4;
					}
				}				
			}else{
				$data =  4;	//Error en la base
			}	
			echo $data;			
		}		
	}else{
		if ($_POST['tipo'] == "Busqueda") {
			$data = array();			
			$temp = array();
			$sql = "select id,codigo,descripcion,fecha_adquisicion,costo,valor_residual from activo_fijo";
			$sql = $class->consulta($sql);		
			while ($row = $class->fetch_array($sql)) {
				$activo = array();
				$activo[] = $row[0];
				$activo[] = $row[1];
				$activo[] = $row[2];
				$activo[] = $row[3];
				$activo[] = $row[4];
				$activo[] = $row[5];
				$temp[] = $activo;
			}			
			$data = array("data"=> $temp);
			echo json_encode($data);
		}else{
			if ($_POST['tipo'] == "Cargar Datos") {
				$data = array();
				$sql = "select id,codigo,descripcion,fecha_adquisicion,responsable,id_cuenta,id_adquisicion,id_estado_bien,costo,numero_serie, modelo, marca, vida, estado::integer, fecha_creacion, nombre_activo,id_bodega, valor_residual,numero_verificador from activo_fijo where id = '".$_POST['id']."'";
				$sql = $class->consulta($sql);		
				while ($row = $class->fetch_array($sql)) {
					$data[] = $row[0];
					$data[] = $row[1];
					$data[] = $row[2];
					$data[] = $row[3];
					$data[] = $row[4];
					$data[] = $row[5];
					$data[] = $row[6];
					$data[] = $row[7];
					$data[] = $row[8];
					$data[] = $row[9];
					$data[] = $row[10];
					$data[] = $row[11];
					$data[] = $row[12];
					$data[] = $row[13];
					$data[] = $row[14];
					$data[] = $row[15];
					$data[] = $row[16];
					$data[] = $row[17];
					$data[] = $row[18];	 				
				}
				$verificador = numeroVerificador($data[18]);
				$sql = "update activo_fijo set numero_verificador = '".$verificador."'";
				if($class->consulta($sql)){
					$data[18] = $verificador;
					echo json_encode($data);
				}				
			}else{
				if ($_POST['tipo'] == "Modificar Datos") {
					$data = 0;
					$verificador = 0;
					$resp = "SELECT id FROM activo_fijo WHERE codigo = '".$_POST['codigo']."' AND NOT id = '".$_POST['id']."'";
					$resp = $class->consulta($resp);	
					if($class->num_rows($resp) > 0) {		
						$data = 2; // REPETIDO	
					} else {
						$sql = "select numero_verificador from activo_fijo where id = '".$_POST['id']."'";
						$sql = $class->consulta($sql);		
						while ($row = $class->fetch_array($sql)) {
							$verificador = $row[0];
						}
						if($verificador == $_POST['verificador']){
							$sql = "UPDATE activo_fijo set codigo = '".$_POST['codigo']."',descripcion = '".$_POST['descripcion']."',responsable = '".$_POST['responsable']."',id_cuenta = '".$_POST['cuenta']."', id_adquisicion = '".$_POST['formaAdquisicion']."', id_estado_bien = '".$_POST['estadoBien']."', numero_serie = '".$_POST['serie']."', modelo = '".$_POST['modelo']."', marca = '".$_POST['marca']."', estado = '".$_POST['estado']."',nombre_activo = '".$_POST['nombreActivo']."',id_bodega = '".$_POST['bodega']."',numero_verificador = '".$_POST['verificador']."' where id = '".$_POST['id']."'";	
							if($class->consulta($sql)) {		
								$data = 1; // ACTUALIZADO	
							}else{
								$data = 4; //error
							}
						}else{
							$data = 3;///error verificador
						}
					}
					echo $data;
				}else{
					if ($_POST['tipo'] == "cargarDepreciacion") {
						$data = array();						
						$sql = "select fecha, depreciacion,depre_acumulada,valor_libros,estado::integer from depreciacion where id_activo = '".$_POST['id']."'";
						$sql = $class->consulta($sql);		
						while ($row = $class->fetch_array($sql)) {
							$temp = array();
							$temp[] = $row[0];
							$temp[] = $row[1];
							$temp[] = $row[2];
							$temp[] = $row[3];
							$temp[] = $row[4];
							$data[] = $temp;
						}
						echo json_encode($data);
					}else{
						if ($_POST['tipo'] == "atras") {
							$data = 0;
							if($_POST['id'] == 0){
								$sql = "select id from activo_fijo order by id desc limit 1";	
								$sql = $class->consulta($sql);		
								while ($row = $class->fetch_array($sql)) {
									$data = $row[0];
								}
							}else{
								$sql = "select id from activo_fijo where id < '".$_POST['id']."' order by id desc limit 1";
								$sql = $class->consulta($sql);		
								while ($row = $class->fetch_array($sql)) {
									$data = $row[0];
								}
							}							
							echo $data;
						}else{
							if ($_POST['tipo'] == "principio") {
								$data = 0;								
								$sql = "select id from activo_fijo order by id asc limit 1";	
								$sql = $class->consulta($sql);		
								while ($row = $class->fetch_array($sql)) {
									$data = $row[0];
								}														
								echo $data;
							}else{
								if ($_POST['tipo'] == "adelante") {
									$data = 0;
									if($_POST['id'] == 0){
										$sql = "select id from activo_fijo order by id asc limit 1";	
										$sql = $class->consulta($sql);		
										while ($row = $class->fetch_array($sql)) {
											$data = $row[0];
										}
									}else{
										$sql = "select id from activo_fijo where id >'".$_POST['id']."' order by id asc limit 1";
										$sql = $class->consulta($sql);		
										while ($row = $class->fetch_array($sql)) {
											$data = $row[0];
										}
									}							
									echo $data;
								}else{
									if ($_POST['tipo'] == "final") {
										$data = 0;								
										$sql = "select id from activo_fijo order by id desc limit 1";	
										$sql = $class->consulta($sql);		
										while ($row = $class->fetch_array($sql)) {
											$data = $row[0];
										}														
										echo $data;
									}
								}	
							}
						}
					}	
				}
			}	
		}						
		
	}

	
?>