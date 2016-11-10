(function (){
	namespace.menus = [{
		name: 'shop-engine',
		text: 'Shop Engine',
		items: [
	        { 
	        	name: 'Shops', 
	        	extraScreen: 'shops', 
	        	icon: 'icon-office', 
	        	enabled: true,
	        	path: '/shops'
	        }, 
	        { 
	        	name: 'Locations', 
	        	extraScreen: 'locations', 
	        	icon: 'icon-map', 
	        	enabled: true,
	        	path: '/locations'
	        }, 
	        { 
	        	name: 'Feedback', 
	        	extraScreen: 'feedbacks', 
	        	icon: 'icon-lifebuoy', 
	        	enabled: true,
	        	path: '/feedback'
	        }, 
	        { name: 'Media', extraScreen: 'Media menu', icon: 'icon-images', enabled: true, path: '/media' },
	    ]
	}, /*{
		name: 'post-engine',
		text: 'Post Engine',
		items: [
	        { 
	        	name: 'Create new', 
	        	extraScreen: 'Create menu', 
	        	icon: 'icon-quill', 
	        	enabled: true,
	        	path: '/posts/create'
	        },
	        { name: 'My posts', extraScreen: 'My post menu', icon: 'icon-book', enabled: false, path: '/posts' },
	        // { name: 'Pages', extraScreen: 'Create page', icon: 'icon-stack', enabled: true, path: '/pages' },
	        { name: 'Media', extraScreen: 'Media menu', icon: 'icon-images', enabled: true, path: '/media' },
	    ]
	}, {		
		name: 'news-engine',
		text: 'News Engine',
		items: [
	        { 
	        	name: 'Create Article', 
	        	extraScreen: 'Create Article', 
	        	icon: 'icon-quill', 
	        	enabled: true,
	        	path: '/articles/create',
	        	event: function ($rootScope){
	        		$rootScope.createNewArticle();
	        	}
	        },
	        { name: 'My articles', extraScreen: 'My articles', icon: 'icon-book', enabled: false, path: '/articles' },
	        { name: 'Collections', extraScreen: 'Collections', icon: 'icon-books', enabled: false, path: '/collections' }
	    ]
	}, */{
		name: 'layout-engine',
		text: 'Layout Engine',
		items: [
	        { name: 'Manage origin', extraScreen: 'Manage origin', icon: 'icon-leaf', enabled: true, path: '/dimensions/origin'},
	        { name: 'Manage category', extraScreen: 'Manage category', icon: 'icon-tree', enabled: false, path: '/dimensions/origin' },
	        { name: 'Manage feature', extraScreen: 'Manage feature', icon: 'icon-lab', enabled: false, path: '/dimensions/feature' },
	        { name: 'Manage foods', extraScreen: 'Manage foods', icon: 'icon-spoon-knife', enabled: false, path: '/dimensions/foods' }
	    ]
	}, {
		name: 'settings',
		text: 'Settings',
		items: [
	        { name: 'Message', extraScreen: 'Message information', icon: 'icon-mail3', enabled: true, path: '/messages' },
	        //{ name: 'Your account', extraScreen: 'Your account', icon: 'icon-user', enabled: false, path: '/account' },
	        { name: 'Sign out', extraScreen: 'Sign out', icon: 'icon-lock', enabled: false, path: '/signout', 'event': function ($scope){
	        	$scope.logout();
	        }  }
	    ]
	}];
}());