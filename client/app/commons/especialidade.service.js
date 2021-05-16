(function () {
    'use strict';

    angular
       .module('app') // Define a qual módulo seu .service pertence
       .service('EspecialidadeSrv', EspecialidadeSrv); //Define o nome a função do seu .service
       
       EspecialidadeSrv.$inject = ['$api'];

       function EspecialidadeSrv($api) {

           var api = $api.base('especialidade');
           
            var service = {
                getAll: _getAll
            };
            
            return service;
            
            function _getAll() {
                return api.get('');
            }
       };

})(); 



