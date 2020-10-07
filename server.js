const express = require('express');
const app = express();

app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static('public'));


// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8080);