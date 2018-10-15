let csv = require('csvtojson');
let fs = require('fs');
let path = require('path');

function createJSON(csvFile, cb) {
    //check if file extension is csv, if not, throw error
    let filePath = csvFile.split('.');
    if (filePath[1] ==! 'csv') throw "file is not a csv";
    
    //convert to json, then write out to /json folder with same name
    csv()
        .fromFile(csvFile)
        .then((json) => {

            let restructuredArray = [];

            json.forEach((group)=>{
                let groupObj = {};
                groupObj.groupNumber = group["Group Number"];
                groupObj.members = [];
                for(let member in group){
                    
                    if(member.slice(0,3)==='Mem'){
                        groupObj.members.push(group[member].toLowerCase());
                    }
                }
                restructuredArray.push(groupObj);
            });




            let fileName = filePath[0].split('/').pop();
            fileName += '.json';

            let newFileName = path.join(__dirname,'..','groupdata','json',fileName);
            
            fs.writeFile(newFileName, JSON.stringify(restructuredArray, "", 2), (err) => {
                if (err) throw err;
                console.log(`${newFileName} was written`);
            });

        }).then(()=>{
            if (cb) cb();
        }).catch((err)=>{
            console.log(err);
        });

}

module.exports = createJSON;