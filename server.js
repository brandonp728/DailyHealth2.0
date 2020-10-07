const express = require('express');
const app = express();

app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.post('/api', (request, response) => {
  console.log(request.body);
  response.json({
    status: 'successPaola'
  });
});
// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8080);