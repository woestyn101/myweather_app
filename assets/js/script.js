
console.log("connected");

var city = "Akron";

var mykey = "e2ec4b71315974d910bf4380205d18f7";

// var url2 = "https://api.openweathermap.org/data/2.5/forecast?lat=41.4995&lon=-81.6954&appid=" + mykey;

var url2 = "";
// var url1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+ mykey + "&units=imperial";

var urlGeo = "http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&appid=" + mykey

 var mylon;
 var mylat;

  function getCoords(){
    fetch(urlGeo)
    .then(function(response){
        return response.json();
    
    }).then (function(data){
        console.log(data);
          console.log(data[0].lon)
          console.log(data[0].lat)
          mylon = data[0].lon;
          mylat = data[0].lat;

          url2 = "https://api.openweathermap.org/data/2.5/forecast?lat="+ mylat+ "&lon="+ mylon + "&appid=" + mykey;

          fetch(url2).then(function(response){
            return response.json();
          }).then(function(data) {
            console.log(data);
          })
         
    })
  }
    
  getCoords();
    
 


// fetch(url2)
// .then(function(response){
//     return response.json();

// }).then (function(data){
//     console.log(data);
//     console.log(data.city.name);
//     console.log(data.list[0].dt);
   
// })
