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
 * 
 * @author Salvador Rojas
 */

function MobileRegister(){
	this.URI = "/v1/mobile/register";
	
	this.CTYPE = "application/json";
}

MobileRegister.prototype = {
	
	/**
     * Link a user with a mobile device so the mobile app using Hover API, the next attributes
     * in the User function must be required, not null:
     * 
     *  - branch_id: The parent branch id of the user to register
	 *	- user_id: The parent user id of the user to register
	 *  - broot: 
	 *  - token:
	 * 	- status: active | inactive 
	 * 	- platform:
	 * 
     * @param value the user representing the data to post.
     * @param callback the function to set the body response
     * 
     */
	create: function( values, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPOST( JSON.stringify( cleanValue ), this.URI, this.CTYPE );
		
		client.request( callback, true );
	},
	
	/**
     * Link a user with a mobile device so the mobile app using Hover API, the next attributes
     * in the User function must be required, not null:
     * 
     *  - branch_id: The parent branch id of the user to register
	 *	- user_id: The parent user id of the user to register
	 *  - broot: 
	 *  - token:
	 * 	- status:
	 * 	- platform:
	 * 
     * @param value the user representing the data to post.
     * @param callback the function to set the body response
     * 
     */
	update: function( value, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPUT( JSON.stringify( cleanValue ), this.URI, this.CTYPE );
		
		client.request( callback, true );
	}
};

function MobileSend(){
	this.URI = "/v1/mobile/send";
	
	this.CTYPE = "application/json";
}

MobileSend.prototype = {
	
	/**
     * Send native notifications to a mobile devices already linked to usersusing Hover API, the next attributes
     * in the User function must be required, not null:
     * 
	 *	- users_id: Array with the users_id of the users to send the notification
	 *  - payload: 
	 *  - expiry:
	 *  - identifier:
	 * 
     * @param value the user representing the data to post.
     * @param callback the function to set the body response
     * 
     */
	create: function( value, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPOST( JSON.stringify( cleanValue ), this.URI, this.CTYPE );
		
		client.request( callback, true );
	}
};