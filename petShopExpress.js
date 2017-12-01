const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const json = require('./pets.json');

app.use(function(req, res){
  res.send(json);
})

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
