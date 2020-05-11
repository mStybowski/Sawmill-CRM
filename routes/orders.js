var express = require("express");
var router = express.Router();
var Order = require("../models/order");
var middlewareObj = require("../middleware/index");
var mongoose = require("mongoose");
var User = require("../models/user");
var DrewnoKonstrukcyjne = require("../models/drewnoKonstrukcyjne");
var DeskaCalowka = require("../models/deskaCalowka");
var Price = require("../models/price");
var Client = require("../models/client");

router.get("/", middlewareObj.redirectIfNotLoggedIn, (req, res)=>{
    Order.find({}, function (err, found) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("/", {orders: found});
        }
    });
});


router.get("/newFromUser/:id", middlewareObj.redirectIfNotLoggedIn, function(req, res){

    Price.findOne({}, function(err, found){
        if(err)
        {
            console.log(err);
            req.flash("error", "Nie udało się pobrać cen z serwera.");
        }
        else{
            Client.findById(req.params.id, function(err, foundUser){
                if(err || !foundUser){
                    req.flash("error", "Klient nie został znaleziony");
                    res.redirect("/");
                }
                else{
                    res.render("orders/newFromUser", {clienter: foundUser, prices: found});
                }
            });

        }
    });


});
router.post("/", middlewareObj.redirectIfNotLoggedIn, function(req, res) {

    var orderValue = 0;
    var newLaty = {};



    if (req.body.lata != null) {
        newLaty = req.body.lata;
        orderValue += Number(req.body.lata.value);
    }
    var newKontrlaty = {};
    if (req.body.kontrlata != null) {
        newKontrlaty = req.body.kontrlata;

        orderValue += Number(req.body.kontrlata.value);
    }
    var newPaczkaOpalu = {};

    if (req.body.opal != null) {
        newPaczkaOpalu = req.body.opal;
        orderValue += Number(req.body.opal.value);
    }

    var newTransport = {};
    if (req.body.transport != null) {
        newTransport = req.body.transport;
        orderValue += Number(req.body.transport.value);
    }

    var totalDrewnoValue = 0;
    var totalCalowkaValue = 0;

    if (req.body.drewno != null) {
        req.body.drewno.forEach(function (elmnt) {
            totalDrewnoValue += Number(elmnt.value);
            elmnt.v = elmnt.x*elmnt.y*elmnt.length*elmnt.amount;
        });

    }
    if (req.body.calowka != null) {
        req.body.calowka.forEach(function (elmnt) {
            totalCalowkaValue += Number(elmnt.value);
            if(elmnt.v === "" )
                elmnt.v = elmnt.x*elmnt.length*elmnt.amount;
        });
    }

    orderValue += totalCalowkaValue + totalDrewnoValue;

var newClientId;

if(req.body.client.id){
    newClientId = req.body.client.id;
}
else{
    Client.create(req.body.client, function (err, newlyCreatedClient) {
        if (err) {
            console.log(err);
            req.flash("error", "Nie utworzono klienta");
            res.redirect("/");
        } else {
            newClientId = newlyCreatedClient._id;
        }
    });
}



    var newOrder = new Order({
    name: "Nazwa zamowienia",
    lata: newLaty,
    kontrlata: newKontrlaty,
    paczkaOpalu: newPaczkaOpalu,
    transport: newTransport,
    value: orderValue,
        description: req.body.description,
        deadline: req.body.deadline

    });

    Order.create(newOrder, function (err, newlyCreatedOrder) {
        if (err) {
            console.log(err);
        } else {

            if (req.body.drewno != null && req.body.calowka != null) {
                DrewnoKonstrukcyjne.insertMany(req.body.drewno, function (err, newlyCreated) {
                    if (err) {
                        console.log(err);
                        res.redirect("/");
                    } else {

                        newlyCreated.forEach(function (elmnt) {
                            newlyCreatedOrder.drewnaKonstrukcyjne.push(elmnt);
                        });

                    }
                });
                DeskaCalowka.insertMany(req.body.calowka, function (err, newlyCreated) {
                    if (err) {
                        console.log(err);
                        res.redirect("/");
                    } else {
                        newlyCreated.forEach(function (elmnt) {
                            newlyCreatedOrder.calowki.push(elmnt);

                        });
                        newlyCreatedOrder.customer = newClientId;
                        newlyCreatedOrder.save();
                        res.redirect("/");
                    }
                });
            }
            else if(req.body.drewno != null && req.body.calowka == null){
                DrewnoKonstrukcyjne.insertMany(req.body.drewno, function (err, newlyCreated) {
                    if (err) {
                        console.log(err);
                        res.redirect("/");
                    } else {
                        newlyCreated.forEach(function (elmnt) {
                            newlyCreatedOrder.drewnaKonstrukcyjne.push(elmnt);
                        });
                        newlyCreatedOrder.customer = newClientId;
                        newlyCreatedOrder.save();
                        res.redirect("/");
                    }
                });
            }
            else if(req.body.drewno == null && req.body.calowka != null){
                DeskaCalowka.insertMany(req.body.calowka, function (err, newlyCreated) {
                    if (err) {
                        console.log(err);
                        res.redirect("/");
                    } else {
                        newlyCreated.forEach(function (elmnt) {
                            newlyCreatedOrder.calowki.push(elmnt);

                        });
                        newlyCreatedOrder.customer = newClientId;
                        newlyCreatedOrder.save();
                        res.redirect("/");
                    }
                });
            }
            else{
                newlyCreatedOrder.customer = newClientId;
                newlyCreatedOrder.save();
                res.redirect("/");
            }
        }
    });
});

router.get("/new", middlewareObj.redirectIfNotLoggedIn, function(req, res){
    Price.findOne({}, function(err, found){
        if(err)
        {
            console.log(err);
            req.flash("error", "Nie udało się pobrać cen z serwera.");
        }
        else{
            res.render("orders/new", {prices: found});
        }
    });

});

router.put("/:id/done", function(req, res){

    var updateXD = {isDone: true};
    Order.findByIdAndUpdate(req.params.id, updateXD, function(err, updatedClient){
        if(err)
            res.redirect("/clients");
        else{
            req.flash("success", "Zaktualizowano zamowienie");
            res.redirect("/");
        }
    });

});

router.get("/:id", middlewareObj.redirectIfNotLoggedIn, function(req, res){
    Order.findById(req.params.id).populate("drewnaKonstrukcyjne").populate("calowki").exec(function(err, foundOrder){
        if(err){
            console.log(err);
            res.redirect("/");
        }
        else{
            res.render("orders/show", {order: foundOrder});
        }
    });

});

router.get("/:id/edit", middlewareObj.redirectIfNotLoggedIn, function(req, res){
    Order.findById(req.params.id, function(err, foundOrder){
        if(err || !foundOrder) {
            req.flash("error", "Zamowienie nie zostało znalezione");
            res.redirect("/");
        }
        else{
            res.render("orders/edit", {sorder: foundOrder});
        }
    });

});




module.exports = router;
