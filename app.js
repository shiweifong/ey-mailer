/**
 * GLOBAL MODULES
 */

// set the environment
process.env.NODE_ENV = 'production';

_require = function(name) {
    return require(__dirname + name);
};

_ = require('underscore');
express = require('express');
request = require('request');
http = require('http');
morgan = require('morgan');
cors = require('cors');
bodyParser = require('body-parser');
methodOverride = require('method-override');
async = require('async');
moment = require('moment');
qs = require('qs');
config = require('./config');


/**
 * APP ROUTES
 */
// Web Pages
var environment = process.env.NODE_ENV
    , app = express();

/**
 * CUSTOM MODULES
 */
var routes = require('./routes'),
    ey = require('./routes/m-ey')

/**
 * MODELS, CONTROLLERS, HELPERS
 */
apiHelper = _require('/helpers/api');
mailSenderHelper = _require('/helpers/mailSender');

/**
 * MONGODB CONNECTION
 */

/**
 * APP INIT CONFIGURATIONS
 */

app.set('port', process.env.PORT || 9999);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('common'));
app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(methodOverride());
app.set('trust proxy', 1); //trust first proxy
app.use(cors());

// APIs
app.get('/ey/:base/:api', ey);


/**
 * SERVER START
 */

http.createServer(app).listen(app.get('port'), function () {
    var production = environment + ' mode';
    console.log(production + ' - server listening on port ' + app.get('port'));
});

process.on('uncaughtException', function (err) {
    var errorThread = err.stack;
    console.log(errorThread);
});

process.on( 'SIGINT', function() {
    //shutting down
    console.log('Shutting down MongoDB connection');

    // some other closing procedures go here
    console.log('Exiting');
    process.exit();
});