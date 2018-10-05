const express = require('express');
// var cors = require('cors');
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

// var originsWhitelist = [
//   'http://localhost:4200' ];

//   var corsOptions = {
//     origin: function(origin, callback){
//           var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
//           callback(null, isWhitelisted);
//     },
//     credentials:true
//   }
app.use(function(req, res, next){

  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET', 'PUT', 'POST', 'DELETE');
  res.header('Access-Control-Allow-Header','Content-Type');
  next();
})

global.data = "data";
global.value = "value";
global.current = "current";
global.stats = "new";
global.playerPID = "x";
global.playerData = "dhoni";
global.weather = "clear";

const PORT = process.env.PORT || 8080;

//app.use(cors(corsOptions));

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
   res.send("Future of something cool!!");
   
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

////////////
   var record = {} 
   var match_score = {} 
   

    
    var key1 = 'info';
    var key2 = 'ODIs';
    var key3 = 'tests';
    var key4 = 'T20Is';
    //var key3 = 'score';
    record[key1] = []; 
    record[key2] = []; 
    record[key3] = []; 
    record[key4] = []; 
    //match_score[key3] = []; 
    
    var role = new String();
    role = playerData.playingRole;
    console.log(role);

    if (role == null){
        role = "cricketer"
    }
    if( role.includes("batsman")|| role == "cricketer") {
          
      var data = {

        full_name: playerData.fullName,
        name: playerData.name,
        player_role: playerData.playingRole,
        teams: playerData.majorTeams,
        battingStyle: playerData.battingStyle        
    
      }
      record[key1].push(data);

      var data = {

        runs: playerData.data.batting.ODIs.Runs,
        matches: playerData.data.batting.ODIs.Mat,
        innings: playerData.data.batting.ODIs.Inns,
        hundreds: playerData.data.batting.ODIs["100"],
        fifties: playerData.data.batting.ODIs["50"],        
        highest: playerData.data.batting.ODIs.HS        
      }

      record[key2].push(data);

      var data = {

        runs: playerData.data.batting.tests.Runs,
        matches: playerData.data.batting.tests.Mat,
        innings: playerData.data.batting.tests.Inns,
        hundreds: playerData.data.batting.tests["100"],
        fifties: playerData.data.batting.tests["50"],
        highest: playerData.data.batting.ODIs.HS         

      }

      record[key3].push(data);

      var data = {

        runs: playerData.data.batting.T20Is.Runs,
        matches: playerData.data.batting.T20Is.Mat,
        innings: playerData.data.batting.T20Is.Inns,
        hundreds: playerData.data.batting.T20Is["100"],
        fifties: playerData.data.batting.T20Is["50"],
        highest: playerData.data.batting.T20Is.HS         

      }
      
      record[key4].push(data);
      ///////////////////////
    }

    else {


      var data = {

        full_name: playerData.fullName,
        name: playerData.name,
        player_role: playerData.playingRole,
        teams: playerData.majorTeams,
        bowlingStyle: playerData.bowlingStyle        
    
      }
      record[key1].push(data);

      var data = {

        
        matches: playerData.data.bowling.ODIs.Mat,
        innings: playerData.data.bowling.ODIs.Inns,
        wickets: playerData.data.bowling.ODIs.Wkts,
        average: playerData.data.bowling.ODIs.Ave,
        "4WI": playerData.data.bowling.ODIs["4w"],        
        best_figures: playerData.data.bowling.ODIs.BBI        
      }

      record[key2].push(data);

      var data = {

        matches: playerData.data.bowling.tests.Mat,
        innings: playerData.data.bowling.tests.Inns,
        wickets: playerData.data.bowling.tests.Wkts,
        average: playerData.data.bowling.tests.Ave,
        "4WI": playerData.data.bowling.tests["4w"],        
        best_figures: playerData.data.bowling.tests.BBI        

      }

      record[key3].push(data);
      if(playerData.hasOwnProperty(`data.bowling.T20Is`)){
      var data = {

       

        matches: playerData.data.bowling.T20Is.Mat,
        innings: playerData.data.bowling.T20Is.Inns,
        wickets: playerData.data.bowling.T20Is.Wkts,
        average: playerData.data.bowling.T20Is.Ave,
        "4WI": playerData.data.bowling.T20Is["4w"],        
        best_figures: playerData.data.bowling.T20Is.BBI        
      
    }
  }

      
      //record[key4].push(data);

    }
    
    //record[key2].push(ODI);
    // record[key3].push(Tests);
    // record[key4].push(T20s);
     res.send(record);
////////////
  // res.send(`PID is `+ playerPID);
  // res.send(playerData);

})

app.get('/weather', (req, res) => {
   
  city = req.query.city;
  state = req.query.state;     
 

  http.get(`http://api.wunderground.com/api/99dfe35fcb7de1ee/conditions/q/${state}/${city}.json`, (res) => {

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
        weather = parsedData;
       
    
      } catch (e) {
        console.error(e.message);
      }
  
  
   
  
    });
  }).on('error', (e) => {
  
    console.error(`Got error: ${e.message}`);
  });
  
  ////////////////////////

   var weather_data = {} 
    
    var key1 = 'temperature';

    weather_data[key1] = []; 
              
      var data = {

        full_name: weather.current_observation.display_location["full"],
        observation_time: weather.current_observation.observation_time,
        weather: weather.current_observation.weather,
        temp_celsius: weather.current_observation.temp_c,
        relative_humidity: weather.current_observation.relative_humidity,        
        wind_string:weather.current_observation.wind_string,
        feels_like_celsius:weather.current_observation.feelslike_c,
        visibility_km:weather.current_observation.visibility_km,
        icon_url:weather.current_observation.icon_url,
        precip_today_in:weather.current_observation.precip_today_in
      }
      weather_data[key1].push(data);

  ///////////////////////

  res.send(weather_data);

}).on('error', (e) => {

  console.error(`Got error: ${e.message}`);

})



app.get('/test', (req, res) => {
   

 

     }).on('error', (e) => {
     
       console.error(`Got error: ${e.message}`);
     
})
