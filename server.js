/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: _Maliha Abdul Azeem_____________________ Student ID: __
147996201____________ Date: __07/11/2022_____________
*
*  Online (Cyclic) Link: ________________________________________________________
*
********************************************************************************/ 

var express = require("express")
var app = express()
var productService = require('./product-service')
var path = require("path")
app.use('/public', express.static(path.join(__dirname, "public")));
var HTTP_PORT = process.env.PORT || 8080

function onHttpstart() {
    console.log("Express http server listening on port: " + HTTP_PORT)
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
})

app.get("/products", (req, res) => {
    productService.getPublishedProducts()
        .then((data) => {
            res.json({ data })
        })

        .catch((err) => {
            res.json({ message: err })
        })
})

app.get("/demos", (req, res) => {
    productService.getAllProducts()
        .then((data) => {
            res.json({ data })
        })

        .catch((err) => {
            res.json({ message: err })
        })

})

app.get("/categories", (req, res) => {
    productService.getCategories()
        .then((data) => {
            res.json({ data })
        })
        .catch((err) => {
            res.json({ message: err })
        })
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "/views/.html"))
})

console.log("web-322 app working on LocalHost: 8080")
productService.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Express http server listening on ${HTTP_PORT}`)
        })
    })

    .catch(() => {
        console.log("Failed promises")
    })