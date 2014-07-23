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
 * Creates a correct DELETE HTTP request with a json encoded as a body.
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
function ClientDELETE( body, uri, ctype )
{
	this.body = body;
	this.uri = uri;
	this.ctype = ctype;
	
}

ClientDELETE.prototype = {
	/**
     * Execute the POST HTTP request building previously with the attributes 
     * passed into this constructor.
     * 
     * @return the response instance containing code and body response 
     */
	request: function( callback, isAsync, sendParams  )
	{
		var getResponse = function( response ){
			callback( response );
		};
		
		var conn = new ConnectionClient( "DELETE", this.uri, this.ctype, this.body, isAsync, sendParams, callback );
		
		/*alert(SDKModel.getInstance().getHttp_endpoint());
		var HOST = SDKModel.getInstance().getHttp_endpoint()+uri+body;
		
		var conn;

		try {
            conn = new XMLHttpRequest();
        } catch (e) {
            try {
                conn = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    conn = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    console.log("This sample only works in browsers with AJAX support"); 
                    return false;
                }
            }
        }
			
		var resp = new Response();
			
		conn.open( "DELETE", HOST, isAsync );
		conn.setRequestHeader( 'Content-type', this.ctype );
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
			alert(conn.status);
			callback(resp);
		};	
		
		conn.send();
		
		if( callback === null )
			return resp;*/
	}
};

/**
 * Build a instance of this function and set the default values to execute request
 * 
 * @param body the body of the request
 * @param uri the uri of the request. In RESTful is known as the resource
 * @param ctype the content-type for the body request
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
		var getResponse = function( response ){
			callback( response );
		};
		var conn = new ConnectionClient( "GET", this.uri, this.ctype, this.body, isAsync, false, callback );
	}
};

/**
 * Build a instance of this function and set the default values to execute request
 * 
 * @param body the body of the request
 * @param uri the uri of the request. In RESTful is known as the resource
 * @param ctype the content-type for the body request
 */
function ClientPOST( body, uri, ctype )
{
	this.body = body;
	this.uri = uri;
	this.ctype = ctype;
}

ClientPOST.prototype = {
	/**
     * Execute the POST HTTP request building previously with the attributes  
     * passed into this constructor.
     * 
     * @return the response instance containing code and body response 
     */
	request: function( callback, isAsync ){
		var conn = new ConnectionClient("POST",this.uri, this.ctype, this.body, isAsync, true, callback);
	}
};

/**
 * Build a instance of this function and set the default values to execute request
 * 
 * @param body the body of the request
 * @param uri the uri of the request. In RESTful is known as the resource
 * @param ctype the content-type for the body request
 * @param callback the function to set the body request 
 */
function ClientPUT( body, uri, ctype )
{
	this.body = body;
	this.uri = uri;
	this.ctype = ctype;
}

ClientPUT.prototype = {
	/**
     * Execute the PUT HTTP request building previously with the attributes 
     * passed into this constructor.
     * 
     * @return the response instance containing code and body response 
     */
	request: function( callback, isAsync )
	{
		alert( "CLIENT PUT"+this.uri+this.ctype);
		var conn = ConnectionClient( "PUT",this.uri, this.ctype, this.body, isAsync, true, callback);

	}	
};

function ConnectionClient( method, uri, ctype, body, isAsync, sendParams, callback ){
	var HOST = ( !sendParams )?SDKModel.getInstance().getHttp_endpoint()+uri+body:SDKModel.getInstance().getHttp_endpoint()+uri;
	
	var sendResponse = false;
		var conn;
		
		if ( window.XMLHttpRequest )
		// code for IE7+, Firefox, Chrome, Opera, Safari
			conn = new XMLHttpRequest();
		else
		// code for IE6, IE5
		  	conn = new ActiveXObject( "Microsoft.XMLHTTP" );
		
			
		var resp = new Response();
		
		if( callback == null )
			isAsync = false;
			
			
		conn.onreadystatechange = function()
		{
			console.log(conn.readyState+":"+conn.statusText);

			switch( conn.readyState )
			{
				case 1:
					console.log("Server connection established");
				break;

				case 2:
					console.log("Request received ");
				break;

				case 3:
					console.log("Processing request ");
				break;

				case 4:
					if( !sendResponse )
					{
						clearTimeout( ajaxTimeout );
						sendResponse = true;

						resp.setBody(conn.responseText );
						resp.setHttpcode(conn.status );

						if(	conn.responseText !== "" )
						resp.setBodyT( JSON.parse( conn.responseText ) );

						if( callback !== null )
							callback( resp );
				
						conn = null;
						callback = null;
					}
				break;
			}
		};
		
		conn.open( method, HOST, isAsync );
		conn.setRequestHeader( 'Content-type', ctype );
		conn.onload = function ( e )
		{
			if( ! sendResponse )
			{
				sendResponse = true;

				clearTimeout( ajaxTimeout );

				resp.setBody( conn.responseText );				
				resp.setHttpcode( conn.status );
				console.log( "LOAD"+conn.responseText );				
				console.log( "STATUS"+conn.status );
				
				if(	conn.responseText !== "" )
					resp.setBodyT( JSON.parse( conn.responseText ) );
					
				if( callback !== null )
					callback( resp );
				
				conn = null;
				callback = null;
			}
		};
			
		conn.onerror = function ( e ) 
		{
			if( ! sendResponse )
			{
				clearTimeout( ajaxTimeout );
				sendResponse = true;

				resp.setBody( conn.responseText );
				resp.setHttpcode( conn.status );
	 
				if( callback !== null )
					callback( resp );
				
				conn = null;
				callback = null;
			}
		};

		var ajaxTimeout = setTimeout( function(){
			console.log("Exception");
		   conn.abort();
		   throw new ConnectionTimeoutException( "Request timeout expired" );
		}, SDKModel.getInstance().getHttp_connection_timeout() );
		
		console.log( HOST );
		( sendParams )?conn.send( body ):conn.send( null );
		
		if( callback === null )
			return resp;	
}

/**
 * HTTP Code and Body as the API responses on the requested resource.
 * 
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
	getBody: function(){ return this.body; },

	/**
     * Set the body of the requested resource
     * 
     * @param body the body to set of the requested resource (only for HTTP Clients)
     */
	setBody: function( body ){ this.body = body; },

	/**
     * Get the HTTP Status Code of the requested resource
     * 
     * @return the httpcode of the requested resource as integer
     */
	getHttpcode: function(){ return this.httpcode; },

	/**
     * Set the HTTP Status Code of the requested resource
     * 
     * @param httpcode the httpcode to set of the requested resource (only for HTTP Clients)
     */
	setHttpcode: function( httpcode ){ this.httpcode = httpcode; },

	/**
     * Get the decoded json and translates to the desired class
     * 
     * @param clazz the class to cast the data object
     * 
     * @return the bodyT 
     */
	getBodyT: function(){ return this.bodyT; },

	/**
     * Set the decoded json as an Object
     * 
     * @param bodyT the bodyT to set as an object
     */
	setBodyT: function( bodyT ){ this.bodyT = bodyT; }
};

/**************************************** CUSTOM EXCEPTION ****************************************/
function UserAlreadyAssignedInServiceException( message ) {
    this.name = "UserAlreadyAssignedInServiceException";
    this.message = message;
    this.stack = (new Error()).stack;
    console.log(this);
}

UserAlreadyAssignedInServiceException.prototype = new Error();
UserAlreadyAssignedInServiceException.prototype.constructor = UserAlreadyAssignedInServiceException;

function ConnectionTimeoutException( message ) { 
	this.name = "ConnectionTimeoutException"; 
	this.message = (message || ""); 
	this.stack = (new Error()).stack; 
	console.log(this); 
} 
ConnectionTimeoutException.prototype = Error.prototype;

