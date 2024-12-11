import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='relative flex flex-col items-center mx-[17px] md:mx:56 gap-5'>
        <h1 className=' font-extrabold text-[50px] text-center mt-16'>
            <span className='text-[#f56551] text-[35px] md:text-[50px]'>Discover your next Trip with AI:</span><br></br><span className='text-[35px] md:text-[50px]'>Personalised Travel Plan at Your Fingertips</span>
        </h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
        <Link to={'/create-trip'}>
          <Button className="relative z-10 md:my-8">Get Started, It's free</Button>
        </Link>
        <img src='/landing.png' className='h-[270px] md:h-[520px]  md:-mt-20'></img>
        
        
    </div>
  )
}

export default Hero