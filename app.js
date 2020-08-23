var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User            = require("./models/user"),
    Price           = require("./models/price"),
    Client          =require("./models/client");

const url = 'mongodb://127.0.0.1:27017/tartak';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', _ => {
    console.log('Database connected to:', url)
});

db.on('error', err => {
    console.error('Connection error to:', err)
});

var methodOverride = require("method-override");
var flash = require("connect-flash");

var indexRoutes = require("./routes/index");
var ordersRoutes = require("./routes/orders");
var clientsRoutes = require("./routes/clients");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRoutes);
app.use("/orders", ordersRoutes);
app.use("/clients", clientsRoutes);

app.listen(80, infoFunct());

function infoFunct(){
    console.log(" \n* * * * * Server Running! * * * * *");
}
