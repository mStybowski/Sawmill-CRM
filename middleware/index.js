var User = require("../models/user");

var middlewareObj = {};

middlewareObj.redirectIfNotLoggedIn = function(req, res, next){
    if(!req.isAuthenticated()) {
        res.redirect("/login");
    }
    else{
        next();
    }
};

module.exports = middlewareObj;