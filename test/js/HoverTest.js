$(document).ready(function() {
	
	SDKModel.getInstance().initialize();
	
	var getResponse = function ( response )
	{
		alert("Response JSON: \n"+response.getBody());
		alert("Response code: "+response.getHttpcode());
	}
	/******** User TEST*********/
	
	var userResource = new UserResource();
	var user = new User();
	//************ USER POST *************
	
	//******** Create User ********
	//Create a user for test Login
	/*user.branch_id 	= "7603eece-9b65-4a9d-b681-6f6f49d9e600";
	user.name 		= "TEST V";
	user.username 	= "testv";
	user.password 	= "testv";
	user.email		= "test@example.com";
	user.phase 		= "phase1";
	user.coloruser 	= "black";
	user.language 	= "es";
	user._serial	= "TESTSERIALV";
	user.profile_id = "55c4e2db-d6c9-4a0b-ab76-d3023c5d0166";
	user.user_id 	= "3fe1e8ea-a8cd-490e-951c-8e7edcdc8628";

	userResource.create( user, getResponse );*/

	//response of the user register: 
	/*
		{"user_id":"64436905-aea9-417e-be37-bfb23740cfe6",
		"i_services":"i_service_unresolved",
		"i_nfc":"i_nfc_unresolved"}
	*/
	
	//************ USER GET *************
	
	//userResource.get('7603eece-9b65-4a9d-b681-6f6f49d9e600','64436905-aea9-417e-be37-bfb23740cfe6','all', getResponse, User);
	/*
	{
    "user": {
        "branch_id": "c5c00756-9be0-4dd8-a78d-51724d04ccec"
    },
    "profile": {
        "profile_id": "55c4e2db-d6c9-4a0b-ab76-d3023c5d0166",
        "name": "Master"
    },
    "name": "TEST V",
    "profile_id": "55c4e2db-d6c9-4a0b-ab76-d3023c5d0166",
    "type_profile": "Master",
    "serial": "TESTSERIALV",
    "phase": "phase1",
    "creation_date": "22-07-2014 14:19:04",
    "language": "es",
    "fmd": false,
    "email": "test@example.com",
    "username": "testv"
}
	*/
	
	//************ USER PUT *************
	/*user.branch_id = '7603eece-9b65-4a9d-b681-6f6f49d9e600';
	user.user_id = '64436905-aea9-417e-be37-bfb23740cfe6';
	user.lastname = "TEST";
	user.lastname2 = "TEST";
	userResource.update( user, getResponse );*/
	
	/********LOGIN TEST*********/
	var login= new UserLoginResource();
	
	/*var getResponseLogin = function( response ){
		alert( "Response JSON \n"+JSON.stringify(response.getBodyT()) );
		alert( "Color"+response.getBodyT().branches[0].color );
	};
		
	login.login( "testv", "testv", getResponseLogin );*/
	
	//************ USER AVAILABILITY TEST*************
	
	//userResource.getAvailability( "testv", getResponse );
	
	//************ USER COLOR TEST*************
	
	//userResource.checkColor("test@example.com","black", getResponse);
	
	//************ USER SEARCH TEST*************
	var userSearch =  {};
	
	/*
	//userSearch.pagination = 20;

	userSearch.branch_id = "7603eece-9b65-4a9d-b681-6f6f49d9e600";
	userSearch.broot = "7603eece-9b65-4a9d-b681-6f6f49d9e600";
	userSearch.pagination = 20;
	userSearch.serial = "TESTSERIALV";
	
	var search = new UserSearchResource();
	
	search.search( userSearch, getResponse );*/
	

	//*****************Check User Search *********************

	/******** Service TEST*********/
	//******** GET ******** 
	var service = new UserServicesResource();
	//Check all services assigned to parent user
	//service.get( 'all', '3fe1e8ea-a8cd-490e-951c-8e7edcdc8628' , null, getResponse );
	
	//******** POST ******** 
	/*var userService = new UserService();
	userService.activation_date = "2014-07-16";
	userService.validity = "yearly";
	userService.user_id = "64436905-aea9-417e-be37-bfb23740cfe6";
	userService.expiration_date = "2016-07-15";
	userService.status = true;
	userService.service_id = "f36a6a88-bf72-4604-87f7-03d355127924";
	
	service.assign(userService, getResponse);*/

	//***** Check the service assign to this user
	//service.get( 'all', 'ded335bd-23ce-4d67-897b-2f74a91bae65' , null, getResponse );
	
	//******** PUT ******** 
	
	/*userService.user_id = "ded335bd-23ce-4d67-897b-2f74a91bae65";
	userService.status = true;
	userService.service_id = "f36a6a88-bf72-4604-87f7-03d355127924";
	
	service.update( userService, getResponse );*/

	//***** Check the service update to this user
	//service.get( 'all', 'ded335bd-23ce-4d67-897b-2f74a91bae65' , null, getResponse );
	
	
	////ALL GEO Services Pendent to check
	/******** Geo TEST *********/
	//******** Country ********
	/*var geo = new Country();
	
	geo.get( getResponse );*/
	
	//{} 
	//******** Estate********
	 /*var estates = new Estates();
	 
	 estates.get("1235a3ba-87e4-44b4-a117-edcd51fadb0e", getResponse );*/
	
	//******** Town ******** 
	/*var town = new Town();
	
	town.get("1d38916c-393b-4dbc-a038-1ae28356c373","Municipio", getResponse );*/
	
	
	/******** PROFILE TEST *********/
	var profile = new UserProfileResource();
	
	//profile.get( "3fe1e8ea-a8cd-490e-951c-8e7edcdc8628", getResponse );
	
	//profile.create({"user_id": "3fe1e8ea-a8cd-490e-951c-8e7edcdc8628", "name":"JAVASCRIPT TEST PROFILE"}, getResponse );
	 
	//profile.update({"profile_id": "9b057007-196e-42a4-9791-921c427e2791","name": "JAVASCRIPT UPDATE TEST PROFILE"}, getResponse );

	/******** NOTIFICATIONS TEST *********/
	var notification = new UserNotificationsResource();

	//*Get notification list of the parent user with the branch_id param
	//notification.getList( "7603eece-9b65-4a9d-b681-6f6f49d9e600", getResponse );

	//Create notidification for the new user created previously 
	/*notification.create(
		{
		    "title": "TEST JAVASCRIPT II",
		    "message": "Notification test created from JAVASCRIPT",
		    "branch_id": "c5c00756-9be0-4dd8-a78d-51724d04ccec" 
		}, getResponse );*/

	
	//notification.getList( "c5c00756-9be0-4dd8-a78d-51724d04ccec", getResponse );
	/*
	[{"title":"TEST JAVASCRIPT II",
	"read":false,
	"notification_id":"cfb139f9-9e6d-41af-a5ef-8ff89c1451d1",
	"time":"14:56:37","date":"2014-07-22"}]
	*/


	//Read notification conten created
	//notification.getNotificationContent( 'c5c00756-9be0-4dd8-a78d-51724d04ccec','cfb139f9-9e6d-41af-a5ef-8ff89c1451d1', getResponse );
	
	//notification.update({ "notification_id":"cfb139f9-9e6d-41af-a5ef-8ff89c1451d1","read":true }, getResponse );

	/******** MERGE TEST *********/
	var merge = new UserMergeResource();

	/*user.branch_id = "7603eece-9b65-4a9d-b681-6f6f49d9e600";
	user.name = "Test";
	user.lastname = "Merge";
	user.phase = "phase1";
	user.coloruser = "black";
	user.language = "es";
	user.profile_id = "55c4e2db-d6c9-4a0b-ab76-d3023c5d0166";
	user.user_id = "3fe1e8ea-a8cd-490e-951c-8e7edcdc8628";
	userResource.create( user, getResponse );*/

	//user_id = 295eab0c-e9da-4c77-b209-c97e7a5f9748

	//Merge the new user created with the old user created previously
	/*merge.merge(
		{
		    "branch_id": "7603eece-9b65-4a9d-b681-6f6f49d9e600", // branch id of the main user
		    "main_user_id": "e4407b49-3262-4c42-bc0b-814f90f607dd", 
		    "users_id": [ "295eab0c-e9da-4c77-b209-c97e7a5f9748" ] 
		}
		, getResponse );*/
	
	//merge.get("295eab0c-e9da-4c77-b209-c97e7a5f9748", getResponse);

	//Update the users merge type 

	/*merge.update(
		{
		    "branch_id": "7603eece-9b65-4a9d-b681-6f6f49d9e600",
		    "main_user_id": "e4407b49-3262-4c42-bc0b-814f90f607dd", 
		    "users_id": [ "e4407b49-3262-4c42-bc0b-814f90f607dd" ],
		    "new_main_user_id": "295eab0c-e9da-4c77-b209-c97e7a5f9748" 
		}
		, getResponse );*/

	//merge.get("295eab0c-e9da-4c77-b209-c97e7a5f9748", getResponse);

	/******** TAGS TEST *********/

	var userTags = new UserTagsResource();

	/*userTags.create(
		{
		  "user_id": "64436905-aea9-417e-be37-bfb23740cfe6",
		  "tags": ["fisrt tag", "tall" ]
		}
		, getResponse );*/

	//userTags.get( "64436905-aea9-417e-be37-bfb23740cfe6", getResponse );

	/*userTags.update( {

		"user_id": "64436905-aea9-417e-be37-bfb23740cfe6",
   		"tags": ["new tag"]
	} , getResponse );*/
});

