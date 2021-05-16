(function () {
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            /*var routes, setRoutes;

            routes = [
                'ui/cards', 'ui/typography', 'ui/buttons', 'ui/icons', 'ui/grids', 'ui/widgets', 'ui/components', 'ui/timeline', 'ui/lists', 'ui/pricing-tables',
                'map/maps',
                'table/static', 'table/dynamic', 'table/responsive',
                'form/elements', 'form/layouts', 'form/validation', 'form/wizard',
                'chart/echarts', 'chart/echarts-line', 'chart/echarts-bar', 'chart/echarts-pie', 'chart/echarts-scatter', 'chart/echarts-more',
                'page/404', 'page/500', 'page/blank', 'pessoal/forgot-password', 'page/invoice', 'page/lock-screen', 'pessoal/profile', 'pessoal/register', 'pessoal/endereco', 'pessoal/signin', 'pessoal/signup',
                'app/calendar', 'servico/servico-novo'
            ]

            setRoutes = function(route) {
                var config, url;
                url = '/' + route;
                config = {
                    url: url,
                    templateUrl: 'app/' + route + '.html'
                };
                $stateProvider.state(route, config);
                return $stateProvider;
            };

            routes.forEach(function(route) {
                return setRoutes(route);
            });*/

            $stateProvider.state('home', {
                url: '/',
                templateUrl: 'app/pessoal/home.html'
            });

            /* Login */

            $stateProvider.state('login', {
                url: '/login',
                templateUrl: 'app/pessoal/signin.html'
            });
            
            $stateProvider.state('cadastrar', {
                url: '/pessoal/signup',
                templateUrl: 'app/pessoal/signup.html'
            });

            $stateProvider.state('register', {
                url: '/pessoal/register',
                templateUrl: 'app/pessoal/register.html'
            });

            $stateProvider.state('forgot', {
                url: '/pessoal/forgot',
                templateUrl: 'app/pessoal/forgot.html'
            });

            $stateProvider.state('changePass', {
                url: '/pessoal/change-pass',
                templateUrl: 'app/pessoal/change-password.html'
            });

            $stateProvider.state('locais', {
                url: '/pessoal/locais',
                templateUrl: 'app/pessoal/endereco.html'
            });

            $stateProvider.state('locaisNovo', {
                url: '/pessoal/locais/novo',
                templateUrl: 'app/pessoal/endereco-new.html'
            });

            $stateProvider.state('ordensServico', {
                url: '/pessoal/servicos',
                templateUrl: 'app/ordem-servico/ordem-servico.html'
            });

            $stateProvider.state('ordensServicoNovo', {
                url: '/pessoal/servicos/novo',
                templateUrl: 'app/ordem-servico/ordem-servico-new.html'
            });




/*
            $stateProvider.state('register', {
                url: '/register',
                templateUrl: 'app/pessoal/register.html'
            });

            $stateProvider.state('profile', {
                url: '/profile',
                templateUrl: 'app/pessoal/profile.html'
            });
*/
        }]
    );

})(); 