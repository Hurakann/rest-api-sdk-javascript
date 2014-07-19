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
 * Singleton function for SDK configuration properties.
 * 
 * @author Salvador Rojas
 */


var SDKModel = (function(){
              var hoverInstance; 
              
              var model = function(){
                         var http_connection_timeout;
                         var http_connection_readtimeout; 
                         
                         var http_endpoint = "";
                         
                         var clientID = "";
                         var clientSecret = "";
                         
                         var tenantID = "";
                         
                         var initialize = function(){
							var conn = new XMLHttpRequest();
							conn.open( "GET", "rest-api-sdk-javascript/resources/hover_sdk_config.json", true );
									
							conn.send(null);
							conn.onload = function ( e )
							{
								var properties = JSON.parse(conn.responseText); 
								
								http_connection_timeout = properties.http_connection_timeout;
								
								http_endpoint = properties.http_endpoint;
									
								clientID = properties.clientID;
									
								clientSecret = properties.clientSecret;
									
								tenantID = properties.tenantID;
							};
								
                         };
                                      
                         var getHttp_connection_timeout = function(){
                                  return http_connection_timeout;
                         };
                         
                         var setHttp_connection_timeout = function( http_connection_timeoutV ){
                         		http_connection_timeout = http_connection_timeoutV;
                         };
                         
                        
                         var getHttp_connection_readtimeout = function(){
                                  return http_connection_readtimeout;
                         };
                         
                         var setHttp_connection_readtimeout = function( http_connection_readtimeoutV ){
                         		http_connection_readtimeout = http_connection_readtimeoutV;
                         };
                        
                         var getHttp_endpoint = function(){
                                  return http_endpoint;
                         };
                         
                         var setHttp_endpoint = function( http_endpointV ){
                         		http_endpoint = http_endpointV;
                         };
                         
                        
                         var getClientID = function(){
                                  return clientID;
                         };
                         
                         var setClientID = function( clientIDV ){
                         		clientID = clientIDV;
                         };
                        
                         var getClientSecret = function(){
                                  return clientSecret;
                         };
                         
                         var setClientSecret = function( clientSecretV ){
                         		clientSecret = clientSecretV;
                         };
                        
                         var getTenantID = function(){
                                  return tenantID;
                         };
                         
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