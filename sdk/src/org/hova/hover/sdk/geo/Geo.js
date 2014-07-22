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

function Country(){
	this.URI = "/geo/country";
	
	this.CTYPE = "application/x-www-form-urlencoded";
}

Country.prototype = {
	
	/**
     * 	Get list of countries
     * 
     * 	@param callback the function to set the body response
     */
	get: function( callback ){
		var client = new ClientGET( "", this.URI, this.CTYPE );
		
		client.request( callback, true );
	}
};

function Estates(){
	this.URI = "/geo/estate";
	
	this.CTYPE = "application/x-www-form-urlencoded";
}

Estates.prototype = {
	
	/**
     * 	Get list of countries
     * 		- country_id: The id of the country
     * 
     * 	@param country_id
     * 	@param callback the function to set the body response
     */
	get: function( country_id, callback ){
		
		var client = new ClientGET( "?country_id="+country_id, this.URI, "application/x-www-form-urlencoded" );
		client.request( callback, true );
	}
};

function Town(){
	this.URI = "/geo/town";
	
	this.CTYPE = "application/json";
}

Town.prototype = {
	
	/**
     * 	Get list of countries
     * 		- country_id: The id of the country
     * 		- type_site: 
     * 
     * 	@param estate_id
     * 	@param type_site
     * 	@param callback the function to set the body response
     */
	get: function( estate_id, type_site, callback ){
		
		var client = new ClientGET( "?estate_id="+estate_id+"&type_site="+type_site, this.URI, this.CTYPE );
		client.request( callback, true );
	}
};