(function () {
    'use strict';

    angular.module('app')
    .controller('registerCtrl', ['$scope', '$window', '$location', '$rootScope', 'registerSrv', 'growl', 'AuthService', 'loginSrv', 'parametersService', 'appConfig', registerCtrl]);

    function registerCtrl($scope, $window, $location, $rootScope, registerSrv, growl, AuthService, loginSrv, parametersService, appConfig) {
        
        $scope.confirmPassword = null;
        $scope.isRegistred = false;
        $scope.formInvalido = false;
        $scope.acao = 'incluir';
       
        $scope.init = function(){

            $scope.user = {
                cpf : null,
                dataNascimento : null,
                dataRegistro : null,
                id : null,
                nome : null,
                sobrenome : null,
                urlFoto  : null,
                ativo : true,
                login : {
                    email : parametersService.getString(),
                    senha : null,
                    perfil  : 'CLIENTE'
                }
            };

            
            loginSrv.getUser().then(function(result) {
                if (result.status == 200){
                    $scope.acao = 'alterar';
                    //$scope.login = result.data.login;
                    $scope.user  = result.data;
                    $scope.user.dataNascimento = new Date($scope.user.dataNascimento);
                    $scope.user.login = result.data.login;
                    $scope.user.login.senha = null;
                    
                }
            });

            //$scope.registerUser = { email : parametersService.getString(), senha: null}; 

            /*$rootScope.sessao = {
                usuario : null,
                isLogado : false
            };*/  
        };
        
        $scope.voltar = function(){
            $location.path('/login');
        };

        $scope.alterar = function(user){
            if (!$scope.userForm.$invalid){
                $scope.formInvalido = false;
                registerSrv.alterar(user).then(function(result) {
                    if (result.status==200){
                        $location.path('/');
                    }
                })
            }else{
                $scope.formInvalido = true;
            }
        };

        $scope.save = function(user){
            if (!$scope.userForm.$invalid){
                $scope.formInvalido = false;
                registerSrv.salvar(user).then(function(result) {
                    if (result.status==200){
                        $location.path('/login');
                    }
                })
            }else{
                $scope.formInvalido = true;
            }
        };

        function login(user){
            AuthService.login(user).then(function(result) {
                $rootScope.currentUser = result.data;
                $rootScope.logado = true;
                $location.path('/');
            })
        }

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



