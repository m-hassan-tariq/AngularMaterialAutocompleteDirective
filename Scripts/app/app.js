(function () {
    'use strict';

    var app = angular.module('app', ['ngMaterial']);

    app.controller('autocompleteController', function () {
        
        var vm = this;

        vm.selectedItem = "";

        vm.dataList = [{ text: 'ABC', value: 1 },
                        { text: 'XYZ', value: 2 },
                        { text: 'Foo', value: 3 },
                        { text: 'Bar', value: 4 }];

        vm.showSelectedItem = function (valueReturnByDirective) {
            vm.selectedItem = valueReturnByDirective;
        }

    });

})();
