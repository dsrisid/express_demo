/*
Ver 1: First rest api and using the process object to read the env variable
Ver 2: Adding the second api to support /api/courses endpoint and using lambda function
Ver 3: Using Req Params..
Ver 4: request params object
Ver 5: Query Params
Ver 6 :using courses array and req param using http status code
Ver 7 :Post and app.use to understand json structures...
Ver 8: basic data validation
Ver 9: Using @hapi/joi module for data validation
Ver 10:object destructuring feature
*/
const express = require('express');
const app = express();
const Joi = require('@hapi/joi');
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
  const {error} = validateCourse(req.body);
  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {"id":courses.length+1, "name":req.body.name};
  courses.push(course);
  res.send(course)
});

app.put("/api/courses/:id",(req,res)=>{
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course){
    res.status(404).send(`course with id ${req.params.id} is not found`);
    return;
  }

  // const result = validateCourse(course);
  // if(result.error){
  //   res.status(400).send(result.error.details[0].message);
  //   return;
  // }
  const {error} = validateCourse(req.body);//Instead of using the whole object as we are interested in only the error
  //property we could get that by the above notation...This is called object destructuring feature.
  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course)
});

function validateCourse(course){
  const schema = Joi.object().keys({
    name:Joi.string().min(3).required()
  });
  return Joi.validate(course,schema);
}
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Listening on port ${PORT}....`));
