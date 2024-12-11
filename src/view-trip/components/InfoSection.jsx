import { Button } from '@/components/ui/button'
import React from 'react';
import { FaShare } from "react-icons/fa6";

function InfoSection({trip}) {
  return (
    <div>
        <img src='/placeholder.jpg' className='h-[340px] w-full object-cover rounded-xl'></img>
        <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'>
                <h2 className='p-3 md:p-1 px-3 bg-gray-200 rounded-2xl md:rounded-full text-gray-500 text-xs md:text-md'>📅{trip?.userSelection?.numberOfDays}Day</h2>
                <h2 className='p-3 md:p-1 px-3 bg-gray-200 rounded-2xl md:rounded-full text-gray-500 text-xs md:text-md'>💰{trip?.userSelection?.budget}Budget</h2>
                <h2 className='p-3 md:p-1 px-3 bg-gray-200 rounded-2xl md:rounded-full text-gray-500 text-xs md:text-md'>🥂Number of Traveller:{trip?.userSelection?.traveller}</h2>
            </div>
        </div>
        {/* <Button><FaShare /></Button> */}
        </div>
    </div>
  )
}

export default InfoSection