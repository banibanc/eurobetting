app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (user) {
        Data.post('login/', {
            user: user
        },{}).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $rootScope.xAuth = results.token;
                $location.path('bet');
            }
        });
    };
    $scope.signup = {email:'',password:''};
    $scope.signUp = function (user) {
        Data.post('signUp/', {
            user: user
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('bet');
            }
        });
    };
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $rootScope.xAuth = results.token;
                $location.path('bet');
            }
        });
    }
});