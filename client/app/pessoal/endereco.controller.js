(function () {
    'use strict';

    angular.module('app')
    .controller('enderecoCtrl', ['$scope', '$mdDialog', '$window', '$location', 'enderecoSrv', 'parametersService', enderecoCtrl]);

    function enderecoCtrl($scope, $mdDialog, $window, $location, enderecoSrv, parametersService) {
       

        $scope.enderecos = [];
        
        $scope.confirmPassword = null;
        $scope.isRegistred = false;
        $scope.formInvalido = false;

        $scope.init = function(user){            
            enderecoSrv.getEnderecos().then(function(result) {
                $scope.locais = result.data.data;
            });
        };
        
        $scope.novo = function(){
            $location.path('/pessoal/locais/novo');
        };

        $scope.alterar = function(endereco){
            parametersService.getObject().data = endereco;
            $location.path('/pessoal/locais/novo');
        };

        $scope.excluir = function(endereco, ev){
            var confirm = $mdDialog.confirm()
                        .title('Exclusão de local')
                        .content('Deseja realmente excluir o local ' + endereco.identificacao + '?')
                        .targetEvent(ev)
                        .ok('Sim')
                        .cancel('Não');
            $mdDialog.show(confirm).then(function() {
                enderecoSrv.excluir(endereco).then(function(result) {
                    $scope.locais = result.data.data;
                });
            }, function() {
               return;
            });
        };

        $scope.priorizar = function(endereco){
            enderecoSrv.priorizar(endereco).then(function(result) { 
                    $scope.locais = result.data.data;
            });
        };
        
        $scope.init();

    };

})(); 



