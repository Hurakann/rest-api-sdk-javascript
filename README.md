rest-api-sdk-javascript
=================

Hover API Rest SDK for JavaScript

Welcome to the Hover SDK for JavaScript, this SDK is for building a robust JavaScript application based on the Hover API. The Hover SDK for JavaScript makes it easy to integrate a full Hover API services into javascript apps. 

SDK Integration
===============

Add this sdk source in the root of your project.

SDK Configuration
=================
The configuration for this sdk is based in a json file where you must provide:

* HTTP parameters
* Tenant configuration
* Credentials

You only need to call the instance and invoke the inizialize method of the class, for example:

	var sdkModel = SDKModel.getInstance();
	sdkModel.initialize();

Manage the request
===================

All requests to the RESTful API on the SDK are made using a serialized class, so, each request has their own translation from json to class, for example: to register a single user use User class and its attributes instead build a json file.

Manage the response
======================

All responses from the RESTful API on the SDK are managed by Response class, this class stores the HTTP Status Code, the raw response (json, xml, etc ...)  as a string and the body response casted to a desired class

Registering a user
------
Shows how to register an user using the default fields and extending of your own user settings

Getting user info
------
Shows how to get information about the registered user

Login 
------
Shows how to login an user using username, password, nfc and/or fingerprint

Assign services to the user
------
Shows how to assign services to the user

Get services for the user
------
Shows how to get services assigned to the user
