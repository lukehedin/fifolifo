const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var fs = require("fs");
const data = require("./data.json");

app.get('/api/questions', (req, res) => {
  res.send(data.questions);
}).get('/api/savequestion', (req, res) => {
  let id = req.id;

  if(id){
    var toChange = data.questions.find(q => q.id === id);
  } else{
    //new question
  }

  
  

  fs.writeFile( "data.json", JSON.stringify( data ), "utf8", () => {
    res.send({ express: 'Saved '});
  });

});
app.listen(port, () => console.log(`Listening on port ${port}`));