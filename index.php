<?php 
	session_start();
	if(!$_SESSION) {
		header('Location: login/');
	}
?>
<!DOCTYPE html>
<html ng-app="vadowApp" lang="es">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8">
		<title>Vadow</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<!-- bootstrap & fontawesome -->
		<link rel="stylesheet" href="dist/css/bootstrap.min.css" />
		<link rel="stylesheet" href="dist/font-awesome/4.5.0/css/font-awesome.min.css" />
		<!-- page specific plugin styles -->		
		<link rel="stylesheet" href="dist/css/chosen.min.css" />
		<link rel="stylesheet" href="dist/css/jquery-ui.min.css" />				
		<link rel="stylesheet" href="dist/css/ui.jqgrid.min.css" />
		<link rel="stylesheet" href="dist/css/jquery.gritter.css" />
		<link rel="stylesheet" href="dist/css/bootstrap-datepicker3.min.css" />
		<!-- text fonts -->
		<link rel="stylesheet" href="dist/css/fonts.googleapis.com.css" />
		<!-- ace styles -->
		<link rel="stylesheet" href="dist/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
		<link rel="shortcut icon" href="https://www.propiedadintelectual.gob.ec/wp-content/themes/institucion/favicon.ico" type="image/x-icon" /> 
		<!--[if lte IE 9]>
			<link rel="stylesheet" href="dist/css/ace-part2.min.css" class="ace-main-stylesheet" />
		<![endif]-->
		<link rel="stylesheet" href="dist/css/ace-skins.min.css" />
		<link rel="stylesheet" href="dist/css/ace-rtl.min.css" />
		<!--[if lte IE 9]>
		  <link rel="stylesheet" href="dist/css/ace-ie.min.css" />
		<![endif]-->	
		<!-- ace settings handler -->
		<script src="dist/js/ace-extra.min.js"></script>
		<!-- HTML5shiv and Respond.js for IE8 to support HTML5 elements and media queries -->
		<!--[if lte IE 8]>
		<script src="dist/js/html5shiv.min.js"></script>
		<script src="dist/js/respond.min.js"></script>
		<![endif]-->
		<!--angular-->
		<script type="text/javascript" src="dist/js/jquery.min.js"></script>	
		<script src="dist/js/chosen.jquery.min.js"></script>
		<script type="text/javascript" src="dist/angular/angular.min.js"></script>
		<script type="text/javascript" src="dist/angular/angular-route.min.js"></script>	
		<script type="text/javascript" src="dist/js/ngStorage.min.js"></script>	
		<!--controlador de rutas-->
		<script type="text/javascript" src="data/controller.js"></script>		
		<script type="text/javascript" src="data/home/app.js"></script>
		<script type="text/javascript" src="data/inventario/tipoBien/app.js"></script>

		<script type="text/javascript" src="data/parametros/menu/app.js"></script>
	</head>
	<body class="skin-3 no-skin">
		<div id="navbar" class="navbar navbar-default ace-save-state">
			<div class="navbar-container ace-save-state" id="navbar-container">
				<button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
					<span class="sr-only">Toggle sidebar</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<div class="navbar-header pull-left">
					<a href="index.html" class="navbar-brand">
						<small>							
							Vadow Admin
						</small>
					</a>
				</div>
				<div class="navbar-buttons navbar-header pull-right" role="navigation">
					<ul class="nav ace-nav" id="nav">
						<li class="light-blue dropdown-modal">
							<a data-toggle="dropdown" href="#" class="dropdown-toggle" id="nav">
								<img class="nav-user-photo" src=<?php  print_r('data/usuarios/images/'. $_SESSION['user']['imagen']); ?> alt="" />									
								<span class="user-info">
									<small>Bienvenido(a),</small>
									<?php  print_r($_SESSION['user']['name']); ?>									
								</span>
								<i class="ace-icon fa fa-caret-down"></i>
							</a>
							<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
								<li>
									<a href="#">
										<i class="ace-icon fa fa-cog"></i>
										Configuraciones
									</a>
								</li>
								<li>
									<a href="" id="perfil">
										<i class="ace-icon fa fa-user"></i>
										Perfil
									</a>
								</li>
								<li class="divider"></li>
								<li>
									<a href="login/exit.php">
										<i class="ace-icon fa fa-power-off"></i>
										Salir
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div><!-- /.navbar-container -->
		</div>
		<div class="main-container ace-save-state" id="main-container">
			<script type="text/javascript">
				try{ace.settings.loadState('main-container')}catch(e){}
			</script>

			<div id="sidebar" class="sidebar responsive ace-save-state">
				<script type="text/javascript">
					try{ace.settings.loadState('sidebar')}catch(e){}
				</script>
				<div class="sidebar-shortcuts" id="sidebar-shortcuts">
					<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
						<button class="btn btn-success">
							<i class="ace-icon fa fa-signal"></i>
						</button>
						<button class="btn btn-info">
							<i class="ace-icon fa fa-pencil"></i>
						</button>
						<button class="btn btn-warning">
							<i class="ace-icon fa fa-users"></i>
						</button>
						<button class="btn btn-danger">
							<i class="ace-icon fa fa-cogs"></i>
						</button>
					</div>
					<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
						<span class="btn btn-success"></span>
						<span class="btn btn-info"></span>
						<span class="btn btn-warning"></span>
						<span class="btn btn-danger"></span>
					</div>
				</div><!-- /.sidebar-shortcuts -->
				<!--MENU-->
				<ul class="nav nav-list">
				
				</ul><!-- /.nav-list -->
				<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
					<i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
				</div>
			</div>
			<!--container principal-->
			<div class="main-content ng-view">				
			</div><!-- /.main-content -->
			<div class="footer">
				<div class="footer-inner">
					<div class="footer-content">
						<span class="bigger-120">
							<span class="blue bolder">Vadow &copy; 2017-2018
						</span>
						&nbsp; &nbsp;
						<span class="bigger-120">
							<span class="bolder">
							Version 1.0
							</span>
						</span>
					</div>
				</div>
			</div>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
			</a>
		</div><!-- /.main-container -->
	
		<script src="dist/js/angular-chosen.min.js"></script>
		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='dist/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script> 				
		<script src="dist/js/bootbox.min.js"></script>
		<script src="dist/js/bootstrap.min.js"></script>
		<script src="dist/js/gritter.js"></script>
		<script src="dist/js/grid.locale-es.js"></script>
		<script src="dist/js/jquery.jqGrid.min.js"></script>		
		<script src="dist/js/jquery-ui.custom.min.js"></script>		
		<script src="dist/js/ace-elements.min.js"></script>		
		<script src="dist/js/ace.min.js"></script>		
		<script src="dist/js/moment.min.js"></script>
		
		<!--[if lte IE 8]>
		  <script src="dist/js/excanvas.min.js"></script>
		<![endif]-->
		
		
	</body>
</html>