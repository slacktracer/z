(function () {
    'use strict';
    angular
        .module('notifier')
        .directive('ntfNotification', ntfNotificationDirective);
    ntfNotificationDirective.$inject = [
        '$timeout',
        '$window',
        'notifier'
    ];
    function ntfNotificationDirective(
        $timeout,
        $window,
        notifier
    ) {
        return {
            restrict: 'A',
            scope: {
                notification: '='
            },
            link: link
        };
        /**
         * functions
         */
        function calculateLeftForCentre(width) {
            var
                leftForCentre;
            leftForCentre = 0;
            leftForCentre = parseInt(angular.element('body').css('width'), 10);
            leftForCentre /= 2;
            leftForCentre -= width / 2;
            return leftForCentre;
        }
        function calculateMaxWidth() {
            var
                maxWidth;
            maxWidth = 0;
            maxWidth -= notifier.configuration.margin * 2;
            maxWidth += parseInt(angular.element('body').css('width'), 10);
            return maxWidth;
        }
        function calculateVerticalDistance(location, position) {
            var
                verticalDistance;
            verticalDistance = notifier.configuration.margin;
            notifier.locations[location].forEach(function forEach(notification, index, array) {
                if (index < position) {
                    verticalDistance += parseInt(notification.element.css('height'), 10);
                    verticalDistance += notifier.configuration.margin;
                }
            });
            return verticalDistance;
        }
        function link(scope, element, attributes) {
            var
                index,
                unwatcher,
                x,
                y;
            x = notifier.locations[scope.notification.location].x;
            y = notifier.locations[scope.notification.location].y;
            index = notifier.locations[scope.notification.location].indexOf(scope.notification);
            // set position
            if (x === 'middle') {
                if (scope.notification.width !== 'auto') {
                    element.css('left', calculateLeftForCentre(scope.notification.width) + 'px');
                } else {
                    unwatcher = scope.$watch(
                        function watchExpression() {
                            return element.css('width');
                        },
                        function listener(newWidth, oldWidth) {
                            if (
                                newWidth === oldWidth ||
                                newWidth > oldWidth + 1 ||
                                newWidth < oldWidth - 1
                            ) {
                                element.css('left', calculateLeftForCentre(parseInt(newWidth, 10)) + 'px');
                                unwatcher();
                            }
                        }
                    );
                }
                angular.element($window).on('resize', function onResize() {
                    element.css('left', calculateLeftForCentre(parseInt(element.css('width'), 10)) + 'px');
                });
            }
            element.css(x, notifier.configuration.margin + 'px');
            element.css(y, '-9999px');
            element.css('z-index', 2000);
            // set width
            if (scope.notification.width !== 'auto') {
                element.css('width', scope.notification.width + 'px');
            }
            // set max-width
            element.css('max-width', calculateMaxWidth() + 'px');
            angular.element($window).on('resize', function onResize() {
                element.css('max-width', calculateMaxWidth() + 'px');
            });
            // adjust
            $timeout(function $timeout() {
                element.css(y, calculateVerticalDistance(scope.notification.location, index) + 'px');
            });
            scope.notification.element = element;
            return;
        }
    }
}());
