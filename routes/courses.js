const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
var courses = [
{"id":1,"name":"course1"},
{"id":2,"name":"course2"}
]
router.get("/",(req,res)=>{
  res.send(courses);
})

router.get("/:id",(req,res)=>{
  const course = courses.find(c=>c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send(`course with id: ${req.params.id} not found`);
  res.send(course);
});

router.post("/",(req,res)=>{
  const {error} = validateCourse(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const course = {"id":courses.length+1, "name":req.body.name};
  courses.push(course);
  res.send(course)
});

router.put("/:id",(req,res)=>{
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send(`course with id ${req.params.id} is not found`);

  // const result = validateCourse(course);
  // if(result.error){
  //   res.status(400).send(result.error.details[0].message);
  //   return;
  // }
  const {error} = validateCourse(req.body);//Instead of using the whole object as we are interested in only the error
  //property we could get that by the above notation...This is called object destructuring feature.
  if(error) return res.status(400).send(error.details[0].message);
  course.name = req.body.name;
  res.send(course)
});

router.delete("/:id",(req,res)=>{
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send(`course with id ${req.params.id} is not found`);
  const index = courses.indexOf(course);
  courses.splice(index,1);
  res.send(course);

});

function validateCourse(course){
  const schema = Joi.object().keys({
    name:Joi.string().min(3).required()
  });
  return Joi.validate(course,schema);
}

module.exports = router;
