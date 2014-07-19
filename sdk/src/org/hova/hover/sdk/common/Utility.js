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
	 * @param map the map containing reflection values
     * @return  the query string well-formed
	 * 
	 */
	get_properties: function( map )
	{
		var queryString = "?";
		
		for( var property in object )
			if( typeof object[property] !== 'function')
				queryString += property+"="+object[property]+"&";
		
		// Return without the last char '&'
		return queryString.substring(0,(utilsParams.length-1));
	},
	
	getValueObject: function( value ){
		var newObj = {};
		for( var property in value )
				if( typeof value[property] !== 'function')
				{
					newObj[property] = value[property];
					alert(property+"="+value[property]);
				}
		return newObj;
	}
};