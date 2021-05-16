(function () {
    'use strict';

        angular.module('app')
            .filter('cep', function() {
                return function(input) {
                    if (input && input.length == 8){
                        return input.substring(0,5) + '-' + input.substring(5);
                    }
                    return input;
                };
            })
})(); 