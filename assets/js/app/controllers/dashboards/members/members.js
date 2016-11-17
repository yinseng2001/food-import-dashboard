/*
 * @Author: yinseng
 * @Date:   2016-10-18 10:17:32
 * @Last Modified by:   yinseng
 * @Last Modified time: 2016-10-29 13:20:07
 */
app.controller('MembersCtrl', ['$scope', '$rootScope', '$localStorage', 'Request', 'genfunc', '$location', '$timeout', function($scope, $rootScope, $localStorage, Request, genfunc, $location, $timeout) {

    $scope.newMember = function() {
        methods.newMember();
    }

    $scope.saveMember = function() {
        methods.saveMember();
    }

    $scope.editMember = function(_member) {
        methods.editMember(_member);
    }

    $scope.searchChange = function() {
        methods.searchChange();
    }

    $scope.selectedChange = function(selectedAll) {
        methods.selectedChange(selectedAll);
    }

    $scope.deleteMember = function(_member) {
        methods.deleteMember(_member);
    }

    $scope.deleteMembers = function() {
        methods.deleteMembers();
    }

    $scope.paginationChange = function() {
        methods.paginationChange();
    }

    $scope.importClick = function() {
        methods.importClick();
    }

    $scope.import = function() {
        methods.import();
    }


    $scope.changeImport = function(element) {
        methods.changeImport(element);
    }

    $scope.deleteField = function(field){
        methods.deleteField(field);
    }
        /*
        $scope.newGroup = function(){
            methods.newGroup();
        }
        $scope.saveGroup = function(){
            methods.saveGroup();
        }
        $scope.updateGroup = function(){
            methods.updateGroup();
        }
        $scope.addMembersToGroup = function(){
            methods.addMembersToGroup();
        }
        */

    // $scope.convertLocalDate = function(_date){
    //     return genfunc.convertLocalDate(_date);
    // }

    var methods = {
        init: function() {
            $rootScope.token = genfunc.getToken();
            $rootScope.session = genfunc.getSessionId();
            $rootScope.appId = genfunc.getApplicationId();
            $scope.genfunc = genfunc;
            $rootScope.isShowMyApp = false;
            $scope.isNonSelectGroup = true;
            $scope.currentPage = 1;
            genfunc.getNavPath();

            // localStorage.userMembers = null;
            // delete localStorage.userMembers;

            if (localStorage.userMembers)
                $scope.userMembers = methods.getMembersLocal($scope.currentPage); // JSON.parse(localStorage.userMembers).result;
            // if(localStorage.userGroups) 
            //     $scope.userGroups = JSON.parse(localStorage.userGroups).result;
            if ($scope.userMembers)
                $scope.memberCount = $scope.userMembers.length;

            methods.getMembers();
            methods.getGroups();

            $(document).ready(function() {
                $('.open-popup-new-member').magnificPopup({
                    type: 'inline',
                    closeBtnInside: true,
                    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
                });
                $('.open-popup-new-group').magnificPopup({
                    type: 'inline',
                    closeBtnInside: true,
                    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
                });
                $('.open-popup-matching-field').magnificPopup({
                    type: 'inline',
                    closeBtnInside: true,
                    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
                });

            });

            $scope.dragControlListeners = {
                accept: function(sourceItemHandleScope, destSortableScope) {
                    return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
                }, //override to determine drag is allowed or not. default is true.
                
                // orderChanged: function(event) {},
                // containment: '#board',
                // clone: true,
                // allowDuplicates: false //optional param allows duplicates to be dropped.
            };


            $scope.sortableOptions = {
                containment: '#board',
                //restrict move across columns. move only within column.
                accept: function (sourceItemHandleScope, destSortableScope) {
                    return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
                }
            };


        },
        importClick: function() {
            $("#importClick").trigger('click');
        },
        deleteField : function(field){
            $scope.user_fields = _.filter( $scope.user_fields,function(_field){
                return _field.name != field.name;
            });
        },
        import: function() {
            if($scope.headers.length != $scope.user_fields.length) {
                alert("The user defined field if not match with excel field");
                return ;
            }
            // prepare data
            let data = [];
            _.each($scope.excelData,function(v,k){
                console.log(v);
                let object = {};
                _.each($scope.headers , function(_v,_k){
                    object[$scope.user_fields[_k].key] = v[_v];
                });
                data.push(object);
            });

            console.log("result import final ");
            console.log(data);
        },
        changeImport: function(element) {
            console.log("changeImport");
            $scope.user_fields = [
                {
                    'id': 'name',
                    'name': 'Customer Name',
                    'key' : 'name'
                },
                {
                    'id': 'phone',
                    'name': 'Phone Number',
                    'key' : 'phone_number'
                },
                {
                    'id': 'code',
                    'name': 'Country Code',
                    'key' : 'country_code'
                },
                {
                    'id': 'email',
                    'name': 'Email',
                    'key': 'email'
                },
                {
                    'id': 'gender',
                    'name': 'Gender',
                    'key' : 'sex'
                },
                {
                    'id': 'dob',
                    'name': 'Date of Birth',
                    'key' : 'date_of_birth'
                },
                {
                    'id': 'type',
                    'name': 'Type',
                    'key' : 'type'
                },
                {
                    'id': 'remark',
                    'name': 'Remark',
                    'key' : 'remark'
                },
            
            ];
            let count = 0 ;            
            let file = element.files[0];
            var obj = new ExcelToJSON();
            obj.parseExcel(file, function(result) {
               
                if(count == 0){
                    console.log("========== result");
                    console.dir(result);
                    console.log(count);
                    count = 1;
                    $scope.headers = result.hearders;
                    $scope.excelData = result.data;
                    $scope.$apply();
                    $('.open-popup-matching-field').magnificPopup('open');
                }
            });
        },
        getMembers: function() {
            console.log("getMembers request");
            if (!methods.checkExistMemberLocal($scope.currentPage))
                $scope.isLoading = true;
            Request.get('/members/user?limit=' + 10 + '&offset=' + (10 * ($scope.currentPage - 1)), {
                    // 'data': data.encrypted
                }, {
                    'Authorization': 'Bearer ' + $rootScope.token,
                    'X-AL-Connect-ID': $rootScope.session
                })
                .success(function(data, status, headers, config) {

                    if (data.code == 200) {
                        $scope.isLoading = false;
                        console.log("members===");
                        console.dir(data);
                        // localStorage.userMembers = JSON.stringify(data); 
                        methods.setMembersLocal($scope.currentPage, data.result);
                        $scope.userMembers = data.result;
                        $scope.memberCount = data.options.total;
                    }
                })
                .error(function(data, status, headers, config) {

                });

        },
        newMember: function() {
            $scope.isEditing = false;
            $scope.member = {};
            $scope.member.mainTitle = "New Member";
            $('.open-popup-new-member').magnificPopup('open');
        },
        saveMember: function() {
            $scope.isLoading = true;
            if ($scope.isEditing) { // save from edit member
                methods.editMembersLocal($scope.currentPage);
                Request.put('/members/' + $scope.member._id, $scope.member, {
                        'Authorization': 'Bearer ' + $rootScope.token,
                        'X-AL-Connect-ID': $rootScope.session
                    })
                    .success(function(data, status, headers, config) {

                        if (data.code == 200) {
                            $scope.isLoading = false;
                            // genfunc.addLocalstorage('userMembers',$scope.userMembers,data);

                            console.log("save members===");
                            console.dir(data);
                        }
                    })
                    .error(function(data, status, headers, config) {

                    });
            } else { // save from new member
                $scope.member.application = $rootScope.appId;
                $scope.userMembers.push($scope.member);

                Request.post('/members/user', $scope.member, {
                        'Authorization': 'Bearer ' + $rootScope.token,
                        'X-AL-Connect-ID': $rootScope.session
                    })
                    .success(function(data, status, headers, config) {

                        if (data.code == 200) {
                            $scope.isLoading = false;
                            console.log("save members===");
                            console.dir(data);
                            methods.setMembersLocal($scope.currentPage, $scope.userMembers);
                            // genfunc.addLocalstorage('userMembers',$scope.userMembers,data);
                            // var obj = JSON.parse(localStorage.userMembers);
                            // obj.result.push(data.result);
                            // localStorage.userMembers = JSON.stringify(obj); 
                            // $scope.userMembers.push(data.result);

                            // $scope.memberCount = $scope.userMembers.length;
                        }
                    })
                    .error(function(data, status, headers, config) {

                    });
            }

        },
        editMember: function(_member) {
            $scope.isEditing = true;
            $scope.member = _member;
            $scope.member.date_of_birth = moment(_member.date_of_birth);
            // vm.options = {format: 'YYYY/MM/DD HH:mm', showClear: true};
            $scope.member.mainTitle = "Edit Member";
            $('.open-popup-new-member').magnificPopup('open');
        },
        deleteMember: function(_member) {
            methods.deleteMember($scope.currentPage, _member);
            Request.delete('/members/' + _member._id, {}, {
                    'Authorization': 'Bearer ' + $rootScope.token,
                    'X-AL-Connect-ID': $rootScope.session
                })
                .success(function(data, status, headers, config) {

                    if (data.code == 200) {
                        console.log("deleteMember ===");
                        console.dir(data);
                        //genfunc.updateLocalstorage(localStorage.userMembers,$scope.userMembers,data);

                    }
                })
                .error(function(data, status, headers, config) {

                });
        },
        deleteMembers: function() {

            let isSelectedOne = false;
            let _members = [];
            _.each($scope.userMembers, function(v, k) {
                if (v.selected) {
                    isSelectedOne = true;
                    _members.push(v._id);
                }
            });
            if (!isSelectedOne) {
                alert("Please select at least one member");
                return;
            }

            $scope.userMembers = _.filter($scope.userMembers, function(v) {
                return !v.selected;
            });
            genfunc.modifyLocalstorage('userMembers', $scope.userMembers);
            $scope.isLoadingDelete = true;

            Request.delete('/members', {
                    'members': _members
                }, {
                    'Authorization': 'Bearer ' + $rootScope.token,
                    'X-AL-Connect-ID': $rootScope.session
                })
                .success(function(data, status, headers, config) {

                    if (data.code == 200) {
                        $scope.isLoadingDelete = false;
                        console.log("addMembersToGroup ===");
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
        paginationChange: function() {
            console.log($scope.currentPage);
            if (localStorage.userMembers) {
                $scope.userMembers = methods.getMembersLocal($scope.currentPage);
            }
            methods.getMembers();
        },
        setMembersLocal: function(index, data) {
            //[0] : []
            let obj;
            if (localStorage.userMembers)
                obj = JSON.parse(localStorage.userMembers);
            else
                obj = [];
            obj[index] = data;
            localStorage.userMembers = JSON.stringify(obj);
        },
        getMembersLocal: function(index) {
            let obj = JSON.parse(localStorage.userMembers);
            if (obj[index])
                return obj[index];
        },
        editMembersLocal: function(index) {
            methods.setMembersLocal(index, $scope.userMembers);
        },
        deleteMembersLocal: function(index, _member) {
            let obj = JSON.parse(localStorage.userMembers);
            if (obj[index]) {
                $scope.userMembers = _.filter($scope.userMembers, function(mem) {
                    return mem._id != _member._id;
                });
                methods.setMembersLocal(index, $scope.userMembers);
            }
        },
        checkExistMemberLocal: function(index) {
            let check = false;
            if (localStorage.userMembers) {
                let obj = JSON.parse(localStorage.userMembers);
                if (obj[index]) {
                    check = true;
                }
            }
            return check;
        },
        getGroups: function() {
            Request.get('/group/channels', {
                    // 'data': data.encrypted
                }, {
                    'Authorization': 'Bearer ' + $rootScope.token,
                    'X-AL-Connect-ID': $rootScope.session
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

                });
        },

        newGroup: function() {

            $('.open-popup-new-group').magnificPopup('open');
        },
        saveGroup: function() {
            $scope.group.application = $rootScope.appId;
            $scope.group.channel_type = "group";
            $scope.isLoading = true;
            Request.post('/channels', $scope.group, {
                    'Authorization': 'Bearer ' + $rootScope.token,
                    'X-AL-Connect-ID': $rootScope.session
                })
                .success(function(data, status, headers, config) {

                    if (data.code == 200) {
                        $scope.isLoading = false;
                        console.log("save group===");
                        console.dir(data);
                        genfunc.updateLocalstorage(localStorage.userGroups, $scope.userGroups, data);

                    }
                })
                .error(function(data, status, headers, config) {

                });
        },
        getNonGroupMember: function(_channel) {
            $scope.isLoading = true;
            Request.get('/group/channels/' + _channel._id + '/non-members', {
                    // 'data': data.encrypted
                }, {
                    'Authorization': 'Bearer ' + $rootScope.token,
                    'X-AL-Connect-ID': $rootScope.session
                })
                .success(function(data, status, headers, config) {

                    if (data.code == 200) {
                        $timeout(function() {
                            $scope.isLoading = false;
                        }, 1000);

                        $scope.userMembers = data.result;
                        console.log("getNonGroupMember===");
                        console.dir(data);

                    }
                })
                .error(function(data, status, headers, config) {

                });
        },
        updateGroup: function() {
            if ($scope.selectedGroup) {
                if (!$scope.selectedGroup._id) {
                    $scope.isNonSelectGroup = true;
                    $scope.userMembers = JSON.parse(localStorage.userMembers).result;
                } else {
                    $scope.isNonSelectGroup = false;
                    methods.getNonGroupMember($scope.selectedGroup);
                }
            } else {
                $scope.isNonSelectGroup = true;
                $scope.userMembers = JSON.parse(localStorage.userMembers).result;
            }
        },
        addMembersToGroup: function() {
            if ($scope.isNonSelectGroup) {
                alert("Please select group to add");
                return;
            }

            let isSelectedOne = false;
            let _members = [];
            _.each($scope.userMembers, function(v, k) {
                if (v.selected) {
                    isSelectedOne = true;
                    _members.push(v._id);
                }
            });
            if (!isSelectedOne) {
                alert("Please select at least one member");
                return;
            }

            $scope.userMembers = _.filter($scope.userMembers, function(v) {
                return !v.selected;
            });

            $scope.isLoading = true;

            Request.post('/channels/' + $scope.selectedGroup._id + '/add/members', {
                    'members': _members
                }, {
                    'Authorization': 'Bearer ' + $rootScope.token,
                    'X-AL-Connect-ID': $rootScope.session
                })
                .success(function(data, status, headers, config) {

                    if (data.code == 200) {
                        $scope.isLoading = false;
                        console.log("addMembersToGroup ===");
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

        deleteMembersFromGroup: function() {
            // if($scope.isNonSelectGroup) {
            //     alert("Please select group to add");
            //     return;
            // }

            // let isSelectedOne = false;
            // let _members =[];
            // _.each($scope.userMembers,function(v,k){
            //     if(v.selected){
            //         isSelectedOne = true;
            //         _members.push(v._id);
            //     }
            // });
            // if(!isSelectedOne){
            //     alert("Please select at least one member");
            //     return;
            // }

            // $scope.userMembers = _.filter($scope.userMembers,function(v){
            //     return !v.selected;
            // });

            // $scope.isLoading = true;


            // Request.delete('/channels/'+$scope.selectedGroup._id+'/members', 
            // {  
            //     'members': _members
            // }, 
            // {
            //     'Authorization': 'Bearer ' + $rootScope.token,
            //     'X-AL-Connect-ID':  $rootScope.session 
            // })
            //     .success(function(data, status, headers, config) {

            //         if (data.code == 200) {
            //             $scope.isLoading = false;
            //             console.log("addMembersToGroup ===");
            //             console.dir(data);
            //             //genfunc.updateLocalstorage(localStorage.userMembers,$scope.userMembers,data);


            //             // $scope.memberCount = $scope.userMembers.length;
            //         }
            //     })
            //     .error(function(data, status, headers, config) {

            //     });
        },

        selectedChange: function(selectedAll) {
            _.each($scope.userMembers, function(v, k) {
                v.selected = selectedAll;
            });
        },
        searchChange: function() {
            if ($scope._timeout) { // if there is already a timeout in process cancel it
                $timeout.cancel($scope._timeout);
            }
            $scope._timeout = $timeout(function() {
                let isFiltering = false;
                let query = '';

                if ($scope.filter.search) {
                    isFiltering = true;
                    query = 'search=' + $scope.filter.search;
                }

                if ($scope.filter.ageFrom) {
                    let and = '&';
                    let q = 'ageFrom=' + $scope.filter.ageFrom;
                    if (isFiltering)
                        query += and + q;
                    else
                        query += q;
                    isFiltering = true;
                }

                if ($scope.filter.ageTo) {
                    let and = '&';
                    let q = 'ageTo=' + $scope.filter.ageTo;
                    if (isFiltering)
                        query += and + q;
                    else
                        query += q;
                    isFiltering = true;
                }

                if ($scope.filter.type) {
                    let and = '&';
                    let q = 'type=' + $scope.filter.type;
                    if (isFiltering)
                        query += and + q;
                    else
                        query += q;
                    isFiltering = true;
                }


                if (isFiltering) {
                    query = '?' + query;
                } else {
                    if (localStorage.userMembers)
                        $scope.userMembers = JSON.parse(localStorage.userMembers).result;
                    $scope._timeout = null;
                    return;
                }
                Request.get('/members/filter' + query, {
                        // 'data': data.encrypted
                    }, {
                        'Authorization': 'Bearer ' + $rootScope.token,
                        'X-AL-Connect-ID': $rootScope.session
                    })
                    .success(function(data, status, headers, config) {

                        if (data.code == 200) {
                            console.log("filter===");
                            console.dir(data);
                            $scope.userMembers = data.result;
                            $scope.memberCount = $scope.userMembers.length;
                        }
                    })
                    .error(function(data, status, headers, config) {

                    });
                $scope._timeout = null;
            }, 500);

        }
    }


    // initial block

    methods.init();



}])