(function () {
    'use strict';
    angular
        .module('main')
        .factory('main.observed', observed);
    function observed() {
        return service;
        function service(events) {
            var
                instance;
            instance = {
                events: {},
                on: function on(eventName, callback, once) {
                    if (!(eventName in instance.events)) {
                        throw new Error('No such event: ' + eventName);
                    }
                    if (once === true) {
                        callback.once = true;
                    }
                    instance.events[eventName].push(callback);
                },
                raise: function raise(eventName, eventData) {
                    if (!(eventName in instance.events)) {
                        throw new Error('No such event: ' + eventName);
                    }
                    instance.events[eventName].forEach(function forEach(callback, index, array) {
                        callback(eventData);
                        if (callback.once) {
                            array.splice(array.indexOf(callback), 1);
                        }
                    });
                }
            };
            events.forEach(function forEach(value) {
                instance.events[value] = [];
            });
            return instance;
        }
    }
}());
