import React from 'react'
import { Link } from 'react-router-dom'

function Hotels({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotels Recomendation</h2>
        <div className='grid grid-cols-2 md:grid:cols-3 lg:grid-cols-4 gap-5'>
            {trip.tripData?.hotels?.map((hotel,index)=>(
                <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName+","+hotel.hotelAddress} target='_blank'>
                <div className='hover:scale-105 transition-all cursor-pointer mt-2'>
                    <img src="/placeholder.jpg" className='rounded-xl'/>
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium text-black'>{hotel.hotelName}</h2>
                        <h2 className='text-xs text-gray-500'>📍 {hotel.hotelAddress}</h2>
                        <h2 className='text-sm font-normal text-gray-950'>💰{hotel.priceRange}</h2>
                        <h2 className='text-sm font-normal text-gray-950'>⭐{hotel.rating} stars</h2>  
                    </div>
                </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Hotels