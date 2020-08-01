const express = require('express'),
    http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// bezieht sich auf alle Verben, d.h. GET, POST, PUT, DELETE mit dem Endpoint /dishes
app.all('/dishes', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); /* bezieht sich hier zuerst auf app.get('/dishes') und wenn app.get() ausgeführt wurde auf app.post('/dishes') */
});

// /DISHES-ENDPOINT
app.get('/dishes', (req, res, next) => {
    res.end("Will send all the dishes to you!");
});

app.post('/dishes', (req, res, next) => {
    res.end("Will add the dish: " + req.body.name + " with details: " + req.body.description)
});

app.put('/dishes', (req, res, next) => {
    res.statusCode = 403; /* Operation not supported */
    res.end("PUT Operation not supported on /dishes");
});

app.delete('/dishes', (req, res, next) => {
    res.end("Deleting all the dishes!");
});

// /DISHES/:DISHESID-ENDPOINT
app.get('/dishes/:dishId', (req, res, next) => {
    res.end("Will send details of the dish " 
    + req.params.dishId + " to you!");
});

app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403; /* Operation not supported */
    res.end("POST Operation not supported on /dishes/" +
    req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
    res.write("Updating the dish: " + req.params.dishId + "\n");
    res.end("Will update the dish: " + req.body.name + 
    " with details: " + req.body.description); 
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end("Deleting dish: " + req.params.dishId);
    
});


app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// die Methoden am besten in Postman testen!