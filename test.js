var path = require("./");

path.Save("entry/1/string", "string");
path.Save("entry/1/int", 10);
path.Save("entry/1/object", {object:"example"});
console.log(path.name);
console.log(path.Get("entry/1/object", function(data){
	//console.log(data);
	console.log("My brick generated with `cement cli`: ");
	var brick = path.Sample(true, false);
	console.log(brick);
	console.log("Validation check :");
	//Auto gen function format : vld<brick name>
	console.log(path.vSample(brick));
	console.log("Saving brick!")
	var hash = path.Hash("username", "password", "thirdtoken");
	path.Save("data/bricks/" + hash,brick);
	path.SaveID("data/bricks/", brick);

	//List collection in array
	console.log(path.Look("data/bricks",{},function(data){
		console.log("Result :");
		console.log(data);
	}));

}));
console.log("Hashing strings to determine unique user id.")
console.log(path.Hash("username", "password", "thirdtoken"));