(function () {
    'use strict';

    angular
       .module('app') // Define a qual módulo seu .service pertence
       .service('OrdemServicoSrv', OrdemServicoSrv); //Define o nome a função do seu .service
       
       OrdemServicoSrv.$inject = ['$api'];

       function OrdemServicoSrv($api) {

           var api = $api.base('os');

            var service = {
                getAll: _getAll
            };
            
            return service;
            
            function _getAll() {
                return api.get('');
            }
       };

})(); 



