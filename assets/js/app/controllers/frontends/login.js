/*
* @Author: yinseng
* @Date:   2016-10-16 09:03:55
* @Last Modified by:   yinseng
* @Last Modified time: 2016-11-01 13:45:43
*/
(function (){
	app.controller('LoginCtrl', ['$scope','$rootScope', 'CryptService', '$http','Request','$route',' $location', function($scope,$rootScope, CryptService, $http,Request,$route, $location){
    

        $scope.login = function ($event){
            methods.login();
        }

        $scope.signup = function () {
            // methods.signup();
        }


        var methods = {
            signup : function(){
                window.location = "/register";
            },
            initializeRequest : function(){
                var session = $('meta[name="api:session"]');
                session = session ? session.attr('content') : '';
                $rootScope.session = session;

            //         var token = $('meta[name="api:bearer"]');
            //         token = token ? token.attr('content') : '';
            //         var request = $('meta[name="api:request"]');
            //         request = request ? request.attr('content') : '';

            //         $http.defaults.headers.common['X-HH-Connect-ID']= session;
            //         $http.defaults.headers.common['X-HH-Request-ID']= request;
            //         $http.defaults.headers.common['Authorization']= 'Bearer ' + token;   
            },
            login : function(){
                if (!$scope.user || !$scope.user.email || !$scope.user.password){
                    return;
                }
                methods.initializeRequest();
                var data = CryptService.create($scope.user, 60 * 60);

                Request.post('/login', 
                {
                    'data': data.encrypted
                }, {
                    'X-AL-Sign-Key': data.encrypted_pass,
                    'X-AL-Connect-ID':  $rootScope.session 
                })
                    .success(function(data, status, headers, config) {
                        console.dir(data);

                        if (data.code == 200) {
                            alert(0);
                            $rootScope.isSessionLoggedIn = true;

                            // localStorage.isSessionLoggedIn = true;
                            $route.reload();
                                
                            // $location.path('');
                        }
                        // return UIkit.notify(data.reason, 'danger');
                    })
                    .error(function(data, status, headers, config) {

                    });

                // $http.post('/v1/login', {
                //     'data': {
                //         'data': data.encrypted
                //     },
                //     'headers': {
                //         'key': data.encrypted_pass
                //     }
                // }).success(function(s) {
                //     alert("success");
                  
                // }).error(function(f) {

                // });
                // $('#page-login')[0].submit();
            }
        }   



	
	}]);
}());