/*
* @Author: yinseng
* @Date:   2016-10-17 09:04:22
* @Last Modified by:   yinseng
* @Last Modified time: 2016-10-26 11:50:31
*/
app.controller('nav', ['$scope','$rootScope','$localStorage','$location','genfunc', function ($scope,$rootScope,$localStorage,$location,genfunc) {
	$scope.application = function(){
		if($location.url()!='/'){
			genfunc.setNavPath('/application');
			genfunc.getNavPath();
			$location.path('/application');
		}
	}
	
	// SMS
	$scope.messageSent = function () {
		genfunc.setNavPath('/sent');
		genfunc.getNavPath();
		$location.path('/sms/sent');
	}

	$scope.sendMessage = function () {
		genfunc.setNavPath('/send');
		genfunc.getNavPath();
		$location.path('/sms/send');
	}

	$scope.schedule = function(){
		genfunc.setNavPath('/schedule');
		genfunc.getNavPath();
		$location.path('/sms/schedule');
	}

	$scope.template = function(){
		genfunc.setNavPath('/template');
		genfunc.getNavPath();
		$location.path('/sms/template');
	}



	// members
	$scope.members = function(){
		genfunc.setNavPath('/member');
		genfunc.getNavPath();
		$location.path('/members');
	}

	$scope.membersGroup = function(){
		genfunc.setNavPath('/group');
		genfunc.getNavPath();
		$location.path('/members/group');
	}



	// help
	$scope.faq =function () {
		genfunc.setNavPath('/faq');
		genfunc.getNavPath();
		$location.path('/help/faq');
	}

	$scope.feedback = function(){
		genfunc.setNavPath('/feedback');
		genfunc.getNavPath();
		$location.path('/help/feedback');
	}

	$scope.pricing = function(){
		genfunc.setNavPath('/pricing');
		genfunc.getNavPath();
		$location.path('/help/pricing');
	}


	// if(window.location.pathname =="/dashboard"){
	// 	$rootScope.isShowMyApp = true;
	// }else{
	// 	$rootScope.isShowMyApp = false;
	// }
	// $localStorage.isShowMyApp = true;
	// if(localStorage.isShowMyApp) {
	// 	alert($localStorage.isShowMyApp);
	// 	$rootScope.isShowMyApp = $localStorage.isShowMyApp;
	// }
	// else {
	// 	alert("here "+$localStorage.isShowMyApp);
	// 	$rootScope.isShowMyApp = false;
	// }

	// window.location.protocol = “http:“
	// window.location.host = “mycodingtricks.com“
	// window.location.pathname = “/jquery/shareit-js-social-content-unlocker/“

}])