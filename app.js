const express = require('express');
var https = require('https');
var http = require('http');
var bodyParser = require('body-parser');
var multer = require('multer'); 
var querystring = require('querystring'); 
var upload = multer(); 




const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


var map = new Array();
var m;
i = 0;


global.data = "data";
global.value = "value";
global.current = "current";
global.stats = "new";
global.playerPID = "x";
global.playerData = "dhoni";

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
  

    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        value = parsedData;
        console.log(parsedData);
        m = parsedData.matches.length;
  
      } catch (e) {
        console.error(e.message);
      }
  
  
   
  
    });
  }).on('error', (e) => {
  
    console.error(`Got error: ${e.message}`);
  });

});
 

app.get('/cricket', (req, res) => {


   var matches = {} 
   var match_score = {} 
   

    
    var key1 = 'current_matches';
    var key3 = 'score';
    matches[key1] = []; 
    match_score[key3] = []; 
    
    for (var i = 0; i<m; i++){
    
     {
          
      var data = {

        id: value.matches[i]["unique_id"],
        teamA: value.matches[i]["team-1"],
        teamB: value.matches[i]["team-2"],
        toss: value.matches[i]["toss_winner_team"],
        winner: value.matches[i]["winner_team"],
        type: value.matches[i]["type"],
        date: value.matches[i]["dateTimeGMT"],

        
    }; 

    if(value.matches[i]["winner_team"] == null || value.matches[i]["matchStarted"] == true) {
    matches[key1].push(data);
   
    }
  }
  }
   
  
  var key2 = 'upcoming_matches';
  matches[key2] = []; 


  for (var i = 0; i<m; i++){
    
    {
       
     var data = {

       id: value.matches[i]["unique_id"],
       teamA: value.matches[i]["team-1"],
       teamB: value.matches[i]["team-2"],
       toss: value.matches[i]["toss_winner_team"],
       winner: value.matches[i]["winner_team"],
       type: value.matches[i]["type"],
       date: value.matches[i]["dateTimeGMT"]
       
   }; 

   if(value.matches[i]["matchStarted"] == false) {
   matches[key2].push(data);
     
   }
 }
 }

    
    
    
    res.send(matches);
  
  
  }).on('error', (e) => {
  
    console.error(`Got error: ${e.message}`);
  });


app.get('/timestamp', (req, res) => {
   
            
   res.send(value);

      }).on('error', (e) => {
      
        console.error(`Got error: ${e.message}`);
      
})

app.get('/timestamp-cached', (req1, res) => {
    // res.set('Cache-Control','public,max-age=300,s-maxage=600');
    // res.send(`${Date.now()}`);
   
})

app.get('/score', (req, res) => {

  id = req.query.unique_id; 

  http.get(`http://cricapi.com/api/cricketScore/YQcxw12HpBMe1UaJ6TsKtZTC3Br2?unique_id=${id}`, (res) => {
    
  
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
  
    
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        stats = parsedData;
       
    
      } catch (e) {
        console.error(e.message);
      }
  
  
   
  
    });
  }).on('error', (e) => {
  
    console.error(`Got error: ${e.message}`);
  });

  res.send(stats["score"]);

})


app.get('/playerBio', (req, res) => {

  name = req.query.name; 

  http.get(`http://cricapi.com/api/playerFinder/YQcxw12HpBMe1UaJ6TsKtZTC3Br2?name=${name}`, (res) => {
    
  
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
  
    
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        playerPID = parsedData.data[0]["pid"];
      
        ///////////////////////////////////

        http.get(`http://cricapi.com/api/playerStats/YQcxw12HpBMe1UaJ6TsKtZTC3Br2?pid=${playerPID}`, (res1) => {
    
  
          const { statusCode } = res1;
          const contentType = res1.headers['content-type'];
         
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
        
            res1.resume();
            return;
          }
        
          
          let raw1Data = '';
          res1.on('data', (chunk) => { raw1Data += chunk; });
          res1.on('end', () => {
            try {
              const parsed1Data = JSON.parse(raw1Data);
              playerData = parsed1Data;
            
            ///console.log(playerName);
          //////////////////////////////////////


       
          ///////////////////////////////////////
            } catch (e) {
              console.error(e.message);
            }
        
        
         
        
          });
        }).on('error', (e) => {
        
          console.error(`Got error: ${e.message}`);
        });



        //////////////////////////////////
      } catch (e) {
        console.error(e.message);
      }
  
  
   
  
    });
  }).on('error', (e) => {
  
    console.error(`Got error: ${e.message}`);
  });

  // res.send(`PID is `+ playerPID);
   res.send(playerData);

})


app.get('/test', (req, res) => {
   
            
 

     }).on('error', (e) => {
     
       console.error(`Got error: ${e.message}`);
     
})
