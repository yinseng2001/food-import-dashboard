/*
* @Author: yinseng
* @Date:   2016-10-20 09:12:54
* @Last Modified by:   yinseng
* @Last Modified time: 2016-11-08 10:23:03
*/
app.controller('DashboardCtrl', ['$scope','$rootScope','Request','genfunc','$location', function ($scope,$rootScope,Request,genfunc,$location) {
    $scope.renew = function(){
        $scope.isLogining = true;
        Request.get('/renew', {}, {
            
        })
        .success(function(data, status, headers, config) {
            if (data.code == 200) {
                $scope.isLogining = false;
                $scope.renew  = data.result;
                $scope.renew.session_token = {'OGQ2NDM5ZTEtMDdjZC00MWMxLWFmZDAtNGYyODQ4ZTlhMDlka5f3d':data.result.session_token['OGQ2NDM5ZTEtMDdjZC00MWMxLWFmZDAtNGYyODQ4ZTlhMDlka5f3d']};
                console.log("renew===");
                console.dir(data);
            }
        })
        .error(function(data, status, headers, config) {
            $scope.authValid.message = data.result;
            console.dir(data);
        }); 
    }

    $scope.checkAuth = function(){
        $scope.isLogining = true;
        Request.get('/auth', {
          
        }, {
            'token' :  $rootScope.loginUser.token
        })
        .success(function(data, status, headers, config) {
            if (data.code == 200) {
                $scope.isLogining = false;
                $scope.authValid  = data.result;
                console.log("checkAuth===");
                console.dir(data);
            }
        })
        .error(function(data, status, headers, config) {
            $scope.authValid.message = data.result;
            console.dir(data);
        });  
    }

	// visit 
    $scope.visitProduct = function(){
        alert("visitProduct");
        requestVisit("/product");
    }

    $scope.visitPort = function(){
        alert("visitPort");
        requestVisit("/port");
    }
    $scope.visitCountry = function(){
        alert("visitCountry");
        requestVisit("/country");
    }
    $scope.visitSean = function(){
        alert("visitSean");
        requestVisit("/sean"); 
    }

    function requestVisit(url){
        Request.post('/history', {
            "actionNum": "2",
            "url": url,
            "actionUrl": {
                "p1": "22",
                "p2": "22"
            }
        }, {
            'token' :  $rootScope.loginUser.token
        })
        .success(function(data, status, headers, config) {
            if (data.code == 200) {
                console.log("visitProduct===");
                console.dir(data);
            }
        })
        .error(function(data, status, headers, config) {
               console.dir(data);
        });  
    }
    // end visit


    // history back
    $scope.historyBack = function(){
        let query = "";
        if($scope.index ) {
            query = "?index=" + $scope.index;
        }
        console.log(query);
        Request.get('/history/back' + query, {
         
        }, {
            'token' :  $rootScope.loginUser.token
        })
        .success(function(data, status, headers, config) {
            if (data.code == 200) {
                console.log("historyBack===");
                console.dir(data);
                if(data.result)
                    $scope.url = data.result.url;
                else 
                    $scope.url = "out of histroy";
            }
        })
        .error(function(data, status, headers, config) {
               console.dir(data);
        }); 
    }

    // get most viewed by user
     $scope.getMostViewedByUser = function(){
      
        Request.get('/history/mostViewedByUser' , {
         
        }, {
            'token' :  $rootScope.loginUser.token
        })
        .success(function(data, status, headers, config) {
            if (data.code == 200) {
                console.log("getMostViewedByUser===");
                console.dir(data);
                $scope.mostViewedByuser = data.result;
            }
        })
        .error(function(data, status, headers, config) {
               console.dir(data);
        }); 
    }
    // get most viewed
    $scope.getMostViewed = function(){
   
        Request.get('/history/mostViewed', {
         
        }, {
            'token' :  $rootScope.loginUser.token
        })
        .success(function(data, status, headers, config) {
            if (data.code == 200) {
                console.log("getMostViewed===");
                console.dir(data);
                $scope.mostViewed = data.result;
            }
        })
        .error(function(data, status, headers, config) {
               console.dir(data);
        }); 
    }


    // check role 
    $scope.readRole = function(){
   
        Request.get('/roles', {
         
        }, {
            'token' :  $rootScope.loginUser.token
        })
        .success(function(data, status, headers, config) {
            if (data.code == 200) {
                console.log("readRole===");
                console.dir(data);
                $scope.roles = "Permission Ok";
            }
        })
        .error(function(data, status, headers, config) {
            $scope.roles = data.result;
               console.dir(data);
        }); 
    }

    $scope.writeRole = function(){
   
        Request.post('/role', {
            'role' : 'test write role' 
        }, {
            'token' :  $rootScope.loginUser.token
        })
        .success(function(data, status, headers, config) {
            if (data.code == 200) {
                console.log("writeRole===");
                console.dir(data);
                $scope.roles = "Permission Ok";
            }
        })
        .error(function(data, status, headers, config) {
            $scope.role = data.result;
               console.dir(data);
        }); 
    }
	
}])