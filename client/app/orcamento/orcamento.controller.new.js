(function () {
    'use strict';

    angular.module('app')
    .controller('servicoCtrl', ['$scope', '$window', '$location', 'registerSrv', servicoCtrl]);

    function servicoCtrl($scope, $window, $location, registerSrv) {
        

        $scope.user = {
            id : null,
            nome : null,
            dataNascimento: null,
            sexo: 'M',
            cpf : null,
            telefone : null,
            email : null,
            senha : null,
            perfil : {id:1}
        };
        
        $scope.confirmPassword = null;
        $scope.isRegistred = false;
        $scope.formInvalido = false;

        $scope.save = function(user){
            if (!$scope.userForm.$invalid){
                $scope.formInvalido = false;
                registerSrv.salvar(user).then(function(result) {
                    console.log(result);
                })
            }else{
                $scope.formInvalido = true;
            }
        };

        $scope.criar = function(user){
            if (user.email){
                registerSrv.isCadastrado(user.email).then(function (result) {
                    console.log(result);
                    if (result.data.type === 'SUCCESS') {
                        $scope.isRegistred = result.data.data;
                        $scope.userForm.email.$setValidity("used", !$scope.isRegistred);
                        if (!$scope.isRegistred){
                            $location.url('/pessoal/register');
                        }
                    }
                });
            }else{
                $scope.userForm.email.$setValidity("required", false);
            }
        };

        $scope.compareSenhas = function(senha, contraSenha){

            if (senha && contraSenha){
                $scope.userForm.senhaConfirm.$setValidity("match", (senha === contraSenha));    
            }else{
                $scope.userForm.senhaConfirm.$setValidity("match", true);    
            }




        };

    };

})(); 



