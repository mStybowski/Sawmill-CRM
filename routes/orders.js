var express = require("express");
var router = express.Router();
var Order = require("../models/order");
var middlewareObj = require("../middleware/index");
var mongoose = require("mongoose");
var User = require("../models/user");
var DrewnoKonstrukcyjne = require("../models/drewnoKonstrukcyjne");
var DeskaCalowka = require("../models/deskaCalowka");
var Price = require("../models/price");

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

// function handleOrderData(data){
//
//     var orderValue = 0;
//
//     var newLaty ={};
//     var newKontrlaty = {};
//     var newPaczkaOpalu = {};
//     var newTransport = {};
//
//     var totalDrewnoValue = 0;
//     var totalCalowkaValue = 0;
//
//     if(data.lata != null) {
//         newLaty = {
//             metryBiezace: data.lata.metryBiezace,
//             price: data.lata.price,
//             value: data.lata.value
//         };
//         orderValue += Number(data.lata.value);
//     }
//
//     if(data.kontrlata != null) {
//         newKontrlaty = {
//             metryBiezace: data.kontrlata.metryBiezace,
//             price: data.kontrlata.price,
//             value: data.kontrlata.value
//         };
//         orderValue += Number(data.kontrlata.value);
//     }
//
//     if(data.opal != null) {
//         newPaczkaOpalu = {
//             amount: data.opal.amount,
//             price: data.opal.price,
//             value: data.opal.value
//         };
//         orderValue += Number(data.opal.value);
//     }
//
//     if(data.transport != null){
//         newTransport = {transported: true, value: data.transport.value};
//         orderValue += Number(data.transport.value);
//     }
//
//     if(data.drewno != null) {
//         data.drewno.forEach(function (elmnt) {
//             totalDrewnoValue += Number(elmnt.value);
//         });
//     }
//
//     if(data.calowka != null) {
//         data.calowka.forEach(function (elmnt) {
//             totalCalowkaValue += Number(elmnt.value);
//         });
//     }
//     orderValue += totalCalowkaValue + totalDrewnoValue;
//
//     return {
//         name: "Nazwa zamowienia",
//         lata: newLaty,
//         kontrlata: newKontrlaty,
//         paczkaOpalu: newPaczkaOpalu,
//         transport: newTransport,
//         value: orderValue
//     };
// }

router.post("/", middlewareObj.redirectIfNotLoggedIn, function(req, res) {

    var orderValue = 0;
    var newLaty = {};

    if (req.body.lata != null) {
        newLaty = {
            metryBiezace: req.body.lata.metryBiezace,
            price: req.body.lata.price,
            value: req.body.lata.value
        };
        orderValue += Number(req.body.lata.value);
    }
    var newKontrlaty = {};
    if (req.body.kontrlata != null) {
        newKontrlaty = {
            metryBiezace: req.body.kontrlata.metryBiezace,
            price: req.body.kontrlata.price,
            value: req.body.kontrlata.value
        };
        orderValue += Number(req.body.kontrlata.value);
    }
    var newPaczkaOpalu = {};

    if (req.body.opal != null) {
        newPaczkaOpalu = {
            amount: req.body.opal.amount,
            price: req.body.opal.price,
            value: req.body.opal.value
        };
        orderValue += Number(req.body.opal.value);
    }

    var newTransport = {};
    if (req.body.transport != null) {
        newTransport = {transported: true, value: req.body.transport.value};
        orderValue += Number(req.body.transport.value);
    }

    var totalDrewnoValue = 0;
    var totalCalowkaValue = 0;

    if (req.body.drewno != null) {
        req.body.drewno.forEach(function (elmnt) {
            totalDrewnoValue += Number(elmnt.value);
        });

    }
    if (req.body.calowka != null) {
        req.body.calowka.forEach(function (elmnt) {
            totalCalowkaValue += Number(elmnt.value);
        });
    }
    orderValue += totalCalowkaValue + totalDrewnoValue;

    var newOrder = new Order({
        name: "Nazwa zamowienia",
        lata: newLaty,
        kontrlata: newKontrlaty,
        paczkaOpalu: newPaczkaOpalu,
        transport: newTransport,
        value: orderValue,
    });
    var idOrderu;

    var newCalowki = new DeskaCalowka(req.body.calowka);
    var newDrewno = new DrewnoKonstrukcyjne(req.body.drewno);

    console.log(req.body.drewno);

    // Order.create(newOrder, function(err, newlyCreatedOrder){
    //     if(err)
    //     {
    //         console.log("There is an error!");
    //         res.redirect("/");
    //     }
    //     else
    //     {
    //         idOrderu = newlyCreatedOrder._id;
    //
    //     }
    // });
    //
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
                        newlyCreatedOrder.save();
                        res.redirect("/");
                    }
                });
            }
            else{
                res.redirect("/");
            }
        }
    });




});

    //         if(req.body.calowka != null) {
    //             DeskaCalowka.insertMany(req.body.calowka, function (err, newlyCreated) {
    //                 if (err) {
    //                     console.log(err);
    //                     res.redirect("/");
    //                 } else {
    //                     newlyCreated.forEach(function (elmnt) {
    //                         newlyCreatedOrder.calowki.push(elmnt);
    //                     });
    //                    // newlyCreatedOrder.save();
    //
    //                 }
    //             });
    //         }
    //         newlyCreatedOrder.save();
    //     }
    // });


    //=======


    //==========
    //sproboj albo wjebac newDrewna albo bezposrednio req.body.drewno :)

    //
    // Order.findById(idOrderu, function(err, foundOrder){
    //     if(err)
    //     {
    //         console.log(err);
    //         res.redirect("/");
    //     }
    //     else{
    //         if(newCalowki != null){
    //             newCalowki.forEach(function(elmnt){
    //                 DeskaCalowka.create(elmnt, function(err, newlyCreatedCalowka){
    //                     if(err)
    //                     {
    //                         console.log("Error w calowce");
    //                     }
    //                     else{
    //                         foundOrder.calowki.push(newlyCreatedCalowka);
    //                         console.log("FoundOrderZaraz Po wcisnieciu do niego calowki");
    //                         console.log(foundOrder);
    //                     }
    //                 });
    //             });
    //         }
    //         if(newDrewna != null){
    //             newDrewna.forEach(function(elmnt){
    //                 DrewnoKonstrukcyjne.create(elmnt, function(err, newlyCreatedDrewno){
    //                     if(err)
    //                     {
    //                         console.log("Error w drewnie");
    //                     }
    //                     else{
    //                         foundOrder.drewnaKonstrukcyjne.push(newlyCreatedDrewno);
    //                         console.log("FoundOrderZaraz Po wcisnieciu do niego drewna");
    //                         console.log(foundOrder);
    //                     }
    //                 });
    //             });
    //         }
    //     }
    //
    // });



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
