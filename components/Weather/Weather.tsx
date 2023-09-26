"use client"
import React, { useEffect, useState } from 'react'
import { SunnyIcon } from '../Icons/Icons'

type Weather = { [key: string]: string; }

function Weather() {

    const [weatherObj, setWeatherObj] = useState<Weather>({})

    const weatherIconHandler = (weather?: string) => {
        switch (weather) {
            case 'Clear':
                return "http://openweathermap.org/img/wn/01n@2x.png"
            case 'Clouds':
                return "http://openweathermap.org/img/wn/02n@2x.png"
            case 'Showers':
                return "http://openweathermap.org/img/wn/09n@2x.png"
            case 'Rain':
                return "http://openweathermap.org/img/wn/10n@2x.png"
            case 'Thunderstorm':
                return "http://openweathermap.org/img/wn/11n@2x.png"
            case 'Sleet':
                return "http://openweathermap.org/img/wn/13n@2x.png"
            case 'Snow':
                return "http://openweathermap.org/img/wn/13n@2x.png"
            case 'Fog':
                return "http://openweathermap.org/img/wn/50n@2x.png"
            case 'Haze':
                return "http://openweathermap.org/img/wn/50n@2x.png"
            default:
                return "http://openweathermap.org/img/wn/50n@2x.png"

        }
    }



    useEffect(() => {
        const weatherFetchHandler = async () => {
            const WeatherFetch = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=25.056&lon=121.233&appid=b06ea3e9a3032e20ff8a1b52527883be&units=metric')
            const WeatherResponse = await WeatherFetch.json()
            setWeatherObj({
                temp: `${Math.floor(WeatherResponse.main.temp)}`,
                description: `${WeatherResponse.weather[0].description}`,
                weather: `${WeatherResponse.weather[0].main}`

            })
        }
        weatherFetchHandler()
    }, [])

    return (
        <div className=''>
            <div className='flex items-center justify-between'>
                <div className='text-sm'>{weatherObj.temp}°</div>
                <div className='grow text-center'>
                    <div>Taipei, Taiwan</div>
                </div>
                <div className='grid place-content-center'>
                <img  className="block h-10" src={weatherIconHandler(weatherObj.weather)} alt="" />
                </div>
            </div>

        </div>
    )
}

export default Weather