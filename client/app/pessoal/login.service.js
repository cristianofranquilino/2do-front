(function () {
    'use strict';

    angular
       .module('app') // Define a qual módulo seu .service pertence
       .service('loginSrv', loginSrv); //Define o nome a função do seu .service
       
       loginSrv.$inject = ['$api'];

       function loginSrv($api) {

           var api = $api.base('login');
           var apiClientes = $api.base('clientes');

            var service = {
                postLogin: _postLogin,
                alterarSenha : _alterarSenha,
                getUser : _getUser
            };
            
            return service;
            
            function _alterarSenha(data) {
                return api.put('senha', data);
            }

            function _postLogin(data) {
                return api.post('', data);
            }

            function _getUser() {
                return apiClientes.get();
            }
       };

})(); 



