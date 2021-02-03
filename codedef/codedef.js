const cors = require("cors");
/**Cors
 * Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. json object) on a web page to be requested from another domain/servers outside the domain/server from which the first resource was served.
 * https://note.pcwu.net/2017/03/16/nodejs-cors/
 */

const logger = require('morgan');
app.use(logger('dev')); 
/**logger/morgan
 * setting up basic middleware for all Express requests
 * Log requests to API using morgan; when someone make a request to you server, there is a call request logs on your console
 */

//middleware - error handler (not sure)
//controller - return result 
//router - link middleware and controller and create a api route/endpoint

/**createConnection vs .connect
 * When using .createConnection, you access models via the explicit connection you create
 * with this call.
 * This means that instead of User = mongoose.model(...) you need User = db.model(...).
 *https://stackoverflow.com/questions/22786374/queries-hang-when-using-mongoose-createconnection-vs-mongoose-connect
 * 
 */