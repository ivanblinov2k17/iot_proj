const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const fetch = require("node-fetch");

const sensors_output = [];

const s_port = new SerialPort("/dev/pts/5", {
    baudRate: 9600,
});

// const parser = new Readline();
// port.pipe(parser);
async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify(data),
    });
    return await response.json();
}

var readData = "";
s_port.on("data", function (data) {
    // call back when data is received
    dataStr = data.toString();

    for (var i = 0, l = dataStr.length; i < l; i++) {
        if (dataStr.charAt(i) != "\n" && dataStr.charAt(i) != "\r") {
            readData += dataStr.charAt(i);
        } else if (readData) {
            postData("http://localhost:3000/", {
                arr: readData.split(","),
            }).then((data) => {
                console.log(data); // JSON data parsed by `response.json()` call
            });
            //callback
            readData = "";
        }
    }
});

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());
app.get("/", (request, response) => {
    response.send("Hello world!");
});
app.post("/", (request, response) => {
    console.log(request.body.arr);
    measurement = {
        id: request.body.arr[0],
        hydration: request.body.arr[1],
        height: request.body.arr[2],
        coords: request.body.arr[3]
    }
    sensors_output.push(measurement)
    console.log(sensors_output)
    response.send(JSON.parse('{"text": "accepted"}'));
});
app.listen(port, (err) => {
    if (err) {
        return console.log("something bad happened", err);
    }
    console.log(`server is listening on ${port}`);
});
