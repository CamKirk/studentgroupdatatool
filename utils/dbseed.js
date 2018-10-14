const dotenv = require('dotenv');
const mongojs = require('mongojs');
const students = require('./studentnames.json');
const db = mongojs(process.env.MONGODB_URI);
const student = db.collection('students');

dotenv.config();

students.forEach((studentObj)=>{
    student.insert(studentObj);
});