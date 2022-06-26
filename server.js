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
  res.json(skillsContent);
});

app.post("/deleteCourse", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  fs.readFile('./data.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      let dataObject = JSON.parse(data);
      let index = dataObject.skills.indexOf(dataObject.skills.find(element => element.id === req.body.courseId));
      dataObject.skills.splice(index, 1);
      let json = JSON.stringify(dataObject, null, 1);
      fs.writeFile('./data.json', json, 'utf8', (err) => {
        if (err) {
          console.log(`Error: ${err}`);
        }
      });
    }
  });
  res.json(req.body);
});

app.post("/searchCourses", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  let courses = {
    skills: []
  };
  fs.readFile('./data.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      let dataObject = JSON.parse(data);
      dataObject.skills.map((course) => {
        if (course.title.toLowerCase().indexOf(req.body.value) !== -1 || course.description.toLowerCase().indexOf(req.body.value) !== -1) {
          courses.skills.push(course)
        }
      })
      res.json(courses);
    }
  });
  // res.json(courses);
});

app.listen(4000, () => {
  console.log('server started in port ', 4000)
})