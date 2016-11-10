
// link this script
// <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.full.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"></script>

var ExcelToJSON = function() {

    this.parseExcel = function(file, callback,err) {
        var reader = new FileReader();

        reader.onload = function(e) {
            console.log(e);
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
            var header = [];
            workbook.SheetNames.forEach(function(sheetName) {
                // Here is your object
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var obj = XL_row_object[0];
                _.each(obj, function(v, k) {
                    if (k != "")
                        header.push(k);
                })

                var json_object = JSON.stringify(XL_row_object);
                console.log(json_object);
                json_object = json_object.replace(new RegExp('"":"",', 'g'), '');


                // console.log(json_object);

                // console.dir(header);

                var result = {
                    hearders: header,
                    data   : JSON.parse(json_object)
                }
                callback(result);

            })

        };

        reader.onerror = function(ex) {
        	err(ex);
            console.log(ex);
        };

        reader.readAsBinaryString(file);
    };
};