var app = angular.module('vadowApp', ['ngRoute','localytics.directives']);

app.config(function($routeProvider) {
    $routeProvider        
        .when('/', {
            templateUrl : 'data/home/app.html',
            controller  : 'mainController',
            activetab: 'inicio',
            authorize: true
        })  
        .when('/cargos', {
            templateUrl : 'data/parametros/cargos/app.html',
            controller  : 'cargosController',
            activetab: 'cargos',
            authorize: true
        })  
        .when('/menu', {
            templateUrl : 'data/parametros/menu/app.html',
            controller  : 'menuController',
            activetab: 'menu',
            authorize: true
        })   
        .when('/submenu', {
            templateUrl : 'data/parametros/submenu/app.html',
            controller  : 'submenuController',
            activetab: 'submenu',
            authorize: true
        }) 
        .when('/accesos', {
            templateUrl : 'data/parametros/accesos/app.html',
            controller  : 'accesosController',
            activetab: 'accesos',
            authorize: true
        })
        .when('/empresa', {
            templateUrl : 'data/parametros/empresa/app.html',
            controller  : 'empresaController',
            activetab: 'empresa',
            authorize: true
        })         
        .when('/tipoBien', {
            templateUrl : 'data/inventario/tipoBien/app.html',
            controller  : 'tipoBienController',
            activetab: 'tipoBien',
            authorize: true
        })
        .when('/bodegas', {
            templateUrl : 'data/inventario/bodegas/app.html',
            controller  : 'bodegasController',
            activetab: 'bodegas',
            authorize: true
        })

        .when('/tipoIdentificacion', {
            templateUrl : 'data/parametros/tipoIdentificacion/app.html',
            controller  : 'tipoIdentificacionController',
            activetab: 'tipoIdentificacion',
            authorize: true
        })
        .when('/usuarios', {
            templateUrl : 'data/parametros/usuarios/app.html',
            controller  : 'usuariosController',
            activetab: 'usuarios',
            authorize: true
        })
        .when('/catalogoBienes', {
            templateUrl : 'data/parametros/catalogoBienes/app.html',
            controller  : 'catalogoBienesController',
            activetab: 'catalogoBienes',
            authorize: true
        })
        .otherwise("/");                               
})

app.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };
    return {
     link: fn_link
    }
}])

app.directive("fileinput", [function() {
    return {
        scope: {
            fileinput: "=",
            filepreview: "="
        },
        link: function(scope, element, attributes) {                
            element.bind("change", function(changeEvent) {                                      
                scope.fileinput = changeEvent.target.files[0];                                      
                var reader = new FileReader();                  
                reader.onload = function(loadEvent) {                       
                    scope.$apply(function() {                           
                        scope.filepreview = loadEvent.target.result;
                    });
                }                   
                if(scope.fileinput) {
                    reader.readAsDataURL(scope.fileinput);
                }
            });
        }
    }
}])