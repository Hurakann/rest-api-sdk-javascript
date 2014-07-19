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
 * POJO function for user services json structure based on API responses.
 * 
 * @author Salvador Rojas
 */

function UserService(){
	this.activation_date;
    this.status;
    this.expiration_date ;
    this.validity;
    this.service_id;
    this.user_id;
}

UserService.prototype = {

	/**
     * Activation date of the service (format YYYY-MM-DD)
     * 
     * @return the activation_date
     */
	getActivation_date: function(){
		return this.branch_id;
	},

	/**
     * Activation date of the service (format YYYY-MM-DD)
     * 
     * @param activation_date the activation_date to set
     */
	setActivation_date: function( activation_date ){
		this.activation_date = activation_date;
	},
    
    /**
     * Status for the service (true or false)
     * 
     * @return the status
     */
    getStatus: function(){
		return this.status;
	},

	/**
     * Status for the service (true or false)
     * 
     * @param status the status to set
     */
	setStatus: function( status ){
		this.status = status;
	},
    
    /**
     * Expiration date of the service (format YYYY-MM-DD)
     * 
     * @return the expiration_date
     */
    getExpiration_date: function(){
		return this.expiration_date;
	},

	/**
     * Activation date of the service (format YYYY-MM-DD)
     * 
     * @param expiration_date the expiration_date to set
     */
	setExpiration_date: function( expiration_date ){
		this.expiration_date = expiration_date;
	},
    
    /**
     * Validity for the service (yearly, monthly, so on ...)
     * 
     * @return the validity
     */
    getValidity: function(){
		return this.validity;
	},

	/**
     * Validity for the service (yearly, monthly, so on ...)
     * 
     * @param validity the validity to set
     */
	setValidity: function( validity ){
		this.validity = validity;
	},
    
    /**
     * The id of the service in which user could be assigned
     * 
     * @return the service_id
     */
    getService_id: function(){
		return this.service_id;
	},

	/**
     * The id of the service in which user could be assigned
     * 
     * @param service_id the service_id to set
     */
	setService_id: function( service_id ){
		this.service_id = service_id;
	},

	/**
     * The user id that could be assigned to the service
     * 
     * @return the user_id
     */
	getUser_id: function(){
		return this.user_id;
	},

	/**
     * The user id that could be assigned to the service
     * 
     * @param user_id the user_id to set
     */
	setUser_id: function( user_id ){
		this.user_id = user_id;
	}
};