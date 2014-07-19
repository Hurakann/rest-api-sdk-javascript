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
 * HTTP Code and Body as the API responses on the requested resource.
 * 
 * @author Salvador Rojas
 */

function Response()
{
	this.body;
	this.httpcode;
	this.bodyT;
}

Response.prototype = {
	/**
     * Get the body of the requested resource
     * 
     * @return the body of the requested resource as string (no decoded)
     */
	getBody: function(){
		return this.body;
	},

	/**
     * Set the body of the requested resource
     * 
     * @param body the body to set of the requested resource (only for HTTP Clients)
     */
	setBody: function( body ){
		this.body = body;
	},

	/**
     * Get the HTTP Status Code of the requested resource
     * 
     * @return the httpcode of the requested resource as integer
     */
	getHttpcode: function(){
		return this.httpcode;
	},

	/**
     * Set the HTTP Status Code of the requested resource
     * 
     * @param httpcode the httpcode to set of the requested resource (only for HTTP Clients)
     */
	setHttpcode: function( httpcode ){
		this.httpcode = httpcode;
	},

	/**
     * Get the decoded json and translates to the desired class
     * 
     * @param clazz the class to cast the data object
     * 
     * @return the bodyT casted to 'clazz'
     */
	getBodyT: function(){
		return this.bodyT;
	},

	/**
     * Set the decoded json as an class Object
     * 
     * @param bodyT the bodyT to set as an object
     */
	setBodyT: function( bodyT ){
		this.bodyT = bodyT;
	}
};