
var deps = ['ngRoute', 'ngSanitize'];

function tryInclude(name) {
    try {
        if (angular.module(name)) {
            deps.push(name);
        }
    } catch (ex) {}
}


var app = angular.module('alertify', deps);

var namespace = {};
namespace.routes = [];

app
    .config(['$interpolateProvider', '$routeProvider', '$httpProvider',
        function($interpolateProvider, $routeProvider, $httpProvider) {
            $interpolateProvider.startSymbol('<%');
            $interpolateProvider.endSymbol('%>');

            for (var key in namespace.routes) {
                var route = namespace.routes[key];
                $routeProvider
                    .when('/' + route.url, {
                        templateUrl: route.template,
                        controller: route.controller,
                        // confirmSave: route.confirmSave,
                        reloadOnSearch: route.reloadOnSearch
                    });
            }
            $routeProvider.otherwise({
                redirectTo: '/' + namespace.routes[0].url
            });

            //Enable cross domain calls
            // $httpProvider.defaults.useXDomain = true;
            //Remove the header used to identify ajax call  that would prevent CORS from working
            // delete $httpProvider.defaults.headers.common['X-Requested-With'];

        }
    ]);

