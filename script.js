const apiKey = "a53dba3d485b74b33347010cd526c9cd"
const container = document.querySelector(".container")
const daysEle = document.querySelector(".days")
const cityNameEle = document.querySelector("#city-name")
const formEle = document.querySelector("form")
const imgIcon = document.querySelector(".icon")
const city  = document.querySelector("#city")
const cardsContainer = document.querySelector(".cardsContainer")

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

formEle.addEventListener("submit", (e)=>{
    e.preventDefault()
    cardsContainer.innerHTML = ""
    const cityValue = cityNameEle.value
    console.log(cityValue)
    getweatherData(cityValue)
})


async function getweatherData(cityName)
{
    try 
    {
        // for daily forecast
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`)
       //const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}&units=metric`)
        
        if(!response.ok)
        {
            alert("Invalid Location!");
            throw new Error (`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json()
        console.log(data)

        const uniqueForecastDays = []
        const fiveDaysForecast = data.list.filter((item) => {
             const itemDate = new Date(item.dt_txt).getDate()
             if(!uniqueForecastDays.includes(itemDate))
             { return uniqueForecastDays.push(itemDate)}
        })

        fiveDaysForecast.forEach(element => {
            const day = new Date(element.dt_txt).getDay()
            const date = element.dt_txt.split(" ")[0]

            const icon = element.weather[0].icon
            const description = element.weather[0].description
            const feelsLike = Math.floor(element.main.feels_like)
            
            const temperature = Math.floor(element.main.temp)
            const humidity = element.main.humidity
            const windSpeed = element.wind.speed


            // Clear old data
            cityNameEle.value = ""
            

            city.innerHTML = data.city.name

            
            const dayEle = document.createElement("div")
            dayEle.setAttribute("class","days")
            dayEle.innerHTML = (`
                <div class="details">
                    <div class="date">
                        <p id="day">${weekday[day]}</p>
                        <p id="date">${date}</p>
                    </div>
                    <div class="icon">
                        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather-icon">
                    </div>   
                    <div class="temp"> ${temperature}°C </div>
                </div>
                
                <div class="description"> ${description} </div>
                <br>
                <div class="parameters">
                    <div id="feelsLike">Feels Like: <b id="feelsLikeTemp">${feelsLike}°C</b></div>
                    <div id="humidity">Humidity: <b id="humid">${humidity} %</b></div>
                    <div id="windSpeed">Wind Speed: <b id="WS"> ${windSpeed} m/s</b></div>               
                </div>`)    
                cardsContainer.appendChild(dayEle)
        });
    
    } catch (error) {
        console.log(`There was a problem with the fetch operation`+ error.message)
    }
}



function darkTheme()
{
    var element = document.body;
    element.classList.toggle("dark-mode");
}