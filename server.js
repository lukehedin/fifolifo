const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var fs = require("fs");
const data = require("./data.json");

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/api/questions', (req, res) => {
  res.send(data.questions);
}).post('/api/savequestion', (req, res) => {
  let id = req.body.id;

  if(id){
    let toChange = data.questions.find(q => q.id === id);
    if(!toChange) throw new Error("Could not find question ID");

    let index = data.questions.indexOf(toChange);
    if(index === -1) throw new Error("Could not find question ID");

    //Replace the existing question with the new updatd one
    data.questions[index] = req.body;
  } else{
    var highestId = data.questions.reduce((max, q) => {
      if(q.id > max) return q.id;
    }, 0);
    
    var newQ = {...req.body};
    newQ.id = highestId + 1;

    data.questions.push(newQ);
  }

  fs.writeFile( "data.json", JSON.stringify( data ), "utf8", () => {
    res.send({ express: 'Saved'});
  });
});
app.listen(port, () => console.log(`Listening on port ${port}`));