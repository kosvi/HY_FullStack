import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {

    const [weather, setWeather] = useState({})

    useEffect(() => {
        const getWeather = async () => {
            try {
                // this doesn't work on Firefox, it forces https and return 105 - https_access_restricted
                const dataFromApi = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${city}&units=m`)
                if (dataFromApi.status === 200)
                    setWeather(dataFromApi.data)
            } catch (error) {
                console.log(error)
            }
        }
        getWeather()
    }, [city])

    if (!weather.hasOwnProperty('current')) {
        return (
            <div></div>
        )
    }

    return (
        <div>
            <h2>Weather in {city} be like</h2>
            <b>Temperature: </b>{weather.current.temperature}<br />
            {weather.current.weather_icons.map(icon => <img src={icon} alt="" key={icon} />)}
            <br />
            <b>Wind: </b> {`${weather.current.wind_speed} m/s ${weather.current.wind_dir}`}<br />
        </div>
    )
}

export default Weather