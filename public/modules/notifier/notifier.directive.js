(function () {
    'use strict';
    angular
        .module('notifier')
        .directive('ntfNotifier', ntfNotifierDirective);
    ntfNotifierDirective.$inject = [
        '$timeout',
        '$window',
        'notifier'
    ];
    function ntfNotifierDirective(
        $timeout,
        $window,
        notifier
    ) {
        return {
            restrict: 'A',
            scope: {},
            link: link,
            templateUrl: notifier.configuration.templateUrl
        };
        /**
         * functions
         */
        function link(scope, element, attributes) {
            scope.locations = notifier.locations;
            angular.element($window).on('resize', function onResize() {
                recalculateVerticalDistance();
            });
            notifier.on('removedNotification', function on(event, message) {
                recalculateVerticalDistance(message);
            });
            return;
            function recalculateVerticalDistance(outerLocation) {
                var
                    eachLocation;
                if (outerLocation) {
                    recalculateVerticalDistanceForLocation(outerLocation);
                } else {
                    for (eachLocation in notifier.locations) {
                        if (notifier.locations.hasOwnProperty(eachLocation)) {
                            recalculateVerticalDistanceForLocation(eachLocation);
                        }
                    }
                }
                return;
                function recalculateVerticalDistanceForLocation(innerLocation) {
                    notifier.locations[innerLocation].forEach(function forEach(outerNotification, outerIndex, notifications) {
                        var
                            animationTime,
                            animator,
                            verticalDistance;
                        verticalDistance = notifier.configuration.margin;
                        animationTime = notifier.configuration.animationTime;
                        animator = {};
                        notifications.forEach(function forEach(innerNotification, innerIndex, array) {
                            if (innerIndex < outerIndex) {
                                verticalDistance += parseInt(innerNotification.element.css('height'), 10);
                                verticalDistance += notifier.configuration.margin;
                            }
                        });
                        animator[(innerLocation.indexOf('bottom') === 0) ? 'bottom' : 'top'] = verticalDistance + 'px';
                        $timeout(function $timeout() {
                            outerNotification.element.animate(animator, animationTime);
                        }, 300);
                    });
                }
            }
        }
    }
}());
