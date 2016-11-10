/*
* @Author: yinseng
* @Date:   2016-10-24 09:16:34
* @Last Modified by:   yinseng
* @Last Modified time: 2016-10-26 11:39:29
*/

app.controller('MembersGroupCtrl', ['$scope','$rootScope','$localStorage','Request','genfunc','$location','$timeout', function ($scope,$rootScope,$localStorage,Request,genfunc,$location,$timeout) {
    

    // member path 
    $scope.addMembersToGroupClick = function(_group){
        methods.addMembersToGroupClick(_group);
    }
    $scope.addMemberToGroup = function(_member){
        methods.addMemberToGroup(_member);
    }
    $scope.removeMemberFromGroup = function(_member){
        methods.removeMemberFromGroup(_member);
    }


    // group path
    $scope.newGroup =function(){
        methods.newGroup();
    }
    $scope.editGroup =function(_group){
        methods.editGroup(_group);
    }

    $scope.saveGroup =function(){
        methods.saveGroup();
    }

    $scope.deleteGroup =function(_group){
        methods.deleteGroup(_group);
    }

    $scope.deleteGroups =function(){
        methods.deleteGroups();
    }

    // events
    $scope.searchChange = function(){
        methods.searchChange();
    }
    $scope.selectedChange = function(_selectedAll){
        methods.selectedChange(_selectedAll);
    }

    $scope.loadMore = function(){
        methods.loadMore();
    }

    // supporting function
    $scope.buildDescription = function(_member){
        return methods.buildDescription(_member);
    }


	var methods = {
		init : function(){
			$rootScope.token        = genfunc.getToken();
            $rootScope.session      = genfunc.getSessionId();
            $rootScope.appId        = genfunc.getApplicationId();
            $scope.genfunc          = genfunc;
            $rootScope.isShowMyApp  = false;
            $scope.isFirstStartApp  = true;
            $scope.isloadMore       = false;
            $scope.page             = 1;
            $scope.userMembersTotal = 1;
            genfunc.getNavPath();
            $scope.userMembers = [];
            if(localStorage.userGroups){
                $scope.userGroups = JSON.parse(localStorage.userGroups).result;
            }

			$(document).ready(function(){
				$('.open-popup-new-group').magnificPopup({
				  type:'inline',
				  closeBtnInside:true,
				  midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
				});
                $('.open-popup-add-members-group').magnificPopup({
                  type:'inline',
                  closeBtnInside:true,
                  midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
                });
			});


            methods.getGroup();

           
		},
        addMemberToGroup : function(_member){
            _member.isNonAdded = false;
            _member.isRequesting = true;
            Request.post('/channels/'+$scope.curGroupAdding._id+'/add/member/'+_member._id, {}, {
                'Authorization': 'Bearer ' + $rootScope.token,
                'X-AL-Connect-ID':  $rootScope.session 
            })
                .success(function(data, status, headers, config) {
                   
                    if (data.code == 200) {
                        _member.isRequesting = false;
                        // $scope.isMemberLoading = false;
                        // $scope.isloadMore = false;
                    }
                })
                .error(function(data, status, headers, config) {

                });
           
        },
        removeMemberFromGroup : function(_member){
            _member.isNonAdded = true;
            _member.isRequesting = true;
            Request.post('/channels/'+$scope.curGroupAdding._id+'/remove/member/'+_member._id, {}, {
                'Authorization': 'Bearer ' + $rootScope.token,
                'X-AL-Connect-ID':  $rootScope.session 
            })
                .success(function(data, status, headers, config) {
                   
                    if (data.code == 200) {
                        _member.isRequesting = false;
                        // $scope.isMemberLoading = false;
                        // $scope.isloadMore = false;
                    }
                })
                .error(function(data, status, headers, config) {

                });
        },
        searchChange : function(){
            if($scope._timeout) { // if there is already a timeout in process cancel it
                $timeout.cancel($scope._timeout);
            }
            $scope._timeout = $timeout(function() {
                $scope.isloadMore = true;
                $scope.isFirstStartApp = true; 
                $scope.userMembers = [];
                console.log("$scope.userMembers " , $scope.userMembers.length);
                $scope.page = 1;
                let isFiltering = false;
                let query = '';

                if($scope.filter.search){
                    isFiltering = true;
                    query = 'search=' + $scope.filter.search;
                }

                if($scope.filter.ageFrom){
                    let and = '&';
                    let q = 'ageFrom=' + $scope.filter.ageFrom;
                    if(isFiltering)
                       query += and + q; 
                    else 
                       query += q;
                    isFiltering = true;
                }

                if($scope.filter.ageTo){
                    let and = '&';
                    let q = 'ageTo=' + $scope.filter.ageTo;
                    if(isFiltering)
                       query += and + q; 
                    else 
                       query += q;
                    isFiltering = true;
                }

                if($scope.filter.type){
                    let and = '&';
                    let q = 'type=' + $scope.filter.type;
                    if(isFiltering)
                       query += and + q; 
                    else 
                       query += q;
                    isFiltering = true;
                }

                if($scope.filter.gender){
                    let and = '&';
                    let q = 'sex=' + $scope.filter.gender;
                    if(isFiltering)
                       query += and + q; 
                    else 
                       query += q;
                    isFiltering = true;
                }


                if($scope.filter.mode){
                    let and = '&';
                    let q = 'mode=' + $scope.filter.mode;
                    if(isFiltering)
                       query += and + q; 
                    else 
                       query += q;
                    isFiltering = true;
                }


                if(isFiltering){
                    query = '&' + query;
                }else{
                    
                }

                console.log(query);
                methods.getMembersInGroup(query);
                $scope._timeout = null;
            }, 500);

        },
        buildDescription : function(_member){
            let str = "";
            str = _member.phone_number ;
            str += _member.sex?(' - ' + _member.sex.toUpperCase()) : '';
            str += _member.email? (' - ' + _member.email) : '';

            return str;
        },
		newGroup : function(){
            $scope.group = {};
            $scope.group.mainTitle = "New Group";
            $('.open-popup-new-group').magnificPopup('open'); 
        },
        loadMore : function(){
            if($scope.isFirstStartApp){
                $scope.isFirstStartApp = false;
            }else{
                if(!$scope.isloadMore && $scope.userMembersTotal > $scope.userMembers.length){
                    $scope.isloadMore = true;
                    $scope.page ++ ;
                    methods.getMembersInGroup();
                    console.log("trigger loadMore");
                }
            }
        },    
        getMembersInGroup : function(query){
            $scope.isMemberLoading = true;
            // $scope.isloadMore = true;
            let limit = 10 * $scope.page;
            let offset = limit - 10;
            Request.get('/group/channels/'+$scope.curGroupAdding._id+'/membersInGroup?limit='+limit+'&offset='+ offset + (query || ''), 
            {
                // 'data': data.encrypted
            }, {
                'Authorization': 'Bearer ' + $rootScope.token,
                'X-AL-Connect-ID':  $rootScope.session 
            })
                .success(function(data, status, headers, config) {
                   
                    if (data.code == 200) {
                        $scope.isMemberLoading = false;
                        $scope.isloadMore = false;
                        // $scope.userMembers = data.result.channel_members
                        $scope.userMembersTotal = data.options.total;
                        $scope.userMembers = $scope.userMembers.concat(data.result.channel_members);
                        console.log("getMembersInGroup=== $scope.userMembersTotal ",$scope.userMembersTotal );
                        console.dir( data);
                       
                    }
                })
                .error(function(data, status, headers, config) {

                });
        },
        getNonGroupMember : function(_group){
            // $scope.isLoading = true;
            // Request.get('/group/channels/'+_group._id+'/non-members', 
            // {
            //     // 'data': data.encrypted
            // }, {
            //     'Authorization': 'Bearer ' + $rootScope.token,
            //     'X-AL-Connect-ID':  $rootScope.session 
            // })
            //     .success(function(data, status, headers, config) {
                   
            //         if (data.code == 200) {
            //             $scope.isLoading = false;
            //             $scope.userMembers = data.result;
            //             console.log("getNonGroupMember===");
            //             console.dir(data);
                       
            //         }
            //     })
            //     .error(function(data, status, headers, config) {

            //     });
        },
        addMembersToGroupClick : function (_group) {
            $scope.userMembers = [];
            $scope.curGroupAdding = _group;
            methods.getMembersInGroup();
            $('.open-popup-add-members-group').magnificPopup('open'); 
        },
        addMembersToGroup : function (_member) {
            Request.post('/channels/'+  $scope.curGroupAdding._id+'/add/member/'+ _member._id, {}, 
            {
                'Authorization': 'Bearer ' + $rootScope.token,
                'X-AL-Connect-ID':  $rootScope.session 
            })
                .success(function(data, status, headers, config) {
                    
                    if (data.code == 200) {
                        $scope.isLoading = false;
                        console.log("save group===");
                        console.dir(data);
                        genfunc.addLocalstorage('userGroups',$scope.userGroups,data);
                        // var obj = JSON.parse(localStorage.userGroups);
                        // obj.result.push(data.result);
                        // localStorage.userGroups = JSON.stringify(obj); 
                        // $scope.userGroups.push(data.result);    
                    }
                })
                .error(function(data, status, headers, config) {

                }); 
        },
        editGroup : function(_group){
            $scope.isEditing = true;
            $('.open-popup-new-group').magnificPopup('open'); 
            $scope.group = _group;
            $scope.group.mainTitle = "Edit Group";
        },
        saveGroup : function(){
            $scope.group.application = $rootScope.appId;
            $scope.isLoading = true;
            if($scope.isEditing){
                Request.put('/channels/'+ $scope.group._id, $scope.group, 
                {
                    'Authorization': 'Bearer ' + $rootScope.token,
                    'X-AL-Connect-ID':  $rootScope.session 
                })
                    .success(function(data, status, headers, config) {
                        
                        if (data.code == 200) {
                            $scope.isLoading = false;
                            console.log("save group=== from edit");
                            console.dir(data);
                        
                        }
                    })
                    .error(function(data, status, headers, config) {

                    }); 
            }else{
                $scope.group.channel_type = "group";
                Request.post('/channels', $scope.group, 
                {
                    'Authorization': 'Bearer ' + $rootScope.token,
                    'X-AL-Connect-ID':  $rootScope.session 
                })
                    .success(function(data, status, headers, config) {
                        
                        if (data.code == 200) {
                            $scope.isLoading = false;
                            console.log("save group===");
                            console.dir(data);
                            genfunc.addLocalstorage('userGroups',$scope.userGroups,data);
                            // var obj = JSON.parse(localStorage.userGroups);
                            // obj.result.push(data.result);
                            // localStorage.userGroups = JSON.stringify(obj); 
                            // $scope.userGroups.push(data.result);    
                        }
                    })
                    .error(function(data, status, headers, config) {

                    }); 
            }
           
        },
        deleteGroup : function(_group){
            $scope.userGroups = _.filter($scope.userGroups,function(v){
                return v._id != _group._id;
            });
            genfunc.modifyLocalstorage('userGroups',$scope.userGroups);

            console.log(_group._id);
            Request.delete('/channels/'+  _group._id, {}, 
            {
                'Authorization': 'Bearer ' + $rootScope.token,
                'X-AL-Connect-ID':  $rootScope.session 
            })
                .success(function(data, status, headers, config) {
                    
                    if (data.code == 200) {
                        $scope.isLoading = false;
                        console.log("delete group=== from edit");
                        console.dir(data);
                        
                    
                    }
                })
                .error(function(data, status, headers, config) {

                }); 


        },
        selectedChange : function(_selectedAll){
            _.each($scope.userGroups,function(v,k){
                v.selected = _selectedAll;
            });
        },
        deleteGroups : function(){
            let isSelectedOne = false;
            let _groups =[];
            _.each($scope.userGroups,function(v,k){
                if(v.selected){
                    isSelectedOne = true;
                    _groups.push(v._id);
                }
            });
            if(!isSelectedOne){
                alert("Please select at least one member");
                return;
            }

            $scope.userGroups = _.filter($scope.userGroups,function(v){
                return !v.selected;
            });
            genfunc.modifyLocalstorage('userGroups',$scope.userGroups);
            $scope.isLoading = true;
            
    
            Request.delete('/group/channels', 
            {  
                'groups': _groups
            }, 
            {
                'Authorization': 'Bearer ' + $rootScope.token,
                'X-AL-Connect-ID':  $rootScope.session 
            })
                .success(function(data, status, headers, config) {
                    
                    if (data.code == 200) {
                        $scope.isLoading = false;
                        console.log("deleteGroups ===");
                        console.dir(data);
                        //genfunc.updateLocalstorage(localStorage.userMembers,$scope.userMembers,data);
                        
                        // var obj = JSON.parse(localStorage.userMembers);
                        // obj.result.push(data.result);
                        // localStorage.userMembers = JSON.stringify(obj); 
                        // $scope.userMembers.push(data.result);

                        // $scope.memberCount = $scope.userMembers.length;
                    }
                })
                .error(function(data, status, headers, config) {

                });
        },
       
		getGroup : function(){
         
            Request.get('/group/channels', 
            {
                // 'data': data.encrypted
            }, {
                'Authorization': 'Bearer ' + $rootScope.token,
                'X-AL-Connect-ID':  $rootScope.session 
            })
                .success(function(data, status, headers, config) {
                   
                    if (data.code == 200) {
                      
                        console.log("groups===");
                        console.dir(data);
                        localStorage.userGroups = JSON.stringify(data);
                        $scope.userGroups = data.result;
                        
                    }
                })
                .error(function(data, status, headers, config) {
                    $scope.isLoading = false;
                });

        }
	}


	// initial block

	methods.init();

	
	
}])