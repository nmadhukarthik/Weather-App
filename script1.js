
const apiKey = "a53dba3d485b74b33347010cd526c9cd"
const weatherDataEle = document.querySelector(".weather-data")
const cityNameEle = document.querySelector("#city-name")
const formEle = document.querySelector("form")
const imgIcon = document.querySelector(".icon")


formEle.addEventListener("submit", (e)=>{
    e.preventDefault()
    const cityValue = cityNameEle.value
    getweatherData(cityValue)
})



async function getweatherData(cityName)
{
    try 
    {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        // for 5 days forecast
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`)
        
        if(!response.ok)
        { throw new Error("Network response is not ok!")}
        
        const data = await response.json()
        console.log(data)

        const temperature = Math.floor(data.main.temp)
        const icon = data.weather[0].icon
        const description = data.weather[0].description

        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]

        weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`
        weatherDataEle.querySelector(".description").textContent = `${description}`
    
        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather-icon">`
    
        weatherDataEle.querySelector(".details").innerHTML = details.map((detail)=>{
            return `<div>${detail}</div>`
        }).join("")
    
    } catch (error) {
        
        weatherDataEle.querySelector(".temp").textContent = ""
        weatherDataEle.querySelector(".description").textContent = "An Error Occured!"
        imgIcon.innerHTML = ""

    }
}


function darkTheme()
{
    var element = document.body;
    element.classList.toggle("dark-mode");
}