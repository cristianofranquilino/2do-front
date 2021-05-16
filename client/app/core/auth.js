'use strict';


angular.module('app')
  .factory('AuthService', 
  function($q, $window, $rootScope, CONFIG, $api, $http, $location, SessionService, appConfig, loginSrv) {

    var urlBase = CONFIG.urlBase;

    var api = $api.base('login');

    $rootScope.sessao = {
        usuario: null,
        logado : false
    };

    var _refreshSession = function() {
      loginSrv.getUser().then(function(result) {
        if (result.status == 'UNAUTHORIZED') $location.path('/login');
        $rootScope.sessao.usuario = result.data;
        $rootScope.sessao.logado = result.data != null;
      });
    };

    if (SessionService.get('token')) {
      _refreshSession();
    }else{
      $location.path('/login');
    };

    

    return {

      isAuth: function() {
        return SessionService.get('token');
      },

      refreshSession : _refreshSession,

      login: function(credentials) {
        var promisse = $http.post(urlBase + '/login' + '?ambiente=' + CONFIG.ambiente, credentials);
        return promisse;
      },

      in: function(result){
        _refreshSession();
        SessionService.set('token', result.headers('Authorization'));
      },

      unsetUser: function() {
        SessionService.unset('token');
        SessionService.unset('currentUser');
        $rootScope.sessao.usuario = null;
        $rootScope.sessao.logado = false;   
      },

      logout: function() {
        var promisse = api.get('logout');

        promisse.then(function(data) {
          SessionService.unset('token');
          SessionService.unset('currentUser');
          $rootScope.sessao.usuario = null;
          $rootScope.sessao.logado = false;   
          return true;
        });

        return promisse;

      },

      getCurrentUser: function() {
        return $$rootScope.sessao.usuario;
      },

      getToken: function() {
        return SessionService.get('token');
      }

    }

  })

.factory("SessionService", function($window) {
  return {
    get: function(key) {
      return $window.localStorage.getItem(key);
    },
    set: function(key, val) {
      return $window.localStorage.setItem(key, val);
    },
    unset: function(key) {
      return $window.localStorage.removeItem(key);
    }
  }
});
