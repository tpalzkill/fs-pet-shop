const http = require('http');
const port = process.env.PORT || 8000;
const json = require('./pets.json')
let server = http.createServer(function(req, res) {
  let pets = json;
  let petsJSON = JSON.stringify(pets);
  if(req.method === 'GET' && req.url === '/pets') {
  res.setHeader('Content-Type', 'application/json');
  res.end(petsJSON);
}
});

server.listen(port, function() {
  console.log('Listening on port', port);
});
module.exports = server;
