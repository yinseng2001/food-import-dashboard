    
       
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
                      
                        if (!$rootScope.user || !$rootScope.user.email || !$rootScope.user.password){
                            return;
                        }
                        $rootScope.isLogining = true;
                        methods.initializeRequest();
                      

                        console.log('$rootScope.user',$rootScope.user);


                        var data = CryptService.create($rootScope.user, 60 * 60);
                        console.log( 'data', data.encrypted);
                        console.log('X-HH-Sign-Key',data.encrypted_pass);
                        console.log('X-HH-Connect-ID',  $rootScope.session );
                        Request.post('/admin/login', 
                        {
                            'data': data.encrypted
                        }, {
                            'X-HH-Sign-Key': data.encrypted_pass,
                            'X-HH-Connect-ID':  $rootScope.session,
                            'X-HH-Request-ID': 'YzUzYzcxNjJkODhjMWEzZGZjNWE4Yzc2MWNkYTZkYzU5MTllZDJhOTYyMmFkZDY1ZDUwZGIwMjI4YTNkYzFhNQ==' 
                        })
                        .success(function(data, status, headers, config) {
                       
                            if (data.code == 200) {
                                
                                $rootScope.isSessionLoggedIn = true;
                                localStorage.isSessionLoggedIn = true;
                                console.dir(data);
                                localStorage.userData = JSON.stringify(data); 
                                console.dir(localStorage.userData);
                              
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
