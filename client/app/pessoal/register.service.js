(function () {
    'use strict';

    angular
       .module('app') // Define a qual módulo seu .service pertence
       .service('registerSrv', registerSrv); //Define o nome a função do seu .service
       
       registerSrv.$inject = ['$api'];

       function registerSrv($api) {

           var api = $api.base('clientes');
           var apiLogin = $api.base('login');

            var service = {
                salvar: _salvar,  
                alterar: _alterar,            
                isCadastrado : _isCadastrado,
                getCadastroBy : _getCadastroBy
            };
            
            return service;
            
            function _salvar(data) {
                return api.post('', data);
            }

            function _alterar(data) {
                return api.put('', data);
            }

            function _isCadastrado(data){
                return apiLogin.post('email/existe', data);
            }

            function _getCadastroBy(data){
                return api.post('forgot', data);
            }
       };

})(); 



