<?php 
	function generarMenu($id){
		include_once('admin/class.php');
		$class = new constante();
		$sql = "select 
			M.id,
			M.nombre,
		    M.titulo,
		    M.icono ,
		    R.id_menu  
		from cargo_rol CR 
		inner join submenu R on CR.id_submenu = R.id
		inner join menu M on M.id = R.id_menu
		where CR.id_cargo = '".$id."' and CR.estado = '1'
		group by M.id, R.id_menu";
		
		$sql = $class->consulta($sql);
		$menu = "";
		while ($row = $class->fetch_array($sql)) {
			$sql_roles = "select M.id, M.nombre, M.titulo, M.icono, R.nombre_rol, R.titulo from cargo_rol CR inner join submenu R on CR.id_submenu = R.id inner join menu M on M.id = R.id_menu where CR.id_cargo = '".$id."' and CR.estado = '1' and R.id_menu = '".$row[4]."'";
			$sql_roles = $class->consulta($sql_roles);
			$temp = "'active:open': ";
			$submenu = "";
			$tt = "";
			while ($row_roles = $class->fetch_array($sql_roles)) {	
				$temp = $temp . '$route.current.activetab == '."'$row_roles[4]'".''. ' || ';
				//$tt =  $route.current.activetab == 'usuarios'
				$submenu = $submenu .'<li ng-class="{active: $route.current.activetab == '."'$row_roles[4]'".' }" class="hover">';
				$submenu = $submenu .'<a href="#!/'.$row_roles[4].'" target="">';
				$submenu = $submenu .'<i class="menu-icon fa fa-caret-right"></i>';
				$submenu = $submenu . utf8_decode($row_roles[5]);
				$submenu = $submenu .'</a>';
				$submenu = $submenu .'<b class="arrow"></b>';
				$submenu = $submenu .'</li>';	
			}
			$temp = substr($temp, 0, -3);						
			$menu = $menu . '<li ng-class="{'.$temp.'}" class="hover">';
			$menu = $menu .	'<a href="#!/" class="dropdown-toggle">';
			$menu = $menu .	'<i class="'.$row[3].'"></i>';
			$menu = $menu .	'<span class="menu-text"> '.utf8_decode($row[2]).' </span>';
			$menu = $menu .	'<b class="arrow fa fa-angle-down"></b>';			
			$menu = $menu .	'</a>';
			$menu = $menu .	'<b class="arrow"></b>';			
			$menu = $menu . '<ul class="submenu">';
			$menu = $menu . $submenu;
			$menu = $menu . '</ul>';
			$menu = $menu .	'</li>';
		}
		echo $menu;
	}

?>