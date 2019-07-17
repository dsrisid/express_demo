/*
Ver 1: First rest api and using the process object to read the env variable
Ver 2: Adding the second api to support /api/courses endpoint and using lambda function
Ver 3: Using Req Params..
Ver 4: request params object
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
  res.send(req.params.id);
});

app.get("/api/posts/:year/:month",(req,res)=>{
  res.send(req.params);//output of : /api/posts/2018/5 => {"year":"2018","month":"5"}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Listening on port ${PORT}....`));
