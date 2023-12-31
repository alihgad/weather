async function getWeather (){
    let data = await fetch ('http://api.weatherapi.com/v1/current.json?key=14c797d8ea394bff8e315301233112&q=cairo&aqi=no')
    console.log(data);
}

getWeather()