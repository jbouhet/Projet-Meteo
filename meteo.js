var config = { }  

function fetchWeather(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="
    + city
    + "&units=metric&appid="
    + config.apikey)
    .then((Response) => Response.json())
    .then((data) => displayWeather(data));
};

function displayWeather(data) {
    const { name } = data;
    const { description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Météo à " + name;
    document.querySelector(".temp").innerText = "Température : " + temp + " °C";
    document.querySelector(".description").innerText = description + "  Ciel";
    document.querySelector(".humidity").innerText = "Taux d'humidité  " + humidity + "  %";
    document.querySelector(".wind").innerText = "Vitesse du vent  " + speed + "  km/h";
    document.querySelector(".Meteo").classList.remove("loading");
};

function fetchConfig() {
    fetch("./conf.json")
    .then((res) => res.json())
    .then((data) => {
        config=data;
        // premier appel avant 1h
        fetchWeather(config.ville)
        // rappel toutes les heures
        setInterval(fetchWeather, 3600000, config.ville);
    });
    console.log(config.ville);
}

fetchConfig();

