angular.module('vadowApp')	 			
	.controller('activosController', function ($scope, $route, $http) {	
		$scope.$route = $route;
		var d = new Date();
		var currDate = d.getDate();
		var currMonth = d.getMonth() + 1;
		var currYear = d.getFullYear();
		var dateStr = currDate + "/" + currMonth + "/" + currYear;

		$scope.recipientsList = [];
		$scope.recipientsCuentasList = [];
		$scope.recipientsAdquisicionList = [];
		$scope.recipientsEstadoList = [];

		$scope.soloNumeros = function($event){
	        if(isNaN(String.fromCharCode($event.keyCode))){
	            $event.preventDefault();
	        }
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

		jQuery(function($) {			
			$("#tabActivos").click(function(event) {
				event.preventDefault();  
			});
			var grid_selector = "#table";
		    var pager_selector = "#pager";

		    $('#txt_9, #txt_4').attr('autocomplete','off');

		    $('#txt_9').ace_spinner({value:0,min:0,max:100,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		    //cambiar el tamaño para ajustarse al tamaño de la página
		    $(window).on('resize.jqGrid', function () {
		        $(grid_selector).jqGrid('setGridWidth', $("#tabActivos").width() - 10);
		    });
		    $("#tabActivos").on('shown.bs.tab', function(e) {
				$('.chosen-select').each(function() {
					var $this = $(this);
					$this.next().css({'width': $this.parent().width()});
				})	
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
	            format: "dd/mm/yyyy",
	            todayHighlight: true,
	            language: 'es',
	            startDate: '1d',
	            endDate: '1d'
	        }).datepicker();	

		});	
	})