function searchCity() {
    let population = '';
    const searchCity = document.getElementById('city').value;
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            const city = response?.city?.name + '</br>';
            population += city + 'Population: ' + response.city.population;
            document.getElementById('main').innerHTML = city;
            document.getElementById('main').innerHTML = population;
            const weeklyData = response.list;
            let display = '';
            let weekly = '';
            for (let p = 0; p < weeklyData.length; p++) {
                if (weeklyData[p].dt_txt.substring(11) === '15:00:00') {
                    let timestamp = weeklyData[p].dt;
                    const a = new Date(timestamp * 1000);
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
                        'Saturday'
                    ];
                    const dayOfWeek = days[a.getDay()];
                    const weeklyWeather = weeklyData[p].weather[0].main;
                    const weeklyTemp = weeklyData[p].main.feels_like;
                    weekly += dayOfWeek + "</br>" + "Forecast: " + weeklyWeather + "</br>" +
                        "Temp: " + weeklyTemp + "</br></br>";
                }
            }
            document.getElementById('weeklyWeather').innerHTML = weekly;
            for (let k = 0; k < 7; k++) {
                const time = weeklyData[k].dt_txt.substring(11);
                const mainForecast = weeklyData[k].weather[0].main;
                const mainTemp = weeklyData[k].main.temp;
                display += time + " " + mainForecast + " " + mainTemp +
                    '<span>°c</span></br></br></br>';
            }
            document.getElementById('todayWeather').innerHTML = display;
        }
    }
    http.open('GET', "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity +
        ",&APPID=83416958429879bd5fb4ee5dad8da3fe&units=metric", true);
    http.send();
}

function kenyaCityForecast(j) {
    let cities = [
        'nairobi',
        'nanyuki',
        'mombasa',
        'kisumu',
        'nakuru',
        'marsabit'
    ];
    let population = '';
    let count = 0;
    let randomNumber = Math.floor(Math.random() * 7);

    if (typeof j === 'undefined') {
        cityIndex = 0;
    } else {
        cityIndex = randomNumber + j;
    }
    let citiesData = [];
    
    for (cityIndex; cityIndex < cities.length; cityIndex++) {

        const citiesForecast = {};
        let http = new XMLHttpRequest();

        http.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {

                let response = JSON.parse(this.responseText);
                let city = response?.city?.name + '</br>';

                population += city + 'Population: ' + response?.city?.population;
                const todayWeather = response?.list;

                citiesForecast.name = response?.city?.name;
                citiesForecast.population = response?.city?.population;

                let todaysWeatherDisplay = '';
                let weekDay = '';
                let weekWeather = '';
                let weekTemp = '';

                for (let p = 0; p < todayWeather.length; p++) {

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

                        weekDay +=      dayOfWeek  + "</p>";
                        weekWeather +=  `<i class="wi wi-${weeklyWeather.toLowerCase()}"></i></p>`;
                        weekTemp +=     weeklyTemp + "<span>°</span></p>";

                        document.getElementById("first").innerHTML = weekDay;
                        document.getElementById("second").innerHTML = weekWeather;
                        document.getElementById("third").innerHTML = weekTemp;

                        console.log(weekWeather, 'my data');
                    }

                }

                for (let k = 0; k < 7; k++) {
                    const time = todayWeather[k].dt_txt.substring(11);
                    let mainForecast = todayWeather[k].weather[0].main;
                    const mainTemp = todayWeather[k].main.temp + "<span>°</span>";

                    if(mainForecast === "Clouds") {
                        mainForecast = "cloud";
                    }

                    todaysWeatherDisplay = time + "</p>" + `<i class="wi wi-${mainForecast}"></i>` + "</p>" + mainTemp + "</p>";
                    document.getElementById(`${k}`).innerHTML = todaysWeatherDisplay;
                }

                citiesForecast.weekly = weeklysWeatherDisplay;
                citiesForecast.todayWeather = todaysWeatherDisplay;
                count++;
            }
        }
        http.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=" + cities[cityIndex] +
            ",ke&APPID=83416958429879bd5fb4ee5dad8da3fe&units=metric", true);
        http.send();

        citiesData.push(citiesForecast);
    }

    console.log(citiesData, 'my object');
}