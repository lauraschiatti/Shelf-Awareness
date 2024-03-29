'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var oas3Tools = require('oas3-tools');
var jsyaml = require('js-yaml');
var serverPort = process.env.PORT || 8090;
let cookieSession = require("cookie-session");
let cookieParser = require("cookie-parser");

// Static files
let serveStatic = require("serve-static");

// SwaggerRouter configuration
var options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, './controllers'),
    useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

//override default options
var uiOptions = {
    apiDocs: '/public/backend/spec.yaml',
    swaggerUi: '/backend/swaggerui'
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'public/backend/spec.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Add cookies to responses
app.use(cookieParser());
app.use(cookieSession({ name: "session", keys: ["abc", "def"] }));


// Initialize the Swagger middleware
oas3Tools.initializeMiddleware(swaggerDoc, function (middleware) {

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi(uiOptions));

    app.use(serveStatic(__dirname + "/public"));

    // const swaggerDocument = require('./');
    // app.use('/backend/swaggerui', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

    // Start the server
    http.createServer(app).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });

});
