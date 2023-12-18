
console.log("connected");

// declaring variables from html

var myCity = document.querySelector("#myCity");
var currentDate = document.querySelector("#currentDate")
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var searchCity = document.querySelector("#searchCity");
var searchBtn = document.querySelector("#searchBtn");

var currentWeatherImage = document.querySelector("#current-weather-image");

//variables for day 1 forecast
var date1 = document.querySelector("#date1")
var temp1 = document.querySelector("#temp1");
var wind1 = document.querySelector("#wind1");
var humidity1 = document.querySelector("#humidity1");
var day1Image = document.querySelector("#day1Image");

//variables for day 2 forecast
var date2 = document.querySelector("#date2")
var temp2 = document.querySelector("#temp2");
var wind2 = document.querySelector("#wind2");
var humidity2 = document.querySelector("#humidity2");
var day2Image = document.querySelector("#day2Image");

//variables for day 3 forecast
var date3 = document.querySelector("#date3")
var temp3 = document.querySelector("#temp3");
var wind3 = document.querySelector("#wind3");
var humidity3 = document.querySelector("#humidity3");
var day3Image = document.querySelector("#day3Image");

//variables for day 4 forecast
var date4 = document.querySelector("#date4")
var temp4 = document.querySelector("#temp4");
var wind4 = document.querySelector("#wind4");
var humidity4 = document.querySelector("#humidity4");
var day4Image = document.querySelector("#day4Image");

//variables for day 5 forecast
var date5 = document.querySelector("#date5")
var temp5 = document.querySelector("#temp5");
var wind5 = document.querySelector("#wind5");
var humidity5 = document.querySelector("#humidity5");
var day5Image = document.querySelector("#day5Image");

//prep for local storage

var liE = document.createElement("li");

var cityList = document.getElementById("cityList");

var theCities = JSON.parse(localStorage.getItem("citiesHist")) || [];
console.log(theCities)




    function checkCityHistory(){
      cityList.replaceChildren();
      console.log(this.innerText);
      city = this.innerText;
      searchCity.value = this.innerText;
      var urlGeo = "http://api.openweathermap.org/geo/1.0/direct?q=" + city +"&appid=" + mykey;

      var url_city = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + mykey;
  
     // call function to get city and coordinates
      getCoords(url_city);
    }
var city = "Akron";

// search city button and function

searchBtn.addEventListener("click", searchTheCity);

function searchTheCity (){
  cityList.replaceChildren();
   console.log("button clicked");
    console.log(searchCity.value);
    city = searchCity.value;
    // var urlGeo = "http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&appid=" + mykey
    var url_city = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + mykey;
   // call function to get city and coordinates
    getCoords(url_city);


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
          console.log(data.coord.lon)
          console.log(data.coord.lat)
          mylon = data.coord.lon;
          mylat = data.coord.lat;

          url2 = "https://api.openweathermap.org/data/2.5/forecast?lat="+ mylat+ "&lon="+ mylon + "&appid=" + mykey  + "&units=imperial";

          fetch(url2).then(function(response){
            return response.json();
          }).then(function(data) {
            console.log(data);

            myCity.textContent = data.city.name;
           

             console.log(data.city.name);
             console.log(data.list[2].dt);
             console.log(data.list[2].dt_txt);
            
         
                    // prep for local storage

                   
                   
                         console.log(theCities);       
                         if (theCities.includes(searchCity.value)){
                          theCities;
                          } else if (searchCity.value == ""){
                            theCities;
                          } else {
                            theCities.push(searchCity.value);
                        
                          }

                    //theCities.push(searchCity.value);
                    console.log(theCities);

                    localStorage.setItem("citiesHist", JSON.stringify(theCities));
         
                    for (var i = 0; i < theCities.length; i++){
                      var liE = document.createElement("li");
                      liE.innerText = theCities[i];
                      cityList.appendChild(liE);
                      liE.addEventListener("click", checkCityHistory);
                     }


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

                //console.log weather condition
                console.log(data.list[2].weather[0].main);

                imageChange(data.list[2].weather[0].main, currentWeatherImage)
                
              
                 function imageChange(weatherCondition, theImage){

                  if (weatherCondition === "Clouds"){
                    console.log("clouds again");
                    theImage.src = "https://openweathermap.org/img/wn/02d@2x.png";
                  }
                  else if (weatherCondition === "Clear")
                  {
                    console.log("clear skies");
                    theImage.src = "https://openweathermap.org/img/wn/01d@2x.png";
                  }
                  else if (weatherCondition === "Rain")
                  {
                    console.log("It is Raining");
                    theImage.src = "https://openweathermap.org/img/wn/10d@2x.png";
                  }
                  else if (weatherCondition === "Drizzle")
                  {
                    console.log("It is Drizzling");
                    theImage.src = "https://openweathermap.org/img/wn/10d@2x.png";
                  }
                  else if (weatherCondition === "Thunderstorm")
                  {
                    console.log("It is thundering");
                  theImage.src = "https://openweathermap.org/img/wn/10d@2x.png";
                  }
                  else if (weatherCondition === "Snow")
                  {
                    console.log("It is snowing");
                    theImage.src = "https://openweathermap.org/img/wn/10d@2x.png";
                  }               
                  
                  else{
                    console.log("Something else");
                    theImage.src = "https://openweathermap.org/img/wn/02d@2x.png";
                  }


                 }

                          
          
              

                //outputting forecast day 1 weather information

                console.log(convertDate(data.list[10].dt));
                date1.textContent = convertDate(data.list[10].dt);

                console.log(data.list[10].main.temp);
                temp1.textContent = data.list[10].main.temp;

                console.log(data.list[10].wind.speed);

                wind1.textContent = data.list[10].wind.speed;

                console.log(data.list[10].main.humidity);
                humidity1.textContent = data.list[10].main.humidity;

                console.log(data.list[10].weather[0].main);
                imageChange(data.list[10].weather[0].main, day1Image)
                 
                //outputting forecast day 2 weather information

                console.log(convertDate(data.list[18].dt));
                date2.textContent = convertDate(data.list[18].dt);

                console.log(data.list[18].main.temp);
                temp2.textContent = data.list[18].main.temp;

                console.log(data.list[18].wind.speed);

                wind2.textContent = data.list[18].wind.speed;

                console.log(data.list[18].main.humidity);
                humidity2.textContent = data.list[18].main.humidity;

                console.log(data.list[18].weather[0].main);
                imageChange(data.list[18].weather[0].main, day2Image)
                 

                 //outputting forecast day 3 weather information

                console.log(convertDate(data.list[26].dt));
                date3.textContent = convertDate(data.list[26].dt);

                console.log(data.list[26].main.temp);
                temp3.textContent = data.list[26].main.temp;

                console.log(data.list[26].wind.speed);

                wind3.textContent = data.list[26].wind.speed;

                console.log(data.list[26].main.humidity);
                humidity3.textContent = data.list[26].main.humidity;

                console.log(data.list[26].weather[0].main);
                imageChange(data.list[26].weather[0].main, day3Image)

                 //outputting forecast day 4 weather information

                console.log(convertDate(data.list[34].dt));
                date4.textContent = convertDate(data.list[34].dt);

                console.log(data.list[34].main.temp);
                temp4.textContent = data.list[34].main.temp;

                console.log(data.list[34].wind.speed);

                wind4.textContent = data.list[34].wind.speed;

                console.log(data.list[34].main.humidity);
                humidity4.textContent = data.list[34].main.humidity;

                console.log(data.list[34].weather[0].main);
                imageChange(data.list[34].weather[0].main, day4Image)

                 //outputting forecast day 5 weather information

                console.log(convertDate(data.list[39].dt));
                date5.textContent = convertDate(data.list[39].dt);

                console.log(data.list[39].main.temp);
                temp5.textContent = data.list[39].main.temp;

                console.log(data.list[39].wind.speed);

                wind5.textContent = data.list[39].wind.speed;

                console.log(data.list[39].main.humidity);
                humidity5.textContent = data.list[39].main.humidity;

                console.log(data.list[39].weather[0].main);
                imageChange(data.list[39].weather[0].main, day5Image)

               


          })
         
    })
   
  }
    
  

 

