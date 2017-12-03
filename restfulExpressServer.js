const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
let fs = require('fs');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.disable('x-powered-by');

app.get('/pets', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    res.send(JSON.parse(data));
  });
})

app.get('/pets/:id', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(data);

    if (id === undefined) {
      return res.sendStatus(404);
    }
    res.send(pets[id]);
  })

});

app.post('/pets', function(req, res) {
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
    let ageValidity = Number.isInteger(parseInt(age));

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

      res.set('Content-Type', 'application/json');
      res.send(pet);
    });
  });
})

app.patch('/pets/:id', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(readErr, petsJSON) {
    if (readErr) {
      res.sendStatus(500);
    }

    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (id === undefined) {
      return res.sendStatus(404);
    }

    const age = Number.parseInt(req.body.age);
    const kind = req.body.kind;
    const name = req.body.name;
    let goldenPet = pets[id];

    if (typeof age != Number) {
      goldenPet.age = age;
    }

    if (kind) {
      goldenPet.kind = kind;
    }

    if (name) {
      goldenPet.name = name;
    }

    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile('./pets.json', newPetsJSON, function(writeErr) {
      if (writeErr) {
        res.sendStatus(500);
      }

      res.send(pets[id]);
    });
  });
})

app.delete('/pets/:id', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    let id = Number.parseInt(req.params.id);
    let choppingBlock = JSON.parse(data);

    if (id === undefined) {
      return res.sendStatus(404);
    }

    let deadPet = choppingBlock.splice(id, 1);
    let deadPetJson = JSON.stringify(choppingBlock);
    fs.writeFile('./pets.json', deadPetJson, function(err) {
      if (err) {
        return res.sendStatus(500);
      }
      res.send(deadPet[0]);
    });
  })
})
app.use(function(req, res) {
  res.sendStatus(404);
})

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
