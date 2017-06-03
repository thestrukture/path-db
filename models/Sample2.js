
 var mongoid = require('mongoid-js').mongoid; exports['Sample2'] = function(age,zipcode) { var tmp = {id: mongoid(),created: new Date()}; tmp['zipcode'] = zipcode;tmp['age'] = age; return tmp;}