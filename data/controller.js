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
        .when('/tipoBien', {
            templateUrl : 'data/inventario/tipoBien/app.html',
            controller  : 'tipoBienController',
            activetab: 'tipoBien',
            authorize: true
        })  


        .otherwise("/");                               
})