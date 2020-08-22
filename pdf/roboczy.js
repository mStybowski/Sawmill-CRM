var pdfMake = require("pdfmake/build/pdfmake");
var pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var fs = require('fs');
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var { window } = new JSDOM("");
var htmlToPdfMake = require("html-to-pdfmake");
const url = require('url');
var pdfObject = {};

function handleServeFile(res, path) {
    fs.createReadStream(path).pipe(res);
}

pdfObject.createRoboczy = function myFunction(order, res, foundOrder){
    var directoryToSave = `../${order}.pdf`;

    var html = htmlToPdfMake(`<div>${foundOrder.value}</div>`, {window:window});

    var dd = {
        content: [
            html
        ]
    };

    var fonts = {
        Roboto: {
            normal: './public/fonts/Roboto-Regular.ttf',
            bold: './public/fonts/Roboto-Medium.ttf',
            italics: './public/fonts/Roboto-Italic.ttf',
            bolditalics: './public/fonts/Roboto-MediumItalic.ttf'
        }
    };

    var PdfPrinter = require('pdfmake');
    var printer = new PdfPrinter(fonts);

    var options = {
        // ...
    };

    var pdfDoc = printer.createPdfKitDocument(dd, options);





    pdfDoc.pipe(fs.createWriteStream(directoryToSave));

const promise1 = new Promise((resolve) =>{
    var pdfDoc = printer.createPdfKitDocument(dd, options);

    var directoryToSave = `../${order}.pdf`;

    pdfDoc.pipe(fs.createWriteStream(directoryToSave));

    pdfDoc.end();
    resolve('Success!');
    });

promise1.then(() => {
    setTimeout(handleServeFile(res, directoryToSave), 1000);
});


};

module.exports = pdfObject;