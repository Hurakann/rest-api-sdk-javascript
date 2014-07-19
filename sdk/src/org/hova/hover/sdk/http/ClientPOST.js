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
 * @author Salvador Rojas
 */

/**
 * Build a instance of this function and set the default values to execute request
 * 
 * @param body the body of the request
 * @param uri the uri of the request. In RESTful is known as the resource
 * @param ctype the content-type for the body request
 * @param callback the function to set the body request 
 */
function ClientPOST(body, uri, ctype, callback)
{
	var body = body;
	var uri = uri;
	var ctype = ctype;
	
	var callback = callback;
	
	/**
     * Execute the POST HTTP request building previously with the attributes  
     * passed into this constructor.
     * 
     * @return the response instance containing code and body response 
     */
	this.request = function()
	{
		var HOST = SDKModel.getInstance().getHttp_endpoint()+uri;
	
		var conn = new XMLHttpRequest();
			
		var resp = new Response();
			
		conn.open( "POST", HOST, true );
		conn.setRequestHeader( 'Content-type', ctype );
				
		conn.send(body);
		
		conn.onload = function ( e )
		{
			resp.setBody(conn.responseText );				
			resp.setHttpcode(conn.status );
			callback(resp);
		};
			
		conn.onerror = function ( e ) 
		{
			resp.setBody(conn.responseText );
			resp.setHttpcode(conn.status );
			callback(resp);
		};		
	};
}
