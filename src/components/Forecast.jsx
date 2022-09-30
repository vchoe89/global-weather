import React from 'react'

function Forecast({ title, weather, iconUrlFromCode }) {
  return (
    <div>
        <div className='flex items-center justify-start mt-6'>
            <p className='text-white font-medium uppercase'>{title}</p>
        </div>
        <hr className='my-2'/>
        
        <div className='flex flex-row items-center justify-between text-white'>

            {weather.hourly.map((item) => (
                <div className='flex flex-col items-center justify-center '>
                <p className='font-light text-sm'>
                    {item.title}
                </p>
                    <img className='w-12 my-1' 
                    src={iconUrlFromCode(item.icon)} 
                    alt='' 
                    />
                    <p className='font-medium'>{Math.round(item.temp)}°</p>
            </div>
            ))}
            
        
            

        </div>
    </div>
  )
}

export default Forecast