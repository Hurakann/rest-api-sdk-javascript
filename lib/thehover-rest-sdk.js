 "use strict";

/* Requires */
var http = require('http');
var https = require('https');
var querystring = require('querystring');
var utils = require('./utils');

/* Main */
module.exports = function () {

	/* Version SDK */
	var sdk_version = '0.1.12';
    	
	/* User-Agent to be send into Headers request */
	var user_agent = 'TheHoverSDK/rest-sdk-nodejs ' + sdk_version + ' (node ' + process.version + '-' + process.arch + '-' + process.platform  + ')';
	
	/* Create our default options */
	var default_options = {
		'connection_timeout': '1000',
		'connection_readtimeout': '3000',
		'endpoint':'localhost',
		'port':'8081',
		'api_version':'v1',
		'ckey':'123abc@#$',
		'branch_id':'your-branch-id',
		'user_id':'your-user-id'
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

	/* Function to upload file, it requires form-data module */
	function doReqF(http_method, uresource, filePath, callback) {
		// File size
		var fs = require('fs');
		var stats = fs.statSync(filePath);
		var fileSizeInBytes = stats["size"];

		// Build a form as in HTML template
		var FormData = require('form-data');
		var form = new FormData();
		form.append('my_field', 'UploadFile');
		form.append('my_buffer', fs.createReadStream(filePath));
		form.append('my_file', fs.createReadStream(filePath));

		// Add version to resource
		var resource = '/' + get_default_options().api_version + uresource;

		var http_options = {};

		// Host and port from configuration
		http_options.host = get_default_options().endpoint;
		http_options.port = get_default_options().port;		

		// Path, Method and Headers
            	http_options.path = resource;
            	http_options.method = http_method;

		// Add multipart-form-data headers
            	http_options.headers = form.getHeaders();

		// Local agent
            	http_options.headers['User-Agent'] = user_agent;

		// Ckey
		http_options.headers['Ckey'] = get_default_options().ckey;

		// Do
        	var req = http.request(http_options);
	
		// Stream PIPE
		form.pipe(req);

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
					
				if ( response === '' ) {
					response = {};
					response.httpStatusCode = res.statusCode;
				}	

				// To callback function
				setTimeout(function() { callback(error, response); }, 2000);
			});
		});	
	}

	function doReqFD(data, uresource, callback) {

		// Add version to resource
		var resource = '/' + get_default_options().api_version + uresource;

		var data = querystring.stringify(data);

		var http_options = {};

		http_options.path = resource + '?' + data;

		// Host and port from configuration
		http_options.host = get_default_options().endpoint;
		http_options.port = get_default_options().port;	

		http_options.headers = {};

		// Local agent
            	http_options.headers['User-Agent'] = user_agent;

		// Ckey
		http_options.headers['Ckey'] = get_default_options().ckey;

		var response;

		http.get(http_options,function(res){
    			res.on('data', function (chunk) {
				response = chunk;
    			});

    			res.on('end',function(){
        			setTimeout(function() { callback(response); }, 2000);
    			});
		});	
   	}
	
        function doReq(http_method, uresource, req_data, http_options_param, callback) {
  
		// Add version to resource
		var resource = '/' + get_default_options().api_version + uresource;
 
		// Empty http_options (declare)	
		var http_options = {};

		// HTTP client
		var client = http;

		// JSON or QueryString
		var data = req_data;

		req_data = utils.getCleanObject(req_data);

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

		// Ckey
		http_options.headers['Ckey'] = get_default_options().ckey;

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
				
                                if ( response === '' ) {
                                        response = {};
                                        response.httpStatusCode = res.statusCode;
                                }
	
				// To callback function
				setTimeout(function() { callback(error, response); }, 2000);
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

		profile: {

		    /**
		     * Creates a new profile to the parent user in the Hover system using Hover API, the next attributes
		     * in the User function must be required: 
		     * 
		     *  - user_id: id of the current user, parent user.
		     *	- name: name of the profile
		     * 
		     * @param req_data representing the data to create the new profile
		     * @param callback function to set the body response
		     */
		     create: function(req_data, callback) {
			         doReq('POST', '/profiles', req_data, {}, callback);
		     },

		    /**
		     * 	Update a profile to the parent user in the Hover system using Hover API.
		     * 
		     * @param req_data representing the data to update the profile
		     * @param callback function to set the body response
		     */
		     update: function(req_data, callback){
			         doReq('PUT', '/profiles', req_data, {}, callback);
		     },

		    /**
		     * 	Get list of the profiles assigned to a parent user in the Hover system using Hover API, the next attributes
		     * 	must be required:
		     *
		     *  - user_id: id of the parent user	
		     * 
		     * 	@param req_data contained the data to get the profile list
		     * 	@param callback function to set the body response
		     */
		     fetch: function(req_data, callback) {
			        doReq('GET', '/profiles', req_data, {}, callback);
		     }
		},

		object: {
		    /**
		     * Create a user in the Hover system using Hover API, the next attributes
		     * in the User function must be required:
		     * 
		     *  - branch_id: The parent branch id of the user to register
		     *	- profile_id: The profile of the user to register
		     *	- user_id: The parent user id of the user to register
		     *	- coloruser: Must be "blue" or "black", a user blue can create users, user black is the end user
		     *	- phase: The phase number which the user is registered, must be "phase1", "phase2", "phase3" or "phase4"
		     * 
		     * @param req_data representing the data to create
		     * @param callback function to set the body response
		     */
		     create: function(req_data, callback) {
		   	         /* Before send the user, check for parameters with '_' and translates without */
		         	 var user = utils.getUserProperties(req_data);
			 	 doReq('POST', '/user', user, {}, callback);
		     },

		    /**
		     * Update user in the Hover system using Hover API, the next attributes
		     * in the User function must be required:
		     * 
		     *  - branch_id: The parent branch id of the user
		     *	- user_id: The id of the user to update
		     * 
		     * @param req_data representing the data to update.
		     * @param callback function to set the body response
		     */
		     update: function(req_data, callback){
			         var user = utils.getUserProperties(req_data);
				 doReq('PUT', '/user', user, {}, callback);
		     },

		    /**
		     * Get the user info on a specific phase using the Hover API, the next attributes
		     * in the User function must be required:
		     * 
		     * 	- branch_id: The branch_id of the parent user 
		     *	- user_id: The id of the registered user  
		     *	- phase: It could be all, phase1, phase2, phase3 or phase4
		     * 
		     * @param req_data representing the object data to fetch
		     * @param callback function to set the body response
		     */
		     fetch: function(req_data, callback) {
		                doReq('GET', '/user', req_data, {}, callback);
		      },

		     /**
		      * @deprecated see query for more info.
		      * 
		      * Find all users matching the incoming data set in the Hover system using Hover API, the next attributes
		      * must be required, not null or empty.
		      * 
		      *  - branch_id: The parent branch_id of the user
		      *  - broot: The parent branch_id of the user
		      *  - pagination: The number of elements per page to slide data
		      *  - page: The number of page to fetch
		      *
		      * @param req_data representing the object data to find
		      * @param callback function to set the body response
		      */
		     search: function(req_data, callback){
			       doReq('GET', '/user/search', req_data, {}, callback);
		     },
		
		     /**
                      * Find all objectss matching the criteria in the query over the Hover system using Hover API.
		      * You must use THQL in order to execute the query.
		      * The next attributes must be required, not null or empty.
                      * 
                      *  - branch_id: The parent branch_id of the user
                      *  - broot: The parent branch_id of the user
                      *  - pagination: The number of elements per page to slide data
                      *  - page: The number of page to fetch
                      *  - thql: The query to match criteria
                      *
                      * @param req_data representing the object data to find
                      * @param callback function to set the body response
                      */
		     query: function(req_data, callback) {
		               doReq('GET', '/user/search/ql', req_data, {}, callback);
		     },  
		    
		    /**
		     * Get availability of username, email, RFC, CURP, etc., in the Hover system using Hover API, the next attributes
		     * in the User function must be required:
		     * 
		     *  - identity: The parent branch id of the user
		     * 
		     * @param req_data representing the object data to user availability check
		     * @param callback function to set the body response
		     */
		     availability: function(req_data, callback){
			        doReq('GET', '/user/availability', req_data, {}, callback);
		     },
		    
		    /**
		     * Check if a user is registered with the requesting color in the Hover system using Hover API, the next attributes
		     * in the User function must be required:
		     * 
		     *  - email: user email
		     *  - color: color to check, could be blue or black
		     * 
		     * @param req_data representing the object data to check
		     * @param callback function to set the body response
		     */
		     isColor: function(req_data, callback){
			        doReq('GET', '/user/is_color', req_data, {}, callback);
		     },

		    /**
		     * Try user login, if it's successfully get the basic user info using the Hover API, the next attributes
		     * must be required:
		     *	
		     *	- user: The username, email, rfc, curp, passport number or nfc id for the user
		     *	- password: The password or fingerprint for the user
		     * 
		     * @param req_data representing the object data to login
		     * @param callback function to set the body response
		     */
		     login: function(req_data, callback){
			        doReq('GET', '/user/login', req_data, {}, callback);
		     },

		    /**
		     * Reset the password of the user account in the Hover system using Hover API, the next attributes
		     * must be required:
		     * 
		     *  - email
		     *  - old_password
		     * 	- new_password
		     * 
		     * @param value the value contained the data to change the password
		     * @param callback function to set the body response
		     */
		     changePassword: function(req_data, callback){
				              doReq('PUT', '/user/login/change_password', req_data, {}, callback);
		     },

		     /**
                     * Reset the password of the user account in the Hover system using Hover API, the next attributes
                     * must be required:
                     * 
                     *  - email
                     *  - old_password
                     *  - new_password
                     * 
                     * @param value the value contained the data to change the password
                     * @param callback function to set the body response
                     */
                     resetPassword: function(req_data, callback){
                                              doReq('POST', '/user/login/reset', req_data, {}, callback);
                     },

		     /**
                     * Restore the password of the user account in the Hover system using Hover API, the next attributes
                     * must be required:
                     * 
                     *  - email
                     *  - old_password
                     *  - new_password
                     * 
                     * @param value the value contained the data to change the password
                     * @param callback function to set the body response
                     */
                     restorePassword: function(req_data, callback){
                                              doReq('GET', '/user/login/restore', req_data, {}, callback);
                     }
		},

		merge: {
		    /**
		     *  Merge users for avoid duplicates, selecting by similiarities, one of the user must be the main user, 
                     *  the rest of users are merge. If a user is not merge with another then the state of merge is free. All data are required.
		     * 
		     *  - branch_id: branch id of the main user
		     *  - main_user_id: id of the main user in the merge
		     * 	- users_id: an Array of the users to merge 
		     * 
		     * @param value the value contained the data to the user merge
		     * @param callback function to set the body response
		     */
		     create: function(req_data, callback) {
			         doReq('POST', '/user/merge', req_data, {}, callback);
		     },

		    /**
		     *	You can use this resource to change the main user in a group of merged users, for delete or append a user in the same group. The only optional data is:
		     * 
		     *  - new_main_user_id: The new main user of the merge group
		     * 
		     * @param req_data tcontained the data to the user merge update
		     * @param callback function to set the body response
		     */
		     update: function(req_data, callback){
			         doReq('PUT', '/user/merge', req_data, {}, callback);
		     },

		    /**
		     * To obtain the merge users information in the Hover system using Hover API, the next attributes
		     * must be required:
		     * 
		     *  - user_id: The main user id of the merge group
		     * 
		     * @param req_data contained the data to the user merge fetch
		     * @param callback function to set the body response
		     */
		     fetch: function(req_data, callback) {
			        doReq('GET', '/user/merge', req_data, {}, callback);
		     }
		},

		notification: {
		    /**
		     * 	Creates a notification to have a standardized message that can be sent to different users without 
		     * 	changing its contents, in this case the title and message. The required data are:
		     * 
		     *  - title: Subject of the message, general idea
		     *	- message: Body of the message, detailed information
		     *	- broot: Branch id of parent user
		     *	- branch_id: branch id of the user (specific user)
		     * 
		     * @param req_data representing the data to the notification create
		     * @param callback function to set the body response
		     */
		     create: function(req_data, callback) {
				 doReq('POST', '/user/notifications', req_data, {}, callback);
		     },

		    /**
		     * The update in the notification is to change the status from true to false and vice versa. 
		     * The required data are:
		     * 
		     *  - notification_id: Id assigned to the notification when it was registered.
		     *	- read: State of the notification, can be true or false
		     * 
		     * @param req_data representing the data to update notification
		     * @param callback function to set the body response
		     */
		     update: function(req_data, callback){
				 doReq('PUT', '/user/notifications', req_data, {}, callback);
		     },

		    /**
		     *  Fetch all notifications registered. This resource
		     *  has the next parameters:
		     * 
		     * 	- branch_id: branch id of the current user
		     * 
		     * @param req_data representing the data to the notification fetch 
		     * @param callback function to set the body response 
		     */
		     fetch: function(req_data, callback) {
				doReq('GET', '/user/notifications', req_data, {}, callback);
		     },

		    /**
		     *  Fetch a specific notification registered. This resource
		     *  has the next parameters:
		     * 
		     * 	- branch_id: branch id of the current user
		     * 	- notification_id: notification id that you want to get
		     * 
		     * @param req_data representing the data to get the notification content
		     * @param callback function to set the body response 
		     */
		     fetchById: function(req_data, callback) {
				    doReq('GET', '/user/notifications', req_data, {}, callback);
		     }
		},

		tags: {
		    /**
		     * Add specific features to the user in the Hover system using Hover API, the next attributes
		     * must be required:
		     * 
		     *	- user_id: The id of the user
		     *	- tags: Array with the tags of the user
		     * 
		     * @param value the value contained the data to the user tags assign
		     * @param callback function to set the body response
		     */
		     create: function(req_data, callback) {
			         doReq('POST', '/user/tags', req_data, {}, callback);
		     },

		    /**
		     * Update the specific features to the user  in the Hover system using Hover API, the next attributes
		     * must be required:
		     * 
		     *	- user_id: The id of the user
		     *	- tags: Array with the tags of the user
		     * 
		     * @param value the value contained the data to the user tags update
		     * @param callback the function to set the body response
		     */
		     update: function(req_data, callback){
			         doReq('PUT', '/user/tags', req_data, {}, callback);
		     },

		    /**
		     * Get specific features of the user in the Hover system using Hover API, the next attributes
		     * must be required:
		     * 
		     * 	- user_id: The id of the user
		     *
		     * @param req_data contained the data to the user tags fetch
		     * @param callback function to set the body response
		     */
		     fetch: function(req_data, callback) {
			       doReq('GET', '/user/tags', req_data, {}, callback);
		     }
		},

		service: {
		    /**
		     * Update an assigned service to an especific user using the Hover API, the next attributes
		     * must be required:
		     *
		     * 	- service_id: The id of the service to assign
		     * 	- user_id: The user id to assign into service
		     *	- status: The status for the service, can be true or false
		     *
		     * @param req_data contained the data to the user tags fetch
		     * @param callback function to set the body response
		     */
		     update: function(req_data, callback){
			         doReq('PUT', '/user/services', req_data, {}, callback);
		     },

		    /**
		     * Get the user info on a specific user services using the Hover API, the next attributes
		     * must be required:
		     *
		     *	- user_id: The id of the registered user
		     *	- service_id: The service_id of the registered service
		     *	- owner: If user is owner, could be true or false
 		     *
		     * @param req_data contained the data to the user services fetch
		     * @param callback function to set the body response
		     */
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

				doReq('GET', '/user/services', params, {}, callback);
		     },

		    /**
		     * Assign service to a user in the Hover system using Hover API or thrown 
		     * an exception if user is already assigned to it.
		     *
		     * @param req_data contained the data to the user service assign
		     * @param callback function to set the body response
		     */
		     assign: function(req_data, callback) {
			         this.fetch( {"user_id": req_data.user_id, "service_id":req_data.service_id }, function( error, cb ){
					console.log( cb);

					if( cb.httpStatusCode === 200 )
						callback( null, cb)

					if( cb.httpStatusCode === 204 )
						doReq('POST', '/user/services', req_data, {}, callback);
				});
		      }
		},

		nfc: {
		    /**
		     * Assign NFC card to the user and link to services in the Hover system using Hover API, the next attributes
		     * must be required:
		     * 
		     *  - nfc_id: The id of the nfc card
		     *	- user_id: The id of the user
		     *	- status: status for nfc card, can be true or false
		     * 
		     * @param req_data tcontained the data to the NFC card assign.
		     * @param callback function to set the body response
		     */
		     assign: function(req_data, callback){
			         doReq('POST', '/user/nfc_card', req_data, {}, callback);
		     },

		    /**
		     * Update information and services on assigned nfc card to the user. You must send only parameters to change. The next data are required:
		     * 
		     *  - nfc_id: The id of the nfc card
		     *	- user_id: The id of the user
		     *	- status: status for nfc card, can be true or false
		     * 
		     * 
		     * @param req_data contained the data to the user NFC update
		     * @param callback function to set the body response
		     */
		     update: function(req_data, callback){
			         doReq('PUT', '/user/nfc_card', req_data, {}, callback);
		     },

		    /**
		     * Get information about nfc card assigned to the user. The next parameters are required: 
		     * 
		     *  - user_id: The id of the user
		     * 
		     * @param req_data contained the data to the user NFC fetch
		     * @param callback function to set the body response
		     */
		     fetch: function(req_data, callback){
				doReq('GET', '/user/nfc_card', req_data, {}, callback);
		     },

		    /**
		     * Find user matching the nfc_id of the NFC card in the Hover system using Hover API, the next attributes
		     * must be required, not null or empty.
		     * 
		     * 	- nfc_id: nfc id card assigned to the user
		     *
		     * @param req_data contained the data to the user NFC search
		     * @param callback function to set the body response
		     */
		     search: function(req_data, callback){
				doReq('GET', '/search/nfc', req_data, {}, callback);
		     }
		},

		group: {
		    /**
		     * 	Creates a new group 
		     * 
		     *  - branch_id: branch id of the current user
		     * 	- name: Name of the group
		     * 
		     * @param value value representing the data to post.
		     * @param callback the function to set the body response
		     * 
		     */
		     create: function(req_data, callback) {
			         doReq('POST', '/groups', req_data, {}, callback);
		     },

		    /**
		     * The update in the groups is to change the status from true to false and vice versa. 
		     * The required data are:
		     * 
		     * - group_id: Id assigned to the group
		     * - status: State of the group, can be true or false.
		     * 
		     * @param value value representing the data to put
		     * @param callback the function to set the body response
		     */
		     update: function(req_data, callback){
				 doReq('PUT', '/groups', req_data, {}, callback);
		     },

		    /**
		     * Fetch information about a specific group
		     * 
		     * - branch_id: The user_id of the registered user
		     * 
		     * @param branch_id 
		     * @param callback the function to set the body response 
		     */
		     fetch: function(req_data, callback) {
				doReq('GET', '/groups', req_data, {}, callback);
			}
		},

		file: {
			/**
			 * Upload file to system and prepare to be linked to the 
			 * user. The required data are:
			 *
			 * - file to be uploaded
			 * 
			 * @param filePath file path to be uploaded
			 * @param callback the function to set the body response
			 */
			upload: function(filePath, callback) {
				doReqF('POST', '/user/file', filePath, callback);
			},

			/**
			 * Get file on raw mode. The required data are:
			 *
			 * - file_id: File that has been uploaded
			 * 
			 * @param req_data object representing the resource
			 * @param callback the function to set the body response
			 */
			fetch: function(req_data, callback) {
				doReqFD(req_data, '/user/file', callback);
			}          
		},

		geospatial: {
			/**
			 * Store a location and index coordinates. The required   
			 * data are:
			 *
			 * - latitude: latitude of location to be indexed
			 * - longitude: longitude of location to be indexed
     			 * - id: id of previously registered object
			 * - name: name for the location
			 *
			 * @param req_data object representing the resource
			 * @param callback the function to set the body response
			 */
			create: function(req_data, callback) {
				doReq('POST', '/geospatial', req_data, {}, callback);
			},

                        /**
                         * Store a location and index coordinates. The required   
                         * data are:
                         *
                         * - id: id of the indexed location
			 *
                         * @param req_data object representing the resource
                         * @param callback the function to set the body response
                         */
                        update: function(req_data, callback) {
                                doReq('PUT', '/geospatial', req_data, {}, callback);
                        },

                        /**
                         * Store a location and index coordinates. The required   
                         * data are:
                         *
                         * - latitude: latitude of location to be indexed
                         * - longitude: longitude of location to be indexed
			 *
			 * Optional:
			 *
			 * - d: distance from
			 * - max: max resulset 
                         *
                         * @param req_data object representing the resource
                         * @param callback the function to set the body response
                         */
                        filter: function(req_data, callback) {
                                doReq('GET', '/geospatial', req_data, {}, callback);
                        }			
		}, 

	        metric: {

                     /**
                      * Create an action to link objects and keep tracking on them.
                      * 
                      *
                      * @param req_data representing the object action data to store
                      * @param callback function to set the body response
                      */
                     create: function(req_data, callback){
                               doReq('POST', '/metric', req_data, {}, callback);
                     },

                     /**
                      * Fetch actions of linked objects based on datetime settings.
                      *  
                      *
                      * @param req_data representing the object action data to fetch
                      * @param callback function to set the body response
                      */
                     fetch: function(req_data, callback){
                               doReq('GET', '/metric', req_data, {}, callback);
                     },

                     /** @DEPRECATED AND MAYBE REMOVED IN NEXT RELEASES **/
                     /*
                      * This function must be used for backwards compatibility since a new release
                      * of The Hover has changed the spec of the endpoint,
                      * For more info review the API docs. 
                      */
                     create_backward_compat: function(req_data, callback) {
                               doReq('POST', '/user/action', req_data, {}, callback); 
                     },

                     fetch_backward_compat: function(req_data, callback) {
                               doReq('GET', '/user/action', req_data, {}, callback);
                     } 		   
		},

		custom: {

		     /**
                      * Create a custom entity (for schemas).
                      * 
                      * @param uri the custom uri for the webservice
                      * @param req_data representing the object data to store
                      * @param callback function to set the body response
                      */
                     create: function(uri, req_data, callback){
                               doReq('POST', '/' + uri, req_data, {}, callback);
                     },

                     /**
                      * Fetch custom entity (for schemas).
                      *  
                      * @param uri the custom uri for the webservice
                      * @param req_data representing the object data to fetch
                      * @param callback function to set the body response
                      */
                     fetch: function(uri, req_data, callback){
                               doReq('GET', '/' + uri, req_data, {}, callback);
                     },

		     /**
                      * Update a custom entity (for schemas).
                      * 
                      * @param uri the custom uri for the webservice
                      * @param req_data representing the object data to update
                      * @param callback function to set the body response
                      */
                     update: function(uri, req_data, callback){
                               doReq('PUT', '/' + uri, req_data, {}, callback);
                     }
		}	
	};
};
