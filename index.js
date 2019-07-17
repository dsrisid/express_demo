/*
Ver 1: First rest api and using the process object to read the env variable
Ver 2: Adding the second api to support /api/courses endpoint and using lambda function
Ver 3: Using Req Params..
Ver 4: request params object
Ver 5: Query Params
Ver 6 :using courses array and req param using http status code
*/
const express = require('express');
const app = express();
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

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Listening on port ${PORT}....`));
