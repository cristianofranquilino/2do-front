(function () {
    'use strict';

    angular.module('app')
    .controller('signupCtrl', ['$scope', '$window', '$location', '$rootScope', 'registerSrv', 'appConfig', 'parametersService', '$mdToast', signupCtrl]);

    function signupCtrl($scope, $window, $location, $rootScope, registerSrv, appConfig, parametersService, $mdToast) {
    
        $scope.registerUser = {};


        $scope.init = function(){
            $rootScope.sessao = {
                usuario : null,
                isLogado : false
            };  
            
            $scope.msg = {
                hasMsg : false,
                txtMsg : null
            }
        };
        
        $scope.voltar = function(){
            $location.path('/login');
        };

        $scope.redefinir = function(user){                         

            if (user.email == null || user.email.trim() == ''){ $scope.userForm.email.$setValidity("required", false) };
            $scope.userForm.email.$setValidity("notused", true);
            if (user.email){
                registerSrv.getCadastroBy(user).then(function (result) {
                    if (result.data.status == 'OK') {
                        $scope.msg = {
                            hasMsg : true,
                            txtMsg : "Uma senha foi enviada para sua caixa de entrada. Por favor verifique também a caixa de spam."
                        }
                    }
                    $scope.userForm.email.$setValidity("notused", result.data.status != 'ACCEPTED');
                });
            }else{
                $scope.userForm.email.$setValidity("required", false);
            }
        };

        $scope.criar = function(user){
            $scope.userForm.$invalid = false;
            if (user.email == null || user.email.trim() == ''){ $scope.userForm.email.$setValidity("required", false) };
            $rootScope.currentUser = {};
            if (user.email){
                registerSrv.isCadastrado(user.email).then(function (result) {
                    $scope.userForm.email.$setValidity("used", result.data.status == 200);
                    if (result.data.status == 200) {
                        parametersService.setString(user.email);
                        appConfig.main.layout = 'boxed';
                        $location.path('/pessoal/register');    
                    }
                });
            }else{
                $scope.userForm.email.$setValidity("required", false);
            }
        };
        $scope.init();
    };
})(); 



