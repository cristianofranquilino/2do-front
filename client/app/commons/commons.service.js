(function () {
    'use strict';

    angular
       .module('app') // Define a qual módulo seu .service pertence
       .service('commonsSrv', commonsSrv); //Define o nome a função do seu .service
       
       commonsSrv.$inject = ['$api'];

       function commonsSrv($api) {

           var api = $api.base('local');
           
            var service = {
                getEstados: _getEstados,
                getMunicipios : _getMunicipios
            };
            
            return service;
            
            function _getEstados() {
                return api.get('ufs');
            }
            
            function _getMunicipios(data) {
                return api.get('municipios/' + data);
            }
       };

})(); 



