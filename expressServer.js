const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const json = require('./pets.json');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.disable('x-powered-by');

app.get('/pets', function(req, res){
  res.send(json);
})
app.get('/pets/:id', function(req, res){
   if (json[req.params.id] === undefined) {
     res.sendStatus(404);
   } else {
  res.send(json[req.params.id]);
}
});

app.post('/pets', function(req, res){
  fs.readFile('./pets.json', 'utf8', function(readErr, petsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var pets = JSON.parse(petsJSON);
    var pet = req.body;
    let age = req.body.age;
    let kind = req.body.kind;
    let name = req.body.name;
    let ageValidity = Number.isInteger(age);

    if (!age || !kind || !name || !ageValidity) {
      return res.sendStatus(400);
    }

    pets.push(pet);

    var newpetsJSON = JSON.stringify(pets);

    fs.writeFile('./pets.json', newpetsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'application/JSON');
      res.send(pet);
    });
  });
})

app.use(function(req, res){
  res.sendStatus(404);
})

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
