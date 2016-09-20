app.factory("Data", ['$http', 'toaster',
    function ($http, toaster) {

        var serviceBase = 'http://172.22.2.113/euroApi/index.php/';

        var obj = {};
        obj.toast = function (data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        }
        obj.get = function (q,headers) {
            return $http.get(serviceBase + q, headers).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object, headers) {
            return $http.post(serviceBase + q, object, headers).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        return obj;
    }]);
