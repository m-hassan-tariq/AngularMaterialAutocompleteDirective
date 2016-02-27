# Angular Material Autocomplete Directive
Custom auto complete directive using Angular Material 

Customize Angular autocomplete directive, register within your controller and other data services and use it throughout your project. I have consolidated it through directive in-order to overcome boilerplate code in multiple module controllers. Different controller can utilize this directive by passing list through data attribute and passing caller controller method to invoke on selected item through filter-search attribute. 

Angular Code:

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

Angular HTML Code:

    <div search-combo data="vm.dataList" filtersearch="vm.showSelectedItem"></div>

Autocomplete Directive:

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

Loader Directive Html:

    <md-autocomplete ng-disabled="vm.config.disabled "
                     md-no-cache="vm.config.noCache"
                     md-selected-item="vm.selectedItem"
                     md-search-text-change="vm.searchTextChange(vm.searchText)"
                     md-search-text="vm.searchText"
                     md-selected-item-change="vm.selectedItemChange(item)"
                     md-items="item in vm.querySearch(vm.searchText)"
                     md-item-text="item.text" md-min-length="0"
                     placeholder="Search item here">
        <md-item-template>
            <span> {{item.text}} </span>
        </md-item-template>
        <md-not-found>
            No record matching "{{vm.searchText}}" were found.
        </md-not-found>
    </md-autocomplete>

Output:

![captursse](https://cloud.githubusercontent.com/assets/10474169/13370627/41da5c22-dcd3-11e5-8b47-9ff59d60c0f4.PNG)
