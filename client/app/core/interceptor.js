'use strict';

angular.module('app')
  .factory('httpInterceptor', function($q, $rootScope, growl, $location, SessionService) {

    function _unsetUser(){
      SessionService.unset('token');
      SessionService.unset('currentUser');
      $rootScope.sessao = {
        usuario : null,
        isLogado : false
      }
      $location.path('/login');
    }

    return {
      request: function(config) {
        config.headers = config.headers || {};
        if (SessionService.get('token')) {
          config.headers.Authorization = SessionService.get('token');
        }
        $rootScope.loadSpinner = true;
        return config || $q.when(config)
      },

      response: function(response) {
        if (response !== null) {
          if (response.data.status !== null && response.data.messages) {
            switch (response.status) {
              case 200:
              case 201:
                  response.data.messages.forEach(function(value) {
                    growl.success(value);
                  });
                break;
              case 100:
                response.data.messages.forEach(function(value) {
                  growl.info(value);
                });
                break;
              default:
            }
          }
        }

        $rootScope.loadSpinner = false;
        return response || $q.when(response);
      },
      responseError: function(response) {
        if (response.data !== null) {
          if (response.data.status !== null) {
            switch (response.data.status) {
              case 403:
                  _unsetUser();
                  break;
              case 500:
                response.data.messages.forEach(function(value) {
                 growl.error(value);
                });
                break;
              case 401:
                  _unsetUser();
                break;
              default:
            }
          }
        }else{
          _unsetUser();
          growl.error("Ocorreu um erro imprevisto.");
        }
        $rootScope.loadSpinner = false;
        return response;//$q.reject(response);
      }
    };
  });
