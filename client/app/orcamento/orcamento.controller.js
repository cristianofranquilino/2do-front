(function () {
    'use strict';

    angular.module('app')
    .controller('orcamentoCtrl', ['$scope', '$mdDialog', '$window', '$location', 'orcamentoSrv', orcamentoCtrl]);

    function orcamentoCtrl($scope, $mdDialog, $window, $location, orcamentoSrv) {

       /*

       {
            id : 1,
            logradouro: 'Rua Maria Rita',
            numero: '1207',
            complemento : 'Bloco 2 Apto 1001',
            cep : '24431-740',
            bairro : 'Porto Novo',
            label: 'Minha Casa',
            ordem : 1,
            principal : true,
            municipio : { descricao: 'São Gonçalo',
                            uf : { sigla : 'RJ'}}
            },
            {
            id : 2,
            logradouro: 'Rua Coronel Soares',
            numero: '305',
            complemento : 'Casa 4',
            cep : '24425-350',
            bairro : 'Califórnia',
            label: 'Casa Vanessa',
            ordem : 2,
            principal : false,
            municipio : { descricao: 'São Gonçalo',
                            uf : { sigla : 'RJ'}
            }}
        */

        $scope.enderecos = [];

        $scope.confirmPassword = null;
        $scope.isRegistred = false;
        $scope.formInvalido = false;

        $scope.init = function(user){
                enderecoSrv.getEnderecos().then(function(result) {
                    $scope.enderecos = result.data.data;
                });

        };

        $scope.novo = function(){
            $location.url('/pessoal/endereco/novo');
        }
        $scope.alterar = function(endereco){
            enderecoSrv.setEnderecoSelecionado(endereco);
            $location.url('/pessoal/endereco/novo');
        }

        $scope.excluir = function(endereco, ev){
            var confirm = $mdDialog.confirm()
                        .title('Exclusão de endereço')
                        .content('Deseja realmente excluir o endereço ' + endereco.etiqueta + '?')
                        .targetEvent(ev)
                        .ok('Sim')
                        .cancel('Não');
            $mdDialog.show(confirm).then(function() {
                enderecoSrv.excluir(endereco).then(function(result) {
                    $scope.init();
                });
            }, function() {
               return;
            });
        }

        $scope.priorizar = function(endereco){
                enderecoSrv.priorizar(endereco).then(function(result) {
                     $scope.init();
                });
        };

        $scope.init();

    };

})();
