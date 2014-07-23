"use strict";

/* Requires */
var http = require('http');
var https = require('https');
var querystring = require('querystring');

/* Main */
module.exports = function () {

	/* Version SDK */
	var sdk_version = '0.1.0';
    	
	/* User-Agent to be send into Headers request */
	var user_agent = 'TheHoverSDK/rest-sdk-nodejs ' + sdk_version + ' (node ' + process.version + '-' + process.arch + '-' + process.platform  + ')';
	
	/* Create our default options */
	var default_options = {
		'connection-timeout': '1000',
		'connection-readtimeout': '3000',
		'endpoint':'localhost',
		'port':'8081',
		'api-version':'v1'
	};    

	/* Function for updating the default options for the 
	   given options */
	function update_options(new_options, options) {
		for (var opt in options) {
			new_options[opt] = options[opt];
		}
		return new_options;
	}

	/* Function to retrive the default options */
	function get_default_options() {
		return default_options;
	}
	
	/* Function to initialize options on SDK */
	function configure(options) {
		if (options !== undefined && typeof options === 'object') {
            		default_options = update_options(default_options, options);
        	}	
	}

    	function doReq(http_method, resource, req_data, http_options_param, callback) {
   
		// Empty http_options (declare)	
		var http_options = {};

		// HTTP client
		var client = http;

		// JSON or QueryString
		var data = req_data;

		// If method is GET then encode as query string, otherwise as JSON-RPC
   		if (http_method === 'GET') {
            		if (typeof data !== 'string') {
                		data = querystring.stringify(data);
            		}
            		if (data) {
				// add to resource and empty data
                		resource = resource + "?" + data;
                		data = "";
            		}
        	} else if (typeof data !== 'string') {
            		data = JSON.stringify(data);
        	}

		// Host and port from configuration
		http_options.host = get_default_options().endpoint;
		http_options.port = get_default_options().port;		

		// Path, Method and Headers
            	http_options.path = resource;
            	http_options.method = http_method;
            	http_options.headers = {};

		// Add length of data
		if (data) {
                	http_options.headers['Content-Length'] = Buffer.byteLength(data, 'utf-8');
            	}

		// JSON
            	if (!http_options.headers.Accept) {
                	http_options.headers.Accept = 'application/json';
            	}

		// JSON
            	if (!http_options.headers['Content-Type']) {
                	http_options.headers['Content-Type'] = 'application/json';
            	}

		// Local agent
            	http_options.headers['User-Agent'] = user_agent;

		// Do
        	var req = client.request(http_options);

		// Use this for error request
        	req.on('error', function (e) {
            		console.log('problem with request: ' + e.message);
            		callback(e, null);
        	});

		// Use this for response 
		req.on('response', function (res) {
			var error = null;
			var response = '';

			// Get body response
			res.on('data', function (chunk) {
                		response += chunk;
            		});
		
			res.on('end', function () {
				// Create error if JSON could not be parsed 	
				try {
					if (res.headers['content-type'] === "application/json") {
                        			response = JSON.parse(response);
						response.httpStatusCode = res.statusCode;
                    			} 		
				} catch (e) {
					error = new Error('Invalid JSON Response Received');
					error.error = {
                        			name: 'Invalid JSON Response Received, JSON Parse Error'
                    			};
					error.response = response;
                   	error.httpStatusCode = res.statusCode;
					response = null;
				}
			
				// Or error if HTTP Code Status is max than 300
				if (res.statusCode > 300) {
					error = new Error('Errno HTTP Status Code Response Received');
                                	error.error = {
                                        	name: 'Error HTTP Status Code'
                                	};
                                	error.response = response;
                                	error.httpStatusCode = res.statusCode;
                                	response = null;	
				}
				else
					response = res.statusCode;
				
				// To callback function
				callback(error, response);
			});
		});

		// write data (flush)
		if (data) {
            req.write(data);
        }

		// end request
        req.end();		 
	}	

	/* Must return all vars and/or function exported */
	return {
		version: sdk_version,
		configure: function(options) {
			configure(options)
		},
		profiles: {
			create: function(req_data, callback) {
				doReq('POST', '/v1/profiles', req_data, {}, callback);
			},

			update: function(req_data, callback){
				doReq('PUT', '/v1/profiles', req_data, {}, callback);
			},

			fetch: function(req_data, callback) {
				doReq('GET', '/v1/profiles', req_data, {}, callback);
			}
		},

		users: {
			create: function(req_data, callback) {
				doReq('POST', '/v1/user', req_data, {}, callback);
			},

			update: function(req_data, callback){
				doReq('PUT', '/v1/user', req_data, {}, callback);
			},

			fetch: function(req_data, callback) {
				doReq('GET', '/v1/user', req_data, {}, callback);
			}
		},

		search: {
			find: function(req_data, callback){
				doReq('GET', '/v1/user/search', req_data, {}, callback);
			}
		},

		userAvailability: {
			check: function(req_data, callback){
				doReq('GET', '/v1/user/availability', req_data, {}, callback);
			}
		},

		userIsColor: {
			check: function(req_data, callback){
				doReq('GET', '/v1/user/is_color', req_data, {}, callback);
			}
		},

		userLogin: {
			login: function(req_data, callback){
				doReq('GET', '/v1/user/login', req_data, {}, callback);
			}
		},

		userMerge: {
			create: function(req_data, callback) {
				doReq('POST', '/v1/user/merge', req_data, {}, callback);
			},

			update: function(req_data, callback){
				doReq('PUT', '/v1/user/merge', req_data, {}, callback);
			},

			fetch: function(req_data, callback) {
				doReq('GET', '/v1/user/merge', req_data, {}, callback);
			}
		},

		userNotification: {
			create: function(req_data, callback) {
				doReq('POST', '/v1/user/notifications', req_data, {}, callback);
			},

			update: function(req_data, callback){
				doReq('PUT', '/v1/user/notifications', req_data, {}, callback);
			},

			fetch: function(req_data, callback) {
				doReq('GET', '/v1/user/notifications', req_data, {}, callback);
			},

			fetchById: function(req_data, callback) {
				doReq('GET', '/v1/user/notifications', req_data, {}, callback);
			}			
		},

		userTags: {
			create: function(req_data, callback) {
				doReq('POST', '/v1/user/tags', req_data, {}, callback);
			},

			update: function(req_data, callback){
				doReq('PUT', '/v1/user/tags', req_data, {}, callback);
			},

			fetch: function(req_data, callback) {
				doReq('GET', '/v1/user/tags', req_data, {}, callback);
			}
		},

		userServices: {

			update: function(req_data, callback){
				doReq('PUT', '/v1/user/services', req_data, {}, callback);
			},

			fetch: function(req_data, callback) {
				var params = {};
				if( ( req_data.service_id === 'all' ) && ( req_data.owner == null ) ){
					params.user_id = req_data.user_id;
				}else if( req_data.owner != null ){
					params.user_id 	= req_data.user_id;
					params.owner  	= req_data.owner;
				}else{
					params.user_id = req_data.user_id;
					params.service_id = req_data.service_id;
				}

				doReq('GET', '/v1/user/services', params, {}, callback);
			},

			assign: function(req_data, callback) {
				doReq('POST', '/v1/user/services', req_data, {}, callback);
			}
		}
	};
};
