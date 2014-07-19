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
 * POJO function for user search (query string) structure based on API responses.
 * 
 * @author Salvador Rojas
 */

function UserSearch(){
    this.name;
    this.lastname;
    this.lastname2;
    //var merge;
    this.phase;
    this.profile_id;
    this.broot;
}

UserSearch.prototype = {
	/**
     * @return the name
     */
	getName: function(){
		return this.name;
	},

	 /**
     * @param name the name to set
     */
	setName: function( name ){
		this.name = name;
	},

	/**
     * @return the lastname
     */
	getLastname: function(){
		return this.lastname;
	},

	/**
     * @param lastname the lastname to set
     */
	setLastname: function( lastname ){
		this.lastname = lastname;
	},
    
    /**
     * @return the lastname2
     */
    getLastname2: function(){
		return this.lastname2;
	},

	/**
     * @param lastname2 the lastname2 to set
     */
	setLastname2: function( lastname2 ){
		this.lastname2 = lastname2;
	},

	/**
     * @return the merge
     */
	/*getMerge: function(){
		return this.merge;
	},*/

	/**
     * @param merge the merge to set
     */
	/*setMerge: function( merge ){
		this.merge = merge;
	},*/

	/**
     * @param phase the phase to set
     */
	getPhase: function(){
		return this.phase;
	},

	/**
     * @return the name
     */
	setPhase: function( phase ){
		this.phase = phase;
	},

	/**
     * @return the profile_id
     */
	getProfile_id: function(){
		return this.profile_id;
	},

	/**
     * @param profile_id the profile_id to set
     */
	setProfile_id: function( profile_id ){
		this.profile_id = profile_id;
	},

	/**
     * @return the broot
     */
	getBroot: function(){
		return this.broot;
	},

	/**
     * @param broot the broot to set
     */
	setBroot: function( broot ){
		this.broot = broot;
	}
};