const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fs = require("fs");
const data_questions = require("./data_questions.json");
const data_playthroughs = require("./data_playthroughs.json");

let bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/api/questions', (req, res) => {
  res.send(data_questions.questions);
}).post('/api/savequestion', (req, res) => {
  let updatedQuestion = req.body;

  if(updatedQuestion.id) {
    //updating existing
    let toChange = data_questions.questions.find(q => q.id === updatedQuestion.id);
    if(!toChange) throw new Error("Could not find question ID");

    let index = data_questions.questions.indexOf(toChange);
    if(index === -1) throw new Error("Could not find question ID");

    //Replace the existing question with the new updatd one
    data_questions.questions[index] = req.body;
  } else{
    //creating new
    let highestId = data_questions.questions.reduce((max, q) => {
      if(q.id > max) return q.id;
    }, 0);
    
    updatedQuestion = {...req.body};
    updatedQuestion.id = highestId + 1;

    data_questions.questions.push(updatedQuestion);
  }

  fs.writeFile( "data_questions.json", JSON.stringify( data_questions ), "utf8", () => {
    res.send({ question: updatedQuestion });
  });
}).post('/api/saveplaythrough', (req, res) => {
  data_playthroughs.playthroughs.push(req.body);

  fs.writeFile( "data_playthroughs.json", JSON.stringify( data_playthroughs ), "utf8", () => {
    res.send({ success: true });
  });
});
app.listen(port, () => console.log(`Listening on port ${port}`));