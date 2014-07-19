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

function User()
{
	this.branch_id = "";
    this.name = "";
    this.lastname = "";
    this.lastname2 = "";
    this.gender = "";
    this.birthday = "";
    this.phase = "";
    this.coloruser = "";
    this.language = "";
    this.profile_id = "";
    this.user_id = "";
}

User.prototype={
	/**
     * Branch id for the parent user (owner of the user)
     * 
     * @return the branch_id
     */
	getBranch_id: function(){
		return this.branch_id;
	},

	/**
     * Branch id for the parent user (owner of the user)
     * 
     * @param branch_id the branch_id to set
     */
	setBranch_id: function( branch_id ){
		this.branch_id = branch_id;
	},

	 /**
     * Name for the user
     * 
     * @return the name
     */
	getName: function(){
		return this.name;
	},

	 /**
     * Name for the user
     * 
     * @param name the name to set
     */
	setName: function(name){
		this.name = name;
	},

	/**
     * Lastname for the user
     * 
     * @return the lastname
     */
	getLastname: function(){
		return this.lastname;
	},

	/**
     * Lastname for the user
     * 
     * @param lastname the lastname to set
     */
	setLastname: function(lastname){
		this.lastname = lastname;
	},
    
    /**
     * Lastname2 for the user
     * 
     * @return the lastname2
     */
    getLastname2: function(){
		return this.lastname2;
	},

	/**
     * Lastname2 for the user
     * 
     * @param lastname2 the lastname2 to set
     */
	setLastname2: function(lastname2){
		this.lastname2 = lastname2;
	},
 
 	/**
     * Gender of the user
     * 
     * @return the gender
     */
 	getGender: function(){
		return this.gender;
	},

	/**
     * Gender of the user
     * 
     * @param gender the gender to set
     */
	setGender: function( gender ){
		this.gender = gender;
	},
    
    /**
     * Birthday of the user (format YYYY-MM-DD)
     * 
     * @return the birthday
     */
    getBirthday: function(){
		return this.birthday;
	},

	 /**
     * Birthday of the user (format YYYY-MM-DD)
     * 
     * @param birthday the birthday to set
     */
	setBirthday: function( birthday ){
		this.birthday = birthday;
	},
    
    /**
     * Phase to keep the user (1, 2, 3 or 4)
     * 
     * @return the phase
     */
    getPhase: function(){
		return this.phase;
	},

	/**
     * Phase to keep the user (1, 2, 3 or 4)
     * 
     * @param phase the phase to set
     */
	setPhase: function( phase ){
		this.phase = phase;
	},
    
    /**
     * Color for distinct the user (use black please!!)
     * 
     * @return the coloruser
     */
    getColoruser: function(){
		return this.coloruser;
	},

	/**
     * Color for distinct the user (use black please!!)
     * 
     * @param coloruser the coloruser to set
     */
	setColoruser: function( coloruser ){
		this.coloruser = coloruser;
	},
    
    /**
     * Language short description for the user (es, en, so on....)
     * 
     * @return the language
     */
    getLanguage: function(){
		return this.language;
	},

	/**
     * Language short description for the user (es, en, so on....)
     * 
     * @param language the language to set
     */
	setLanguage: function( language ){
		this.language = language;
	},
    
    /**
     * Profile that could take the user
     * 
     * @return the profile_id
     */
    getProfile_id: function(){
		return this.profile_id;
	},

	/**
     * Profile that could take the user
     * 
     * @param profile_id the profile_id to set
     */
	setProfile_id: function( profile_id ){
		this.profile_id = profile_id;
	},
    
    /**
     * User id of the parent user
     * 
     * @return the user_id
     */
    getUser_id: function(){
		return this.user_id;
	},

	/**
     * User id of the parent user
     * 
     * @param user_id the user_id to set
     */
	setUser_id: function( user_id ){
		this.user_id = user_id;
	}
};