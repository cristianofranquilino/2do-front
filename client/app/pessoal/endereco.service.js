(function () {
    'use strict';

    angular
       .module('app') // Define a qual módulo seu .service pertence
       .service('enderecoSrv', enderecoSrv); //Define o nome a função do seu .service
       
       enderecoSrv.$inject = ['$api'];

       function enderecoSrv($api) {

            var api = $api.base('local');
            var enderecoSelecionado = null;

            var service = {
                getEnderecos: _getEnderecos,
                salvar: _salvar,
                priorizar: _priorizar,
                excluir: _excluir,
                setEnderecoSelecionado: _setEnderecoSelecionado,
                getEnderecoSelecionado: _getEnderecoSelecionado
            };
            
            return service;
            
            function _setEnderecoSelecionado(end){
                enderecoSelecionado = end;
            }
            function _getEnderecoSelecionado(){
                return enderecoSelecionado;
            }

            function _getEnderecos() {
                return api.get();
            }

            function _salvar(endereco) {
                return api.post('save', endereco);
            }
            function _priorizar(endereco) {
                return api.post('priorizar', endereco);
            }
            function _excluir(endereco) {
                return api.post('excluir', endereco);
            }

       };

})(); 



