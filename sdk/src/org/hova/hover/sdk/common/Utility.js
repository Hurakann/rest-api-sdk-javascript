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

var Utility = {};

Utility.SDKUtilities = 
{
	/**
	 * 
	 * @param object the object containing reflection values
     * @return  the query string well-formed
	 * 
	 */
	get_properties: function( object )
	{
		var queryString = "?";
		for( var property in object )
			if( typeof object[property] !== 'function' )
				if( object[property] !== '')
					queryString += property+"="+object[property]+"&";
		
		// Return without the last char '&'
		return queryString.substring(0,(queryString.length-1));
	},
	
	getValueObject: function( value ){
		var newObj = {};
		for( var property in value )
				if( typeof value[property] !== 'function')
					if( value[property] !== '' )
						newObj[property] = value[property];
					
		return newObj;
	},

	getNewProperties: function( object, type ){
		var tot_class = this.objectSize(type);
		var cont = 0;
		var newObj = {};
		for( var property in object ){
			cont = 0;

			if( typeof object[property] !== 'function' )
				for( var nativeProperty in type )
					if( typeof type[nativeProperty] !== 'function' ){
						if( nativeProperty == property )
							newObj[property] = object[property]; 
						else
							cont++;

						if( cont == tot_class )
							newObj["_"+property] = object[property];
					}
		}

		return newObj;
	},

	objectSize: function( object ) {
	    var size = 0;
	    for (var property in object) {
	    	if( typeof object[property] !== 'function' )
	       		{
	       			console.log(property);
	       			size++;
	       		}
	    }
	    return size;
	}

};

/**
 * Singleton function for SDK configuration properties.
 */
var SDKModel = (function(){
	var hoverInstance; 
              
	var model = function(){
		var http_connection_timeout = 10;
        var http_connection_readtimeout; 
                         
        var http_endpoint = "";
        
        var clientID = "";
        var clientSecret = "";
                         
        var tenantID = "";
                       
        var initialize = function(){
			var conn = new XMLHttpRequest();

			conn.open( "GET", "rest-api-sdk-javascript/resources/hover_sdk_config.json", false);
										
			conn.onload = function ( e )
			{
				var properties = JSON.parse(conn.responseText); 
									
				http_connection_timeout = properties.http_connection_timeout;
								
				http_endpoint = properties.http_endpoint+""+properties.api_version;
											
				clientID = properties.clientID;
										
				clientSecret = properties.clientSecret;
										
				tenantID = properties.tenantID;
				
				console.log("Configuration loaded.");
			};
			conn.send(null);
		};
                                      
	    /**
		 * Return http_connection_timeout for all the request
		 * 
		 * @return http_connection_timeout
		 */
		var getHttp_connection_timeout = function(){
	     	return http_connection_timeout;
		};
	                         
		/**
		 * Timeout for all the request
		 * 
		 * @param http_connection_timeoutV
		 */
		var setHttp_connection_timeout = function( http_connection_timeoutV ){
	    	http_connection_timeout = http_connection_timeoutV;
		};
	                         
	 	/**
		 * Return http_connection_readtimeout for all the request
		 * 
		 * @return http_connection_readtimeout
		 */
		var getHttp_connection_readtimeout = function(){
	    	return http_connection_readtimeout;
		};
	                         
		/**
		 * Read timeout for all the request
		 * 
		 * @param http_connection_readtimeoutV
		 */
		var setHttp_connection_readtimeout = function( http_connection_readtimeoutV ){
	    	http_connection_readtimeout = http_connection_readtimeoutV;
		};
	                        
	 	/**
		 * Return http_endpoint for all the request
		 * 
		 * @return http_endpoint
		 */
		var getHttp_endpoint = function(){
	    	return http_endpoint;
		};
	                         
		/**
		 * Endpoint for all the request
		 * 
		 * @param http_endpointV
		 */
		var setHttp_endpoint = function( http_endpointV ){
	    	http_endpoint = http_endpointV;
		};
	                         
	    /**
		 * Return clientID 
		 * 
		 * @return clientID
		 */
		var getClientID = function(){
	    	return clientID;
		};
	                         
	  	/**
		 * Set value for clientID 
		 * 
		 * @param clientIDV
		 */
		var setClientID = function( clientIDV ){
	    	clientID = clientIDV;
		};
	                        
		/**
		 * Return clientSecret 
		 * 
		 * @return clientSecret
		 */
		var getClientSecret = function(){
	     	return clientSecret;
		};
	                         
		/**
		 * Set value for clientSecret 
		 * 
		 * @param clientSecretV
		 */
		var setClientSecret = function( clientSecretV ){
	    	clientSecret = clientSecretV;
		};
	                        
		/**
		 * Return tenantID for all the request
		 * 
		 * @return tenantID
	 	 */
		var getTenantID = function(){
	     	return tenantID;
		};
	                         
		/**
		 * Set value for tenantID 
		 * 
		 * @param tenantIDV
		 */
		var setTenantID = function( tenantIDV ){
	    	tenantID = tenantIDV;
		};

		return {
	    	getHttp_connection_timeout: getHttp_connection_timeout,
	        setHttp_connection_timeout: setHttp_connection_timeout,
	                                
	   		getHttp_connection_readtimeout:getHttp_connection_readtimeout,
	     	setHttp_connection_readtimeout: setHttp_connection_readtimeout,
	                                
	      	getHttp_endpoint: getHttp_endpoint,
	        setHttp_endpoint: setHttp_endpoint,
	                                
			getClientID: getClientID,
			setClientID: setClientID,
	                                
			getClientSecret: getClientSecret,
			setClientSecret: setClientSecret,
	                                
			getTenantID: getTenantID,
	        setTenantID: setTenantID,
	                                
	        initialize: initialize
		};
	};
 
	return {
		getInstance: function(){
        	if(!hoverInstance){
            	hoverInstance = model(); 
         	}
    		return hoverInstance; 
		}
	};
})();