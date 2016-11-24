/*
 * @Author: yinseng
 * @Date:   2016-10-20 09:12:54
 * @Last Modified by:   yinseng
 * @Last Modified time: 2016-11-12 10:21:08
 */
app.controller('DashboardCtrl', ['$scope', '$rootScope', 'Request', 'genfunc', '$location', function($scope, $rootScope, Request, genfunc, $location) {
    $scope.importClick = function() {
        $("#importClick").trigger('click');
    }
    $scope.importLocationClick = function() {
        $("#importClickLocation").trigger('click');
    }

    $scope.changeImport = function(element) {
        let count = 0;
        let file = element.files[0];
        let obj = new ExcelToJSON();
        let sheetName = 'Entry';
        obj.parseExcel(file, function(result) {
            count++;
            if (count == 1) {
                console.log("========== result");
                console.dir(result);
                let directories = [];
                _.each(result.data, function(v, k) {
                    if (v.address != 'address') {
                        let directory = {
                            'directory_name': v.name || 'import',
                            'description': v.decription || 'import',
                            'short_description' : '',
                            'address': v.address || 'import',
                            'latitude': v.latitude * 1.0 || 0.0,
                            'longitude': v.longitude * 1.0 || 0.0,
                            'phone_numbers': methods.seperatePhone(v.phone) || '',
                            'email_addresses': methods.seperateEmail(v.email) || '',
                            'website': v.website || '',
                            'features': methods.seperate(v.Features) ,
                            'categories': methods.seperate(v.type),
                            'parkings': methods.seperate(v.parking),
                            'drinks': methods.seperate(v.drink),
                            'origins': methods.seperate(v.origin),
                            'foods': methods.seperate(v.menu),
                            'payment_methods': methods.seperate(v.payment_method),
                            'locale': {
                                'kh': {
                                    'directory_name': v.name_kh || '',
                                    'description': v.decription_kh || '',
                                    'address': v.address_kh || ''
                                }
                            },
                            'weekend_price': v['weekend-price'] || '',
                            'open_times': {
                                'monday': v.hour_Mon || '',
                                'tuesday': v.hour_Tue || '',
                                'wednesday': v.hour_Wed || '',
                                'thursday': v.hour_Thu || '',
                                'friday': v.hour_Fri || '',
                                'saturday': v.hour_Sat || '',
                                'sunday': v.hour_Sun || ''
                            },
                            'socials': {
                                'facebook': v.facebook_page || '',
                                'google+': '',
                                'instagram': '',
                                'pinterest': ''
                            },
                            'location': v.Location || '',
                            'price_standard' : v.price_standard || '',
                            'price_rate':  0
                        };
                        directories.push(directory);
                    }

                });

                var token     = genfunc.getToken();
                var session   = genfunc.getSessionId();

                console.log(token,session);

                console.log(directories);
             
                Request.post('/admin/directories/multi', 
                {
                    'directories': directories
                }, {
                    'Authorization': 'Bearer ' + token,
                    'X-HH-Connect-ID':  session ,
                    'X-HH-Request-ID': 'YjgyMDRlODIzMzk4NTFhZGE4YzFhZjZmOWQ2YWU3MTdjOWY2YzM3NDFmNjU3NDJjNDEzMWNlNDZhMjRlMGJhYQ==' 
                })
                .success(function(data, status, headers, config) {
                    if (data.code == 200) {
                        console.log("============= finish");
                        console.dir(data);
                    }
                })
                .error(genfunc.onError);


            }
        }, function(err) {}, sheetName);
    }

    location:[ {
        province : 'phnom penh',
        district : [{
            district : 'mean chey',
            commune : [{

            }]
        }],
    }]

    $scope.changeImportLocation = function(element) {
        let count = 0;
        let file = element.files[0];
        let obj = new ExcelToJSON();
        let sheetName = 'Entry';
        obj.parseExcel(file, function(result) {
            count++;
            if (count == 3) {
                console.log("========== result");
                console.dir(result);
                let locations = [];
                let province_name = '';
                let district_name = '';
                let province = {};
                let district = {};
                let commune = {};
                _.each(result.data, function(v, k) {

                    if(province_name.trim() != v.Province.trim()){
                        if(district.district) {
                            province.district.push(district);
                            locations.push(province);
                        }

                        province_name = v.Province;
                        province = {
                            province : v.Province.trim(),
                            district : []
                        }

                        // district
                        district_name = v['District/City/Khan'].trim();
                        district = {
                            district : v['District/City/Khan'].trim() ,
                            commune : []
                        }

                        // conmmune

                        commune  = {
                            commune : v['Commune/Sangkat'].trim()
                        }


                        district.commune.push(commune);
                        console.log(district);
                      

                    }else{
                        // push district
                        if(district_name.trim() != v['District/City/Khan'].trim()){
                            province.district.push(district);


                            district_name = v['District/City/Khan'].trim();
                            district = {
                                district : v['District/City/Khan'].trim() ,
                                commune : []
                            }

                            commune  = {
                                commune : v['Commune/Sangkat'].trim()
                            }

                            district.commune.push(commune);
                        }else{
                            // push commune
                            commune  = {
                                commune : v['Commune/Sangkat'].trim()
                            }
                            district.commune.push(commune);
                        }
                    }


                    // let location = {
                    //     'province': v.Province || 'import',
                    //     'district': v['District/City/Khan'] || 'import',
                    //     'commune' : v['Commune/Sangkat'] || 'import'
                        
                    // };
                    // locations.push(location);

                });

                var token     = genfunc.getToken();
                var session   = genfunc.getSessionId();

                console.log(token,session);

                console.log(locations);

             
                Request.post('/admin/locations/multi', 
                {
                    'locations': locations.slice(0, 1000)
                }, {
                    'Authorization': 'Bearer ' + token,
                    'X-HH-Connect-ID':  session ,
                    'X-HH-Request-ID': 'YjgyMDRlODIzMzk4NTFhZGE4YzFhZjZmOWQ2YWU3MTdjOWY2YzM3NDFmNjU3NDJjNDEzMWNlNDZhMjRlMGJhYQ==' 
                })
                .success(function(data, status, headers, config) {
                    if (data.code == 200) {
                        console.log("============= finish");
                        console.dir(data);
                    }
                })
                .error(genfunc.onError);


            }
        }, function(err) {}, sheetName);
    }


    let methods = {
        seperatePhone: function(phone) {
            if (phone) {
                let split = phone.split(",");
                return split;
            } else {
                return [];
            }

        },
        seperateEmail: function(email) {
            if (email) {
                let split = email.split(",");
                return split;
            } else {
                return [];
            }
        },
        seperate: function(str) {
            if (str) {
                let split = str.split(",");
                return split;
            } else {
                return [];
            }
        }

    };


}])