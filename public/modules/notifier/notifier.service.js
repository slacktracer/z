(function () {
    'use strict';
    angular
        .module('notifier')
        .factory('notifier.notifier', notifier);
    notifier.$inject = [
        '$timeout',
        'notifier.defaults',
        'notifier.notify'
    ];
    function notifier(
        $timeout,
        defaults,
        notify
    ) {
        var
            service;
        service = notify;
        service.close = justClose;
        defaults({
            animate: {
                enter: 'animated fadeInUp',
                exit: 'animated flipOutX'
            },
            delay: 0,
            placement: {
                align: 'left',
                from: 'bottom'
            }
        });
        return service;
        function internalTimeout(fn, milliseconds, extra) {
            $timeout(
                function onTimeout() {
                    fn(extra);
                },
                milliseconds,
                false
            );
        }
        function justClose(notificationToClose, milliseconds) {
            internalTimeout(
                function onTimeout(notification) {
                    notification.close();
                },
                milliseconds,
                notificationToClose
            );
        }
    }
}());
