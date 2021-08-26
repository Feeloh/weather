function kenyaCityForecast() {
    document.getElementById("progress").style.width="25%";
    const searchValue = document.getElementById('cityPlaceholder').value;
    let city = null;

    if(searchValue){
        city = searchValue
    }

    if(!searchValue){
        city = 'nairobi'
    }

    let http = new XMLHttpRequest();

    http.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            document.getElementById("progress").style.width="50%";

            let response = JSON.parse(this.responseText);

            let population = 'Population: ' + (response?.city?.population).toLocaleString();
            const todayWeather = response?.list;

            document.getElementById("cityMain").innerHTML = response?.city?.name;
            document.getElementById("populationMain").innerHTML = population;

            let todaysWeatherDisplay = '';
            let weekDay = '';
            let weekWeather = '';
            let weekTemp = '';

            for (let p = 0; p < todayWeather.length; p++) {

                document.getElementById("progress").style.width="75%";

                if (todayWeather[p].dt_txt.substring(11) === '15:00:00') {
                    
                    let timestamp = todayWeather[p].dt;
                    const a = new Date(timestamp * 1000);
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
                        'Saturday'
                    ];
                    const dayOfWeek = days[a.getDay()];
                    let weeklyWeather = todayWeather[p]?.weather[0]?.main;
                    const weeklyTemp = todayWeather[p].main.feels_like;

                    if(weeklyWeather === "Clouds") {
                        weeklyWeather = "cloud";
                    }

                    if(weeklyWeather === "Clear") {
                        weeklyWeather = "night-clear";
                    }

                    weekDay +=      dayOfWeek  + "</p>";
                    weekWeather +=  `<i class="wi wi-${weeklyWeather.toLowerCase()}"></i></p>`;
                    weekTemp +=     weeklyTemp + "<span>°</span></p>";

                    document.getElementById("first").innerHTML = weekDay;
                    document.getElementById("second").innerHTML = weekWeather;
                    document.getElementById("third").innerHTML = weekTemp;

                }

            }

            for (let k = 0; k < 7; k++) {
                const time = todayWeather[k].dt_txt.substring(11);
                let mainForecast = todayWeather[k].weather[0].main;
                const mainTemp = todayWeather[k].main.temp + "<span>°</span>";

                if(mainForecast === "Clouds") {
                    mainForecast = "cloud";
                }

                if(mainForecast === "Clear") {
                    mainForecast = "night-clear";
                }
                
                todaysWeatherDisplay = time + "</p>" + `<i class="wi wi-${mainForecast}"></i>` + "</p>" + mainTemp + "</p>";
                document.getElementById(`${k}`).innerHTML = todaysWeatherDisplay;
            }
            document.getElementById("progress").style.width="100%";
        }
        
    }

    http.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=" + city +
        ",&APPID=83416958429879bd5fb4ee5dad8da3fe&units=metric", true);
    http.send();
    http.onerror = function () {
        document.getElementById("progress").style.width="100%";
        document.getElementById("cityMain").innerHTML = "An error occurred while fetching weather data";
    }
    
}
