rest-api-sdk-javascript
=================

Hover API Rest SDK for JavaScript

Welcome to the Hover SDK for JavaScript, this SDK is for building a robust JavaScript application based on the Hover API. The Hover SDK for JavaScript makes it easy to integrate a full Hover API services into javascript (NodeJS) apps. 

SDK Integration
===============

In order to integrate the SDK into your node.js project follow the next steps:

* Add dependency 'thehover-rest-sdk' to your `package.json` file.

* Require 'thehover-rest-sdk' in your script

	```javascript
		var thehover_sdk = require('thehover-rest-sdk');
	```
	
* Configure SDK, by providing the required parameters:

	```javascript
		thehover_sdk.configure({'endpoint':'127.0.0.1', 
					'port':'80',
					'api-version':'v1',
					'ckey':'your-ckey'});
	```

	All configure options available are:
	
	* connection_timeout - the timeout to wait a request
	* connection_readtimeout - the timeout to read response
	* endpoint - the dns or ip for The Hover API (default to our sandbox cloud) 
	* port - the port for The Hover API (default to our sandbox)
	* api_version - the version of API (defualt v1)
	* ckey - your client secret token key to access the API 
	* branch_id - the branch id of your SUPER BLUE USER
	* user_id - the user id of your SUPER BLUE USER
	
* Invoke API

	```javascript
		thehover_sdk.profiles.fetch(profile, function(error, cb) {
        	    if (error) {
                 	console.log(error);
                	throw error;
        	    } else {
                	console.log('Received response: ' + cb.response);
        	});
	```
* Function Index

Function | Parameters
-------- | ---------- 
**[version](#version)** | none | returns sdk version
**[configure](#configure)** | options - a json with configurable options for the sdk | configure env for sdk
**[profiles.create](http://docs.hoverapi.apiary.io/#profiles)** | req_data - json, callback - function to return response
**[profiles.update](http://docs.hoverapi.apiary.io/#profiles)** | req_data - json, callback - function to return response
**[profiles.fetch](http://docs.hoverapi.apiary.io/#profiles)** | req_data - json, callback - function to return response
**[object.create](http://docs.hoverapi.apiary.io/#user)** | req_data - json, callback - function to return response
**[object.update](http://docs.hoverapi.apiary.io/#user)** | req_data - json, callback - function to return response
**[object.fetch](http://docs.hoverapi.apiary.io/#user)** | req_data - json, callback - function to return response
**[object.search {deprecated}](http://docs.hoverapi.apiary.io/#search)** | req_data - json, callback - function to return response
**[object.query](http://docs.hoverapi.apiary.io/#usersearchthql)** | req_data - json, callback - function to return response
**[object.availability](http://docs.hoverapi.apiary.io/#useravailability)** | req_data - json, callback - function to return response
**[object.isColor](http://docs.hoverapi.apiary.io/#usercolor)** | req_data - json, callback - function to return response
**[object.login](http://docs.hoverapi.apiary.io/#userlogin)** | req_data - json, callback - function to return response
**[object.changePassword](http://docs.hoverapi.apiary.io/#userloginchangepassword)** | req_data - json, callback - function to return response
**[merge.create](http://docs.hoverapi.apiary.io/#usermerge)** | req_data - json, callback - function to return response
**[merge.update](http://docs.hoverapi.apiary.io/#usermerge)** | req_data - json, callback - function to return response
**[merge.fetch](http://docs.hoverapi.apiary.io/#usermerge)** | req_data - json, callback - function to return response
**[notification.create](http://docs.hoverapi.apiary.io/#usernotifications)** | req_data - json, callback - function to return response
**[notification.update](http://docs.hoverapi.apiary.io/#usernotifications)** | req_data - json, callback - function to return response
**[notification.fetch](http://docs.hoverapi.apiary.io/#usernotifications)** | req_data - json, callback - function to return response
**[notification.fetchById](http://docs.hoverapi.apiary.io/#usernotifications)** | req_data - json, callback - function to return response
**[tags.create](http://docs.hoverapi.apiary.io/#usertags)** | req_data - json, callback - function to return response
**[tags.update](http://docs.hoverapi.apiary.io/#usertags)** | req_data - json, callback - function to return response
**[tags.fetch](http://docs.hoverapi.apiary.io/#usertags)** | req_data - json, callback - function to return response
**[nfc.assign](http://docs.hoverapi.apiary.io/#usernfccard)** | req_data - json, callback - function to return response
**[nfc.update](http://docs.hoverapi.apiary.io/#usernfccard)** | req_data - json, callback - function to return response
**[nfc.fetch](http://docs.hoverapi.apiary.io/#usernfccard)** | req_data - json, callback - function to return response
**[nfc.search](http://docs.hoverapi.apiary.io/#searchnfc)** | req_data - json, callback - function to return response
**[group.create](http://docs.hoverapi.apiary.io/#groups)** | req_data - json, callback - function to return response
**[group.update](http://docs.hoverapi.apiary.io/#groups)** | req_data - json, callback - function to return response
**[group.fetch](http://docs.hoverapi.apiary.io/#groups)** | req_data - json, callback - function to return response
**[file.updload](http://docs.hoverapi.apiary.io/#userfile)** | req_data - json, callback - function to return response
**[file.fetch](http://docs.hoverapi.apiary.io/#userfile)** | req_data - json, callback - function to return response
**[geospatial.create](http://docs.hoverapi.apiary.io/#reference/geospatial)** | req_data - json, callback - function to return response
**[geospatial.update](http://docs.hoverapi.apiary.io/#reference/geospatial)** | req_data - json, callback - function to return response
**[geospatial.filter](http://docs.hoverapi.apiary.io/#reference/geospatial)** | req_data - json, callback - function to return response
**[metric.create](http://docs.hoverapi.apiary.io/#useraction)** | req_data - json, callback - function to return response
**[metric.fetch](http://docs.hoverapi.apiary.io/#useraction)** | req_data - json, callback - function to return response

About
=====

You can find more info about courses of how to use the API, SDKs or integration of The Hover into your app,
visiting us at: http://www.thehover.com or mail us: thehover@hovanetworks.com
