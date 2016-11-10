/*
 * @Author: yinseng
 * @Date:   2016-10-20 09:12:54
 * @Last Modified by:   yinseng
 * @Last Modified time: 2016-11-08 10:23:03
 */
app.controller('DashboardCtrl', ['$scope', '$rootScope', 'Request', 'genfunc', '$location', function($scope, $rootScope, Request, genfunc, $location) {
    $scope.importClick = function() {
        $("#importClick").trigger('click');
    }

    $scope.changeImport = function(element) {
        let count = 0;
        let file = element.files[0];
        var obj = new ExcelToJSON();
        obj.parseExcel(file, function(result) {

            if (count == 0) {
                console.log("========== result");
                console.dir(result);
                count = 1;

                let directories = [];


                _.each(result.data, function(v, k) {
                    let directory = {
                        'directory_name': v.name,
                        'description': v.decription,
                        'address': v.address,
                        'latitude': v.latitude,
                        'longitude': v.longitude,
                        'phone_numbers': methods.seperatePhone(v.phone),
                        'email_addresses': methods.seperateEmail(v.email),
                        'website': v.website,
                        'features': methods.seperate(v.Features),
                        'categories': methods.seperate(v.type),
                        'parkings': methods.seperate(v.parking),
                        'drinks': methods.seperate(v.drink),
                        'origin' : methods.seperate(v.origin),
                        'payment_methods': methods.seperate(v.payment_method),
                        'locale': {
                            'kh': {
                                'directory_name': v.name_kh,
                                'description': v.decription_kh,
                                'address': v.address_kh
                            }
                        },
                        'weekend_price': v.weekend - price,
                        'open_times': {
                            'monday': v.hour_Mon,
                            'tuesday': v.hour_Tue,
                            'wednesday': v.hour_Wed,
                            'thursday': v.hour_Thu,
                            'friday': v.hour_Fri,
                            'saturday': v.hour_Sat,
                            'sunday': v.hour_Sun
                        },
                        'socials': {
                            'facebook': v.facebook_page,
                            'google+': '',
                            'instagram': '',
                            'pinterest': ''
                        },
                        'location': v.Location,
                        'price_rate': v.price_standard
                    };


                    directories.push(directory);


                });


                console.log(directories);




                // $scope.headers = result.hearders;
                // $scope.excelData = result.data;
                // $scope.$apply();
                // $('.open-popup-matching-field').magnificPopup('open');
            }
        });
    }


    let methods = {
        seperatePhone: function(phone) {
            if (phone) {
                let split = phone.split("|");
                return split;
            }else{
                return [];
            }
           
        },
        seperateEmail: function(email) {
            if (phone) {
                let split = str.split("|");
                return split;
            }else{
                return [];
            }
        },
        seperate:function(str){
            if (str) {
                let split = str.split(",");
                return split;
            }else{
                return [];
            }
        }
      
    };


}])