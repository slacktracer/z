(function () {
    'use strict';
    angular
        .module('notifier')
        .constant('notifier.notify', jQuery.notify);
}());
