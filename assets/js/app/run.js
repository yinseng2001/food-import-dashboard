/*
* @Author: yinseng
* @Date:   2016-10-20 09:12:55
* @Last Modified by:   yinseng
* @Last Modified time: 2016-11-03 15:04:18
*/
app.run(['$http', '$rootScope', '$location', '$timeout', '$routeParams', '$interval','$location',
    function($http, $rootScope, $location, $timeout, $routeParams, $interval,$location) {
        $rootScope.session = null;
        $rootScope.isSessionLoggedIn = false;
        // $rootScope.isSessionLoggedIn = true;
		$rootScope.isShowMyApp = true;
        // localStorage.isSessionLoggedIn = null;
        // delete localStorage.isSessionLoggedIn;

        // alert("localStorage.isSessionLoggedIn " + localStorage.isSessionLoggedIn );
        // $rootScope.isSessionLoggedIn = !!localStorage.isSessionLoggedIn ;
     

        // console.log( '$rootScope.balance_usd' ,localStorage.balance_usd, $rootScope.balance_usd);
      

        $rootScope.$on('$routeChangeSuccess', function(next, current) {
           
            // if (!current.$$route){
            //     return;
            // }

            // $rootScope.currentRouth = current.$$route.originalPath;
            // localStorage.currentRouth = current.$$route.originalPath;
           
           

         
            // console.log("current"+	$rootScope.currentRouth);
        });
        
        $rootScope.$on('$routeChangeStart', function(next, current) {
            // methods.refreshController(next, current,$location,$rootScope);
            // console.log("current routeChangeStart",current.$$route.originalPath,$rootScope.currentRouth);
        });


     
      
    }
]);