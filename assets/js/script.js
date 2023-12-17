
console.log("connected");

var myCity = document.querySelector("#myCity");
var currentDate = document.querySelector("#currentDate")
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");



var city = "Akron";

var mykey = "e2ec4b71315974d910bf4380205d18f7";



var url2 = "";


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

          url2 = "https://api.openweathermap.org/data/2.5/forecast?lat="+ mylat+ "&lon="+ mylon + "&appid=" + mykey  + "&units=imperial";

          fetch(url2).then(function(response){
            return response.json();
          }).then(function(data) {
            console.log(data);

             console.log(data.city.name);
             console.log(data.list[0].dt);
             console.log(data.list[0].dt_txt);
            
                var theTimeStamp = data.list[0].dt;
             var mydate = new Date(theTimeStamp * 1000);
             console.log(mydate.getFullYear());
             console.log(mydate. getDate());
             console.log(mydate.getMonth() + 1);
                 
                    console.log(convertDate(mydate)) ;
                function convertDate(date){
                    var theyear = date.getFullYear();
                 var theday = date.getDate();
                 var themonth = date.getMonth();
                fullDate = themonth + "/" + theday + "/" + theyear;
                //console.log(fullDate);

                return fullDate;

                }







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
