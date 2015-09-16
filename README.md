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

Function | Parameters | Doc
-------- | ---------- | --- 
**[version](#version)** | none | returns sdk version
**[configure](#configure)** | options - a json with configurable options for the sdk | configure env for sdk
**[profiles.create](#profilescreate)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#profiles)
**[profiles.update](#profilesupdate)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#profiles)
**[profiles.fetch](#profilesfetch)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#profiles)
**[users.create](#userscreate)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#user)
**[users.update](#usersupdate)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#user)
**[users.fetch](#usersfetch)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#user)
**[users.link_action](#userslinkaction)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#useraction)
**[users.fetch_action](#usersfetchaction)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#useraction)
**[search.find](#search)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#search)
**[search.ql](#searchthql)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#usersearchthql)
**[userAvailability.check](#checkavail)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#useravailability)
**[userIsColor.check](#checkcolor)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#usercolor)
**[userLogin.login](#login)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#userlogin)
**[userLogin.loginChangePassword](#checkpasswordlogin)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#userloginchangepassword)
**[userMerge.create](#mergecreate)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#usermerge)
**[userMerge.update](#mergeupdate)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#usermerge)
**[userMerge.fetch](#mergefetch)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#usermerge)
**[userNotification.create](#notificationcreate)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#usernotifications)
**[userNotification.update](#notificationupdate)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#usernotifications)
**[userNotification.fetch](#notificationfetch)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#usernotifications)
**[userNotification.fetchById](#notificationfetchbyid)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#usernotifications)
**[userTags.create](#tagscreate)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#usertags)
**[userTags.update](#tagsupdate)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#usertags)
**[userTags.fetch](#tagsfetch)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#usertags)
**[userNFC.assign](#nfcassing)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#usernfccard)
**[userNFC.update](#nfcupdate)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#usernfccard)
**[userNFC.fetch](#nfcfetch)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#usernfccard)
**[userNFC.find](#nfcfind)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#searchnfc)
**[groups.create](#groupcreate)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#groups)
**[groups.update](#groupupdate)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#groups)
**[groups.fetch](#search)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#groups)
**[file.updload](#fileupload)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#userfile)
**[file.fetch](#filedownload)** | req_data - json, callback - function to return response | [API](http://docs.hoverapi.apiary.io/#userfile)

About
=====

You can find more info about courses of how to use the API, SDKs or integration of The Hover into your app,
visiting us at: http://www.thehover.com or mail us: thehover@hovanetworks.com
