
console.log("connected");

// declaring variables from html

var myCity = document.querySelector("#myCity");
var currentDate = document.querySelector("#currentDate")
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var searchCity = document.querySelector("#searchCity");
var searchBtn = document.querySelector("#searchBtn");
var errorMessage = document.querySelector("#err-message");

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
      // var urlGeo = "http://api.openweathermap.org/geo/1.0/direct?q=" + city +"&appid=" + mykey;

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
      if (response.status == 404){
        errorMessage.textContent = "City mispelled";
      }
      if (response.status == 200){
        errorMessage.textContent = "";
      }
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
    
  

 
  $(function () { 
   
    var myCities = ['Abidjan', 'Abu Dhabi', 'Abuja', 'Accra', 'Addis Ababa', 'Ahmedabad', 'Aleppo', 'Alexandria', 'Algiers', 'Almaty', 'Amman', 'Amsterdam', 'Anchorage', 'Andorra la Vella', 'Ankara', 'Antananarivo', 'Apia', 'Arnold', 'Ashgabat', 'Asmara', 'Asuncion', 'Athens', 'Auckland', 'Avarua', 'Baghdad', 'Baku', 'Bamako', 'Banda Aceh', 'Bandar Seri Begawan', 'Bandung', 'Bangkok', 'Bangui', 'Banjul', 'Barcelona', 'Barranquilla', 'Basrah', 'Basse-Terre', 'Basseterre', 'Beijing', 'Beirut', 'Bekasi', 'Belem', 'Belgrade', 'Belmopan', 'Belo Horizonte', 'Bengaluru', 'Berlin', 'Bern', 'Bishkek', 'Bissau', 'Bogota', 'Brasilia', 'Bratislava', 'Brazzaville', 'Bridgetown', 'Brisbane', 'Brussels', 'Bucharest', 'Budapest', 'Buenos Aires', 'Bujumbura', 'Bursa', 'Busan', 'Cairo', 'Cali', 'Caloocan', 'Camayenne', 'Canberra', 'Cape Town', 'Caracas', 'Casablanca', 'Castries', 'Cayenne', 'Charlotte Amalie', 'Chengdu', 'Chennai', 'Chicago', 'Chisinau', 'Chittagong', 'Chongqing', 'Colombo', 'Conakry', 'Copenhagen', 'Cordoba', 'Curitiba', 'Daegu', 'Daejeon', 'Dakar', 'Dallas', 'Damascus', 'Dar es Salaam', 'Delhi', 'Denver', 'Dhaka', 'Dili', 'Djibouti', 'Dodoma', 'Doha', 'Dongguan', 'Douala', 'Douglas', 'Dubai', 'Dublin', 'Durban', 'Dushanbe', 'Faisalabad', 'Fort-de-France', 'Fortaleza', 'Freetown', 'Fukuoka', 'Funafuti', 'Gaborone', 'George Town', 'Georgetown', 'Gibraltar', 'Gitega', 'Giza', 'Guadalajara', 'Guangzhou', 'Guatemala City', 'Guayaquil', 'Gujranwala', 'Gustavia', 'Gwangju', 'Hamburg', 'Hanoi', 'Harare', 'Havana', 'Helsinki', 'Ho Chi Minh City', 'Hong Kong', 'Honiara', 'Honolulu', 'Houston', 'Hyderabad', 'Hyderabad', 'Ibadan', 'Incheon', 'Isfahan', 'Islamabad', 'Istanbul', 'Izmir', 'Jaipur', 'Jakarta', 'Jeddah', 'Jerusalem', 'Johannesburg', 'Juarez', 'Juba', 'Kabul', 'Kaduna', 'Kampala', 'Kano', 'Kanpur', 'Kaohsiung', 'Karachi', 'Karaj', 'Kathmandu', 'Kawasaki', 'Kharkiv', 'Khartoum', 'Khulna', 'Kigali', 'Kingsburg', 'Kingston', 'Kingstown', 'Kinshasa', 'Kobe', 'Kolkata', 'Kota Bharu', 'Kowloon', 'Kuala Lumpur', 'Kumasi', 'Kuwait', 'Kyiv', 'Kyoto', 'La Paz', 'Lagos', 'Lahore', 'Libreville', 'Lilongwe', 'Lima', 'Lisbon', 'Ljubljana', 'Lome', 'London', 'Los Angeles', 'Luanda', 'Lubumbashi', 'Lusaka', 'Luxembourg', 'Macau', 'Madrid', 'Majuro', 'Makassar', 'Malabo', 'Male', 'Mamoudzou', 'Managua', 'Manama',
    'Manaus', 'Manila', 'Maputo', 'Maracaibo', 'Maracay', 'Mariehamn', 'Marigot', 'Maseru', 'Mashhad', 'Mbabane', 'Mecca', 'Medan', 'Medellin', 'Medina', 'Melbourne', 'Mexico City', 'Miami', 'Minsk', 'Mogadishu', 'Monaco', 'Monrovia', 'Montevideo', 'Montreal', 'Moroni', 'Moscow', 'Mosul', 'Multan', 'Mumbai', 'Muscat', 'Nagoya', 'Nairobi', 'Nanchong', 'Nanjing', 'Nassau', 'Nay Pyi Taw', 'New York', 'Niamey', 'Nicosia', 'Nouakchott', 'Noumea', 'Novosibirsk', 'Nur-Sultan', 'Nuuk', 'Oranjestad', 'Osaka', 'Oslo', 'Ottawa', 'Ouagadougou', 'Pago Pago', 'Palembang', 'Palo Alto', 'Panama', 'Papeete', 'Paramaribo', 'Paris', 'Perth', 'Philadelphia', 'Phnom Penh', 'Phoenix', 'Podgorica', 'Port Louis', 'Port Moresby', 'Port of Spain', 'Port-Vila', 'Port-au-Prince', 'Porto Alegre', 'Porto-Novo', 'Prague', 'Praia', 'Pretoria', 'Pristina', 'Puebla', 'Pune', 'Pyongyang', 'Quezon City', 'Quito', 'Rabat', 'Rawalpindi', 'Recife', 'Reykjavik', 'Riga', 'Rio de Janeiro', 'Riyadh', 'Road Town', 'Rome', 'Roseau', 'Saint Helier', 'Saint Peter Port', 'Saint Petersburg', 'Saint-Denis', 'Saint-Pierre', 'Saipan', 'Salvador', 'San Antonio', 'San Diego', 'San Francisco','San Jose', 'San Juan', 'San Marino', 'San Salvador', 'Sanaa', 'Santa Cruz de la Sierra', 'Santiago', 'Santo Domingo', 'Sao Paulo', 'Sao Tome', 'Sapporo', 'Sarajevo', 'Seattle', 'Semarang', 'Seoul', 'Shanghai', 'Sharjah', 'Shenzhen', 'Singapore', 'Skopje', 'Sofia', 'South Tangerang', 'Soweto', 'Stockholm', 'Sucre', 'Surabaya', 'Surat', 'Suva', 'Sydney', 'Tabriz', 'Taipei', 'Tallinn', 'Tangerang', 'Tarawa', 'Tashkent', 'Tbilisi', 'Tegucigalpa', 'Tehran', 'Tel Aviv', 'Thimphu', 'Tianjin', 'Tijuana', 'Tirana', 'Tokyo', 'Toronto', 'Torshavn', 'Tripoli', 'Tunis', 'Ulan Bator', 'Vaduz', 'Valencia', 'Valletta', 'Vancouver', 'Victoria', 'Vienna', 'Vientiane', 'Vilnius', 'Warsaw', 'Washington', 'Wellington', 'Willemstad', 'Windhoek', 'Wuhan', 'Yamoussoukro', 'Yangon', 'Yaounde', 'Yekaterinburg', 'Yerevan', 'Yokohama', 'Zagreb', 'Abbeville', 'Abbotsford', 'Aberdeen', 'Abilene', 'Abingdon', 'Abington', 'Absecon', 'Acampo', 'Accokeek', 'Achille', 'Acme', 'Acton', 'Acushnet', 'Acworth', 'Ada', 'Adair', 'Adairsville', 'Adams', 'Adams Run', 'Adamstown', 'Adamsville', 'Addieville', 'Addis', 'Addison', 'Addyston', 'Adel', 'Adelanto', 'Adena', 'Adkins', 'Adrian', 'Advance', 'Afton', 'Agawam', 'Agoura Hills', 'Agra', 'Aiea', 'Aiken', 'Ailey', 'Airville', 'Ajo', 'Akhiok', 'Akron', 'Alabaster', 'Alameda', 'Alamo', 'Alamogordo', 'Albany'];

    major_uscities1 = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Houston', 'Dallas', 'Philadelphia', 'Atlanta', 'Washington', 'Boston', 'Phoenix', 'Detroit', 'Seattle', 'San Francisco', 'San Diego', 'Minneapolis', 'Tampa', 'Brooklyn', 'Denver', 'Queens', 'Riverside', 'Las Vegas', 'Baltimore', 'St. Louis', 'Portland', 'San Antonio', 'Sacramento', 'Austin', 'Orlando', 'San Juan', 'San Jose', 'Pittsburgh', 'Indianapolis', 'Manhattan', 'Cincinnati', 'Kansas City', 'Cleveland', 'Columbus', 'Bronx', 'Virginia Beach', 'Charlotte', 'Milwaukee', 'Providence', 'Jacksonville', 'Nashville', 'Salt Lake City', 'Raleigh', 'Richmond', 'Memphis', 'Oklahoma City', 'Hartford', 'Louisville', 'Buffalo', 'New Orleans', 'Fort Worth', 'Bridgeport', 'Tucson', 'El Paso', 'Omaha', 'McAllen', 'Birmingham', 'Albuquerque', 'Tulsa', 'Fresno', 'Charleston', 'Rochester', 'Dayton', 'Cape Coral', 'Mission Viejo', 'Colorado Springs', 'Baton Rouge', 'Allentown', 'Ogden', 'Provo', 'Knoxville', 'Grand Rapids', 'Columbia', 'Albany', 'Bakersfield', 'New Haven', 'Des Moines', 'Akron', 'Palm Bay', 'Concord', 'Wichita', 'Harrisburg', 'Mesa', 'Staten Island', 'Toledo', 'Worcester', 'Long Beach', 'Port St. Lucie', 'Little Rock', 'Reno', 'Spokane', 'Madison', 'Boise', 'Bonita Springs', 'Denton', ];

major_uscities2 = ['Springfield', 'Oakland', 'Augusta', 'Kissimmee', 'Winston-Salem', 'Stockton', 'Syracuse', 'Chattanooga', 'Lancaster', 'Greenville', 'Durham', 'Pensacola', 'Fayetteville', 'Arlington', 'Aurora', 'Oxnard', 'Indio', 'Scranton', 'Victorville', 'Trenton', 'Modesto', 'Honolulu', 'Huntsville', 'Anaheim', 'Greensboro', 'Corpus Christi', 'Fort Wayne', 'Fort Collins', 'Jackson', 'Myrtle Beach', 'Fayetteville', 'Antioch', 'Lansing', 'Lexington', 'Mobile', 'Youngstown', 'Savannah', 'Poughkeepsie', 'Santa Ana', 'Henderson', 'St. Paul', 'Ann Arbor', 'Newark', 'Irvine', 'Santa Rosa', 'Canton', 'Asheville', 'Flint', 'Winter Haven', 'Anchorage', 'Lincoln', 'Concord', 'Jersey City', 'Springfield', 'Shreveport', 'Plano', 'Davenport', 'Lubbock', 'Lakeland', 'South Bend', 'Chula Vista', 'Rockford', 'Reading', 'Chandler', 'Eugene', 'Wilmington', 'Santa Clarita', 'Salem', 'Killeen', 'Round Lake Beach', 'Columbus', 'Gilbert', 'Kennewick', 'North Las Vegas', 'Tallahassee', 'St. Petersburg', 'Laredo', 'Irving', 'Peoria', 'Montgomery', 'York', 'Chesapeake', 'Glendale', 'Nashua', 'Garland', 'Scottsdale', 'Norfolk', 'Lafayette', 'Arlington', 'Appleton', 'Fremont', 'Aguadilla', 'Rock Hill', 'Fargo', 'Gulfport', 'Bremerton', 'Green Bay', 'Hialeah', 'Deltona', 'Gainesville'];

major_uscities3 = ['San Bernardino', 'Enterprise', 'Roanoke', 'Spring Valley', 'Tacoma', 'Brownsville', 'College Station', 'Olympia', 'Clarksville', 'Yonkers', 'Thousand Oaks', 'Portland', 'Moreno Valley', 'Fontana', 'Hickory', 'Amarillo', 'Sioux Falls', 'Evansville', 'Huntington', 'Waterbury', 'Lorain', 'Kalamazoo', 'Galveston', 'Spartanburg', 'Santa Barbara', 'Huntington Beach', 'Glendale', 'Sunrise Manor', 'Grand Prairie', 'Waco', 'Hagerstown', 'Overland Park', 'Nampa', 'Frisco', 'Cedar Rapids', 'Paradise', 'McKinney', 'Vancouver', 'Peoria', 'Ocala', 'Erie', 'Newport News', 'Frederick', 'Murfreesboro', 'Aurora', 'Fort Lauderdale', 'Danbury', 'Tempe', 'Spring Hill', 'Gastonia', 'Salinas', 'Fredericksburg', 'Gainesville', 'Elk Grove', 'Ontario', 'Oceanside', 'Rancho Cucamonga', 'Garden Grove', 'Lancaster', 'Cary', 'Hemet', 'Pembroke Pines', 'Bayamón', 'Panama City', 'Vallejo', 'Manchester', 'Medford', 'Mauldin', 'Palmdale', 'Santa Cruz', 'Norwich', 'Muskegon', 'Leesburg', 'High Point', 'Tuscaloosa', 'Visalia', 'Marysville', 'Hayward', 'Merced', 'Lafayette', 'Springfield', 'Alexandria', 'Paterson', 'Corona', 'Macon', 'Binghamton', 'Kansas City', 'Lakewood', 'Sunnyvale', 'Odessa', 'New Bedford', 'Hollywood', 'South Lyon', 'Pasadena', 'Pomona', 'Escondido', 'Lake Charles', 'Joliet', 'Champaign', 'Mesquite'];

major_uscities4 = ['Fairfield', 'Elkhart', 'Bellevue', 'Naperville', 'St. George', 'Topeka', 'Burlington', 'Torrance', 'Warner Robins', 'Roseville', 'Santa Maria', 'Athens', 'Houma', 'Fullerton', 'Columbia', 'Surprise', 'Greeley', 'Beaumont', 'Las Cruces', 'Metairie', 'Thornton', 'Olathe', 'Midland', 'Carolina', 'West Valley City', 'Orange', 'Warren', 'Pasadena', 'Grand Junction', 'Tyler', 'Hampton', 'Bloomington', 'Elizabeth', 'Yuma', 'Kent', 'Stamford', "Coeur d'Alene", 'Miramar', 'Sterling Heights', 'Coral Springs', 'Yuba City', 'Yakima', 'Racine', 'Johnson City', 'Billings', 'Carrollton', 'Iowa City', 'Dover', 'Bellingham', 'Charleston', 'Lynchburg', 'Santa Clara', 'Greenville', 'Simi Valley', 'Fort Smith', 'Norman', 'Arecibo', 'Abilene', 'Kenosha', 'Lehigh Acres', 'Seaside', 'Burlington', 'Arvada', 'Pearland', 'Waldorf', 'Independence', 'Rochester', 'Logan', 'Harlingen', 'Pueblo', 'Temple', 'Berkeley', 'East Los Angeles', 'Duluth', 'Clovis', 'Boulder', 'Round Rock', 'Port Arthur', 'Redding', 'Monroe', 'Cambridge', 'Utica', 'St. Cloud', 'Mandeville', 'Clearwater', 'West Jordan', 'Richardson', 'West Palm Beach', 'The Woodlands', 'Richmond', 'Westminster', 'Saginaw', 'Brandon', 'Kailua', 'Meridian', 'Ponce', 'Carlsbad', 'Lowell', 'North Charleston', 'Downey'];

major_uscities5 = ['Gresham', 'Elgin', 'Broken Arrow', 'Waterloo', 'Costa Mesa', 'Leominster', 'Longview', 'League City', 'Jacksonville', 'Bend', 'Miami Gardens', 'Pompano Beach', 'Sioux City', 'Murrieta', 'Gilroy', 'San Buenaventura', 'Everett', 'Sugar Land', 'El Monte', 'Lewisville', 'Chico', 'Eau Claire', 'West Covina', 'Temecula', 'Idaho Falls', 'Bloomington', 'Inglewood', 'Dearborn', 'Centennial', 'Burbank', 'Sparks', 'Sandy Springs', 'El Cajon', 'Hillsboro', 'South Fulton', 'Auburn', 'Renton', 'Holland', 'San Mateo', 'Columbia', 'Daly City', 'Davie', 'Jurupa Valley', 'Brockton', 'Rialto', 'Charlottesville', 'Norwalk', 'Highlands Ranch', 'Allen', 'Wichita Falls', 'Rio Rancho', 'Vacaville', 'Spokane Valley', 'Longmont', 'Kingsport', 'Menifee', "Lee's Summit", 'Quincy', 'Lynn', 'San Angelo', 'Federal Way', 'Bowling Green', 'Bismarck', 'Hesperia', 'Riverview', 'Lafayette', 'Edinburg', 'Vista', 'Carmel', 'St. Augustine', 'Beaverton', 'Portsmouth', 'Fishers', 'Orem', 'Sandy', 'Sunrise', 'Portsmouth', 'San Tan Valley', 'Compton', 'Lawrence', 'Arden-Arcade', 'Slidell', 'Boca Raton', 'Livonia', 'Carson', 'Williamsburg', 'La Crosse', 'San Marcos', 'Prescott Valley', 'Middletown', 'Goodyear', 'San Germán', 'Edmond', 'Fall River', 'South Gate', 'Suffolk', 'Santa Fe', 'Mayagüez', 'Santa Monica', 'Tracy'];

major_uscities6 = ['Roswell', 'Plantation', 'Alafaya', 'Kirkland', 'Hoover', 'Westminster', 'Lawton', 'San Leandro', 'Norwalk', "O'Fallon", 'Manteca', 'Florence', 'Joplin', 'Chino', 'Germantown', 'Waukegan', 'Buckeye', "Town 'n' Country", 'Clifton', 'Bloomington', 'Mount Pleasant', 'Missoula', 'Newton', 'Livermore', 'Palm Coast', 'Avondale', 'Muncie', 'Conroe', 'Hawthorne', 'Rapid City', 'Lawrence', 'New Braunfels', 'Citrus Heights', 'Whittier', 'Troy', 'Winchester', 'Decatur', 'Deerfield Beach', 'Vineland', 'Springdale', 'Newport Beach', 'San Ramon', 'Lake Forest', 'Mission', 'Auburn', 'Brooklyn Park', 'Bryan', 'Westland', 'Cicero', 'Napa', 'Fort Myers', 'Pine Hills', 'Atascocita', 'Buena Park', 'Redwood City', 'Anderson', 'Farmington Hills', 'Melbourne', 'Miami Beach', 'Albany', 'Alhambra', 'State College', 'Jackson', 'Warwick', 'Cranston', 'Baytown', 'Largo', 'Silver Spring', 'Lakewood', 'Mountain View', 'Johns Creek', 'Salisbury', 'Morgantown', 'Springfield', 'Franklin', 'Florence', 'Madera', 'Parma', 'Layton', 'New Rochelle', 'Somerville', 'Terre Haute', 'Flagstaff', 'Plymouth', 'Newark', 'Tustin', 'Anniston', 'Milpitas', 'Texarkana', 'Pleasanton', 'Boynton Beach', 'Port Huron', 'Turlock', 'Folsom', 'Bellflower', 'Pharr', 'Homestead', 'Alton', 'Upland', 'Evanston'];

major_uscities8 = ['Rancho Cordova', 'Battle Creek', 'Alameda', 'Chino Hills', 'Cheyenne', 'Lebanon', 'Perris', 'Schaumburg', 'Kendall', 'Davis', 'Elizabethtown', 'Jonesboro', 'Hammond', 'Carmichael', 'Arlington Heights', 'Alexandria', 'Camarillo', 'Wyoming', 'Hattiesburg', 'The Villages', 'Pasco', 'Southfield', 'Wenatchee', 'Hammond', 'Rochester Hills', 'Loveland', 'Valdosta', 'Pittsburg', 'Owensboro', 'South Jordan', 'Bethlehem', 'Apple Valley', 'Pawtucket', 'Flower Mound', 'St. Joseph', 'Cedar Park', 'Dover', 'Caguas', 'Ellicott City', 'Saratoga Springs', 'Pocatello', 'Oshkosh', 'North Port', 'New Britain', 'Woodbury', 'Lauderhill', 'Lehi', 'Bolingbrook', 'Dale City', 'Missouri City', 'Sheboygan', 'Mansfield', 'Glens Falls', 'Lodi', 'Harrisonburg', 'Doral', 'Centreville', 'Dothan', 'Cleveland', 'Mount Vernon', 'Jackson', 'Baldwin Park', 'Broomfield', 'Redlands', 'Camden', 'Altoona', 'Redmond', 'Framingham', 'Porterville', 'Mansfield', 'Waukesha', 'Blacksburg', 'Wausau', 'Sumter', 'Janesville', 'Brunswick', 'Tamarac', 'Daytona Beach', 'Castle Rock', 'Redondo Beach', 'Wilmington', 'Union City', 'Fairbanks', 'Bayonne', 'Guaynabo', 'Spring Hill', 'Grand Forks', 'Rocklin', 'Passaic', 'Casas Adobes', 'St. Charles', 'El Paso de Robles', 'Maple Grove', 'Sherman', 'Walnut Creek', 'Dublin', 'North Richland Hills', 'Gary', 'Glen Burnie', 'Conway'];

major_uscities9 = ['Michigan City', 'Lakeville', 'Blaine', 'Poinciana', 'East Orange', 'Noblesville', 'Gaithersburg', 'Lake Elsinore', 'Palo Alto', 'Dalton', 'Dubuque', 'Eastvale', 'Tulare', 'Maricopa', 'Rogers', 'Yorba Linda', 'Eagan', 'Weston', 'Hanford', 'Bristol', 'Watsonville', 'Union City', 'Palatine', 'West Des Moines', 'Lynwood', 'San Marcos', 'Skokie', 'Great Falls', 'Longview', 'Corvallis', 'Rockville', 'Haverhill', 'Shawnee', 'Mount Vernon', 'Casper', 'Schenectady', 'Ames', 'South Hill', 'Sammamish', 'Georgetown', 'Delray Beach', 'Dundalk', 'Kenner', 'Ankeny', 'South San Francisco', 'Castro Valley', 'Bethesda', 'Morristown', 'Juana Díaz', 'Kankakee', 'Brentwood', 'Fajardo', 'Bay City', 'Victoria', 'Malden', 'Parkersburg', 'Novi', 'Bozeman', 'Alpharetta', 'Wesley Chapel', 'Waltham', 'Laguna Niguel', 'San Clemente', 'North Little Rock', 'Florence-Graham', 'Eden Prairie', 'Pflugerville', 'Burnsville', 'Brentwood', 'Millcreek', 'La Habra', 'Coon Rapids', 'Bossier City', 'Hamilton', 'Taylor', 'Lakewood', 'Greenwood', 'Bellevue', 'Montebello', 'Moore', 'Council Bluffs', 'Rowlett', 'Spring', 'Port Charlotte', 'Reston', 'Pico Rivera', 'Dearborn Heights', 'Port Orange', 'Encinitas', 'Springfield', 'Commerce City', 'Pontiac', 'The Hammocks', 'Wellington', 'San Rafael', 'Monterey Park', 'La Mesa', 'Woodland', 'Marietta', 'Chapel Hill']

major_uscities10 = ['Gardena', 'Meriden', 'Bristol', 'Revere', 'Medford', 'Palm Harbor', 'Cupertino', 'Jupiter', 'Hendersonville', 'North Miami', 'Des Plaines', 'Taylorsville', 'West Allis', 'Sanford', 'Huntersville', 'Euless', 'Petaluma', 'Richland', 'Santee', 'White Plains', 'Hoboken', 'Kokomo', 'Taunton', 'St. Clair Shores', 'Towson', 'Caldwell', 'South Whittier', 'Orland Park', 'Stonecrest', 'Palm Beach Gardens', 'Royal Oak', 'Margate', 'Blue Springs', 'Shoreline', 'Midwest City', 'Bowie', 'Apex', 'Oak Lawn', 'Carson City', 'Fountainebleau', 'Queen Creek', 'Leander', 'Bartlett', 'St. Cloud', 'Coconut Creek', 'Kettering', 'Parker', 'Decatur', 'St. Peters', 'Fountain Valley', 'Berwyn', 'Bel Air South', 'National City', 'Lenexa', 'Highland', 'Arcadia', 'Mount Prospect', 'Lake Havasu City', 'Tinley Park', 'Albany', 'DeSoto', 'New Brunswick', 'Chicopee', 'Madison', 'West Haven', 'Smyrna', 'Huntington Park', 'Wylie', 'Diamond Bar', 'Apple Valley', 'Perth Amboy', 'Bradenton', 'Brookhaven', 'Hacienda Heights', 'Manhattan', 'Tigard', 'Tamiami', 'Rocky Mount', 'Yucaipa', 'Westchester', 'Peabody', 'Plainfield', 'Southaven', 'Apopka', 'Oak Park', 'Horizon West', 'Severn', 'Paramount', 'Colton', 'Kentwood', 'Aspen Hill', 'Minnetonka', 'Sarasota', 'Wheaton', 'West Sacramento', 'Casa Grande', 'Normal', 'Kendale Lakes', 'San Jacinto', 'Novato'];

major_uscities11 = ['Pinellas Park', 'Edina', 'Herriman', 'Elyria', 'Grand Island', 'Aloha', 'Lacey', 'Bentonville', 'Levittown', 'Methuen Town', 'West New York', 'Glendora', 'Smyrna', 'Florissant', 'Delano', 'Kannapolis', 'Hoffman Estates', 'Texas City', 'Beaumont', 'Placentia', 'Aliso Viejo', 'Wheaton', 'Cathedral City', 'Rosemead', 'Burien', 'Florin', 'Twin Falls', 'Enid', 'Country Club', 'Dunwoody', 'Levittown', 'Palm Desert', 'Covina', 'Cuyahoga Falls', 'Lakewood', 'Marana', 'Mishawaka', 'Columbus', 'Troy', 'North Bethesda', 'Milford city ', 'Collierville', 'Grapevine', 'Summerville', 'Cypress', 'Downers Grove', 'Murray', 'Catalina Foothills', 'East Honolulu', 'Draper', 'Chesterfield', 'Cerritos', 'Bedford', 'St. Louis Park', 'Azusa', 'Euclid', 'McLean', 'Coral Gables', 'Lincoln', 'Jeffersonville', 'Ceres', 'Biloxi', 'Lawrence', 'Poway', 'Cedar Hill', 'Portage', 'Rowland Heights', 'Niagara Falls', 'Dublin', 'El Dorado Hills', 'Mooresville', 'North Highlands', 'Antelope', 'Everett', 'University', 'Roswell', 'Leesburg', 'Rancho Santa Margarita', 'Tuckahoe', 'Titusville', 'Glenview', 'Wauwatosa', 'Stillwater', 'Minot', 'La Mirada', 'Wilson', 'Newark', 'Roseville', 'East Lansing', 'Mentor', 'Bothell', 'San Luis Obispo', 'Burleson', 'East Providence', 'Middletown', 'Brea', 'Salina', 'Potomac', 'Farmington', 'Sicklerville'];

 var morecities = myCities.concat(major_uscities1, major_uscities2, major_uscities3, major_uscities4, major_uscities5, major_uscities6, major_uscities8, major_uscities9, major_uscities10, major_uscities11);

    

$("#searchCity").autocomplete({
  source: morecities
});
   
    });
    
  