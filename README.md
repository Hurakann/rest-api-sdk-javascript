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
	
* Configure SDK, by providing the required parameters (endpoint, port, version)

	```javascript
		thehover_sdk.configure({'endpoint':'thehover-api.com', 'port':'80'});
	```
	
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


