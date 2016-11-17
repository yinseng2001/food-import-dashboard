
// link this script
// <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.full.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"></script>

var ExcelToJSON = function() {

    this.parseExcel = function(file, callback,err,sheet_name) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
            var header = [];
            workbook.SheetNames.forEach(function(sheetName) {
                if(sheet_name){
                    if(sheet_name == sheet_name){
                        header = [];
                    }
                }
                 // Here is your object
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var obj = XL_row_object[0];
                _.each(obj, function(v, k) {
                    if (k != "")
                        header.push(k);
                })

                var json_object = JSON.stringify(XL_row_object);
                json_object = json_object.replace(new RegExp('"":"",', 'g'), '');

                var result = {
                    hearders: header,
                    data   : JSON.parse(json_object)
                }
                console.log(sheetName);
                if(sheet_name){
                    if(sheet_name == sheet_name){
                        callback(result);
                    }
                }else{
                    callback(result);
                }
            
            })

        };

        reader.onerror = function(ex) {
        	err(ex);
            console.log(ex);
        };

        reader.readAsBinaryString(file);
    };
};