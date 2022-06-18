const express = require('express');
const cors = require('cors')
const fs = require('fs');
const app = express();
const jsonParser = express.json();

app.use(cors())

app.get('/', function (req, res) {
  res.send('server test')
})

app.get("/skills", jsonParser, function (req, res) {
  let skills = fs.readFileSync('./data.json', 'utf8');
  let skillsContent = JSON.parse(skills);
  res.json(skillsContent.skills);  
});

app.listen(4000, () => {
    console.log('server started in port ', 4000)
})