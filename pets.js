const fs = require('fs');
const petPath = require('./pets.json');
let invIndex = process.argv[3];

if (process.argv[2] === "read") {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) throw err;

    let newData = JSON.parse(data);
    if (numberCheck(invIndex)) {
      let verifyIndex = newData[invIndex];
      if (verifyIndex === undefined || invIndex > newData.length) {
        console.error("Usage: node pets.js read INDEX");
        process.exit(1);
      } else {
        console.log(verifyIndex);
      }
    } else {
      console.log(newData);
    }
  });
} else if (process.argv[2] === "create") {
  let age = process.argv[3];
  let kind = process.argv[4];
  let name = process.argv[5];
  if ((age === undefined) || (kind === undefined) || (name === undefined)) {
    console.error("Usage: node pets.js create AGE KIND NAME");
    process.exit(1);
  } else {
    let newPet = {
      'age': parseInt(age),
      'kind': kind,
      'name': name
    }
    fs.readFile('./pets.json', 'utf8', function(err, data) {
      if (err) throw err;

      let moreData = JSON.parse(data);
      moreData.push(newPet);
      let stringifiedData = JSON.stringify(moreData);
      fs.writeFile('./pets.json', stringifiedData, 'utf8', function(err){
        if (err) throw err;

        console.log(newPet);
      });
    });
  }

} else if (process.argv[2] === "update") {

} else if (process.argv[2] === "delete") {

} else {
  console.error("Usage: node pets.js [read | create | update | destroy]");
  process.exit(1);
};

function numberCheck(n) {
  return !isNaN(n);
}
