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

function UserNotificationsResource(){
	this.URI = "/user/notifications";
	
	this.CTYPE = "application/json";
}

UserNotificationsResource.prototype = {
	
	/**
     * 	Creates a notification to have a standardized message that can be sent to different users without 
     * 	changing its contents, in this case the title and message. The required data are:
     * 
     *  	- title: Subject of the message, general idea
	 *		- message: Body of the message, detailed information
	 *		- broot: Branch id of parent user
	 *		- branch_id: branch id of the user (specific user)
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
     * The update in the notification is to change the status from true to false and vice versa. 
     * The required data are:
     * 
     *  	- notification_id: Id assigned to the notification when it was registered.
	 *		- read: State of the notification, can be true or false.
     * 
     * @param value value representing the data to put.
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
     * 		- branch_id: branch id of the current user
     * 
     * @param branch_id the branch id of the parent user. It's required, not null.
     * @param callback the function to set the body response 
     */
	getList: function( branch_id, callback ){
		var client = new ClientGET( "?branch_id="+branch_id, this.URI, "application/x-www-form-urlencoded" );
		
		client.request( callback, true );
	},
	
	/**
     *  You know the general information of all notifications registered. This resource
     *  has the next parameters:
     * 
     * 		- branch_id: branch id of the current user
     * 		- notification_id: notification id that you want to get
     * 
     * @param branch_id 
     * @param notification_id 
     * @param callback the function to set the body response 
     */
	getNotificationContent: function( branch_id, notification_id, callback ){
		var client = new ClientGET( "?branch_id="+branch_id+"&notification_id="+notification_id, this.URI, "application/x-www-form-urlencoded" );
		
		client.request( callback, true );
	}
};