const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

const expressLayouts = require("express-ejs-layouts");
const db = require('./config/mongoose');
// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require('./config/passport-local-strategy');
const { pass } = require("./config/mongoose");
const { Passport } = require("passport");
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());


app.use(cookieParser());


app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts form subpages into the layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

//app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


// setup the view engine
app.set("view engine","ejs");
app.set("views",'./views');


//mongo store is used to store the session in the db
app.use(session({
    name:"socialbox",
    // change secret before deployment
    secret: "fvffvdfav",
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || "connect-mongoDB setup ok");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// use express router
app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
})