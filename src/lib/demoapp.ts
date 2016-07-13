/// <reference path="../../typings/index.d.ts" />
"use strict";

let demoapp = angular.module("demoapp", []);
demoapp.controller("demoCtrl", ["$scope", ($scope) => new Democtrl($scope)] );

class Democtrl {
    constructor( $scope ) {
        // do nothing now
    }
}