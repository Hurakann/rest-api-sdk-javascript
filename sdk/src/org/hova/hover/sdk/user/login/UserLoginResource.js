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
 * The function is responsible for trying login  
 * of the user in the Hover system using the Hover API.
 * 
 * @author Salvador Rojas
 */
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
     * @return a response instance with the http status code and the body decoded
     *          as json
     */
	login: function( user, password, callback ){
		this.queryString = "?user="+user+"&password="+password;
		var client = new ClientGET( this.queryString, this.URI, this.CTYPE );
		client.request( callback, false );
	},

	/**
     * 
     * @param email user's email to sends an email with a recuperation code.
     * 
     * @param callback the function to set the body request
     * 
     * @return a response instance with the http status code and the body decoded
     *          as json into the callback function.
     */
	sendRestoreCode: function( email, callback ){
		this.queryString = "?email="+email; 
		var client = new ClientGET( queryString, this.URI+"/restore", this.CTYPE );
		client.request( callback, false );
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
     * @param callback the function to set the body request
     * 
     * @return a response instance with the http status code and the body decoded
     *          as json into the callback function.
     */
	resetPassword: function( value, callback ){
		var client = new ClientPOST( JSON.stringify( value ), this.URI+"/reset", "application/json" );
		client.request( callback, false );
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
     * @return a response instance with the http status code and the body decoded
     *          as json into the callback function.
     */
	changePassword: function( value, callback ){
		var client = new ClientPOST( JSON.stringify( value ), this.URI+"/change_password", "application/json" );
		client.request( callback, false );
	}
};
