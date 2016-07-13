/// <reference path="../../typings/index.d.ts" />
"use strict";
var demoapp = angular.module("demoapp", []);
demoapp.controller("demoCtrl", ["$scope", function ($scope) { return new Democtrl($scope); }]);
var Democtrl = (function () {
    function Democtrl($scope) {
        // do nothing now
    }
    return Democtrl;
}());
