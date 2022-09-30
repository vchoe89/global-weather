import React from 'react';
import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
  } from "@iconscout/react-unicons";

function TemperatureAndDetails({weather, formatToLocalTime, iconUrlFromCode }) {

  return (
    <div>
        <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
            <p>{weather.details}</p>
        </div>

        <div className='flex flex-row items-center justify-between text-white py-3'>
            <img 
            className='w-20' 
            src={iconUrlFromCode(weather.icon)} 
            alt=''
            />
            <p className='text-5xl'>{Math.round(weather.temp)}°</p>

        <div className='flex flex-col space-y-2'>

            <div className='flex font-light text-sm items-center justify-center'>
                <UilTemperature className="mr-1" size={18} />
                     Really feels like:
                    <span className='font-medium-1 ml-1'>{Math.round(weather.feels_like)}°</span>
            </div>
            <div className='flex font-light text-sm items-center justify-center'>
                <UilTear className="mr-1" size={18} />
                     Humidity:
                    <span className='font-medium-1 ml-1'>{weather.humidity}%</span>
            </div>
            <div className='flex font-light text-sm items-center justify-center'>
                <UilWind className="mr-1" size={18} />
                     Wind Speed:
                    <span className='font-medium-1 ml-1'>{Math.round(weather.speed)} km/h</span>
            </div>
            



        </div>
        </div>


        <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-3'>

            <UilSun />
            <p className='font-light'>
                Rise:
                <span className='font-medium ml-1'>
                    {formatToLocalTime(weather.sunrise, weather.timezone, "hh:mm a")}
                </span>
                </p>
            <p className='font-light'>|</p>

            <UilSun />
            <p className='font-light'>
                Set:
                <span className='font-medium ml-1'>
                    {formatToLocalTime(weather.sunset, weather.timezone, "hh:mm a")}
                </span>
                </p>
            <p className='font-light'>|</p>
            <UilSun />

            <p className='font-light'>
                High:
                <span className='font-medium ml-1'>
                    {Math.round(weather.temp_max)}°
                </span>
            </p>
            <p className='font-light'>|</p>
            <UilSun />

            <p className='font-light'>
                Low:
                <span className='font-medium ml-1'>
                    {Math.round(weather.temp_min)}°
                </span>
            </p>
        </div>
    </div>
  )
}

export default TemperatureAndDetails