(function () {
    'use strict';

    angular.module('app')
    .controller('OrdemServicoNovoCtrl', ['$scope', '$window', '$location', 'WizardHandler', 'Upload', '$timeout', 'OrdemServicoSrv', 'EspecialidadeSrv', OrdemServicoNovoCtrl]);

    function OrdemServicoNovoCtrl($scope, $window, $location, WizardHandler, Upload, $timeout, OrdemServicoSrv, EspecialidadeSrv) {
        
        $scope.especialidades = [];
        $scope.especialidadeSelecionada;
        $scope.especialidadeDigitada;
        $scope.quandoOpcoes = [
            { descricao : 'Durante um período', habilitaDataInicio : true, habilitaDataFim : true},
            { descricao : 'Numa data específica', habilitaDataInicio : true, habilitaDataFim : false},
            { descricao : 'A combinar', habilitaDataInicio : false, habilitaDataFim : false},
        ];

        $scope.ordemServico = {
            id : null,
            itens : [],
            quando : null
        };
        

        /*{
            descricao : "Elétrica",
            itens : [ 
                { descricao : "Chuveiro" , icone : ""}, 
                { descricao : "Ventilador" , icone : ""},
                { descricao : "Ventilador de Teto" , icone : ""},
                { descricao : "Quadro Elétrico" , icone : ""},
                { descricao : "Curto Ciruito" , icone : ""},
                { descricao : "Projetos e Cálculos" , icone : ""}
            ]
        }*/

        $scope.uploadFiles = function (files) {
            $scope.files = files;
            if (files && files.length) {
                Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: {
                        files: files
                    }
                }).then(function (response) {
                    $timeout(function () {
                        $scope.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0) {
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
                }, function (evt) {
                    $scope.progress = 
                        Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        };

        function init(){
            EspecialidadeSrv.getAll().then(function(result){
                if (result.data.data){
                    $scope.especialidades = result.data.data;
                }
            });
        };

        $scope.voltar = function() {
            WizardHandler.wizard().goTo(0);
        };

        $scope.querySearch = function(query) {
            var results = query ? $scope.especialidades.filter(createFilterFor(query)) : $scope.especialidades;
            return results;
        };

        $scope.onChangeEspecialidade = function(itemDigitado){
            if (!itemDigitado){
                $scope.ordemServico.itens = [];
            }
        };

        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) list.splice(idx, 1);
            else list.push(item);
        };
        
        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        }; 

        $scope.canGo = function(listaSelecionados){
            return listaSelecionados.length == 0;
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(removerAcentos(query));
            return function filterFn(especialidade) {
                return (angular.lowercase(removerAcentos(especialidade.descricao)).indexOf(lowercaseQuery) === 0);
            };
        };

        function removerAcentos( newStringComAcento ) {
            var string = newStringComAcento;
              var mapaAcentosHex 	= {
                  a : /[\xE0-\xE6]/g,
                  e : /[\xE8-\xEB]/g,
                  i : /[\xEC-\xEF]/g,
                  o : /[\xF2-\xF6]/g,
                  u : /[\xF9-\xFC]/g,
                  c : /\xE7/g,
                  n : /\xF1/g
              };
          
              for ( var letra in mapaAcentosHex ) {
                  var expressaoRegular = mapaAcentosHex[letra];
                  string = string.replace( expressaoRegular, letra );
              }
          
              return string;
          }


        init();

    };

})(); 



