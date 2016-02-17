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
**[users.create](http://docs.hoverapi.apiary.io/#user)** | req_data - json, callback - function to return response
**[users.update](http://docs.hoverapi.apiary.io/#user)** | req_data - json, callback - function to return response
**[users.fetch](http://docs.hoverapi.apiary.io/#user)** | req_data - json, callback - function to return response
**[users.link_action](http://docs.hoverapi.apiary.io/#useraction)** | req_data - json, callback - function to return response
**[users.fetch_action](http://docs.hoverapi.apiary.io/#useraction)** | req_data - json, callback - function to return response
**[search.find](http://docs.hoverapi.apiary.io/#search)** | req_data - json, callback - function to return response
**[search.ql](http://docs.hoverapi.apiary.io/#usersearchthql)** | req_data - json, callback - function to return response
**[userAvailability.check](http://docs.hoverapi.apiary.io/#useravailability)** | req_data - json, callback - function to return response
**[userIsColor.check](http://docs.hoverapi.apiary.io/#usercolor)** | req_data - json, callback - function to return response
**[userLogin.login](http://docs.hoverapi.apiary.io/#userlogin)** | req_data - json, callback - function to return response
**[userLogin.loginChangePassword](http://docs.hoverapi.apiary.io/#userloginchangepassword)** | req_data - json, callback - function to return response
**[userMerge.create](http://docs.hoverapi.apiary.io/#usermerge)** | req_data - json, callback - function to return response
**[userMerge.update](http://docs.hoverapi.apiary.io/#usermerge)** | req_data - json, callback - function to return response
**[userMerge.fetch](http://docs.hoverapi.apiary.io/#usermerge)** | req_data - json, callback - function to return response
**[userNotification.create](http://docs.hoverapi.apiary.io/#usernotifications)** | req_data - json, callback - function to return response
**[userNotification.update](http://docs.hoverapi.apiary.io/#usernotifications)** | req_data - json, callback - function to return response
**[userNotification.fetch](http://docs.hoverapi.apiary.io/#usernotifications)** | req_data - json, callback - function to return response
**[userNotification.fetchById](http://docs.hoverapi.apiary.io/#usernotifications)** | req_data - json, callback - function to return response
**[userTags.create](http://docs.hoverapi.apiary.io/#usertags)** | req_data - json, callback - function to return response
**[userTags.update](http://docs.hoverapi.apiary.io/#usertags)** | req_data - json, callback - function to return response
**[userTags.fetch](http://docs.hoverapi.apiary.io/#usertags)** | req_data - json, callback - function to return response
**[userNFC.assign](http://docs.hoverapi.apiary.io/#usernfccard)** | req_data - json, callback - function to return response
**[userNFC.update](http://docs.hoverapi.apiary.io/#usernfccard)** | req_data - json, callback - function to return response
**[userNFC.fetch](http://docs.hoverapi.apiary.io/#usernfccard)** | req_data - json, callback - function to return response
**[userNFC.find](http://docs.hoverapi.apiary.io/#searchnfc)** | req_data - json, callback - function to return response
**[groups.create](http://docs.hoverapi.apiary.io/#groups)** | req_data - json, callback - function to return response
**[groups.update](http://docs.hoverapi.apiary.io/#groups)** | req_data - json, callback - function to return response
**[groups.fetch](http://docs.hoverapi.apiary.io/#groups)** | req_data - json, callback - function to return response
**[file.updload](http://docs.hoverapi.apiary.io/#userfile)** | req_data - json, callback - function to return response
**[file.fetch](http://docs.hoverapi.apiary.io/#userfile)** | req_data - json, callback - function to return response
**[geospatial.store](http://docs.hoverapi.apiary.io/#reference/geospatial)** | req_data - json, callback - function to return response
**[geospatial.update](http://docs.hoverapi.apiary.io/#reference/geospatial)** | req_data - json, callback - function to return response
**[geospatial.filter](http://docs.hoverapi.apiary.io/#reference/geospatial)** | req_data - json, callback - function to return response

About
=====

You can find more info about courses of how to use the API, SDKs or integration of The Hover into your app,
visiting us at: http://www.thehover.com or mail us: thehover@hovanetworks.com
