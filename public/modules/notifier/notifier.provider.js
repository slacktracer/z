(function () {
    'use strict';
    angular
        .module('notifier')
        .provider('notifier', notifierProvider);
    function notifierProvider() {
        var
            notificationConfiguration,
            notificationLocations,
            notificationTypes,
            notifierConfiguration;
        notifierConfiguration = {
            animationTime: 400,
            margin: 20,
            templateUrl: 'modules/notifier/notifier.directive.html'
        };
        notificationConfiguration = {
            dismissable: true,
            location: 'topMiddle',
            timeout: null,
            type: 'warning',
            width: 'auto'
        };
        notificationLocations = {
            'topLeft': [],
            'topMiddle': [],
            'topRight': [],
            'bottomLeft': [],
            'bottomMiddle': [],
            'bottomRight': []
        };
        notificationTypes = [
            'danger',
            'info',
            'success',
            'warning'
        ];
        notificationLocations.bottomLeft.x = 'left';
        notificationLocations.bottomLeft.y = 'bottom';
        notificationLocations.bottomMiddle.x = 'middle';
        notificationLocations.bottomMiddle.y = 'bottom';
        notificationLocations.bottomRight.x = 'right';
        notificationLocations.bottomRight.y = 'bottom';
        notificationLocations.topLeft.x = 'left';
        notificationLocations.topLeft.y = 'top';
        notificationLocations.topMiddle.x = 'middle';
        notificationLocations.topMiddle.y = 'top';
        notificationLocations.topRight.x = 'right';
        notificationLocations.topRight.y = 'top';
        $get.$inject = [
            '$timeout'
        ];
        return {
            $get: $get,
            notifierConfiguration: notifierConfiguration,
            notificationConfiguration: notificationConfiguration
        };
        /**
         * functions
         */
        function $get(
            $timeout
        ) {
            var
                notificationPrototype,
                observed;
            notificationPrototype = {
                remove: function remove() {
                    var index = notificationLocations[this.location].indexOf(this);
                    notificationLocations[this.location].splice(index, 1);
                    observed.raise('removedNotification', this.location);
                    return;
                },
                setProperties: function setProperties(configuration) {
                    if (angular.isObject(configuration)) {
                        this.dismissable = (typeof configuration.dismissable === 'boolean') ?
                            configuration.dismissable : notificationConfiguration.dismissable;
                        this.location = (notificationLocations.hasOwnProperty(configuration.location)) ?
                            configuration.location : notificationConfiguration.location;
                        this.timeout = (angular.isNumber(configuration.timeout)) ?
                            configuration.timeout : notificationConfiguration.timeout;
                        this.type = (notificationTypes.indexOf(configuration.type) !== -1) ?
                            configuration.type : notificationConfiguration.type;
                        this.width = (angular.isNumber(configuration.width)) ?
                            configuration.width : notificationConfiguration.width;
                    } else {
                        this.dismissable = notificationConfiguration.dismissable;
                        this.location = notificationConfiguration.location;
                        this.timeout = notificationConfiguration.timeout;
                        this.type = notificationConfiguration.type;
                        this.width = notificationConfiguration.width;
                    }
                    return;
                }
            };
            observed = {
                events: {
                    removedNotification: []
                },
                on: function on(event, callback) {
                    if (!(event in observed.events)) {
                        throw new Error('No such event: ' + event);
                    }
                    observed.events[event].push(callback);
                },
                raise: function raise(event, data) {
                    if (!(event in observed.events)) {
                        throw new Error('No such event: ' + event);
                    }
                    observed.events[event].forEach(function forEach(callback, index, array) {
                        callback(data);
                    });
                }
            };
            notifier.configuration = notifierConfiguration;
            notifier.locations = notificationLocations;
            notifier.on = observed.on;
            return notifier;
            function notifier(content, configuration) {
                var
                    notification;
                notification = Object.create(notificationPrototype);
                notification.content = content;
                notification.setProperties(configuration);
                notificationLocations[notification.location].push(notification);
                if (notification.timeout !== null) {
                    $timeout(function $timeout() {
                        notification.remove();
                    }, notification.timeout);
                }
                return {
                    content: function content(value) {
                        if (angular.isUndefined(value)) {
                            return notification.content;
                        }
                        if (angular.isString(value)) {
                            notification.content = value;
                        } else {
                            throw 'Invalid content!';
                        }
                        return this;
                    },
                    remove: function remove() {
                        notification.remove();
                        return;
                    },
                    timeout: function timeout(value) {
                        notification.timeout = (angular.isNumber(value)) ?
                            value : notificationConfiguration.timeout;
                        if (notification.timeout !== null) {
                            $timeout(function $timeout() {
                                notification.remove();
                            }, notification.timeout);
                        }
                        return this;
                    },
                    type: function type(value) {
                        if (angular.isUndefined(value)) {
                            return notification.type;
                        }
                        notification.type = (notificationTypes.indexOf(value) !== -1) ?
                            value : notificationConfiguration.type;
                        return this;
                    }
                };
            }
        }
    }
}());
