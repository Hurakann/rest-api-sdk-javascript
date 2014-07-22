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

function UserHoverBox(){
	this.URI = "/v1/user/hoverbox";
	
	this.CTYPE = "application/json";
}

UserHoverBox.prototype = {
	/**
     * Active message reception on websocket using Hover API, the next attributes
     * must be required, not null or empty.
     * 
     * 	- hoverbox: device id asigned to the device
     * 	- flush: true | false ( start | stop )
     * 	- branch_id: branch_id of the user blue 
     * 	- branch_user: send this param only if the user logger isn't a blue user
     *
     * @param value
     * @param callback the function to set the body response
     */
	get: function( value, callback ){
		var cleanValue = Utility.SDKUtilities.getValueObject( value );
		var client = new ClientPOST( JSON.stringify( cleanValue ), this.URI, this.CTYPE );
		
		client.request( callback, false);
	}
};

function UserHoverBoxes(){
	this.URI = "/v1/user/hoverboxes";
	
	this.CTYPE = "application/x-www-form-urlencoded";
}

UserHoverBoxes.prototype = {
	
	/**
     * Get list of hoverboxes is required the blue user branch_id 
     *
     *  - branch_id: The branch_id of the registered user blue
     * 
     * @param branch_id
     * 
     * @param callback the function to set the body response
     * 
     */
	get: function( brach_id, callback ){
		var client = new ClientGET( "?branch_id="+brach_id, this.URI, this.CTYPE );
		
		client.request( callback, true );
	}
};

function UserHoverBoxesStats(){
	this.URI = "/v1/user/hoverboxestats";
	
	this.CTYPE = "application/x-www-form-urlencoded";
}

UserHoverBoxesStats.prototype = {
	/**
     *  Show use statistics of hoverbox
     *
     *  - hoverbox: Hoverbox Id which requires statistics
     * 
     * @param hoverbox
     * 
     * @param callback the function to set the body response
     * 
     */
	get: function( hoverbox, callback ){
		var client = new ClientGET( "?hoverbox="+hoverbox, this.URI, this.CTYPE );
		
		client.request( callback, true );
	}
};

function UserHoverboxNet(){
	this.URI = "/v1/user/hoverboxnet";
	
	this.CTYPE = "application/x-www-form-urlencoded";
}

UserHoverboxNet.prototype = {
	/**
     *  Get information about the network configuration of hover box
     *
     *  - hoverbox: Hoverbox Id which requires the network configuration
     * 	- link: Port conexion ethernet
     * 
     * @param hoverbox
     * @param link
     * 
     * @param callback the function to set the body response
     * 
     */
	get: function( hoverbox, link, callback ){
		var client = new ClientGET( "?hoverbox="+hoverbox+"&link="+link, this.URI, this.CTYPE );
		
		client.request( callback, true );
	}
};