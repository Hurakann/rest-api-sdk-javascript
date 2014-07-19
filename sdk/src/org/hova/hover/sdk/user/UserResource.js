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
	/** @const */ var URI = "/v1/user";
	
	/** @const */ var CTYPE = "application/json";
	
	var callback = {};
	
	/**
     * Get the user info on a specific phase using the Hover API.
     * 
     * @param branchid the branch id of the parent user. It's required, not null.
     * @param userid the user id for the desired user for getting info. It's required, not null.
     * @param phase the phase of the user for getting info, it could be: phase1,
     *              phase2, phase3, phase4 or all for retrieving all phases. It's required, not null.
     * @param callback the function to set the body request 
     * @return a response instance with the http status code and the body decoded
     *          as json
     */
	this.get =  function( branchId, userId, phase, callbackV )
	{
		callback = callbackV;
		
		var queryString = "?branch_id="+branchId+"&user_id="+userId+"&phase="+phase;
		var client = new ClientGET( queryString, URI, CTYPE, getResponse);
	
		client.request();
	};
	
	/**
     * Create a user in the Hover system using Hover API, the next attributes
     * in the User function must be required, not null:
     * 
     *  - branch_id
     *  - user_id
     *  - profile_id
     *  - phase
     *  - coloruser
     * 
     * @param user the user representing the data to post. The data could
     *              be encoded as json format by the SDK
     * @return a response instance with the http status code and the body decoded
     *          as json
     */
	this.create = function( user, callback ){
		alert("Llega"+ JSON.stringify(user));
		var userValue = Utility.SDKUtilities.getValueObject(user);
		
		alert(JSON.stringify(userValue));
		//var client = new ClientPOST( JSON.stringify( user ), URI, CTYPE, callback );
	};
	
	/**
     * Callback function to get the verify response
     * 
     * @param response return the body response by the callback defined into this constructor
     */
	this.getResponse = function( response ){
		callback(response);
	};
	
};

UserResource.prototype = {
	
};
