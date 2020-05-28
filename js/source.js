function searchCity() {
    let pop = '';
    const searchCity = document.getElementById('city').value;
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            const city = response.city.name + '</br>';
            pop += city + 'Population: ' + response.city.population;
            document.getElementById('main').innerHTML = city;
            document.getElementById('main').innerHTML = pop;
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
    document.getElementById('city').value = '';
    let cities = [
        'nairobi',
        'nanyuki',
        'mombasa',
        'kisumu',
        'nakuru',
        'marsabit'
    ];
    let pop = '';
    let count = 0;
    let rand = Math.floor(Math.random() * (7 - 0) + 0);
    if (typeof j === 'undefined') {
        i = 0;
    } else {
        i = rand + j;
    }
    for (i; i < cities.length; i++) {
        let http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                let city = response.city.name + '</br>';
                pop += city + 'Population: ' + response.city.population;
                const todayWeather = response.list;
                let display = '';
                let weekly = '';
                if (count == 0) {
                    document.getElementById('main').innerHTML = city;
                    document.getElementById('main').innerHTML = pop;
                    for (let p = 0; p < todayWeather.length; p++) {
                        if (todayWeather[p].dt_txt.substring(11) === '15:00:00') {
                            let timestamp = todayWeather[p].dt;
                            const a = new Date(timestamp * 1000);
                            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
                                'Saturday'
                            ];
                            const dayOfWeek = days[a.getDay()];
                            const weeklyWeather = todayWeather[p].weather[0].main;
                            const weeklyTemp = todayWeather[p].main.feels_like;
                            weekly += dayOfWeek + "</br>" + "Forecast: " + weeklyWeather + "</br>" +
                                "Temp: " + weeklyTemp + "</br></br>";
                        }
                    }
                    document.getElementById('weeklyWeather').innerHTML = weekly;
                    for (let k = 0; k < 7; k++) {
                        const time = todayWeather[k].dt_txt.substring(11);
                        const mainForecast = todayWeather[k].weather[0].main;
                        const mainTemp = todayWeather[k].main.temp;
                        display += time + " " + mainForecast + " " + mainTemp +
                            '<span>°c</span></br></br></br>';
                    }
                    document.getElementById('todayWeather').innerHTML = display;
                }
                count++;
            }
        }
        http.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=" + cities[i] +
            ",ke&APPID=83416958429879bd5fb4ee5dad8da3fe&units=metric", true);
        http.send();
    }
}