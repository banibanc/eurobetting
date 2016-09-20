var app = angular.module('eurobetApp', ['ngRoute','toaster']);
app.config(function ($routeProvider) {
    $routeProvider.when('/login', {
        title: 'Login',
        templateUrl: 'partials/login.html',
        controller: 'authCtrl'
    });
    $routeProvider.when('/logout', {
        title: 'Logout',
        templateUrl: 'partials/login.html',
        controller: 'logoutCtrl'
    });
    $routeProvider.when('/signup', {
        title: 'Signup',
        templateUrl: 'partials/signup.html',
        controller: 'authCtrl'
    });
    $routeProvider.when('/bet', {
        title: 'Tableau',
        templateUrl: 'partials/bet.html',
        controller: 'authCtrl'
    });
    $routeProvider.when('/', {
        title: 'Login',
        templateUrl: 'partials/login.html',
        controller: 'authCtrl',
        role: '0'
    });
    $routeProvider.otherwise({
        redirectTo: '/login'
    });
}).run(function ($rootScope, $location, Data) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if($rootScope.xAuth == '' || $rootScope.xAuth == undefined) {
            var nextUrl = next.$$route.originalPath;
            if (nextUrl == '/signup' || nextUrl == '/login') {

            } else {
                $location.path("/login");
            }
        }
    });
});