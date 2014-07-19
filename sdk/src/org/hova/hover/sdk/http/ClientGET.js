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
 * Creates a correct GET HTTP request using query string as API needs.
 * 
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
function ClientGET( body, uri, ctype )
{
	this.body = body;
	this.uri = uri;
	this.ctype = ctype;
}

ClientGET.prototype = {
	/**
     * Execute the GET HTTP request building previously with the attributes
     * passed into this constructor.
     * 
     * @return the response instance containing code and body response 
     */
	request: function( callback, isAsync )
	{
		var HOST = SDKModel.getInstance().getHttp_endpoint()+this.uri+this.body;
		
		var conn = new XMLHttpRequest();
			
		var resp = new Response();
		
		if( callback == null )
			{
				alert("null");
				isAsync = false;
			}
		conn.open( "GET", HOST, isAsync );
		
		conn.setRequestHeader( 'Content-type', this.ctype );
			
		conn.onload = function ( e )
		{
			resp.setBody(conn.responseText );				
			resp.setHttpcode(conn.status );
			
			if(	conn.responseText === "" )
				resp.setBodyT( JSON.parse( conn.responseText ) );
				
			if( callback !== null )
				callback(resp);
		};
			
		conn.onerror = function ( e ) 
		{
			resp.setBody(conn.responseText );
			resp.setHttpcode(conn.status );
			if( callback !== null )
				callback(resp);
		};
		
		if( isAsync )
		{
			conn.timeout =  SDKModel.getInstance().getHttp_connection_timeout();
			conn.ontimeout = function(e){
				console.log("TIMEOUT");
			};	
		}
			
		conn.send();
		
		if( callback === null )
			return resp;
	}
};

