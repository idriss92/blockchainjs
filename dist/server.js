"use strict";

var express = require("express");
var app = express();

var blockchain = require("./main");

var initBlockchain = new blockchain.Blockchain();
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get("/status", function (req, res) {
    res.send("OK");
});

app.get("/mine", function (req, res) {
    res.send(initBlockchain.mine());
});

app.get("/chain", function (req, res) {});

app.get("/nodes/resolve", function (req, res) {});

app.post("/transactions/new", function (req, res) {});

app.post("/nodes/register", function (req, res) {});

var port = 1337;

app.listen(port, function () {
    console.log("Express node js server running on " + port);
});