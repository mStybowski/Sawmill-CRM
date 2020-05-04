var express = require("express");
var passport = require("passport");
var User = require("../models/user");
var middlewareObj = require("../middleware/index.js");
var Order = require("../models/order");
var Price = require("../models/price");

var router = express.Router();

router.get("/", middlewareObj.redirectIfNotLoggedIn, (req, res)=>{
    Order.find({}).populate("calowki").populate("drewnaKonstrukcyjne").exec(function(err, found){
        res.render("index", {ordixy: found});
    });


});

router.get("/settings", middlewareObj.redirectIfNotLoggedIn, function(req, res){
    Price.findOne({}, function(err, found){
        if(err)
        {
            console.log(err);
            //TODO
        }
        else{
            res.render("settings", {prices: found});
        }
    });

});



router.get("/login",(req, res)=>{
    res.render("login");
});

router.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/login'
    }), (req, res) => {
        req.flash("success", "Zalogowano");
        res.redirect("/");
    });

router.put("/price", middlewareObj.redirectIfNotLoggedIn, function(req, res){

    Price.findOneAndUpdate({}, req.body.prices, function(err, updatedPrices){
        if(err)
            console.log(err);
        //TODO
        //Tutaj jeszcze flasha dodaj
        else{
            res.redirect("/");
        }
    });

});

router.get("/logout",(req, res)=>{
    req.logout();
    req.flash("success", "Wylogowano");
    res.redirect("/");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        });
    });
});

router.get("/register",(req, res)=>{
    res.render("register");
});

module.exports = router;