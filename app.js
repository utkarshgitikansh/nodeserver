const express = require('express');
var http = require('http');
//var request = require('request');

const app = express();

var map = new Array();
i = 0;


global.data = "Hi";
// fs.writeFile('type.txt',data);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  
    http.get('http://cricapi.com/api/matches/YQcxw12HpBMe1UaJ6TsKtZTC3Br2', (res) => {
    
  
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
   
    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
  
      res.resume();
      return;
    }
  
    //res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        data = parsedData;
        console.log(parsedData);

        
      for(var i = 0; i < parsedData.matches.length;i++){
          map.push(parsedData.matches[i]["unique_id"]);
            i++;
    }
  
      m =  map.reduce((min, p) => p < min ? p : min, map[0]);
   
      value = m;
      // console.log(map);
      // map.forEach( (value) => {
      // })   
  
  
  
      } catch (e) {
        console.error(e.message);
      }
  
  
   
  
    });
  }).on('error', (e) => {
  
    console.error(`Got error: ${e.message}`);
  });

});

app.get('/api', (req, res) => {
          
  res.send(data);

  }).on('error', (e) => {
      
    console.error(`Got error: ${e.message}`);
  });
 