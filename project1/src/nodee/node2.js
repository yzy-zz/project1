/*
 * @Author: your name
 * @Date: 2020-07-21 19:30:37
 * @LastEditTime: 2020-07-21 19:50:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project1\src\nodee\node2.js
 */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const qs = require("querystring");
const fs = require("fs");
const child_process = require("child_process");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Request-With");
    res.header("Access-Control-Allow-Headers", ["mytoken", "Content-Type"]);
    next();
});
app.get("/message", function (req, res) {
    console.log(req.query['zhi']);
    const str = req.query['zhi']
    res.send(str)
    module.exports = str;
})
app.listen(3000, () => {
    console.log("running....");
});