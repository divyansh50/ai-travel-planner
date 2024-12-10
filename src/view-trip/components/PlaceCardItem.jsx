import { Button } from '@/components/ui/button';
import React from 'react'
import { Link } from 'react-router-dom'
function PlaceCardItem({place}) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName}>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src='/placeholder.jpg' className='w-[130px] h-[130px] rounded-xl'></img>
        <div>
            <h2 className='font-bold text-lg text-black'>{place.placeName}</h2>
            <p className='text-sm text-gray-400'>{place.placeDetails}</p>
            <h2 className='mt-2 font-normal text-md text-gray-950'>🕙{place.travelTime}</h2>
            <h2 className='mt-2 font-normal text-md text-gray-950'>🎟️{place.ticketPricing}</h2>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem