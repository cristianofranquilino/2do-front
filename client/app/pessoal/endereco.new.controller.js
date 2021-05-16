(function () {
    'use strict';

    angular.module('app')
    .controller('enderecoNewCtrl', ['$scope', '$window', '$location', 'enderecoSrv', 'commonsSrv', 'parametersService', enderecoNewCtrl]);

    function enderecoNewCtrl($scope, $window, $location, enderecoSrv, commonsSrv, parametersService) {

       var enderecoSelecionado = null;
       var isAlteracao = false;
       $scope.local = {};

       $scope.init = function(){     
            isAlteracao = parametersService.getObject().data;
            commonsSrv.getEstados().then(function(result) { 
                $scope.estados = result.data.data;

                if (isAlteracao){
                    $scope.local = angular.copy(parametersService.getObject().data);
                    $scope.estado = $scope.local.cidade.uf;
                    parametersService.getObject().data = null;
                }
            });
        };

        $scope.cancelar = function(){
            $location.path('/pessoal/locais');
        };

        $scope.save = function(endereco){
            if (!$scope.userForm.$invalid){
                
                endereco.cidade.nome = $scope.municipioSelecionado;
                endereco.cidade.uf = $scope.estado;

                enderecoSrv.salvar(endereco).then(function(result) {
                   if (result.data.status=='OK')
                        $location.path('/pessoal/locais');
                })
            }
        };

        function carregaMunicipios(estado){
            $scope.municipios = [];
            if (estado) {
                commonsSrv.getMunicipios(estado).then(function(result) { 
                    $scope.municipios = result.data.data;
                    if (isAlteracao){
                        $scope.municipioSelecionado = $scope.local.cidade.nome;
                    }
                });
            }
        }

        $scope.$watch('estado',function(val) {
            if (val && val.length ) {
                carregaMunicipios(val);
            }else{
                $scope.municipios = [];
            }
        })  

        


        $scope.init();

    };

})(); 



