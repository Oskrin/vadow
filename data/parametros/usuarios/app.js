angular.module('vadowApp')			
	.controller('usuariosController', function($scope, $route, $http) {	
		$scope.$route = $route;
		var formdata = new FormData();
		$("#file_1").ace_file_input('reset_input');
		$scope.buttonText = "Guardar Datos";			
		$scope.recipientsList = [];		
		$scope.recipientsCargos = [];
		$scope.filepreview =  'data/parametros/usuarios/fotos/default.jpg';

		$scope.soloNumeros = function($event) {
	        if(isNaN(String.fromCharCode($event.keyCode))) {
	            $event.preventDefault();
	        }
		};

		$scope.fecthRecipients = function() {
			$http({
		        url: 'data/parametros/usuarios/app.php',
		        method: "POST",
		        data: "tipo=" + "cargarTipoIdentificacion",
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    })
		    .then(function(response) {		 		    	
	    		for(var i = 0; i < response.data.length; i++) {
	    			temp = {
	    				title : response.data[i].nombre,
	    				id : response.data[i].id,	    				
		    		}			    					    	
			    	$scope.recipientsList.push(temp);
		    	}			    	
		    });			
		}

		$scope.fecthRecipientsCargos = function() {
			$http({
		        url: 'data/parametros/usuarios/app.php',
		        method: "POST",
		        data: "tipo=" + "cargarCargos",
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    })
		    .then(function(response) {		 		    	
	    		for(var i = 0; i < response.data.length; i++) {
	    			temp = {
	    				title : response.data[i].nombre,
	    				id : response.data[i].id,	    				
		    		}			    					    	
			    	$scope.recipientsCargos.push(temp);
		    	}			    	
		    });			
		}

		$scope.fecthRecipients();				
		$scope.fecthRecipientsCargos();				
		
		jQuery(function($) {				
			$( "#tabUsuario" ).click(function(event) {
				event.preventDefault();  
			});
			$( "#tabUsuario" ).on('shown.bs.tab', function(e) {
				$('.chosen-select').each(function() {
					var $this = $(this);
					$this.next().css({'width': $this.parent().width()});
				})	
			});			
			$('[data-toggle="tooltip"]').tooltip(); 			
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
					})
				});	

				$('#file_1').ace_file_input({
					no_file:'Selecione un archivo ...',					    
					btn_choose:'Selecionar',
					btn_change:'Cambiar',
					droppable:false,
					//onchange:null,
					maxSize: 10000000, //~100 KB
				    allowExt:  ['jpg', 'jpeg', 'png', 'gif', 'tif', 'tiff', 'bmp'],
				    allowMime: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/tif', 'image/tiff', 'image/bmp'],
					thumbnail:false, //| true | large
					//whitelist:'gif|png|jpg|jpeg'
					//blacklist:'exe|php'
					//onchange:''
				})				
			}
			var grid_selector = "#table";
		    var pager_selector = "#pager";
		    $(".remove").on('click',function(){
		    	$scope.filepreview = 'data/parametros/usuarios/fotos/default.jpg';
		    	$scope.$apply();

		    });
		    
		    //cambiar el tamaño para ajustarse al tamaño de la página
		    $(window).on('resize.jqGrid', function () {
		        //$(grid_selector).jqGrid( 'setGridWidth', $("#myModal").width());	        
		        $(grid_selector).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);
		    });
		    //cambiar el tamaño de la barra lateral collapse/expand
		    var parent_column = $(grid_selector).closest('[class*="col-"]');
		    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
		        if(event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
		            //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
		            setTimeout(function() {
		                $(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
		            }, 0);
		        }
		    });

		    jQuery(grid_selector).jqGrid({	        
		        datatype: "xml",
		        url: 'data/parametros/usuarios/xml_usuarios.php',        		        
		        colNames: ['ID','IDIDENTIFICACION','IDENTIFICACIÓN','NOMBRES','APELLIDOS','FIJO','MOVIL','DIRECCIÓN','CORREO','GENERO','CARGO','USUARIO','CLAVE','FOTO','VERIFICADOR','ESTADO'],
		        colModel:[      
		            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
		            {name:'id_tipo_identificacion',index:'id_tipo_identificacion',frozen: true, hidden: true, align:'left',search: false,width: ''},
		            {name:'identificacion',index:'identificacion',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'nombres',index:'nombres',frozen : true, hidden: false, align:'left',search:true,width: ''},
		            {name:'apellidos',index:'apellidos',frozen : true, hidden: false, align:'left',search:true,width: ''},
		            {name:'fijo',index:'fijo',frozen : true, hidden: true, align:'left',search:true,width: ''},
		            {name:'movil',index:'movil',frozen : true, hidden: false, align:'left',search:true,width: ''},
		            {name:'direccion',index:'direccion',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'correo',index:'correo',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'genero',index:'genero',frozen : true, hidden: true, align:'left',search:false,width: ''},
		            {name:'id_cargo',index:'id_cargo',frozen : true, hidden: true, align:'left',search:false,width: ''},		            
		            {name:'usuario',index:'usuario',frozen : true, hidden: false, align:'left',search:false,width: ''},		            
		            {name:'clave',index:'clave',frozen : true, hidden: true, align:'left',search:false,width: ''},
		            {name:'foto',index:'foto',frozen : true, hidden: true, align:'left',search:false,width: ''},		            
		            {name:'verificador',index:'verificador',frozen : true, hidden: true, align:'left',search:false,width: ''},
		            {name:'estado',index:'estado',frozen : true, hidden: true, align:'left',search:false,width: ''},
		        ],    
		        rowNum: 10,       
		        width:600,
		        shrinkToFit: true,
		        height:200,
		        rowList: [10,20,30],
		        pager: pager_selector,        
		        sortname: 'id',
		        sortorder: 'asc',
		        altRows: false,
		        multiselect: false,
		        multiboxonly: false,
		        viewrecords: true,
		        loadComplete: function() {
		            var table = this;
		            setTimeout(function() {
		                styleCheckbox(table);
		                updateActionIcons(table);
		                updatePagerIcons(table);
		                enableTooltips(table);
		            }, 0);
		        },
		        ondblClickRow: function(rowid) {     	            	            
		            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
	            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);
	            	$scope.filepreview =  'data/parametros/usuarios/'+ret.foto;

	            	$scope.Usuarios = {
	            		txt_1 : ret.id,
			    		txt_2 : ret.identificacion,
			    		txt_3 : ret.nombres,
			    		txt_4 : ret.apellidos,
			    		txt_5 : ret.fijo,
						txt_6 : ret.movil,
						txt_7 : ret.direccion,
						txt_8 : ret.correo,
						txt_9 : ret.usuario,
						txt_10 : ret.clave,
						txt_11 : ret.clave,	
						txt_verificador : ret.verificador,
			    	}			    		            	
	            	$("#selectTipoIdentificacion").val(ret.id_tipo_identificacion);
	            	$("#selectTipoIdentificacion").trigger("chosen:updated");
	            	$("#selectGenero").val(ret.genero);
	            	$("#selectGenero").trigger("chosen:updated");
	            	$("#selectCargo").val(ret.id_cargo);
	            	$("#selectCargo").trigger("chosen:updated");
	            	$("#selectEstado").val(ret.estado);
	            	$("#selectEstado").trigger("chosen:updated");	            	          	
		            $('#myModal').modal('hide'); 
		            $scope.buttonText = "Modificar Datos"; 
		            $scope.$apply();
		        },			        
		        caption: "LISTA USUARIOS"
		    });

		    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

		    function aceSwitch(cellvalue, options, cell) {
		        setTimeout(function() {		        	
		            $(cell).find('input[type=checkbox]')
		            .addClass('ace ace-switch ace-switch-5')
		            .after('<span class="lbl"></span>');
		        }, 0);
		    }	   	   
		    jQuery(grid_selector).jqGrid('navGrid',pager_selector, {   
		        edit: false,
		        editicon: 'ace-icon fa fa-pencil blue',
		        add: false,
		        addicon: 'ace-icon fa fa-plus-circle purple',
		        del: false,
		        delicon: 'ace-icon fa fa-trash-o red',
		        search: false,
		        searchicon: 'ace-icon fa fa-search orange',
		        refresh: true,
		        refreshicon: 'ace-icon fa fa-refresh green',
		        view: false,
		        viewicon: 'ace-icon fa fa-search-plus grey'
		    })	    
		    function style_edit_form(form) {
				form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
				form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');

				var buttons = form.next().find('.EditButton .fm-button');
				buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
				buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
				buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')
				
				buttons = form.next().find('.navButton a');
				buttons.find('.ui-icon').hide();
				buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
				buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');		
			}		
			function style_delete_form(form) {
				var buttons = form.next().find('.EditButton .fm-button');
				buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
				buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
				buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
			}			
			function style_search_filters(form) {
				form.find('.delete-rule').val('X');
				form.find('.add-rule').addClass('btn btn-xs btn-primary');
				form.find('.add-group').addClass('btn btn-xs btn-success');
				form.find('.delete-group').addClass('btn btn-xs btn-danger');
			}
			function style_search_form(form) {
				var dialog = form.closest('.ui-jqdialog');				
				var buttons = dialog.find('.EditTable')
				buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
				buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
				buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
			}			
			function beforeDeleteCallback(e) {
				var form = $(e[0]);
				if(form.data('styled')) return false;
				
				form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
				style_delete_form(form);
				
				form.data('styled', true);
			}			
			function beforeEditCallback(e) {
				var form = $(e[0]);
				form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
				style_edit_form(form);
			}		
			function styleCheckbox(table) {
			}		
			function updateActionIcons(table) {
			}						
			function updatePagerIcons(table) {
				var replacement = {
					'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
					'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
					'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
					'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
				};
				$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function() {
					var icon = $(this);
					var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
					
					if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
				})
			}		
			function enableTooltips(table) {
				$('.navtable .ui-pg-button').tooltip({container:'body'});
				$(table).find('.ui-pg-div').tooltip({container:'body'});
			}		
	
			$(document).one('ajaxloadstart.page', function(e) {
				$.jgrid.gridDestroy(grid_selector);
				$('.ui-jqdialog').remove();
			});					
		});

		$scope.getFiles = function($files, $val) {	    		
        	angular.forEach($files, function(value, key, name) {           		            	
            	formdata.append($val, value);
        	});
    	};

		$scope.submitForm = function() {
			formdata.append('id', undefinedFunction($scope.Usuarios.txt_1));
			formdata.append('tipoIdentificacion', undefinedFunction($("#selectTipoIdentificacion").val()));
			formdata.append('identificacion', undefinedFunction($scope.Usuarios.txt_2));
			formdata.append('nombres', undefinedFunction($scope.Usuarios.txt_3));
			formdata.append('apellidos', undefinedFunction($scope.Usuarios.txt_4));
			formdata.append('fijo', undefinedFunction($scope.Usuarios.txt_5));
			formdata.append('movil', undefinedFunction($scope.Usuarios.txt_6));
			formdata.append('direccion', undefinedFunction($scope.Usuarios.txt_7));
			formdata.append('correo', undefinedFunction($scope.Usuarios.txt_8));
			formdata.append('genero', undefinedFunction($("#selectGenero").val()));
			formdata.append('cargo', undefinedFunction($("#selectCargo").val()));
			formdata.append('usuario', undefinedFunction($scope.Usuarios.txt_9));
			formdata.append('clave', undefinedFunction($scope.Usuarios.txt_10));
			formdata.append('confirmarClave', undefinedFunction($scope.Usuarios.txt_11));
			formdata.append('verificador', undefinedFunction($scope.Usuarios.txt_verificador));
			formdata.append('estado', undefinedFunction($("#selectEstado").val()));
			formdata.append('tipo', $scope.buttonText);
			$("#file_1").ace_file_input('reset_input');
			$scope.Usuarios.name = {};

			if ($scope.formUsuarios.$valid) {            	
				$http({
			        url: 'data/parametros/usuarios/app.php',
			        method: "POST",
			        data: formdata,
			        headers: {
                        'Content-Type': undefined
                    }			        
			    })
			    .then(function(response) {
			    	formdata = new FormData();

			    	if(response.data == 1) {
			    		$scope.Usuarios = {};
			    		$scope.formUsuarios.$setPristine();
			    		$scope.buttonText = "Guardar Datos";
			    		bootbox.dialog({
							message: "Datos Agregados Correctamente", 
							buttons: {
								"success" : {
									"label" : "Aceptar",
									"className" : "btn-sm btn-primary"
								}
							}
						});										
			    	} else {
			    		if(response.data == 2) {
			    			bootbox.dialog({
								message: "Error.. El nombre de usuario ya existe ingrese uno nuevo", 
								buttons: {
									"warning" : {
										"label" : "Aceptar",
										"className" : "btn-sm btn-warning"
									}
								}
							});	
							// $scope.Usuarios = {};
							$scope.Usuarios.txt_9 = "";
				    		$scope.formUsuarios.$setPristine();
				    		$scope.buttonText = "Guardar Datos";
			    		} else {				    			
				    		bootbox.dialog({
								message: "Error! Al intentar guardar los Datos. Comuniquese con el Administrador", 
								buttons: {
									"danger" : {
										"label" : "Aceptar",
										"className" : "btn-sm btn-danger"
									}
								}
							});	
							// $scope.Usuarios = {};
				    		$scope.formUsuarios.$setPristine();
				    		$scope.buttonText = "Guardar Datos";				    		
						}							    		
			    	}
			    	$('#table').trigger('reloadGrid');
			    	$scope.filepreview = 'data/parametros/usuarios/fotos/default.jpg';		    			
			    }, 
			    function(response) { 
			        
			    });
			} else {
				formdata = new FormData();	
			}
		};		
		function undefinedFunction(val) {
			if(val == 'undefined') {
				return val = '';
			} else {
				return val;
			}
		}					
		$scope.ventanaBusqueda = function() {
        	$('#myModal').modal('show');	
    	};
	})	
	.directive('chosen', function() {
		var linker = function(scope, element, attr) {
        	scope.$watch(attr.ngModel, function() {        		
            	element.trigger('chosen:updated');
        	});	
	        element.chosen();	        
	    };
	    return {
	        restrict: 'A',
	        link: linker
	    };
	})
	.directive('compareTo', function() {
		return {
			require: "ngModel",
			scope:{
				otherModelValue : "=compareTo"
			},
			link: function(scope, element, attributes, ngModel) {
				ngModel.$validators.compareTo = function(modelValue) {
					return modelValue == scope.otherModelValue;
				};
				scope.$watch("otherModelValue", function() {
					ngModel.$validate();
				});
			}
		};
	})	