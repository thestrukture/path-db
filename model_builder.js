var prompt = require('prompt');
var path = require("./");
prompt.start();
 
  // 
  // Get two properties from the user: username and email 
  // 
  var tempvim = [];
  var tempvim2 = [];
  var name = "";
  var valcount = 0;

  var schema = {
    properties: {
      name: {
        pattern: /^[a-zA-Z\s\-]+$/,
        prompt: 'Property name. When you\'re finished enter d|D as the property name.',
        required: true
      }
    }
  };

if(process.argv[2] == "del"){
    path.Delete("./models/" + process.argv[3]  )

} else if(process.argv[2] == "val"){
      
      schema = {
    properties: {
      type: {
        pattern: /^[a-zA-Z\s\-]+$/,
        prompt: 'Property type. When you\'re finished enter d|D as the property name.',
        required: true
      }
    }
  };

     function TypeManager(){
        console.log("Updating property `" + tempvim[valcount] + "` type");
        prompt.get(schema, function (err, result) {
    // 
    // Log the results. 
    //    
    var nam = result.type.toLowerCase();

          if(nam == "d"){
            //save
            path.Save("./v-brick/" + name, tempvim2);


          } else {
              nam = result.type
              tempvim2.push(nam);
                 console.log('  type: ' + result.type + " saved to property " + tempvim[valcount] );
         
             
             valcount++;
             if(valcount == tempvim.length) {
               valcount = 0;
               console.log("Index set to 0. (reached max properties)");
             }
            TypeManager();
          }

        //  console.log('Command-line input received:');
        //  console.log('  name: ' + result.name);
         // console.log('  password: ' + result.password);
        });
    }

    console.log("Loading brick");
     name = process.argv[3] ;
  path.Get("./models/" + name, function(data){
 if(data){
   tempvim = data;
   console.log("Current brick properties:");
   console.log(tempvim.join("\n"))
   console.log("Please enter your brick's property types. When you\'re finished enter d|D as the type. Refer to https://www.npmjs.com/package/validate-fields for possible types'");
   
     TypeManager();
 } else console.log("brick not found");

});

} else {

if(process.argv[2] == "edit"){
  name = process.argv[3] ;
  console.log("Loading brick");
  path.Get("./models/" + name, function(data){
 if(data){
   tempvim = data;
   console.log("Current brick properties: **Input the same property to remove it.");
   console.log(tempvim.join("\n"))
   console.log("Please enter your brick's property names. When you\'re finished enter d|D as the name.'");
   
     TypeManager();
 } else console.log("brick not found");
});
  

}

  function TypeManager(){
        prompt.get(schema, function (err, result) {
    // 
    // Log the results. 
    //    
    var nam = result.name.toLowerCase();
          if(nam == "d"){
            //save
            path.Save("./models/" + name, tempvim);


          } else {
            if(tempvim.indexOf(nam) == -1 ){
              tempvim.push(nam);
                 console.log('  name: ' + result.name + " saved to brick " + name);
         
            } else {
               tempvim.splice(tempvim.indexOf(nam), 1);
               console.log('  name: ' + result.name + " removed");
            }
            TypeManager();
          }
        //  console.log('Command-line input received:');
        //  console.log('  name: ' + result.name);
         // console.log('  password: ' + result.password);
        });
  }
if(name == "")
  prompt.get(['brick name'], function (err, result) {
    // 
    // Log the results. 
    // 
  //  console.log('Command-line input received:');
   // console.log(result);
   console.log("Please enter your brick's property names. When you\'re finished enter d|D as the name.'");
    name = result['brick name'];
    TypeManager();
  });

}