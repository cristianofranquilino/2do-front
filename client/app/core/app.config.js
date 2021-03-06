(function() {
    'use strict';

    angular.module('app.core')
        .factory('appConfig', [appConfig])
        .service('parametersService', [parametersService])
        .config(['$mdThemingProvider', mdConfig]);

    function parametersService(){
        var stringValue = '';
        var objectValue = {
            data: null
        };
        
        return {
            getString: function() {
                return stringValue;
            },
            setString: function(value) {
                stringValue = value;
            },
            getObject: function() {
                return objectValue;
            }
        }
    };

    function appConfig() {
        var pageTransitionOpts = [
            {
                name: 'Fade up',
                "class": 'animate-fade-up'
            }, {
                name: 'Scale up',
                "class": 'ainmate-scale-up'
            }, {
                name: 'Slide in from right',
                "class": 'ainmate-slide-in-right'
            }, {
                name: 'Flip Y',
                "class": 'animate-flip-y'
            }
        ];
        var date = new Date();
        var year = date.getFullYear();
        var main = {
            brand: '',
            name: '',
            year: year,
            layout: 'boxed',                                 // String: 'boxed', 'wide'
            menu: 'horizontal',                               // String: 'horizontal', 'vertical'
            isMenuCollapsed: false,                         // Boolean: true, false
            fixedHeader: true,                              // Boolean: true, false
            fixedSidebar: true,                             // Boolean: true, false
            pageTransition: pageTransitionOpts[2],          // Object: 0, 1, 2, 3 and build your own
            skin: '32'                                      // String: 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
        };

        var usuario = {
                id: null,
                urlFoto:null,
                nome: null,
                sobrenome:"Lindsey",
                nomeEmpresa:"PHEAST",
                cpfCnpj:"7780207404110",
                dataNascimento:683262000000,
                dataRegistro:null
        };

        var color = {
            primary:    '#009688',
            success:    '#8BC34A',
            info:       '#00BCD4',
            infoAlt:    '#7E57C2',
            warning:    '#FFCA28',
            danger:     '#F44336',
            text:       '#3D4051',
            gray:       '#EDF0F1'
        };

        return {
            pageTransitionOpts: pageTransitionOpts,
            main: main,
            color: color,
            usuario:usuario
        }
    }

    function mdConfig($mdThemingProvider) {
        var cyanAlt = $mdThemingProvider.extendPalette('cyan', {
            'contrastLightColors': '500 600 700 800 900',
            'contrastStrongLightColors': '500 600 700 800 900'
        })
        var lightGreenAlt = $mdThemingProvider.extendPalette('light-green', {
            'contrastLightColors': '500 600 700 800 900',
            'contrastStrongLightColors': '500 600 700 800 900'
        })        

        $mdThemingProvider
            .definePalette('cyanAlt', cyanAlt)
            .definePalette('lightGreenAlt', lightGreenAlt);


        $mdThemingProvider.theme('default')
            .primaryPalette('teal', {
                'default': '500'
            })
            .accentPalette('cyanAlt', {
                'default': '500'
            })
            .warnPalette('red', {
                'default': '500'
            })
            .backgroundPalette('grey');
    }

})();