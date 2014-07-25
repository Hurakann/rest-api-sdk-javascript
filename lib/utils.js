var user = {
    "branch_id": "", // branch id of parent user
    "password": "", // password if object is user
    "from_town": "", // id for town (from)
	"data_source": "", // who is registering? 
    "from_estate": "", // id for estate (from)
    "gender": "", // user gender, use more than 1 char
    "coloruser": "", // user color 
    "name": "", // user name
    "live_street_number": "", // live street 
    "home_phone": "", // user home phone
    "cell_phone": "", // user cell phone
    "from_country": "", // id for country (from)
    "birthday": "", // user birthday, format as you want
    "live_town": "", // id for town (live)
    "curp": "", // user CURP  
    "email": "", // user email  
    "username": "", // username used for login 
    "rfc": "", // user RFC
    "latitude": 0, // latitude calculated with GPS (+/-)
	"external_addr_number": 0,// completion for street address
    "longitude": 0, // longitude calculated with GPS (+/-)
    "internal_addr_number": 0, // completion for street address
    "services": [], // +1 array containing services assigned to the user, refer services assign to object structure
    "nfc": [],// +1 array containing nfc cards assigned to the user, refer nfc assign to object structure
    "files": [],// +1 files assigned to the user, two examples of objects are shown below
    "fmd": [], // +2 array containing string representation on base64 encode of the fingerprint (left & right)
    "live_country": "", // id for country (live)
    "live_zip_code": 0, // user zip code 
    "phase_edited_by": "", // id of the user editing the phase
    "phase": "", // phase for user, phase1, phase2, phase3 or phase4
    "user_id": "", // user id of parent user
    "lastname": "", // user lastname
    "profile_id": "", // id of the profile
    "language": "", // language for the user, 2 letters
    "lastname2": "" // user lastname2 
};	

function getCleanObject(object){
    var newObj = {};
    for( var property in object )
        if( ( typeof object[property] === 'string' && object[property] !== '' ) 
            || ( typeof object[property] === 'object' && object[property].length > 0 ) 
            || ( typeof object[property] === 'number' && object[property] !== 0 ) )
                newObj[property] = object[property];
                    
    return newObj;
} 

function getUserProperties(object) {
	var newUser= {};
	var size = objectSize(user);
	var cont = 0;
	for( var param in object ){
		cont = 0;
		for( var property in user ){
			if( property == param )
				newUser[param] = object[param]; 
			else
				cont++;

			if( cont == size )
				newUser["_"+param] = object[param];
		}
	}
	
	return newUser;
}

function objectSize( object ) {
	var size = 0;
	for (var property in object) size++;

    return size;
}



module.exports.getUserProperties = getUserProperties;
module.exports.getCleanObject = getCleanObject;