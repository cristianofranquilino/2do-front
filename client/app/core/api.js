(function () {
    'use strict';

angular.module('app')
  .service('$api', function ($http, $q, CONFIG) {

    this.base = function (value) {
      return new Resource(value);
    }

    function Resource(base) {

      var http = function (method, path, data, paginacao, headers) {
        var deferred = $q.defer();

        if (method === 'POST' || method === 'PUT') {
          $http({method: method, 
                 data: data, 
                 url: CONFIG.urlBase + '/' + base + '/' + path
                 ,headers: headers
                }).then(function (data) {
              deferred.resolve(data);
            }).then(function (err) {
              deferred.reject(err);
            });
          return deferred.promise;
        } else {
          $http({method: method, 
                 url: CONFIG.urlBase + '/' + base + '/' + path, 
                 params: paginacao
                 ,headers: headers
                })
            .then(function (data) {
              deferred.resolve(data);
            }).then(function (err) {
              deferred.reject(err);
            });
          return deferred.promise;
        }

      }

      this.head = function (path) {
        return http('HEAD', path === undefined ? '' : path);
      };

      this.get = function (path, paginacao) {
        return http('GET', path === undefined ? '' : path, null, paginacao);
      };
      this.post = function (path, data, headers) {
        return http('POST', path === undefined ? '' : path, data || '', null, (headers === undefined || headers === null) ? null : headers);
      };
      this.delete = function (path, headers) {
        return http('DELETE', path === undefined ? '' : path, null, null, (headers === undefined || headers === null) ? null : headers);
      };
      this.put = function (path, data) {
        return http('PUT', path === undefined ? '' : path, data || '');
      }
    }

  });

  })(); 
