import { useState, useEffect } from "react"
import axios from 'axios'

const Entry = (props) => {
    const languageList = Object.entries(props.languages)
    const api_key = import.meta.env.VITE_WEATHER_KEY
    const [weather, setWeather] = useState('')
    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lng}&appid=${api_key}`
    console.log(weather)
    useEffect(()=>{
        axios.get(api_url)
        .then(response => {setWeather(response.data)})
      }, [])
    console.log(weather)
    

    if(weather===''){
        return (
            <>
            <h1>{props.name}</h1>
            <p>capital {props.capital}</p>
            <p>area {props.area}</p>
            <h3>languages:</h3>
            <ul>
                {languageList.map(language=> <li key={language[0]}>{language[1]}</li>)}
            </ul>
            <img src={props.flag.png} alt={props.flag.alt}/>
            <h2>Weather in {props.capital}</h2>
            </>
        )
    }
    else{
    const temperature = (weather.main.temp - 273.15).toFixed(1)
    return (
        <>
        <h1>{props.name}</h1>
        <p>capital {props.capital}</p>
        <p>area {props.area}</p>
        <h3>languages:</h3>
        <ul>
            {languageList.map(language=> <li key={language[0]}>{language[1]}</li>)}
        </ul>
        <img src={props.flag.png} alt={props.flag.alt}/>
        <h2>Weather in {props.capital}</h2>
        <p>temperature {temperature} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <p>wind {weather.wind.speed} m/s</p>
        </>
    )}
}

export default Entry