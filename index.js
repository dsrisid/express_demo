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
Ver 11: refactoring post and Delete handle
*/
const express = require('express');
const app = express();
const Joi = require('@hapi/joi');
const courses = require("./routes/courses");
const home = require("./routes/home");

//We are adding a piece of MW here which will help to undertsand the json structure used during post etc..
app.use(express.json());

app.use("/",home);
app.use("/api/courses",courses);


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Listening on port ${PORT}....`));
