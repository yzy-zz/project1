/*
 * @Author: your name
 * @Date: 2020-07-20 13:36:08
 * @LastEditTime: 2020-07-21 20:05:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project1\src\nodee\node.js
 */
//`python fenci.py ${k}`
// const fs = require('fs');
// const child_process = require('child_process');
// const k = "sdjfoiashdiasjcidojanlfdjisjoidsjvjfnsirjlisnflkvnmlifnv";
// var workerProcess = child_process.exec(`python C:\\Users\\yzy\\Desktop\\project1\\src\\nodee\\fenci.py ${k}`, function (error, stdout, stderr) {
//     if (error) {
//         console.log(error.stack);
//         console.log('Error code: ' + error.code);
//         console.log('Signal received: ' + error.signal);
//     }
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + stderr);
// });
// workerProcess.on('exit', function (code) {
//     console.log('子进程已退出，退出码 ' + code);
// });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const child_process = require("child_process");
const qs = require("querystring");
const json = require('./node1.js');
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
console.log(json)
app.get("/data", (req, res) => {
    // var json = eval("(" + stdout + ")");
    res.send(json);
})
app.listen(8888, () => {
    console.log("running....");
});