var validator = require('validator')
const fs = require('fs')
let url = 'yashsakhareliya.in'

if(validator.isURL(url)){
    console.log('The URL is valid.')
    fs.appendFile('url_list.txt', url,(err)=>{
        if(err){
            throw err
        }
    })
    fs.readFile('block_url.txt', 'utf8',(err,data)=>{
        if(err){
            throw err
        }

        let block_urls = data.split('\n');

        if (block_urls.includes(url)) {
            console.log('The URL is blocked.');

            fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, fileData) {
                if (err) {
                    console.log(err);
                } else {
                    let obj = {};
                
                    // Parse the JSON file or initialize an empty object
                    try {
                        obj = JSON.parse(fileData);
                    } catch (parseError) {
                        console.log('JSON parse error. Initializing a new object.');
                        obj = {};
                    }

                   
                    if (obj[url]) {
                        obj[url].count += 1;
                    } else {
                        obj[url] = { count: 1 };
                    }

                    
                    let json = JSON.stringify(obj, null, 2); 
                    fs.writeFile('myjsonfile.json', json, 'utf8', (writeErr) => {
                        if (writeErr) console.log(writeErr);
                        else console.log('JSON file updated successfully.');
                    });
                }
            });
        }
    })
}else{
    console.log('The URL is invalid.')
}