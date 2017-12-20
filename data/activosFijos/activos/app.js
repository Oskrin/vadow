angular.module('vadowApp')	 			
	.controller('activosController', function ($scope, $route, $http) {	
		$scope.$route = $route;
		$scope.buttonText = "Guardar Datos";
		var d = new Date();
		var currDate = d.getDate();
		var currMonth = d.getMonth() + 1;
		var currYear = d.getFullYear();
		var dateStr = currDate + "-" + currMonth + "-" + currYear;

		
		$scope.recipientsList = [];
		$scope.recipientsCuentasList = [];
		$scope.recipientsAdquisicionList = [];
		$scope.recipientsEstadoList = [];

		$scope.soloNumeros = function($event){
	        if(isNaN(String.fromCharCode($event.keyCode))){
	            $event.preventDefault();
	        }
		};
		$scope.valueChanged = function(){
			var temp = ($scope.Activos.txt_5 * 10) / 100;
			$scope.Activos.txt_10 = temp.toFixed(2);
		};			
		$scope.fecthRecipients = function () {
			$http({
		        url: 'data/parametros/usuarios/app.php',
		        method: "POST",
		        data: "tipo=" + "cargarUsuarios",
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    })
		    .then(function(response) {		 		    	
	    		for(var i = 0; i < response.data.length; i++ ){
	    			temp = {
	    				title : response.data[i].nombre,
	    				id : response.data[i].id,	    				
		    		}			    					    	
			    	$scope.recipientsList.push(temp);
		    	}			    	
		    });			
		}
		$scope.fecthRecipientsCuentas = function () {
			$http({
		        url: 'data/parametros/planCuentas/app.php',
		        method: "POST",
		        data: "tipo=" + "cargarPlan",
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    })
		    .then(function(response) {		 		    	
	    		for(var i = 0; i < response.data.length; i++ ){
	    			temp = {
	    				title : response.data[i].nombre,
	    				id : response.data[i].id,	    				
		    		}			    					    	
			    	$scope.recipientsCuentasList.push(temp);
		    	}			    	
		    });			
		}
		$scope.fecthRecipientsAdquisicion = function () {
			$http({
		        url: 'data/parametros/formaAdquisicion/app.php',
		        method: "POST",
		        data: "tipo=" + "adquisicion",
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    })
		    .then(function(response) {		 		    	
	    		for(var i = 0; i < response.data.length; i++ ){
	    			temp = {
	    				title : response.data[i].nombre,
	    				id : response.data[i].id,	    				
		    		}			    					    	
			    	$scope.recipientsAdquisicionList.push(temp);
		    	}			    	
		    });			
		}
		$scope.fecthRecipientsEstado = function () {
			$http({
		        url: 'data/parametros/estadoBien/app.php',
		        method: "POST",
		        data: "tipo=" + "estado",
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    })
		    .then(function(response) {		 		    	
	    		for(var i = 0; i < response.data.length; i++ ){
	    			temp = {
	    				title : response.data[i].nombre,
	    				id : response.data[i].id,	    				
		    		}			    					    	
			    	$scope.recipientsEstadoList.push(temp);
		    	}			    	
		    });			
		}

		$scope.fecthRecipients();
		$scope.fecthRecipientsCuentas();
		$scope.fecthRecipientsAdquisicion();
		$scope.fecthRecipientsEstado();


		$scope.submitForm = function(){
			if ($scope.formActivos.$valid) {				
			 	var data = $.param({
                	codigo: undefinedFunction($scope.Activos.txt_1),
                	nombreActivo: undefinedFunction($scope.Activos.txt_2),
                	descripcion: undefinedFunction($scope.Activos.txt_3),
                	fechaAdquisicion: undefinedFunction($scope.Activos.txt_4),
                	responsable: $("#select_responsable").val(),
                	cuenta: $("#select_cuenta").val(),
                	formaAdquisicion: $("#select_adquisicion").val(),
                	estadoBien: $("#select_estadoBien").val(),
                	costo: $scope.formActivos.txt_5.viewValue,
                	serie: undefinedFunction($scope.Activos.txt_6),
                	modelo: undefinedFunction($scope.Activos.txt_7),
                	marca: undefinedFunction($scope.Activos.txt_8),
                	vidaUtil: $("#txt_9").val(),
                	estado: $("#select_estado").val(),
					tipo: $scope.buttonText
            	});	
            	
				$http({
			        url: 'data/activosFijos/activos/app.php',
			        method: "POST",
			        data: data,
			        headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }			        
			    })
			    .then(function(response) {
			    	if(response.data == 1){			    		
			    		$scope.Activos = {};
			    		$scope.formActivos.$setPristine();			    		
			    		$scope.buttonText = "Guardar Datos";
			    		$("#select_responsable").val("");
				    	$("#select_responsable").trigger('chosen:updated');	
				    	$("#select_cuenta").val("");
				    	$("#select_cuenta").trigger('chosen:updated');	
				    	$("#select_adquisicion").val("");
				    	$("#select_adquisicion").trigger('chosen:updated');	
				    	$("#select_estadoBien").val("");
				    	$("#select_estadoBien").trigger('chosen:updated');	
			    		bootbox.dialog({
							message: "Datos Agregados Correctamente", 
							buttons: {
								"success" : {
									"label" : "Aceptar",
									"className" : "btn-sm btn-primary"
								}
							}
						});
			    	}
			    	else{
			    		if(response.data == 2){	
				    		bootbox.dialog({
								message: "Error! El número de código no se encuentra disponible", 
								buttons: {
									"success" : {
										"label" : "Aceptar",
										"className" : "btn-sm btn-warning"
									}
								}
							});
				    	}else{
				    		bootbox.dialog({
								message: "Error! Al intentar guardar los Datos. Comuniquese con el Administrador", 
								buttons: {
									"danger" : {
										"label" : "Aceptar",
										"className" : "btn-sm btn-danger"
									}
								}
							});
			    		}
			    	}
			    }, 
			    function(response) { // optional
			            // failed
			    });
			}else{
				
			}
		};
		jQuery(function($) {			
			$("#tabActivos").click(function(event) {
				event.preventDefault();  
			});
			var grid_selector = "#table";
		    var pager_selector = "#pager";

		    $('#txt_9, #txt_4').attr('autocomplete','off');

		    $('#txt_9').ace_spinner({value:1,min:1,max:100,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		    //cambiar el tamaño para ajustarse al tamaño de la página
		    $(window).on('resize.jqGrid', function () {
		        $(grid_selector).jqGrid('setGridWidth', $("#tabActivos").width() - 10);
		    });
		    $("#tabActivos").on('shown.bs.tab', function(e) {
				$('.chosen-select').each(function() {
					var $this = $(this);
					$this.next().css({'width': $this.parent().width()});
				});
				if($(e.target).text() == 'Depreciación'){
					generarDepreciacion();
				}
			});		
			
		    //cambiar el tamaño de la barra lateral collapse/expand
		    var parent_column = $(grid_selector).closest('[class*="col-"]');
		    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
		        if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
		            //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
		            setTimeout(function() {
		                $(grid_selector).jqGrid('setGridWidth', parent_column.width());
		            }, 0);
		        }
		    });			    
		    if(!ace.vars['touch']) {			
				$('.chosen-select').chosen({allow_single_deselect:true}); 
				//resize the chosen on window resize		
				$(window)
				.off('resize.chosen')
				.on('resize.chosen', function() {
					$('.chosen-select').each(function() {
						 var $this = $(this);
						 $this.next().css({'width': $this.parent().width()});
					})
				}).trigger('resize.chosen');
				//resize chosen on sidebar collapse/expand
				$(document).on('settings.ace.chosen', function(e, event_name, event_val) {					
					if(event_name != 'sidebar_collapsed') return;
					$('.chosen-select').each(function() {
						 var $this = $(this);
						 $this.next().css({'width': $this.parent().width()});
					});
				});				
			}
			$('#txt_4').datepicker({
	            autoclose: true,
	            format: "dd-mm-yyyy",
	            todayHighlight: true,
	            language: 'es',	            
	            endDate: '1d'
	        }).datepicker();	

		});	
		function generarDepreciacion(){
			if (!$scope.formActivos.$valid) {		
				bootbox.dialog({
					message: "Complete todos los campos antes de continuar", 
					buttons: {
						"danger" : {
							"label" : "Aceptar",
							"className" : "btn-sm btn-danger"
						}
					}
				});		
				$('#tabActivos a[href="#detalles"]').tab('show');
			}else{
				if($scope.buttonText == 'Guardar Datos'){
					$("#tabla_depreciacion tbody ").html("");
					var dateStr = moment($scope.Activos.txt_4, "DD-MM-YYYY");							
					var tiempo = $("#txt_9").val();
					var costo = $scope.Activos.txt_5;
					var residual = $scope.Activos.txt_10;					
					var costoTotal = costo - residual;
					var depreciacionMes = 0;
					var depreciacionAcumulada = 0;
					var valorLibros = costoTotal;
					costoTotal = costoTotal / tiempo;
					costoTotal = costoTotal / 12;
					costoTotal = costoTotal / 30;
					depreciacionMes = costoTotal * 30;

					tiempo = tiempo * 12;///tiempo en meses
					for(var i = 0; i < tiempo; i++){
						depreciacionAcumulada = depreciacionAcumulada + depreciacionMes;
						valorLibros = valorLibros - depreciacionMes;
						//dateStr = moment().add('months',(i + 1)).format('DD-MM-YYYY');
						dateStr = dateStr.add('months',1);						
						$("#tabla_depreciacion tbody ").append("<tr><td>"+ (i + 1)+"</td><td>"+ dateStr.format('DD-MM-YYYY')+"</td><td>"+depreciacionMes.toFixed(2)+"</td><td>"+depreciacionAcumulada.toFixed(2)+"</td><td>"+valorLibros.toFixed(2)+"</td><td>No</td></tr>");
					}
				}
			}
		}
		function undefinedFunction(val){
			if(val == 'undefined'){
				console.log(val)
				return val = '';
			}else{
				return val;
			}
		}	
	})