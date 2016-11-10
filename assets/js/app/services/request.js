/*
* @Author: yinseng
* @Date:   2016-10-15 10:18:35
* @Last Modified by:   yinseng
* @Last Modified time: 2016-11-01 13:50:21
*/

(function() {

    app.service('Request', ['$http', '$rootScope', '$window', function($http, $rootScope, $window) {
        namespace.api_domain = 'http://localhost:1337';
        // namespace.api_domain = 'http://api.shoppymesh.com:3000';
    	var api = namespace.api_domain + '/v1';
        var cleanup = function() {
        };            

        var queryBuilder = function(keyValuePair) {

            var query = "";

            _.each(keyValuePair, function(v, k) {

                if (v != null && v != undefined) {
                    if (query != '') {
                        query = query + "&" + k + "=" + v;
                    } else {
                        query = "?" + k + "=" + v;
                    }
                }
            });

            return query;

        };

        var public_method = {
            get: function (uri, query, headers){
                return $http.get(api + uri + queryBuilder(query || {}), {
                    headers: _.extend({
                        'X-AL-Request-ID': 'VPt6ixFFnEYiKfGL/UdYTaCYQv7zSki/8OHyPxvtvXg='
                    }, headers || {})
                });
            },
            post: function (uri, data, headers, query){
                return $http.post(api + uri + queryBuilder(query || {}), data, {
                    headers: _.extend({
                        'X-AL-Request-ID': 'VPt6ixFFnEYiKfGL/UdYTaCYQv7zSki/8OHyPxvtvXg='
                    }, headers || {})
                });
            },
            put: function (uri, data, headers, query){

                return $http.put(api + uri + queryBuilder(query || {}), data, {
                     headers: _.extend({
                        'X-AL-Request-ID': 'VPt6ixFFnEYiKfGL/UdYTaCYQv7zSki/8OHyPxvtvXg='
                    }, headers || {})
                });
            },
            delete: function (uri, data, headers, query){
             
                return $http.delete(api + uri + queryBuilder(query || {}), {
                    data : data,
                    headers: _.extend({
                        'X-AL-Request-ID': 'VPt6ixFFnEYiKfGL/UdYTaCYQv7zSki/8OHyPxvtvXg=',
                        'Content-type' : 'application/json'
                    }, headers || {})
                });
            },
            getApi: function (){
                return api;
            }
        };

        return public_method;
    }]);

}());