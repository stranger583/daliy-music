"use client"
import React, { useEffect, useState } from 'react'
import { SunnyIcon } from '../Icons/Icons'

type Weather = {[key:string]:string;}

function Weather() {

    const [weatherObj, setWeatherObj] = useState<Weather>({})
    
    useEffect(() =>{
        const weatherFetchHandler =  async ( ) => {
            const WeatherFetch = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=25.056&lon=121.233&appid=b06ea3e9a3032e20ff8a1b52527883be&units=metric')
            const WeatherResponse = await WeatherFetch.json()
            console.log('WeatherResponse',WeatherResponse,WeatherResponse.main.temp,WeatherResponse.weather[0].description,WeatherResponse.weather[0].main)
            setWeatherObj( {
            temp:`${WeatherResponse.main.temp}`,
            description:`${WeatherResponse.weather[0].description}`,
            weather:`${WeatherResponse.weather[0].main}`

        })
        }
        weatherFetchHandler()
    },[])

    return (
        <div className=''>
            <div className='flex items-center justify-between'>
                    <div className='text-sm'>{weatherObj.temp}°</div>
                    <div className='grow text-center'>
                        <div>Taipei, Taiwan</div>
                    </div>
                <div className='grid place-content-center'><SunnyIcon /></div>
            </div>

        </div>
    )
}

export default Weather