const express = require('express');
var https = require('https');

//var request = require('request');

const app = express();
var map = new Array();
var x;

app.listen(8080, () => {
  
    https.get('https://lifesoul.herokuapp.com/api', (res) => {
    
  
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
  
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        // data = parsedData;
        console.log(parsedData);
       
        x = parsedData;

      // console.log(map);
      // map.forEach( (value) => {
      // })   
  
      } catch (e) {
        console.error(e.message);
      }
  
  
    })
  
   
  }).on('error', (e) => {
  
    console.error(`Got error: ${e.message}`);
  })
});


  app.get('/test', (req,res)=>{

   for(var i = 0; i < x.length;i++){
          map.push(x[i]);
            i++;
    }
  
   let m =  map.reduce((min, p) => p < min ? p : min, map[0]);
   res.send(`The minimum value is ${m}`);

})