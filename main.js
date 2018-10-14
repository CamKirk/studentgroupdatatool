let createJSON = require('./util/csvwriter.js');
let mongoose = require('mongoose');
let dotenv = require('dotenv');
let models = require('./models');
let path = require('path');
let fs = require('fs');


dotenv.config();
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (err) throw err;
    console.log('database connected');
    dataPush();
});

function dataPush() {
    if ((!process.argv[2]) || isNaN(process.argv[2])) throw Error("need a week number in the command");
    let week = process.argv[2];
    let groupCSVFile = path.resolve(`groupdata`, `csv`, `wk${week}.csv`);

    createJSON(groupCSVFile, () => {

        fs.readFile(`./groupdata/json/wk${week}.json`, (err, data) => {
            if (err) throw err;

            data = JSON.parse(data);
            let dataMap = data.map((group)=>{ 
                group.week = week;
                return group;    
            });    
            
            models.Group.insertMany(dataMap, (err, docs)=>{
                if (err) throw err;              
                console.log('groups inserted');
                
            });
        });
    });
}

