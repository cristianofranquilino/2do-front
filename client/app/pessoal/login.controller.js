(function () {
    'use strict';

    angular.module('app')
    .controller('loginCtrl', ['$scope', '$window', '$rootScope', '$location', 'loginSrv', 'AuthService', 'appConfig', loginCtrl]);

    function loginCtrl($scope, $window, $rootScope, $location, loginSrv,  AuthService, appConfig) {
        
        $scope.user = {
            email : 'cristiano.teste@todo.com.br',
            senha : '121212',
            perfil : 'CLIENTE'

        };

        $scope.error = {
            msg : null,
            show : false
        };

        appConfig.main.layout = 'wide';
        
        $rootScope.sessao = {
            usuario : null,
            isLogado : false
        }

        $scope.entrar = function(user){
            AuthService.login(user).then(function(result) {
                if (result.status == 200){
                    AuthService.in(result);
                    appConfig.main.layout = 'boxed';
                    $location.path('/');
                } else if (result.status == 401){
                    $scope.userForm.senha.$setValidity("invalido", false);
                } else {
                    $scope.userForm.email.$setValidity("generic", false);
                }
            });
        };
    };

})(); 



