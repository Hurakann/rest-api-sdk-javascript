/**----------------------------------------------------------------------
*** @license Copyright: (c) 2013-2014 Hova Networks S.A.P.I. de C.V.
*** All rights reserved.
***
*** Redistribution and use in any form, with or without modification,
*** is strictly prohibited.
***
*** Created by : Salvador Rojas <salvador.rojas.sanchez@gmail.com>
***---------------------------------------------------------------------
**/

/**
 * The function is responsible for posting, getting, updating and deleting data 
 * of the user in the Hover system using the Hover API.
 * 
 * @author Salvador Rojas
 */

function UserResource (){
	this.URI = "/user";
	
	this.CTYPE = "application/json";
};

UserResource.prototype = {
	/**
     * Get the user info on a specific phase using the Hover API, the next attributes
     * in the User function must be required, not null:
     * 
     * 	- branch_id: The branch_id of the parent user 
	 *	- user_id: The id of the registered use 
	 *	- phase: It could be all, phase1, phase2, phase3 or phase4
     * 
     * @param branch_id the branch id of the parent user. It's required, not null.
     * @param user_id the user id for the desired user for getting info. It's required, not null.
     * @param phase the phase of the user for getting info, it could be: phase1,
     *              phase2, phase3, phase4 or all for retrieving all phases. It's required, not null.
     * @param callback the function to set the body response 
     */
	get:  function( branch_id, user_id, phase, callback, castClass )
	{
		var queryString = "?branch_id="+branch_id+"&user_id="+user_id+"&phase="+phase;
		
		alert(queryString);
		var client = new ClientGET( queryString, this.URI, "application/x-www-form-urlencoded" );
	
		var getResponse = function( response ){
			var castResponse = JSON.parse( response.getBody() );
			
			if( castClass !== null )
				castResponse.__proto__ = castClass.prototype;
			
			response.setBodyT( castResponse );
			
			callback( response );
		};
		
		
		client.request( getResponse, false );
	},
	
	/**
     * Create a user in the Hover system using Hover API, the next attributes
     * in the User function must be required, not null:
     * 
     *  - branch_id: The parent branch id of the user to register
	 *	- profile_id: The profile of the user to register
	 *	- user_id: The parent user id of the user to register
	 *	- coloruser: Must be "blue" or "black", a user blue can create users, user black is the end user
	 *	- phase: The phase number which the user is registered, must be "phase1", "phase2", "phase3" or "phase4"
     * 
     * @param user the user representing the data to post.
     * @param callback the function to set the body response
     * 
     */
	create: function( user, callback ){
		var userValue = Utility.SDKUtilities.getValueObject( user );
		alert(JSON.stringify( userValue ));
		var client = new ClientPOST( JSON.stringify( userValue ), this.URI, this.CTYPE );
		client.request( callback, true );
	},
	
	/**
     * Update user in the Hover system using Hover API, the next attributes
     * in the User function must be required, not null:
     * 
     *  - branch_id: The parent branch id of the user
	 *	- user_id: The id of the user to update
     * 
     * @param user the user representing the data to put.
     * @param callback the function to set the body response
     */
	update: function( user, callback ){
		var userValue = Utility.SDKUtilities.getValueObject( user );

		alert( JSON.stringify( userValue ) );
		var client = new ClientPUT( JSON.stringify( userValue ), this.URI, this.CTYPE );
		client.request( callback, false );
	},
	
	/**
     * Get availability of username, email, RFC, CURP, etc., in the Hover system using Hover API, the next attributes
     * in the User function must be required, not null:
     * 
     *  - identity: The parent branch id of the user
     * 
     * @param identity the user representing the data to put.
     * @param callback the function to set the body response
     */
	getAvailability: function( identity, callback ){
		var client = new ClientGET( "?identity="+identity, this.URI+"/availability", "application/x-www-form-urlencoded" );
		client.request( callback, true );
	},
	
	/**
     * Check if a user is registered with the requesting color in the Hover system using Hover API, the next attributes
     * in the User function must be required, not null:
     * 
     *  - email: user email
     *  - color: color to check, could be blue or black
     * 
     * @param email
     * @param color
     * @param callback the function to set the body response
     */
	checkColor: function( email, color, callback ){
		var client = new ClientGET( "?email="+email+"&color="+color, this.URI+"/is_color", "application/x-www-form-urlencoded" );
		client.request( callback, true );
	}
};

/**************************************** LOGIN RESOURCES ****************************************/

function UserLoginResource(){
	/** @const */ this.URI = "/user/login";
	
	/** @const */ this.CTYPE = "application/x-www-form-urlencoded";
	
	this.queryString = "";
}

UserLoginResource.prototype = {
	/**
     * Try user login, if it's successfully get the basic user info 
     * using the Hover API.
     * 
     * @param user the username for the login, it could be NFC id, username or email.
     * @param password the password for the login, it could be password string or
     *                  fingerprint tag.
     * @param callback the function to set the body request
     */
	login: function( user, password, callback ){
		var queryString = "?user="+user+"&password="+password;
		alert(this.URI+queryString+this.CTYPE );
		var client = new ClientGET( queryString, this.URI, this.CTYPE );
		client.request( callback, false );
	},

	/**
     * 
     * @param email user's email to sends an email with a recuperation code.
     * 
     * @param callback the function to set the body request
     * 
     */
	sendRestoreCode: function( email, callback ){
		this.queryString = "?email="+email; 
		var client = new ClientGET( queryString, this.URI+"/restore", this.CTYPE );
		client.request( callback, true );
	},
	
	/**
     * Reset the password of the user account in the Hover system using Hover API, the next attributes
     * must be required, not null or empty.
     * 
     *  - email
     * 	- new_password
     * 	- code
     * 
     * @param value the value contained the data to reset the password.
     * 
     * @param callback the function to set the body response
     * 
     */
	resetPassword: function( value, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPOST( JSON.stringify( cleanValue ), this.URI+"/reset", "application/json" );
		client.request( callback, true );
	},
	
	/**
     * Reset the password of the user account in the Hover system using Hover API, the next attributes
     * must be required, not null or empty.
     * 
     *  - email
     *  - old_password
     * 	- new_password
     * 
     * @param value the value contained the data to change the password.
     * 
     * @param callback the function to set the body request
     * 
     */
	changePassword: function( value, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPOST( JSON.stringify( cleanValue ), this.URI+"/change_password", "application/json" );
		client.request( callback, true );
	}
};

/**************************************** MERGE USER RESOURCES ****************************************/

function UserMergeResource(){
	this.URI = "/user/merge";
	
	this.CTYPE = "application/json";
}

UserMergeResource.prototype = {
	
	/**
     * Reset the password of the user account in the Hover system using Hover API, the next attributes
     * must be required, not null or empty.
     * 
     *  - branch_id
     *  - main_user_id:
     * 	- users_id: an Array of the users to merge 
     * 
     * @param value the value contained the data to the user merge post.
     * @param callback the function to set the body response
     */
	merge: function( value, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPOST( JSON.stringify( cleanValue ), this.URI, this.CTYPE );
		client.request( callback, true );
	},
	
	/**
     * Reset the password of the user account in the Hover system using Hover API, the next attributes
     * must be required, not null or empty.
     * 
     *  - new_main_user_id: The new main user of the merge group
     * 
     * @param value the value contained the data to the user merge put.
     * @param callback the function to set the body response
     */
	update: function( value, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPUT( JSON.stringify( cleanValue ), this.URI, this.CTYPE );
		client.request( callback, true );
	},

	/**
     * Reset the password of the user account in the Hover system using Hover API, the next attributes
     * must be required, not null or empty.
     * 
     *  - user_id: The main user id of the merge group
     * 
     * @param user_id
     * @param callback the function to set the body response
     */
	get: function( user_id, callback ){
		var queryString = "?user_id="+user_id;
		var client = new ClientGET( queryString, this.URI, this.CTYPE );
		client.request( callback, true );
	}
};

/**************************************** NFC CARD RESOURCES ****************************************/

function UserNFCCardResource(){
	this.URI = "/v1/user/nfc_card";
	
	this.CTYPE = "application/json";
}

UserNFCCardResource.prototype = {
	
	/**
     * Assign NFC card to the user and link to services in the Hover system using Hover API, the next attributes
     * must be required, not null or empty.
     * 
     *  - nfc_id: The id of the nfc card
	 *	- user_id: The id of the user
	 *	- status: status for nfc card, can be true or false
     * 
     * @param value the value contained the data to the NFC card assign.
     * @param callback the function to set the body response
     */
	assign: function( value, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPOST( JSON.stringify( cleanValue ), this.URI, this.CTYPE );
		client.request( callback, true );
	},
	
	/**
     * Reset the password of the user account in the Hover system using Hover API, the next attributes
     * must be required, not null or empty.
     * 
     *  - nfc_id: The id of the nfc card
	 *	- user_id: The id of the user
	 *	- status: status for nfc card, can be true or false
	 * 
	 * The next parameters could be send if they change:
	 * 
	 * 	- services: Array of service id's
	 *	- delivery_date: Delivery date of nfc card
	 *	- renewal: Date of renewal of nfc card
	 *	- cost: Cost of nfc card
	 *	- validity: Validity of the nfc card
     * 
     * @param value the value contained the data to the user merge put.
     * @param callback the function to set the body response
     */
	update: function( value, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPUT( JSON.stringify( cleanValue ), this.URI, this.CTYPE );
		client.request( callback, true );
	},
	
	/**
     * Reset the password of the user account in the Hover system using Hover API, the next attributes
     * must be required, not null or empty.
     * 
     *  - user_id: The id of the user
     * 
     * @param user_id the value contained the data to the user merge put.
     * @param callback the function to set the body response
     */
	get: function( user_id, callback ){
		var client = new ClientGET( "?user_id="+user_id, this.URI, "application/x-www-form-urlencoded" );
		
		client.request( callback, true );
	}
};		

/**************************************** SEARCH RESOURCE ****************************************/

function UserSearchResource (){
	this.URI = "/user/search";
	
	this.CTYPE = "application/x-www-form-urlencoded";
};

UserSearchResource.prototype = {
	/**
     * Find all users matching the incoming data set in the Hover system using Hover API, the next attributes
     * must be required, not null or empty.
     * 
     * 	- branch_id: The parent branch_id of the user
     *  - broot: The parent branch_id of the user
     * 	- pagination: The number of elements per page to slide data
     * 	_ page:	The number of page to fetch
     *
     * @param userSearch
     * @param callback the function to set the body response
     */
	search: function( userSearch, callback )
	{
		var queryString = Utility.SDKUtilities.get_properties( userSearch );
			
		var client = new ClientGET( queryString, this.URI, this.CTYPE );
		
		client.request( callback, true );
	},
	
	/**
     * Find user matching the nfc_id of the NFC card in the Hover system using Hover API, the next attributes
     * must be required, not null or empty.
     * 
     * 	- nfc_id: nfc id card assigned to the user
     *
     * @param nfc_id
     * @param callback the function to set the body response
     */
	searcNFC: function( nfc_id, callback )
	{
		var queryString = "?nfc_id="+nfc_id;
				
		var client = new ClientGET( queryString, this.URI, this.CTYPE );
		
		client.request( callback, true );
	}
};

/**************************************** TAGS RESOURCE ****************************************/

function UserTagsResource(){
	this.URI = "/v1/user/tags";
	
	this.CTYPE = "application/json";
}

UserTagsResource.prototype = {
	
	/**
     * Add specific features to the user in the Hover system using Hover API, the next attributes
     * must be required, not null or empty.
     * 
	 *	- user_id: The id of the user
	 *	- tags: Array with the tags of the user
	 * 
     * 
     * @param value the value contained the data to the user merge put.
     * @param callback the function to set the body response
     */
	create: function ( value, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPOST( JSON.stringify( cleanValue ), this.URI, this.CTYPE );
		client.request( callback, true );
	},
	
	/**
     * Update the specific features to the user  in the Hover system using Hover API, the next attributes
     * must be required, not null or empty.
     * 
	 *	- user_id: The id of the user
	 *	- tags: Array with the tags of the user
	 * 
     * 
     * @param value the value contained the data to the user merge put.
     * @param callback the function to set the body response
     */
	update:function( value, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPUT( JSON.stringify( cleanValue ), this.URI, this.CTYPE );
		client.request( callback, true );
	},
	
	/**
     * Get specific features of the user in the Hover system using Hover API, the next attributes
     * must be required, not null or empty.
     * 
     * 	- user_id: The id of the user
     *
     * @param user_id
     * @param callback the function to set the body response
     */
	get: function( user_id, callback ){
		var client = new ClientGET( "?user_id="+user_id, this.URI, "application/x-www-form-urlencoded" );
		
		client.request( callback, true );
	}
};

/**************************************** SERVICE RESOURCE ****************************************/

function UserServicesResource ()
{
	this.URI = "/user/services";
	
	this.CTYPE = "application/json";
};

UserServicesResource.prototype = {
	
	/**
     * Get the user info on a specific phase using the Hover API.
     *
     * @param serviceid the service id assigned to the user. It could be a valid
     *                  id or the string all for requesting all assigned services.
     * @param userid the user id for which one get the service(s). It's
     *               required, not null.
     * @param owner if it is true, then retrieve services as owner, to retieve
     *              services assign just send this as 'null'.
     * @param callback the function to set the body response
     * 
     */
	get: function( serviceId, userId, owner, callback )
	{
		var params = {};
		if( ( serviceId === 'all' ) && ( owner == null ) ){
			params.user_id = userId;
		}else if( owner != null ){
			params.user_id 	= userId;
			params.owner  	= owner;
		}else{
			params.user_id = userId;
			params.service_id = serviceId;
		}
		
		var queryString = Utility.SDKUtilities.get_properties( params );
		var client = new ClientGET( queryString, this.URI,  "application/x-www-form-urlencoded" );
	
		client.request( callback, true );
	},
	/**
     * Get the user info on a specific phase using the Hover API.
     *
     * @param serviceid the service id assigned to the user. It could be a valid
     *                  id or the string all for requesting all assigned services.
     * @param userid the user id for which one get the service(s). It's
     *               required, not null.
     * @param owner if it is true, then retrieve services as owner, to retieve
     *              services assign just send this as 'null'.
     * @param callback the function to set the body response
     * 
     */
	update: function( value, callback )
	{
		var servValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPUT( JSON.stringify( servValue ), this.URI, this.CTYPE );
		client.request( callback, true );
	},
	
	/**
     * Add a user into a service in the Hover system using Hover API or thrown 
     * an exception if user is already assigned to it.
     *
     * @param userService the user services class representing the data to
     *                      post. The data could be encoded as json format by the SDK
     *@param callback the function to set the body response
     * 
     */
	assign: function( userService, callback ){
		var uri = this.URI;
		var ctype = this.CTYPE;
		
		/**
	     * Callback function to get the verify response
	     *
	     * @param response the get response of the verify assigned service and add a user into 
	     * 				   a service in the Hover system using Hover API if user isn't already assigned to it.
	     */
		var getAssignResponse = function( response ){
			if( response.getHttpcode() === 200 )
				throw UserAlreadyAssignedInServiceException( "User is already assigned to this service" );
			else
			{
				var servValue = Utility.SDKUtilities.getValueObject( userService );
				var client = new ClientPOST( JSON.stringify( servValue ), uri, ctype );
				client.request( callback, true );
			}
		};
		
		// Check if service is already assigned to the user 
		this.get( userService.getService_id(), userService.getUser_id(), null, getAssignResponse );	
	}
};

/**************************************** PHONE EXTENSION ****************************************/

function UserPhoneExtension(){
	this.URI = "/v1/user/phone/extension";
	
	this.CTYPE = "application/json";
}

UserPhoneExtension.prototype = {
	/**
     * Get a valid extension to the user in the Hover system using Hover API, the next attributes
     * must be required, not null or empty.
     * 
     * 	- branch_id: The id of the user
     *
     * @param branch_id
     * @param callback the function to set the body response
     */
	get: function( branch_id, callback ){
		var client = new ClientGET( "?branch_id="+ branch_id, this.URI, this.CTYPE );
		
		client.request( callback, true );
	}
};

/**************************************** FINGERPRINT RESOURCES ****************************************/

function FingerVerify(){
	this.URI = "/v1/fingerprint/verify";
	
	this.CTYPE = "application/x-www-form-urlencoded";
}

FingerVerify.prototype = {
	/**
     * 	Verify the fingerprint of the user is already registered
     * 
	 *	- user_id: The id of the user
	 *  _ id: fingerprint of the user
	 * 
     * 
     * @param value the value contained the data to the user merge put.
     * @param callback the function to set the body response
     */
	get: function( value, callback ){
		var queryString = Utility.SDKUtilities.get_properties( value );
		var client = new ClientGET( queryString, this.URI, this.CTYPE );
		
		client.request( callback, true );
	}
};

function MatchFingerprint(){
	this.URI = "/v1/match/fingerprint";
	
	this.CTYPE = "application/x-www-form-urlencoded";
}

MatchFingerprint.prototype = {
	
	/**
     * 	Use fingerprint to biometric verification using hoverbox or 
     *  any device that supports read fingerprints.
     * 
	 *	- fmd_rigth: fingerprint right of the user
	 *	- fmd_left: fingerprint left of the user
	 * 
     * 
     * @param value the value contained the data to the user merge put.
     * @param callback the function to set the body response
     */
	get: function( value, callback ){
		var queryString = Utility.SDKUtilities.get_properties( value );
		var client = new ClientGET( queryString, this.URI, this.CTYPE );
		
		client.request( callback, true );
	}
};

/**************************************** GROUPS RESOURCES ****************************************/

function UserGroupsResource(){
	this.URI = "/v1/groups";
	
	this.CTYPE = "application/json";
}

UserGroupsResource.prototype = {
	
	/**
     * 	Creates a new group 
     * 
     *  	- branch_id: branch id of the current user
     * 		- name: Name of the group
	 * 
     * @param value value representing the data to post.
     * @param callback the function to set the body response
     * 
     */
	create: function ( value, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPOST( JSON.stringify( cleanValue ), this.URI, this.CTYPE );
		client.request( callback, true );
	},
	
	/**
     * The update in the groups is to change the status from true to false and vice versa. 
     * The required data are:
     * 
     *  	- group_id: Id assigned to the group
	 *		- status: State of the group, can be true or false.
     * 
     * @param value value representing the data to put
     * @param callback the function to set the body response
     */
	update:function( value, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPUT( JSON.stringify( cleanValue ), this.URI, this.CTYPE );
		client.request( callback, true );
	},
	
	/**
     *  You know the general information of all notifications registered. This resource
     *  has the next parameters:
     * 
     * 		- branch_id: The user_id of the registered user
     * 
     * @param branch_id 
     * @param callback the function to set the body response 
     */
	get: function( branch_id, callback ){
		var client = new ClientGET( "?branch_id="+branch_id, this.URI, "application/x-www-form-urlencoded" );
		
		client.request( callback, true );
	}
};

/**************************************** PROFILES RESOURCES ****************************************/

function UserProfileResource(){
	this.URI = "/profiles";
	
	this.CTYPE = "application/json";
}

UserProfileResource.prototype = {
	/**
     * 	Creates a new group 
     * 
     *  	- user_id: id of the current user, parent user.
	 *		- name: name of the profile
	 *		- based_on_id: id of base profile 
	 * 
     * @param value value representing the data to post.
     * @param callback the function to set the body response
     * 
     */
	create: function ( value, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPOST( JSON.stringify( cleanValue ), this.URI, this.CTYPE );
		client.request( callback, true );
	},
	
	/**
     * The update in the groups is to change the status from true to false and vice versa. 
     * The required data are:
     * 
     *  	- group_id: Id assigned to the group
	 *		- status: State of the group, can be true or false.
     * 
     * @param value value representing the data to put
     * @param callback the function to set the body response
     */
	update:function( value, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPUT( JSON.stringify( cleanValue ), this.URI, this.CTYPE );
		client.request( callback, true );
	},
	
	/**
     *  You know the general information of all notifications registered. This resource
     *  has the next parameters:
     * 
     * 		- branch_id: The user_id of the registered user
     * 
     * @param branch_id 
     * @param callback the function to set the body response 
     */
	get: function( user_id, callback ){
		var client = new ClientGET( "?user_id="+user_id, this.URI, "application/x-www-form-urlencoded" );
		
		client.request( callback, true );
	}
	
};