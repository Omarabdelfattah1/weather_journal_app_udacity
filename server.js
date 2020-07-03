let projectData = {};

const bodyParser = require('body-parser');
var express=require('express');
var Cors=require('cors');

var app=express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Cors());
app.use(express.static('website'));

app.get('/projectData', (req, res) => {
  res.status(200).send(projectData);
});

app.post('/projectData', (req, res) => {
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
  };
  console.log(projectData);
  res.status(200).send({
    sucess: true,
    message: "Saved successfully",
    data: projectData
  });
})
app.listen(1000, function() {
  console.log('Example app listening on port 3000!');
});