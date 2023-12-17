
console.log("connected");

// declaring variables from html

var myCity = document.querySelector("#myCity");
var currentDate = document.querySelector("#currentDate")
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var searchCity = document.querySelector("#searchCity");
var searchBtn = document.querySelector("#searchBtn");
var writeCity = document.querySelector("#writeCity");

//variables for day 1 forecast
var date1 = document.querySelector("#date1")
var temp1 = document.querySelector("#temp1");
var wind1 = document.querySelector("#wind1");
var humidity1 = document.querySelector("#humidity1");

//variables for day 2 forecast
var date2 = document.querySelector("#date2")
var temp2 = document.querySelector("#temp2");
var wind2 = document.querySelector("#wind2");
var humidity2 = document.querySelector("#humidity2");

//variables for day 3 forecast
var date3 = document.querySelector("#date3")
var temp3 = document.querySelector("#temp3");
var wind3 = document.querySelector("#wind3");
var humidity3 = document.querySelector("#humidity3");

//variables for day 4 forecast
var date4 = document.querySelector("#date4")
var temp4 = document.querySelector("#temp4");
var wind4 = document.querySelector("#wind4");
var humidity4 = document.querySelector("#humidity4");

//variables for day 5 forecast
var date5 = document.querySelector("#date5")
var temp5 = document.querySelector("#temp5");
var wind5 = document.querySelector("#wind5");
var humidity5 = document.querySelector("#humidity5");




var city = "Akron";

// search city button and function

searchBtn.addEventListener("click", searchTheCity);

function searchTheCity (){
   console.log("button clicked");
    console.log(searchCity.value);
    city = searchCity.value;
    var urlGeo = "http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&appid=" + mykey

   // call function to get city and coordinates
    getCoords(urlGeo);


}

// enable search city when enter is pressed

searchCity.addEventListener("keypress", keyEnter);

function keyEnter(event){

  if (event.key === "Enter"){
    event.preventDefault();
    searchBtn.click();
  }

}

// api key

var mykey = "e2ec4b71315974d910bf4380205d18f7";


// set empty url to be used as second fetch fundtion
var url2 = "";




 var mylon;
 var mylat;

  function getCoords(myurl){
    fetch(myurl)
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

            myCity.textContent = data.city.name;
            

             console.log(data.city.name);
             console.log(data.list[2].dt);
             console.log(data.list[2].dt_txt);
            
            //     var theTimeStamp = data.list[0].dt;
            //  var mydate = new Date(theTimeStamp * 1000);
            //  console.log(mydate.getFullYear());
            //  console.log(mydate. getDate());
            //  console.log(mydate.getMonth() + 1);
                 
                    //console.log(convertDate(mydate)) ;


                    //convert date from unix timestamp

                function convertDate(dt_time){
                    var theTimeStamp = dt_time;
                    var date = new Date(theTimeStamp * 1000);
                    var theyear = date.getFullYear();
                    var theday = date.getDate();
                    var themonth = date.getMonth() + 1;
                    fullDate = themonth + "/" + theday + "/" + theyear;
                    //console.log(fullDate);

                return fullDate;

                }

                //outputting data to html page  

                //outputting current weather information

                currentDate.textContent = convertDate(data.list[2].dt);

                console.log(data.list[2].main.temp);
                temp.textContent = data.list[0].main.temp;

                console.log(data.list[2].wind.speed);

                wind.textContent = data.list[2].wind.speed;

                console.log(data.list[2].main.humidity);
                humidity.textContent = data.list[2].main.humidity;

                //outputting forecast day 1 weather information

                console.log(convertDate(data.list[10].dt));
                date1.textContent = convertDate(data.list[10].dt);

                console.log(data.list[10].main.temp);
                temp1.textContent = data.list[10].main.temp;

                console.log(data.list[10].wind.speed);

                wind1.textContent = data.list[10].wind.speed;

                console.log(data.list[10].main.humidity);
                humidity1.textContent = data.list[10].main.humidity;



                 
                //outputting forecast day 2 weather information

                console.log(convertDate(data.list[18].dt));
                date2.textContent = convertDate(data.list[18].dt);

                 //outputting forecast day 3 weather information

                console.log(convertDate(data.list[26].dt));
                date3.textContent = convertDate(data.list[26].dt);

                 //outputting forecast day 4 weather information

                console.log(convertDate(data.list[34].dt));
                date4.textContent = convertDate(data.list[34].dt);

                 //outputting forecast day 5 weather information

                console.log(convertDate(data.list[39].dt));
                date5.textContent = convertDate(data.list[39].dt);



          })
         
    })
  }
    
  
    
 


// fetch(url2)
// .then(function(response){
//     return response.json();

// }).then (function(data){
//     console.log(data);
//     console.log(data.city.name);
//     console.log(data.list[0].dt);
   
// })
