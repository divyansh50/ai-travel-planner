import { db } from '@/service/firebaseConfig';
import { collection,getDocs,query,where} from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
  const [userTrips,setUserTrips]=useState([]);
  const navigate= useNavigate();
  useEffect(()=>{
    getUserTrips();
  },[])
  

  const getUserTrips=async()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    
    if(!user){
      navigate('/');
      return;
    }
    setUserTrips([]);
    const q = query(collection(db,'AiTrips'),where('userEmail','==',user?.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    setUserTrips(prevVal=>[...prevVal,doc.data()])
    // console.log(userTrips);
    });
  }
  return (
    <div className='sm:px-10 md:px-32 lg-px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>My Trips</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 mt-10 gap-5'>
        {userTrips.length>0?userTrips.map((trip,index)=>(
           <UserTripCardItem trip={trip} key={index}/>
        ))
        :[1,2,3,4,5,6].map((item,index)=>(
          <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl gap-5'>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyTrips