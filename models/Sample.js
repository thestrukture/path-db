
 var mongoid = require('mongoid-js').mongoid; exports['Sample'] = function(keytwo,keythree) { var tmp = {id: mongoid(),created: new Date()}; tmp['key-three'] = keythree;tmp['key-two'] = keytwo; return tmp;}
 var validate = require('validate-fields')(), schema = {"key-three" : Boolean,"key-two" : Boolean}
 exports.isValid = function(brick){return validate(schema, brick); }