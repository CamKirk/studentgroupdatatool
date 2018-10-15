var names = require('../groupdata/json/studentnames.json');
var request = require('request');

function testStudentsNames() {
    names.forEach((student) => {
        request(`http://camkirk-studentgroups.herokuapp.com/api/${student.fName}/10`, (req, res) => {
            console.log(student.fName);
            
            console.log(res.body[0].members);

            if (res.body === []) throw "missing student";
        });
    });
}

module.exports = testStudentsNames;