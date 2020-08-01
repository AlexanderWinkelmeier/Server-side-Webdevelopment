// USING EXPRESS Router

const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router(); /*Instanzierung eines Express-Routers mit dem Namen dishRouter */

dishRouter.use(bodyParser.json()); /* der dishRouter nutzt den bodyParser*/

// Route ('/')

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); /* bezieht sich hier zuerst auf app.get('/dishes') und wenn app.get() ausgeführt wurde auf app.post('/dishes') */
})
.get((req, res, next) => {
    res.end("Will send all the dishes to you!");
})

.post((req, res, next) => {
    res.end("Will add the dish: " + req.body.name + " with details: " + req.body.description)
})

.put((req, res, next) => {
    res.statusCode = 403; /* Operation not supported */
    res.end("PUT Operation not supported on /dishes");
})

.delete((req, res, next) => {
    res.end("Deleting all the dishes!");
});

// Route '/dishes/:dishId'

dishRouter.route('/:dishId')
.get((req, res, next) => {
    res.end("Will send details of the dish " 
    + req.params.dishId + " to you!");
})

.post((req, res, next) => {
    res.statusCode = 403; /* Operation not supported */
    res.end("POST Operation not supported on /dishes/" +
    req.params.dishId);
})

.put((req, res, next) => {
    res.write("Updating the dish: " + req.params.dishId + "\n");
    res.end("Will update the dish: " + req.body.name + 
    " with details: " + req.body.description); 
})

.delete((req, res, next) => {
    res.end("Deleting dish: " + req.params.dishId);
    
});


module.exports = dishRouter;