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
 * The function is responsible for posting, getting, updating and deleting data of
 * the user services in the Hover system using the Hover API.
 * 
 * @author Salvador Rojas
 */


function UserServicesResource ()
{
	/** @const */ var URI = "/v1/user/services";
	
	/** @const */ var CTYPE = "application/json";
	
	var service = new UserService();;
	
	var callback = {};

	/**
     * Get the user info on a specific phase using the Hover API.
     *
     * @param serviceid the service id assigned to the user. It could be a valid
     *                  id or the string all for requesting all assigned services.
     * @param userid the user id for which one get the service(s). It's
     *               required, not null.
     * @param owner if it is true, then retrieve services as owner, to retieve
     *              services assign just send this as 'null'.
     * @param callback the function to set the body request 
     * 
     * @return a response instance with the http status code and the body
     *         decoded as json
     */
	this.get = function( serviceId, userId, owner, callback )
	{
		if( ( serviceId === 'all' ) && ( owner == null ) ){
			params.user_id = userId;
		}else if( owner != null ){
			params.user_id 	= userId;
			params.owner  	= owner;
		}else{
			params.user_id = userId;
			params.service_id = serviceId;
		}
		
		
		var client = new ClientGET( Utility.HoverUtilities.get_properties(params), URI, CTYPE, callback);
	
		client.request();
	};
	
	/**
     * Add a user into a service in the Hover system using Hover API or thrown 
     * an exception if user is already assigned to it.
     *
     * @param userService the user services class representing the data to
     *                      post. The data could be encoded as json format by the SDK
     *@param callbackV the function to set the body request 
     * 
     * @return a response instance with the http status code and the body
     *         decoded as json
     */
	this.assign = function( userService, callbackV ){
		service = userService;
		callback = callbackV;
		
		// Check if service is already assigned to the user 
		this.get( userService.getService_id(), userService.getService_id(), null, getResponse);	
	};
	
	/**
     * Callback function to get the verify response
     *
     * @param response the get response of the verify assigned service and add a user into 
     * 				   a service in the Hover system using Hover API if user isn't already assigned to it.
     */
	var getAssignResponse = function( response ){
		if( response.getHttpcode === 200 )
			callback(null);
		else
		{
			var client = new ClientPOST( JSON.stringify( service ), URI, CTYPE, callback );
		}
	};
};
