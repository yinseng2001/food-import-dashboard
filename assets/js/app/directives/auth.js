    
       
(function () {
    app.
    	directive('authIn', ['$http', '$rootScope', function ($http, $rootScope) {
        
        return{
        	restrict: 'AE',
        	transclude: true,
        	scope: {
        	}, 
        	template:   '<div ng-cloak ng-if="userLogin">' +
            	        '<ng-transclude></ng-transclude>' +
                        '</div>',
        	controller: ['$scope', function ($scope){
        		// $rootScope.isLoggedIn = false;
        		$rootScope.$watch('isSessionLoggedIn' ,function (v){
                    console.log("authin " + v);
        			$scope.userLogin = v;
        		});
        	}],
        	link: function (scope, element, attribs){

        	}
        };

    }]).directive('authOut', ['$http', '$rootScope','$location', '$timeout', '$route','CryptService','Request','genfunc', function ($http, $rootScope,$location, $timeout, $route,CryptService,Request,genfunc) {        
        return{
        	restrict: 'AE',
        	transclude: true,
        	scope: {
        	},
        	template:   '<div ng-cloak ng-if="!userLogin">' +
            	        '<ng-transclude></ng-transclude>' +
                        '</div>',
        	controller: ['$scope', function ($scope){
        		$scope.userLogin = false;   
        		$rootScope.$watch('isSessionLoggedIn' ,function (v){
        			$scope.userLogin = v;
        		});

                $rootScope.user = {};

                $rootScope.login = function ($event){
                 
                    methods.login();
                }

                $rootScope.signup = function () {
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
                    },
                    login : function(){
                      
                        // if (!$rootScope.user || !$rootScope.user.email || !$rootScope.user.password){
                        //     return;
                        // }
                        $rootScope.isLogining = true;
                        // methods.initializeRequest();
                        // var data = CryptService.create($rootScope.user, 60 * 60);
                        console.log($rootScope.user);
                        Request.post('/login',  $rootScope.user, {
                            // 'X-AL-Sign-Key': data.encrypted_pass,
                            // 'X-AL-Connect-ID':  $rootScope.session 
                            'Content-Type': 'Authorization'
                        })
                            .success(function(data, status, headers, config) {
                           
                                if (data.code == 200) {
                                    $rootScope.isLogining = false;
                                    $rootScope.loginUser = data.result;
                                    $rootScope.isSessionLoggedIn = true;
                                    // localStorage.isSessionLoggedIn = true;
                                    console.dir(data);
                                    $route.reload();
                                    $location.path('');
                                    // localStorage.userData = JSON.stringify(data); 
                                    // console.dir(localStorage.userData);
                                    // methods.requestApplication();
                                }
                                // return UIkit.notify(data.reason, 'danger');
                            })
                            .error(function(data, status, headers, config) {
                                if (data.code == 400) {
                                    $route.reload();
                                    $location.path('');
                                }
                            });
                    }
                    
                }   

             
        	}],
        	link: function (scope, element, attribs){
        		scope.$watch('userLogin', function (v){
        			if (v){
        				element.css('display', 'none');
        			}
        			else{
        				element.css('display', 'block');
        			}
        		});
        	}
        };

    }])

}());
