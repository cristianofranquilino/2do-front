(function () {
    'use strict';

    angular.module('app')
    .controller('changePasswordCtrl', ['$scope', '$window', '$location', '$rootScope', 'registerSrv', 'growl', 'AuthService', 'loginSrv', 'parametersService', 'appConfig', changePasswordCtrl]);

    function changePasswordCtrl($scope, $window, $location, $rootScope, registerSrv, growl, AuthService, loginSrv, parametersService, appConfig) {
        
        $scope.confirmPassword = null;
        $scope.isRegistred = false;
        $scope.formInvalido = false;
        
        $scope.init = function(){

            $scope.user = {
                login : {
                    email : null,
                    senha : null,
                    novaSenha : null,
                    perfil  : 'CLIENTE'
                }
            };

            
            loginSrv.getUser().then(function(result) {
                if (result.status == 200){
                    $scope.user.login = result.data.login;
                    $scope.user.login.senha = null;
                }
            });

        };
        
        $scope.alterarSenha = function(login) {
            //console.log($scope.userForm.$invalid);
            $scope.userForm.senha.$setValidity("wrong", true); 
            if (!$scope.userForm.$invalid){
                $scope.formInvalido = false;
                loginSrv.alterarSenha(login).then(function(result) {
                    console.log(result.status);
                    if (result.status==200){
                        //$location.path('/');
                        $rootScope.sair();
                    } else if (result.status == 403) {
                        $scope.userForm.senha.$setValidity("wrong", false);    
                    }
                })
            }else{
                $scope.formInvalido = true;
            }
        };

        $scope.compareSenhas = function(senha, contraSenha){

            if (senha && contraSenha){
                $scope.userForm.senhaConfirm.$setValidity("match", (senha === contraSenha));    
            }else{
                $scope.userForm.senhaConfirm.$setValidity("match", true);    
            }
        };
        $scope.init();
    };
})(); 



