(function () {
    'use strict';

    angular.module('app')
    .controller('homeCtrl', ['$scope', '$window', '$rootScope', '$location', 'loginSrv', 'AuthService', 'appConfig', homeCtrl]);

    function homeCtrl($scope, $window, $rootScope, $location, loginSrv,  AuthService, appConfig) {  
        loginSrv.getUser().then(function(result) {
            if (result.status == 200){      
                $rootScope.sessao.usuario = result.data;
            }
        });
    };
})(); 



