> Path DB

-------

NodeJS local database module.

![enter image description here](https://github.com/thestrukture/path-db/raw/master/logo.png)


# What is Path DB?

A database server without the actual server. Path DB runs with your nodejs app : Starts when your app starts and stops when your app is closed. Path DB relies heavily on current Unix/Dos norms to enable its functionality without an actual process.
Path DB is also shipped with `cement`, a cli tool used to generate object schemas a.k.a bricks.

> ### What is  a `brick`?
> 
> A brick is your usual javascript object schema.


## Nav

1. [Install](#install)
2. [Setup](#setup)
3. [Searching](#searching)
	- [Look](#look)
	- [Collection](#collection)
	- [sortKey](#sortkey)
	- [limit](#limit)
	- [skip](#skip) 
4. [Cement cli](#cement)
- [Commands](#commands)
5. [Bricks](#bricks)

# Install


----------


> npm install path-db

With `cement` cli tool : 

> npm install -g path-db

# Setup


----------

Add this module to your NodeJS server/program.

> var path = require("path-db");

# Path 101


----------


#### Save path

> path.Save("entry/1/string", "string"); 
> path.Save("entry/1/int", 10);
> path.Save("entry/1/object", {object:"example"});

#### Get path

> path.Get("entry/1/object", function(data){ 	
> if(data){
> 	       console.log(data);	  
>  } 
>  });

#### Delete path

> path.Delete("entry/1/string");


# Searching


----------


Here is a set of helper functions to help you look through your `path-db` collections.

## Look

Lookup a path. If one result is found an object will be returned instead of an array.



Example :

> path.Look("data/bricks",{property-to-find : 'value'},function(data){   
> /* Data is object or array */ 
> } );

You may also use `Lookf` to use a function instead of an object to query with. 

Example :

Declaration of function :

> function compare(brick){
>  	if(brick[property-to-find] > 29) return true;
> return false; }

Execution :

> path.Look("data/bricks",compare,function(data){   
> /* Data is object or array */ 
> } );

## Collection

Return all of the paths on a given collection.

Example :

> path.Collection("data/bricks",function(data){ 
> console.log(data); 
> });

## sortKey

Sort array in ascending order with specified property-name to use during classification.

Example :

> path.Look("data/bricks",{},function(data){
> console.log(data.sortKey("created"));
> } );

## Limit

Limit the size of your array.

Example :

> path.Look("data/bricks",{},function(data){
> console.log(data.limit(2)); // limit to 2
> } );

## Skip

Skip entries by the specified int, therefore resizing your array,

> path.Look("data/bricks",{},function(data){
> console.log(data.skip(2)); // start at index 2
> } );

# Cement


----------


Cement is a cli tool that creates models.

## Commands

### Create Brick

Simply run, the module will guide the rest.
	
	$ cement


### Edit Brick

	$ cement edit <brick name>

### Set types

Please refer to [https://www.npmjs.com/package/validate-fields#other-types](https://www.npmjs.com/package/validate-fields#other-types)  for possible types.

	$ cement val <brick name>

### Delete Brick

	$ cement del <brick name>


# Bricks

Here is how path-db makes your `cement` models available to your NodeJS app.

Initialize a brick

> var brick = path.`<Brick name>`(property-1, property-2...);

Your brick will have two extra properties : `id` : Unique item id. `created` : Date object of when this object was created.

Validate a brick

** It is crucial to add the `v` prefix prior to your Brick name.

> console.log(path.v`<Brick name>`(brick));

	

This function will return a `boolean` based on validation success.
