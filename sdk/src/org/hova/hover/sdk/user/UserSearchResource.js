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
 * The function is responsible for getting data of the user in the Hover system
 * using the Hover API via riak search.
 * 
 * @author Salvador Rojas
 */

function UserSearchResource (){
	/** @const */ var URI = "/v1/user/search";
	
	/** @const */ var CTYPE = "application/json";
	
	/**
     * Find all users matching the incoming data set
     *
     * @param userSearch
     *
     * @return a response instance with the http status code and the body
     * decoded as json
     */
	this.find = function( userSearch, pagination, callback )
	{
		var queryString = Utility.HoverUtilities.get_properties( userSearch )+"&pagination="+pagination;
				
		var client = new ClientGET( queryString, URI, CTYPE, callback );
		
		client.request();
	};
};