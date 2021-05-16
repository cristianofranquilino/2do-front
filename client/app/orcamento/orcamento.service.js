(function () {
    'use strict';

    angular
       .module('app') // Define a qual módulo seu .service pertence
       .service('orcamentoSrv', orcamentoSrv); //Define o nome a função do seu .service

       orcamentoSrv.$inject = ['$api'];

       function orcamentoSrv($api) {

           var api = $api.base('orcamento');

            var service = {
                salvar: _salvar,
                isCadastrado : _isCadastrado
            };

            return service;

            function _salvar(data) {
                return api.post('', data);
            }

            function _isCadastrado(data){
                return api.post('email', data);
            }

       };

})();
