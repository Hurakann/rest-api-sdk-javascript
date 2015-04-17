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

About
=====

You can find more info about courses of how to use the API, SDKs or integration of The Hover into your app,
visiting us at: http://www.thehover.com or mail us: thehover@hovanetworks.com
