/*

An Authentication service will provide JSON web token to the client. 
Each request that the client makes will contain that token in the HTTP header. 
The backend webservice will have a router setup such that each route before rendering will first 
call a function to check if the token provided is valid or not, and if valid, 
then the token is associated with which user. If the token is valid, the route will get rendered. 
Otherwise the client will be forced to redirect to /login route. 

The login route is a HTTP post method which will accept username and password as data, 
and upon validation it will generate a token to be sent to client. 
The token will also be stored in Database(user_login table with user_id, token, login_time etc. as columns).

After the client receives token from the login call, it will save the token in localStorage, 
and will send it as HTTP header in every call made to the webservice.

 */

var login = function(username, password) {
	// validate input against users table
	var user = DB.getUser(username, password)

	// generate random token
	var token = utils.getToken(user)

	// save token in DB for future verification
	DB.loginUser(user, token)

	// return success to client along with newly generated token
	return token
}

// this function is called before rendering any route that requires authentication
var auth = function(req, res, next) {
	// retrieve token from HTTP request
	var token = req.header('Authorization');

	// check if the token matches with any valid token in DB
	var user = DB.getUserFromToken(token);

	if(!user) {
		// send forbidden or redirect to login
		res.send(403)
	} else {
		// successfully verified user identity. Let the user navigate to requested route
		next()
	}

}