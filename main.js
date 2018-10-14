let createJSON = require('./utils/csvwriter.js');
let mongoose = require('mongoose');
let dotenv = require('dotenv');
let models = require('./models');
let path = require('path');
let fs = require('fs');


dotenv.config()
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (err) throw err;
    console.log('database connected')
    dataPush()
});

function dataPush() {
    if ((!process.argv[2]) || isNaN(process.argv[2])) throw Error("need a week number in the command");
    let week = process.argv[2];
    let groupCSVFile = path.resolve(`groupdata`, `csv`, `wk${week}.csv`);

    createJSON(groupCSVFile, () => {

        fs.readFile(`./groupdata/json/wk${week}.json`, (err, data) => {
            if (err) throw err;

            data = JSON.parse(data);
            // console.log(data);
            data.forEach((group) => {
                group.members.forEach((member) => {
                    //rewrite to push to groups instead of students


                    // models.Student.findOneAndUpdate({
                    //     firstName: member
                    // }, {
                    //     $push: {
                    //         groups: {
                    //             week: week,
                    //             groupNumber: 
                    //         }
                    //     }
                    //     },(err,docs)=>{
                    //         if (err) throw err;
                    //         console.log(docs);
                            
                    //     })
                    
                })
            })

        })
    })
}

