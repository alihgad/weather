"use strict";

let days = ["Sunday", "Monday", "Tuesday","Thursday","Wednsday","Tuseday","Friday"]


async function getWeather (city = "Veladores"){
    let data = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=14c797d8ea394bff8e315301233112&q=${city}&days=3`)
    let details = await data.json()
    document.getElementById("loader").classList.replace("d-flex","d-none")
    displayFirstDay(details)

   
}

function displayFirstDay(result){ 

    let condition = result.current.condition.icon
    let {text} = result.current.condition
    let date = new Date(result.current.last_updated)
    let months= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"]; 
    let currentMonth = `${date.getDate()} ${months[date.getMonth()]}`;
    let dirction = ""

    switch (result.current.wind_dir[0]) {
            case 'W':
                dirction = "West"
                break;
            case 'E':
                dirction = "East"
                break;
            case 'N':
                dirction = "North"
                break;
            case 'S':
                dirction = "South"
                break;
        default:
            break;
    }

    document.querySelector("#icon").setAttribute("src",condition)
    document.getElementById("text").innerText = text
    document.getElementById("location").innerText = result.location.name
    document.querySelector("#temp").innerText = result.current.temp_c
    document.querySelector("#day").innerText = days[date.getDay()]  
    document.querySelector('#month').innerText =  currentMonth
    document.querySelector("#uv").innerText = result.current.uv 
    document.querySelector("#wind").innerText = result.current.wind_kph
    document.querySelector("#derction").innerText = dirction

    displaySecondDay(result)
}

function displaySecondDay(result) {
    const day = new Date(result.forecast.forecastday[1].date); 
    document.getElementById("day2").innerText = days[day.getDay()]
    document.querySelector("#icon2").setAttribute("src",result.forecast.forecastday[1].day.condition.icon)
    document.getElementById("max-temp").innerText =  result.forecast.forecastday[1].day.maxtemp_c
    document.getElementById("min-temp").innerText =  result.forecast.forecastday[1].day.mintemp_c
    document.querySelector("#text1").innerText = result.forecast.forecastday[1].day.condition.text
    displayThirdDay(result)

    
}

function displayThirdDay(result){
    const day = new Date(result.forecast.forecastday[2].date); 
    document.getElementById("day3").innerText = days[day.getDay()]
    document.querySelector("#icon3").setAttribute("src",result.forecast.forecastday[2].day.condition.icon)
    document.getElementById("max-temp3").innerText =  result.forecast.forecastday[2].day.maxtemp_c
    document.getElementById("min-temp3").innerText =  result.forecast.forecastday[2].day.mintemp_c
    document.querySelector("#text3").innerText = result.forecast.forecastday[2].day.condition.text

    console.log(result.forecast.forecastday[2].day.maxtemp_c);
}


function search (){
    let city = document.querySelector("#find").value
    getWeather(city)
}

document.querySelector("#find").nextElementSibling.addEventListener("click",function (){
    search()
})

document.addEventListener("keypress",function(e){
    if (e.key == "Enter") {
        search();
    }
})

setTimeout(getWeather,1000)
