/*
 * @Author: your name
 * @Date: 2020-07-20 17:20:01
 * @LastEditTime: 2020-07-22 08:28:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project1\src\nodee\node1.js
 */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const child_process = require("child_process");
const qs = require("querystring");
// const string = require('./node2');
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
    //console.log("路由1" + req.query['zhi']);
    const str = req.query['zhi']
    console.log("字符串" + str)
    var workerProcess = child_process.exec(
        `python C:\\Users\\yzy\\Desktop\\project1\\src\\nodee\\fenci.py ${str}`,
        function (error, stdout, stderr) {
            if (error) {
                console.log(error.stack);
                console.log("Error code: " + error.code);
                console.log("Signal received: " + error.signal);
            }
            console.log("stdout1: " + stdout);
            console.log("stderr: " + stderr);
            var json = eval("(" + stdout + ")");
            res.send(json);
        }
    );
    workerProcess.on("exit", function (code) {
        console.log("子进程已退出，退出码 " + code);
    });
});
app.listen(3000, () => {
    console.log("running....");
});