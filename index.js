/*
Ver 1: First rest api and using the process object to read the env variable
Ver 2: Adding the second api to support /api/courses endpoint and using lambda function
Ver 3: Using Req Params..
Ver 4: request params object
Ver 5: Query Params
Ver 6 :using courses array and req param using http status code
Ver 7 :Post and app.use to understand json structures...
Ver 8: basic data validation
*/
const express = require('express');
const app = express();

//We are adding a piece of MW here which will help to undertsand the json structure used during post etc..
app.use(express.json());
var courses = [
{"id":1,"name":"course1"},
{"id":2,"name":"course2"}
]
app.get("/",(req,res)=>{
  res.send("Hello");
});

app.get("/api/courses",(req,res)=>{
  res.send(courses);
})

app.get("/api/courses/:id",(req,res)=>{
  const course = courses.find(c=>c.id === parseInt(req.params.id));
  if(!course) res.status(404).send(`course with id: ${req.params.id} not found`);
  res.send(course);
});

app.post("/api/courses",(req,res)=>{
  if(!req.body.name || req.body.name.length < 3){
    res.status(400).send("Name is required and should be minimum three characters");
    return;
  }
  const course = {"id":courses.length+1,"name":req.body.name}
  courses.push(course);
  res.send(course)
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Listening on port ${PORT}....`));
