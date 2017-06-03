var fs = require('fs');
var mkdirp = require('mkdirp');

 var mongoid = require('mongoid-js').mongoid;
 //  var id1 = mongoid();  
 exports.Id = function(){
 	return mongoid();
 }
  exports.ready = false;


var sleep = require('sleep');
var sha512 = require('js-sha512');


exports.Hash = function() {
  var args = Array.prototype.slice.call(arguments, 1);
  return sha512(args.join("/PATHDB?"));
}

exports.Save = function(path, data) {
  	var shell = JSON.stringify({data: data});
  	var ifdirpath = path.split("/");
  	delete ifdirpath[ifdirpath.length - 1]
  	//if is int or string
  	ifdirpath = ifdirpath.join("/");
  	if (!fs.existsSync(ifdirpath)) {
    // Do something
    	console.log(exec("mkdir  -p " + ifdirpath))
     }
  	fs.writeFile(path, shell, (err) => {
		 if (err) throw err;
		  console.log('The path has been saved!');
	});
}

exports.SaveID = function(path, data) {
  	var shell = JSON.stringify({data: data});

  	
  	if (!fs.existsSync(path)) {
    // Do something
   		 exec("mkdir  -p " + path)
     }
  	fs.writeFile(  path.replace(/\/$/, "") + "/" + data.id, shell, (err) => {
		 if (err) throw err;
		  console.log('The path has been saved!');
	});
}

exports.Lookf = function(path, queryfunc, cb){
		var ret = [];

	exports.Collection (path, function(data){
		if(!data) cb(false);

		for (var i = data.length - 1; i >= 0; i--) {
			var brick = data[i];
			if(queryfunc(brick)) ret.push(brick);
		};

		if(ret.length == 1){
			cb(ret[0])
		} else cb(ret);

	});
}

exports.Look = function(path, query, cb){
	var ret = [];


	exports.Collection (path, function(data){
		if(!data) cb(false);
	var querykeys = [];
	for (var key in query) {

   	 	if (query.hasOwnProperty(key)){
   	 		querykeys.push(key);
   	 	}
  
	}
		for (var i = data.length - 1; i >= 0; i--) {
			var brick = data[i];
			var fits = true;
			for (var b = querykeys.length - 1; b >= 0; b--) {
				
			if(fits){
				var key = querykeys[b];
		   	 	//console.log("key " +query[key])
		   	 	if(brick[key] != query[key]) fits = false;

		   	 }
		  
			}

			if(fits) ret.push(brick);
		};

		if(ret.length == 1){
			cb(ret[0])
		} else cb(ret);

	});
}

exports.Collection = function(path, cb){

	fs.readdir( path ,function(err,files){
		if(err){
			console.log(err);
			cb(false);
		} else {
			var ret = [];
			for (var i = files.length - 1; i >= 0; i--) {
				var data = exports.GetSync(path.replace(/\/$/, "") + "/" +  files[i] );
				data.created = new Date(data.created);
				ret.push(data);
			};
			cb(ret);
		}
	} ) ;

}

exports.Delete = function(path) {
  	fs.unlink(path, (err) => {
		 if (err) throw err;
		  console.log('The path has been removed!');
	});
}



exports.Get = function(path,cb){
	//readFileSync
		if (!fs.existsSync(path)) {
			cb( false);
		}
		fs.readFile(path, {},  (err, data) => {
		  if (err) throw err;
		 	cb(JSON.parse(data).data,path)
			} );
}

exports.GetSync = function(path){
	//readFileSync
		if (!fs.existsSync(path)) {
			return false;
		}
		return JSON.parse( fs.readFileSync(path, {}) ).data;
}


var exec = require("sync-exec");
exports['name'] = "Path DB";


console.log("Pouring cement!");
if (fs.existsSync("./models/")) {
	var files = fs.readdirSync( "./models/" ) 
	//console.log(files);    
        
        files.forEach( function( file, index ) {
        	if (fs.existsSync("./models/" + file) && file.indexOf(".js") == -1) {
        		var data = exports.GetSync("./models/" + file );
        			//console.log(path)
        			if(data){
        				
        				var initset = " ";
        				var vld = "";

        				if (fs.existsSync("./v-brick/" + file)) {
        					vld = "\n var validate = require('validate-fields')(), schema = {";
        					var types = exports.GetSync("./v-brick/" + file );
        					var namesets = [];
        					for (var i = data.length - 1; i >= 0; i--) {
        						namesets.push('"' + data[i] + '" : ' + types[i]);
        					};
        					vld += namesets.join(",");

        					vld += "}";
        					vld += "\n exports.isValid = function(brick){return validate(schema, brick); }";
        				}

        				for (var i = data.length - 1; i >= 0; i--) {
        					initset += "tmp['" + data[i] + "'] = " + data[i].replace(" ", "").replace("-","") + ";";
        					data[i] = data[i].replace(" ", "").replace("-","");
        				};

        				initset = "\n var mongoid = require('mongoid-js').mongoid; exports['" + file + "'] = function(" + data.join(",") + ") { var tmp = {id: mongoid(),created: new Date()};" + initset + " return tmp;}" + vld;
        				//exports[file] = eval(initset);


        			fs.writeFileSync( "./models/" + file + ".js", initset);
        		    exports[file] = eval('require("./models/" + file + ".js")[file]');
        		    if(vld != ""){
        		    	exports["v" + file] = eval('require("./models/" + file + ".js").isValid')
        		    }
						
        			
        			}
        		
        }
    } );
      //  exports.ready = true;


	sleep.sleep(3);
	//spinner.stop(true);
	//console.log("Path ready.");
}



