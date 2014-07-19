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
 * POJO function for user json structure based on API responses.
 * 
 * @author Salvador Rojas
 */

function Logs(){
	
	/**
     * Log size
     */
    var LOG_SIZE = 1024*1000;
    
    /**
     * Log rotation
     */
    var LOG_NUMFILES = 5;
    
    /**
     * Log for request data
     */
    var LOG_REQUEST = "Sending Request URI: {0}\n\tBody: {1}\n\t"
            + "Content-Type: {2}\n";
    
    /**
     * User already assigned to service
     */
    var LOG_USER_ALREADY_IN_SERVICE = "User {0} is already assigned"
            + " to service {1}\n";
    
    /**
     * Log for response data
     */ 
    var LOG_RESPONSE = "Getting Response HTTP Status Code: {0}\n\t"
            + "Body: {1}\n\tSerialization class: {2}\n";
    
    /**
     * Log for configuration success
     */
    var LOG_CONFIG_SUCCESS = "SDK-Load configuration file: {0}\n";
    
    /**
     * Log for configuration error
     */
    var LOG_CONFIG_ERR = "SDK-Load configuration file error: {0}\n";
    
    /**
     * 
     */
    var LOG_CONFIG = "SDK properties configuration: {0}\n";
    
    this.initialize = function( logPath ){
    	
    };
};
