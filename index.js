const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const port = new SerialPort("/dev/pts/7", {
  baudRate: 9600,
});

// const parser = new Readline();
// port.pipe(parser);

var readData = "";
port.on("data", function (data) {
  // call back when data is received
  dataStr = data.toString();

  for (var i = 0, l = dataStr.length; i < l; i++) {
    if (dataStr.charAt(i) != "\n" && dataStr.charAt(i) != "\r") {
      readData += dataStr.charAt(i);
    } else if (readData) {
      console.log(readData + ";");
      readData = "";
    }
  }
});
