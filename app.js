const express = require('express');
var https = require('https');
var http = require('http');
//var request = require('request');

const app = express();

var map = new Array();
var m;
i = 0;


global.data = "data";
global.value = "value";
global.current = "current";
global.stats = "new";
// fs.writeFile('type.txt',data);
const PORT = process.env.PORT || 8080;
// app.listen(process.env.PORT, () => {

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
        value = parsedData;
        console.log(parsedData);
        m = parsedData.matches.length;
      //   for(var i = 0; i < parsedData.matches.length;i++){
      //       map.push(parsedData.matches[i]["unique_id"]);
      //         i++;
      // }
    
    //   m =  map.reduce((min, p) => p < min ? p : min, map[0]);
     //  value = map;
     //   console.log(m);
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

// app.get('/api', (req, res) => {
          
//   res.send(data);

//   }).on('error', (e) => {
      
//     console.error(`Got error: ${e.message}`);
//   });
 

app.get('/cricket', (req, res) => {


   var matches = {} // empty Object
   var match_score = {} 
   
    //var m =  map[0];
    // res.send(map);

    
    var key1 = 'current_matches';
    var key3 = 'score';
    matches[key1] = []; // empty Array, which you can push() values into
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

        
        // score: [
        //     stat= current.stat
        //     // score=score_detail["score"],
        //     // description=score_detail["description"]
        // ]
        
    }; 

    if(value.matches[i]["winner_team"] == null || value.matches[i]["matchStarted"] == true) {
    matches[key1].push(data);
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
    // var data2 = {
    //     sampleTime: '1450632410296',
    //     data: '78.15431:0.5247617:-0.20050584'
    // };

    // for (var i = 0; i<10; i++){
    
     
    //   // matches[key].push(value.matches[i]["team-1"]);
    //   // matches[key].push(value.matches[i]["team-2"]);
    //   i++;

    // }
    
    
    
    
    res.send(JSON.stringify(matches));
  //  res.send(current);
    

 // app.listen(8080, () => {
  
    // http.get('http://cricapi.com/api/matches/YQcxw12HpBMe1UaJ6TsKtZTC3Br2', (res) => {
    
  
    // const { statusCode } = res;
    // const contentType = res.headers['content-type'];
   
    // let error;
    // if (statusCode !== 200) {
    //   error = new Error('Request Failed.\n' +
    //                     `Status Code: ${statusCode}`);
    // } else if (!/^application\/json/.test(contentType)) {
    //   error = new Error('Invalid content-type.\n' +
    //                     `Expected application/json but received ${contentType}`);
    // }
    // if (error) {
    //   console.error(error.message);
  
    //   res.resume();
    //   return;
    // }
  
    // //res.setEncoding('utf8');
    // let rawData = '';
    // res.on('data', (chunk) => { rawData += chunk; });
    // res.on('end', () => {
    //   try {
    //     const parsedData = JSON.parse(rawData);
    //     // data = parsedData;
    //     // console.log(parsedData);
    //     res1.send(parsedData);
        
    //   for(var i = 0; i < parsedData.matches.length;i++){
    //       map.push(parsedData.matches[i]["unique_id"]);
    //         i++;
    // }
  
    //   m =  map.reduce((min, p) => p < min ? p : min, map[0]);
   
    //   value = m;
    //   // console.log(map);
    //   // map.forEach( (value) => {
    //   // })   
  
  
  
    //   } catch (e) {
    //     console.error(e.message);
    //   }
  
  
   
  
  //  });
  }).on('error', (e) => {
  
    console.error(`Got error: ${e.message}`);
  });

//});

//   var getAccessToken = 'http://cricapi.com/api/matches/YQcxw12HpBMe1UaJ6TsKtZTC3Br2';
  
     
//    request(getAccessToken, function (error, response, body) {
//      console.log(body);
//        res.json(JSON.parse(body));
  

//  }).on('error', (e) => {
     
//    console.error(`Got error: ${e.message}`);
//  });


//})


app.get('/timestamp', (req, res) => {
   
           
//     for(var i = 0; i < data.matches.length;i++){
//         map.push(data.matches[i]["unique_id"]);
//           i++;
//   }

//    let m =  map.reduce((min, p) => p < min ? p : min, map[0]);
//     console.log(m);
 
   res.send(value);

      }).on('error', (e) => {
      
        console.error(`Got error: ${e.message}`);
      
})

app.get('/timestamp-cached', (req, res) => {
    res.set('Cache-Control','public,max-age=300,s-maxage=600');
    res.send(`${Date.now()}`);
})
