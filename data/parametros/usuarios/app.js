angular.module('vadowApp')	 			
	.controller('usuariosController', function ($scope, $route, $http) {	
		$scope.$route = $route;	
		$scope.buttonText = "Guardar Datos";		
		$scope.recipientsList = [];		
		$scope.recipientsCargos = [];		
		$scope.fecthRecipients = function () {
			$http({
		        url: 'data/parametros/usuarios/app.php',
		        method: "POST",
		        data: "tipo=" + "cargarTipoIdentificacion",
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
		$scope.fecthRecipientsCargos = function () {
			$http({
		        url: 'data/parametros/usuarios/app.php',
		        method: "POST",
		        data: "tipo=" + "cargarCargos",
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    })
		    .then(function(response) {		 		    	
	    		for(var i = 0; i < response.data.length; i++ ){
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
			$( "#tabUsuarios" ).click(function( event ) {
				event.preventDefault();  
			});
			$( "#tabUsuarios" ).on('shown.bs.tab', function (e) {
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
			}
			var grid_selector = "#table";
		    var pager_selector = "#pager";
		    
		    //cambiar el tamaño para ajustarse al tamaño de la página
		    $(window).on('resize.jqGrid', function () {
		        //$(grid_selector).jqGrid( 'setGridWidth', $("#myModal").width());	        
		        $(grid_selector).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);
		    });
		    //cambiar el tamaño de la barra lateral collapse/expand
		    var parent_column = $(grid_selector).closest('[class*="col-"]');
		    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
		        if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
		            //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
		            setTimeout(function() {
		                $(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
		            }, 0);
		        }
		    });		    
		    jQuery(grid_selector).jqGrid({	        
		        datatype: "xml",
		        url: 'data/parametros/usuarios/xml_usuarios.php',        		        
		        colNames: ['ID','NOMBRES','APELLIDOS','USUARIO','CORREO','CLAVE','NIVEL','GENERO','DIRECCIÓN','IDIDENTIFICACION','IDENTIFICACION','ESTADO'],
		        colModel:[      
		            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
		            {name:'nombres',index:'firtsName',frozen : true, hidden: false, align:'left',search:true,width: ''},
		            {name:'apellidos',index:'lastName',frozen : true, hidden: false, align:'left',search:true,width: ''},		            
		            {name:'usuario',index:'usuario',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'correo',index:'correo',frozen : true, hidden: false, align:'left',search:false,width: ''},		            
		            {name:'clave',index:'clave',frozen : true, hidden: true, align:'left',search:false,width: ''},
		            {name:'idNivel',index:'idNivel',frozen : true, hidden: true, align:'left',search:false,width: ''},		            
		            {name:'genero',index:'genero',frozen : true, hidden: true, align:'left',search:false,width: ''},
		            {name:'direccion',index:'direccion',frozen : true, hidden: true, align:'left',search:false,width: ''},
		            {name:'idTipoIdentificacion',index:'idTipoIdentificacion',frozen : true, hidden: true, align:'left',search:false,width: ''},
		            {name:'identificacion',index:'identificacion',frozen : true, hidden: true, align:'left',search:false,width: ''},
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
		        //altRows: true,
		        //multiselect: false,
		        //multiboxonly: true,
		        viewrecords : true,
		        loadComplete : function() {
		            var table = this;
		            setTimeout(function(){
		                styleCheckbox(table);
		                updateActionIcons(table);
		                updatePagerIcons(table);
		                enableTooltips(table);
		            }, 0);
		        },
		        ondblClickRow: function(rowid) {     	            	            
		            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
	            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);	 	            	        	
	            	$scope.Usuarios = {
			    		txt_2 : ret.identificacion,
			    		txt_3 : ret.nombres,
			    		txt_4 : ret.apellidos,
			    		txt_5 : ret.usuario,
						txt_6 : ret.correo,
						txt_7 : ret.direccion,	
						txt_id : ret.id,
						txt_verificador : ret.txt_verificador,
			    	}			    		            	
	            	$("#selectTipoIdentificacion").val(ret.idTipoIdentificacion);
	            	$("#selectTipoIdentificacion").trigger("chosen:updated");
	            	$("#selectGenero").val(ret.genero);
	            	$("#selectGenero").trigger("chosen:updated");
	            	$("#selectCargo").val(ret.idNivel);
	            	$("#selectCargo").trigger("chosen:updated");	            	          	
		            $('#myModal').modal('hide'); 
		            $scope.buttonText = "Modificar Datos"; 
		            $scope.$apply();
		            //console.log($scope.Usuarios)
		        },			        
		        caption: "LISTA USUARIOS"
		    });	
		    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto		    
		    function aceSwitch( cellvalue, options, cell ) {
		        setTimeout(function(){		        	
		            $(cell) .find('input[type=checkbox]')
		            .addClass('ace ace-switch ace-switch-5')
		            .after('<span class="lbl"></span>');
		        }, 0);
		    }	   	   
		    jQuery(grid_selector).jqGrid('navGrid',pager_selector,{   
		        edit: false,
		        editicon : 'ace-icon fa fa-pencil blue',
		        add: false,
		        addicon : 'ace-icon fa fa-plus-circle purple',
		        del: false,
		        delicon : 'ace-icon fa fa-trash-o red',
		        search: false,
		        searchicon : 'ace-icon fa fa-search orange',
		        refresh: false,
		        refreshicon : 'ace-icon fa fa-refresh green',
		        view: false,
		        viewicon : 'ace-icon fa fa-search-plus grey'
		    })	    
		    function style_edit_form(form) {
				//enable datepicker on "sdate" field and switches for "stock" field
				form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
				
				form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');
						   //don't wrap inside a label element, the checkbox value won't be submitted (POST'ed)
						  //.addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');								
				//update buttons classes
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
				var replacement = 
				{
					'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
					'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
					'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
					'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
				};
				$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
					var icon = $(this);
					var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
					
					if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
				})
			}		
			function enableTooltips(table) {
				$('.navtable .ui-pg-button').tooltip({container:'body'});
				$(table).find('.ui-pg-div').tooltip({container:'body'});
			}		
			//var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');		
			$(document).one('ajaxloadstart.page', function(e) {
				$.jgrid.gridDestroy(grid_selector);
				$('.ui-jqdialog').remove();
			});					
		});			    	   	
		$scope.submitForm = function(){ 						
			if ($scope.formUsuarios.$valid) {							
			 	var data = $.param({
			 		tipoIdentificacion: $("#selectTipoIdentificacion").val(),
			 		genero: $("#selectGenero").val(),
			 		cargo: $("#selectCargo").val(),
			 		identificacion: undefinedFunction($scope.Usuarios.txt_2),
			 		nombres: undefinedFunction($scope.Usuarios.txt_3),
			 		apellidos: undefinedFunction($scope.Usuarios.txt_4),
                	usuario: undefinedFunction($scope.Usuarios.txt_5),
                	correo: undefinedFunction($scope.Usuarios.txt_6),
                	direccion: undefinedFunction($scope.Usuarios.txt_7),
                	clave: undefinedFunction($scope.Usuarios.txt_8),
                	confirmarClave: undefinedFunction($scope.Usuarios.txt_9),
                	id : undefinedFunction($scope.Usuarios.txt_id),
					verificador : undefinedFunction($scope.Usuarios.txt_verificador),	
					estado : $("#selectEstado").val(),	
					tipo: $scope.buttonText
            	});	
            	
				$http({
			        url: 'data/parametros/usuarios/app.php',
			        method: "POST",
			        data: data,
			        headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }			        
			    })
			    .then(function(response) {			    				    
			    	if(response.data == 1){
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
			    	}
			    	else{
			    		if(response.data == 2){
			    			bootbox.dialog({
								message: "Error.. El nombre de usuario ya existe ingrese nuevamente", 
								buttons: {
									"warning" : {
										"label" : "Aceptar",
										"className" : "btn-sm btn-warning"
									}
								}
							});	
							$scope.Usuarios = {};
				    		$scope.formUsuarios.$setPristine();
				    		$scope.buttonText = "Guardar Datos";
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
							$scope.Usuarios = {};
				    		$scope.formUsuarios.$setPristine();
				    		$scope.buttonText = "Guardar Datos";				    		
						}							    		
			    	}
			    	$('#table').trigger( 'reloadGrid' );	
			    }, 
			    function(response) { // optional
			            // failed
			    });
			}else{
				
			}
		};		
		function undefinedFunction(val){
			if(val == 'undefined'){
				console.log(val)
				return val = '';
			}else{
				return val;
			}
		}					
		$scope.ventanaBusqueda = function() {
        	$('#myModal').modal('show');	
    	};
	})	
	.directive('chosen', function() {
		var linker = function(scope, element, attr) { 			
			/*scope.$watch(attr.ngModel, function(oldVal, newVal) {				
            	element.trigger('chosen:updated');
        	});        */
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
			link: function(scope, element, attributes, ngModel){
				ngModel.$validators.compareTo = function(modelValue){
					return modelValue == scope.otherModelValue;
				};
				scope.$watch("otherModelValue", function(){
					ngModel.$validate();
				});
			}
		};
	})	