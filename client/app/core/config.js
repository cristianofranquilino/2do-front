(function () {
    'use strict';

angular.module('app')

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  })

  .constant('version', '1.0')

  .config(['growlProvider', function(growlProvider) {
    growlProvider.onlyUniqueMessages(false);
  }])

  /*.config(['growlProvider', function(growlProvider) {*/

  .config(['growlProvider', function(growlProvider) {
    growlProvider.globalTimeToLive({success: 3000, error: 5000, warning: 3000, info: 4000});
    growlProvider.globalDisableCountDown(true);
    growlProvider.globalPosition('top-right');
  }])

  .constant('ENV', {name:'localhost',apiEndpoint:'http://localhost:6001'})
  
  .factory('CONFIG', function (ENV) {

    var urlBase = ENV.apiEndpoint;
    var ambiente = ENV.name;

    return {

      urlBase: urlBase,
      ambiente: ambiente
    }
  });
})(); 