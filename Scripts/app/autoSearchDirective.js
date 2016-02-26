(function () {
    'use strict';

    angular
        .module('app')
        .directive('searchCombo', searchCombo);

    function searchCombo() {
        var directive = {
            restrict: 'EA',
            templateUrl: '/scripts/app/autoSearchDirective.html',
            scope: {
                data: '=',
                filtersearch: '&'
            },
            controller: autoCompleteController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    autoCompleteController.$inject = [];

    function autoCompleteController() {

        var vm = this;

        init();

        /////////////////////Implementation///////////////////////////////

        function init() {
            vm.datalist = vm.data; 
            vm.filterSearch = vm.filtersearch;

            vm.config = {};
            vm.config.disabled = false;
            vm.config.noCache = false;
            vm.searchText = "";
            vm.selectedItem = "";
            vm.selectedItemChange = selectedItemChange;
            vm.searchTextChange = searchTextChange;
            vm.querySearch = querySearch;

        }

        function querySearch(query) {
            var results = query ? vm.datalist.filter(createFilterFor(query)) : vm.datalist;
            return results;
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(data) {
                return (angular.lowercase(data.text).indexOf(lowercaseQuery) === 0);
            };

        }

        function searchTextChange(text) {
            console.log('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            if (item)
                vm.filterSearch()(vm.selectedItem);
            else
                vm.filterSearch()("");
        }

    }

})();
