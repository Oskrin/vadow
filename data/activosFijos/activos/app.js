angular.module('vadowApp')	 			
	.controller('activosController', function ($scope, $route, $http) {	
		$scope.$route = $route;
		$scope.buttonText = "Guardar Datos";				
		$scope.recipientsList = [];
		$scope.recipientsCuentasList = [];
		$scope.recipientsAdquisicionList = [];
		$scope.recipientsEstadoList = [];
		$scope.recipientsBodegasList = [];

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
		$scope.fecthRecipientsBodegas = function () {
			$http({
		        url: 'data/inventario/bodegas/app.php',
		        method: "POST",
		        data: "tipo=" + "bodegas",
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    })
		    .then(function(response) {		 		    	
	    		for(var i = 0; i < response.data.length; i++ ){
	    			temp = {
	    				title : response.data[i].nombre,
	    				id : response.data[i].id,	    				
		    		}			    					    	
			    	$scope.recipientsBodegasList.push(temp);
		    	}			    	
		    });			
		}
		function getData(id){			
			$http({
		        url: 'data/activosFijos/activos/app.php',
		        method: "POST",
		        data: "tipo=" + "Cargar Datos"+"&id="+id,
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    })
		    .then(function(response) {	
		    //console.log(response)			        	
	    		if(response['statusText'] == 'OK'){
	    			$scope.Activos = {
			    		txt_0 : response['data'][0],			    	
			    		txt_1 : response['data'][1],	
			    		txt_2 : response['data'][15],	
			    		txt_3 : response['data'][2],	
			    		txt_4 : response['data'][3],	
			    		txt_5 : response['data'][8],	
			    		txt_6 : response['data'][9],
			    		txt_7 : response['data'][10],		
			    		txt_8 : response['data'][11],				    		
			    		txt_10 : response['data'][17],	
			    		txt_verificador : response['data'][18],			    		
			    	}	
			    	$("#txt_9").val(response['data'][12]);
			    	$("#select_responsable").val(response['data'][4]);
	            	$("#select_responsable").trigger("chosen:updated");
	            	$("#select_cuenta").val(response['data'][5]);
	            	$("#select_cuenta").trigger("chosen:updated");
	            	$("#select_adquisicion").val(response['data'][6]);
	            	$("#select_adquisicion").trigger("chosen:updated");
	            	$("#select_estadoBien").val(response['data'][7]);
	            	$("#select_estadoBien").trigger("chosen:updated");
	            	$("#select_bodega").val(response['data'][16]);
	            	$("#select_bodega").trigger("chosen:updated");
	            	$("#select_estado").val(response['data'][13]);
	            	$("#select_estado").trigger("chosen:updated");
		            $scope.buttonText = "Modificar Datos"; 
		            $('#modal-table').modal('hide');		            
		            console.log($scope.formActivos)
		            	            
	    		}else{
	    			bootbox.dialog({
						message: "Error al Cargar los datos. Vuelva a Interntarlo", 
						buttons: {
							"success" : {
								"label" : "Aceptar",
								"className" : "btn-sm btn-danger"
							}
						}
					});
	    		}
		    });		
			
		}

		$scope.fecthRecipients();
		$scope.fecthRecipientsCuentas();
		$scope.fecthRecipientsAdquisicion();
		$scope.fecthRecipientsEstado();
		$scope.fecthRecipientsBodegas();

		$scope.submitForm = function(){
			if ($scope.formActivos.$valid) {	
				//console.log($scope.Activos)			
			 	var data = $.param({
                	codigo: undefinedFunction($scope.Activos.txt_1),
                	nombreActivo: undefinedFunction($scope.Activos.txt_2),
                	descripcion: undefinedFunction($scope.Activos.txt_3),
                	fechaAdquisicion: undefinedFunction($scope.Activos.txt_4),
                	responsable: $("#select_responsable").val(),
                	cuenta: $("#select_cuenta").val(),
                	formaAdquisicion: $("#select_adquisicion").val(),
                	estadoBien: $("#select_estadoBien").val(),
                	bodega: $("#select_bodega").val(),
                	costo: $scope.Activos.txt_5,
                	serie: undefinedFunction($scope.Activos.txt_6),
                	modelo: undefinedFunction($scope.Activos.txt_7),
                	marca: undefinedFunction($scope.Activos.txt_8),
                	vidaUtil: $("#txt_9").val(),
                	estado: $("#select_estado").val(),
                	residual : $scope.Activos.txt_10,
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
				    	$("#select_bodega").val("");
				    	$("#select_bodega").trigger('chosen:updated');	
			    		bootbox.dialog({
							message: "Datos Agregados Correctamente", 
							buttons: {
								"success" : {
									"label" : "Aceptar",
									"className" : "btn-sm btn-primary"
								}
							}
						});
						$("#tabla_depreciacion tbody ").html("");
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

		$scope.ventanaBusqueda = function(){
			$('#modal-table').modal('show');		
		}
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

	        ///datatable
	        var myTable = 
				$('#activos-table')
				//.wrap("<div class='dataTables_borderWrap' />")   //if you are applying horizontal scrolling (sScrollX)
				.DataTable( {
					bAutoWidth: false,
					"aoColumns": [					  
					  {"id":null}, 					  
					  {"codigo":null}, 
					  {"activo":null}, 
					  {"fecha":null,"sClass": "center"}, 
					  {"costo":null,"sClass": "center"}, 
					  {"residual":null,"sClass": "center"}, 
					 
					],	
					"aaSorting": [],
					'language':	{
						"sProcessing":     "Procesando...",
						"sLengthMenu":     "Mostrar _MENU_ registros",
						"sZeroRecords":    "No se encontraron resultados",
						"sEmptyTable":     "Ningún dato disponible en esta tabla",
						"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
						"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros ",						
						"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
						"sInfoPostFix":    "",
						"sSearch":         "Buscar:",
						"sUrl":            "",
						"sInfoThousands":  ",",
						"sLoadingRecords": "Cargando...",
						"oPaginate": {
							"sFirst":    "Primero",
							"sLast":     "Último",
							"sNext":     "Siguiente",
							"sPrevious": "Anterior"
						},
						"oAria": {
							"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
							"sSortDescending": ": Activar para ordenar la columna de manera descendente"
						},
						select: {
				            rows: ""
				        }
					},
					"columnDefs": [{
			                "targets": [ 0 ],
			                "visible": false,
			                "searchable": false,
		            	},
			        ],
					"ajax": {
					    "url": "data/activosFijos/activos/app.php",
					    "type": "POST",
					    "data": {
					    	"tipo": "Busqueda"
					    }
					},
					
					
					//"bProcessing": true,
			        //"bServerSide": true,
			        //"sAjaxSource": "http://127.0.0.1/table.php"	,
			
					//,
					//"sScrollY": "200px",
					//"bPaginate": false,
			
					//"sScrollX": "100%",
					//"sScrollXInner": "120%",
					//"bScrollCollapse": true,
					//Note: if you are applying horizontal scrolling (sScrollX) on a ".table-bordered"
					//you may want to wrap the table inside a "div.dataTables_borderWrap" element
			
					//"iDisplayLength": 50
					select: true					
			    } );	
				$.fn.dataTable.Buttons.defaults.dom.container.className = 'dt-buttons btn-overlap btn-group btn-overlap';
				
				new $.fn.dataTable.Buttons( myTable, {
					buttons: [
					  {
						"extend": "colvis",
						"text": "<i class='fa fa-search bigger-110 blue'></i> <span class='hidden'>Show/hide columns</span>",
						"className": "btn btn-white btn-primary btn-bold",
						columns: ':not(:first):not(:last)'
					  },
					  {
						"extend": "copy",
						"text": "<i class='fa fa-copy bigger-110 pink'></i> <span class='hidden'>Copy to clipboard</span>",
						"className": "btn btn-white btn-primary btn-bold"
					  },
					  {
						"extend": "csv",
						"text": "<i class='fa fa-database bigger-110 orange'></i> <span class='hidden'>Export to CSV</span>",
						"className": "btn btn-white btn-primary btn-bold"
					  },
					  {
						"extend": "excel",
						"text": "<i class='fa fa-file-excel-o bigger-110 green'></i> <span class='hidden'>Export to Excel</span>",
						"className": "btn btn-white btn-primary btn-bold"
					  },
					  {
						"extend": "pdf",
						"text": "<i class='fa fa-file-pdf-o bigger-110 red'></i> <span class='hidden'>Export to PDF</span>",
						"className": "btn btn-white btn-primary btn-bold"
					  },
					  {
						"extend": "print",
						"text": "<i class='fa fa-print bigger-110 grey'></i> <span class='hidden'>Print</span>",
						"className": "btn btn-white btn-primary btn-bold",
						autoPrint: false,
						message: 'This print was produced using the Print button for DataTables'
					  }		  
					]
				} );
				myTable.buttons().container().appendTo( $('.tableTools-container') );
				
				//style the message box
				var defaultCopyAction = myTable.button(1).action();
				myTable.button(1).action(function (e, dt, button, config) {
					defaultCopyAction(e, dt, button, config);
					$('.dt-button-info').addClass('gritter-item-wrapper gritter-info gritter-center white');
				});
				
				
				var defaultColvisAction = myTable.button(0).action();
				myTable.button(0).action(function (e, dt, button, config) {
					
					defaultColvisAction(e, dt, button, config);
					
					
					if($('.dt-button-collection > .dropdown-menu').length == 0) {
						$('.dt-button-collection')
						.wrapInner('<ul class="dropdown-menu dropdown-light dropdown-caret dropdown-caret" />')
						.find('a').attr('href', '#').wrap("<li />")
					}
					$('.dt-button-collection').appendTo('.tableTools-container .dt-buttons')
				});
			
				////
			
				setTimeout(function() {
					$($('.tableTools-container')).find('a.dt-button').each(function() {
						var div = $(this).find(' > div').first();
						if(div.length == 1) div.tooltip({container: 'body', title: div.parent().text()});
						else $(this).tooltip({container: 'body', title: $(this).text()});
					});
				}, 500);
				
				
				
				
				
				myTable.on( 'select', function ( e, dt, type, index ) {
					if ( type === 'row' ) {
						$( myTable.row( index ).node() ).find('input:checkbox').prop('checked', true);
					}
				} );
				myTable.on( 'deselect', function ( e, dt, type, index ) {
					if ( type === 'row' ) {
						$( myTable.row( index ).node() ).find('input:checkbox').prop('checked', false);
					}
				} );
			
			
			
			
				/////////////////////////////////
				//table checkboxes
				$('th input[type=checkbox], td input[type=checkbox]').prop('checked', false);
				
				//select/deselect all rows according to table header checkbox
				$('#activos-table > thead > tr > th input[type=checkbox], #activos-table_wrapper input[type=checkbox]').eq(0).on('click', function(){
					var th_checked = this.checked;//checkbox inside "TH" table header
					
					$('#activos-table').find('tbody > tr').each(function(){
						var row = this;
						if(th_checked) myTable.row(row).select();
						else  myTable.row(row).deselect();
					});
				});
				
				//select/deselect a row when the checkbox is checked/unchecked
				$('#activos-table').on('click', 'td input[type=checkbox]' , function(){
					var row = $(this).closest('tr').get(0);
					if(this.checked) myTable.row(row).deselect();
					else myTable.row(row).select();
				});
			
			
			
				$(document).on('click', '#activos-table .dropdown-toggle', function(e) {
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();
				});

			$('#activos-table tbody').on('dblclick', 'tr', function (e) {				
				var data = myTable.row( this ).data();
				getData(data[0]);        		
				
			} );	
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
				//console.log(val)
				return val = '';
			}else{
				return val;
			}
		}	
	})