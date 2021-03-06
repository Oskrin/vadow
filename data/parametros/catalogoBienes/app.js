angular.module('vadowApp')	 			
	.controller('catalogoBienesController', function ($scope, $route, $http) {	
		$scope.$route = $route;
			
		jQuery(function($) {			
			$("#loading2").css("display","none");
			$("#tabCatalogoBien").click(function(event) {
				event.preventDefault();  
			});
			$("#file_1").ace_file_input('reset_input');
			var grid_selector = "#table";
		    var pager_selector = "#pager";

		    //cambiar el tamaño para ajustarse al tamaño de la página
		    $(window).on('resize.jqGrid', function () {
		        $(grid_selector).jqGrid('setGridWidth', $("#tabCatalogoBien").width() - 10);
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

		    jQuery(grid_selector).jqGrid({
		        url: 'data/parametros/catalogoBienes/appXml.php',
		        autoencode: false,
		        datatype: "xml",
				height: 320,
				colNames:['ID','ITEM','ID BIEN','DESCRIPCION','ESTADO'],
				colModel:[
					{name:'id',index:'id',align:'left', search:false, editable: true, hidden: true, editoptions: {readonly: 'readonly'}},					
					{name:'item',index:'item',width:50, editable:true, editoptions:{size:"20", maxlength:"150"}, editrules: {required: true}},
					{name:'id_bien',index:'id_bien',width:100, editable:true, editoptions:{size:"20", maxlength:"150"}, editrules: {required: true}},
					{name:'descripcion',index:'descripcion',width:600, editable:true, editoptions:{size:"20", maxlength:"150"}, editrules: {required: true}},
					{name:'estado',index:'estado',width:50,align:'center', editable:true, search:false, hidden: false, editoptions:{size:"20"}, editrules: {required: true,edithidden:true},edittype:'checkbox',formatter: "checkbox",editoptions: { value:"1:0"}},					
				],	
		        rownumbers: true,
		        rowNum: 100,
		        rowList:[100,200,300],
		        pager: pager_selector,
		        sortname: 'id',
		        sortorder: 'asc',
		        altRows: true,
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
		        editurl: "data/parametros/catalogoBienes/app.php",		        
		    });
		    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

		    function aceSwitch(cellvalue, options, cell) {
		        setTimeout(function() {
		            $(cell).find('input[type=checkbox]')
		            .addClass('ace ace-switch ace-switch-5')
		            .after('<span class="lbl"></span>');
		        }, 0);
		    }
		    //enable datepicker
		    function pickDate(cellvalue, options, cell) {
		        setTimeout(function() {
		            $(cell).find('input[type=text]')
		            .datepicker({format:'yyyy-mm-dd' , autoclose:true}); 
		        }, 0);
		    }
		    //navButtons
		    jQuery(grid_selector).jqGrid('navGrid',pager_selector,
		    {   //navbar options
		        edit: true,
		        editicon: 'ace-icon fa fa-pencil blue',
		        add: true,
		        addicon: 'ace-icon fa fa-plus-circle purple',
		        del: false,
		        delicon: 'ace-icon fa fa-trash-o red',
		        search: true,
		        searchicon: 'ace-icon fa fa-search orange',
		        refresh: true,
		        refreshicon: 'ace-icon fa fa-refresh green',
		        view: true,
		        viewicon: 'ace-icon fa fa-search-plus grey'
		    },
		    {
		    	closeAfterEdit: true,
		        recreateForm: true,
		        viewPagerButtons: false,
		        overlay: true,
		        beforeShowForm: function(e) {
		            var form = $(e[0]);
		            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
		            style_edit_form(form);
		        },
		        afterSubmit: function(response) {
	                retorno = response.responseText;
	                if(retorno == '1') {
	                	$.gritter.add({			                
			                title: 'Mensaje de Salida',			                
			                text: 'Datos Modificados Correctamente',
			                image: 'dist/images/confirm.png',
			                class_name: 'gritter-light'
			            });
           			 } else {	                		
	                	if(retorno == '2') {
                			$("#id_bien").val("");
	                		return [false,"Error.. Este id bien ya existe"];
	                	}	
		                
	                }
	                return [true,'',retorno];
	            },
		    },
		    {
		        closeAfterAdd: true,
		        recreateForm: true,
		        viewPagerButtons: false,
		        overlay: true,
		        beforeShowForm: function(e) {
		            var form = $(e[0]);
		            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
		            .wrapInner('<div class="widget-header" />')
		            style_edit_form(form);
		        },
		        afterSubmit: function(response) {
	                retorno = response.responseText;
	                if(retorno == '1') {
	                	 $.gritter.add({			                
			                title: 'Mensaje de Salida',			                
			                text: 'Datos Agregados Correctamente',
			                image: 'dist/images/confirm.png',
			                class_name: 'gritter-light'
			            });
	                } else {	                		
	                	if(retorno == '2') {
                			$("#id_bien").val("");
	                		return [false,"Error.. Este id bien ya existe"];
	                	}			                
	                }
	                return [true,'',retorno];
	            },
		    },
		    {
		        //delete record form
		        recreateForm: true,
		        overlay: true,
		        beforeShowForm: function(e) {
		            var form = $(e[0]);
		            if(form.data('styled')) return false;
		            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
		            style_delete_form(form);
		            form.data('styled', true);
		        },
		        onClick : function(e) {
		      
		        }
		    },
		    {
		        recreateForm: true,
		        overlay:true,
		        afterShowSearch: function(e) {
		            var form = $(e[0]);
		            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
		            style_search_form(form);
		        },
		        afterRedraw: function() {
		            style_search_filters($(this));
		        },
		        multipleSearch: false,
		        overlay: true,
		        sopt: ['eq', 'cn'],
		        defaultSearch: 'eq', 
		    },
		    {
		        recreateForm: true,
		        overlay:true,
		        beforeShowForm: function(e) {
		            var form = $(e[0]);
		            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
		        }
		    })

		    function style_edit_form(form) {		        
		        form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');
		                
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

		    function styleCheckbox(table) { }
		    
		    function updateActionIcons(table) { }
		    
		    function updatePagerIcons(table) {
		        var replacement = {
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

		    $(document).one('ajaxloadstart.page', function(e) {
		        $(grid_selector).jqGrid('GridUnload');
		        $('.ui-jqdialog').remove();
		    });

		    $("#btn_2").on("click",function(){
		    	$("#loading2").css("display","block");
				var archivos = document.getElementById("file_1");				
		    	var archivo = archivos.files;
		    	var archivos = new FormData(document.getElementById("formCatalogo"));
		    	
				$.ajax({
			        url: "data/parametros/catalogoBienes/app.php?cargarDatos="+"cargarDatos",
			        type: "POST",			        			        
			        contentType:false,			        			        
			        data: archivos,        
			        processData:false,
			        cache:false,    
			        //async: true,

			        success: function(data) {	
			        	$("#loading2").css("display","none");
			        	if(data == 1){
			        		$.gritter.add({			                
				                title: 'Mensaje de Salida',			                
				                text: 'Catálogo Agregado Correctamente',
				                image: 'dist/images/confirm.png',
				                class_name: 'gritter-light'
				            });	
				            $('#table').trigger('reloadGrid');												
			        	}else{

			        	}
			        },
			        error: function (xhr, status, errorThrown) {
				        alert("Hubo un problema!");
				        console.log("Error: " + errorThrown);
				        console.log("Status: " + status);
				        console.dir(xhr);
			        }
			    });
		    });
		});	
	})