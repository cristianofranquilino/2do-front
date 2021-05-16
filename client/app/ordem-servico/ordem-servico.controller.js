(function () {
    'use strict';

    angular.module('app')
    .controller('OrdemServicoCtrl', ['$scope', '$mdDialog', '$window', '$location', 'OrdemServicoSrv', OrdemServicoCtrl]);

    function OrdemServicoCtrl($scope, $mdDialog, $window, $location, OrdemServicoSrv) {

    
        $scope.init = function(user){
            OrdemServicoSrv.getAll().then(function(result){

                console.log(result.data.data);

                if (result.data.data){

                }

            });

        };

        $scope.novo = function(){
            $location.path('/pessoal/servicos/novo');
        };

        $scope.init();

    };

})();
