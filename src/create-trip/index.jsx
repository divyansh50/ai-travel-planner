import React, { useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {AI_PROMPT, SelectBudgetOptions,SelectTravelesList} from '../constants/options'
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
import { chatSession } from '@/service/AIModal';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

//Google place auto complete
//google cloud for api key
function CreateTrip() {
  const [place,setPlace]= useState();
  const [formData,setFormData]= useState([]);
  const [openDialog, setOpenDialog]=useState(false);
  const [loading,setLoading]= useState(false);
  const [formDataFilled,setFormDataFilled]=useState(false);

  const navigate = useNavigate();

  const handleInputChange =(name,value)=>{
    setFormData ({
      ...formData,
      [name]:value
    })
  }

  useEffect(()=>{
    console.log("***Form Data***",formData);
    if(formData.length === 0){
      setFormDataFilled(true);
      return;
    }
    
    else{
    if(!formData?.location || !formData?.numberOfDays || !formData?.budget || !formData?.traveller){
      setFormDataFilled(true);
      return;
    }}
    setFormDataFilled(false);
    // console.log(formDataFilled);
  },[formData])

  const login = useGoogleLogin({
    onSuccess:(response)=>getUserProfile(response),
    onError:(error)=>console.log(error)
  })

  const getUserProfile= (tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDialog(false);
      generateTrip();
    })
  }
  const  generateTrip= async()=>{

    const user = localStorage.getItem('user');
    
    if(!formData?.location || !formData.numberOfDays || !formData.budget || !formData.traveller){
      toast("Please Fill all the details")
    }
    if(formData?.numberOfDays>5){
      toast("Days should be less than 5")
    }
    if(!user){
      setOpenDialog(true);
      return;
    }
    setLoading(true);
    
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}',formData?.location?.label)
    .replace('{numberOfDays}',formData.numberOfDays)
    .replace('{traveller}',formData.traveller)
    .replace('{budget}',formData.budget)
    .replace('{numberOfDays}',formData.numberOfDays)
    // console.log("Final Prompt", FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    // console.log(result?.response?.text());
    setLoading(false);
    saveAiTrip(result?.response?.text());//save to db firebase
    
  }

  const saveAiTrip=async (tripData)=>{

    setLoading(true);
    const user= JSON.parse(localStorage.getItem('user'));
    const docId=  Date.now().toString();
    //docId should be unique
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user.email,
      id:docId
    });
    setLoading(false);
    navigate('/view-trip/'+docId);
  }
  
  return (
    <div className='sm:px-12 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl flex'>Tell us your travel preferences 🚇🧳</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-10 md:mt-15 flex flex-col gap-9'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          selectProps={{
          place, onChange:(v)=>{setPlace(v);handleInputChange('location',v)}
          }}/>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'Ex.3'} type="number"
          onChange={(e)=>handleInputChange('numberOfDays',e.target.value)}/>
        </div>

        <div>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item,index)=>(
            <div key={index}
            onClick={()=>handleInputChange('budget',item.title)}
            className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title&& 'shadow-lg border-black'}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
          </div>
        </div>

        <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item,index)=>(
            <div key={index}
            onClick={()=>handleInputChange('traveller',item.people)} 
            className={`p-4 pr-2 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveller == item.people&& 'shadow-lg border-black'}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
          </div>
        </div>

        <div className='my-10 justify-center md:justify-end flex'>
          <Button onClick = {generateTrip} disabled={loading || formDataFilled} className='w-full md:w-auto'>
          {loading?
          <div>
            {formDataFilled?'Generate Trip'
            :<div><AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />Please wait
            </div>}
          </div>
          :'Generate Trip'}
          </Button>
        </div>
        
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
            <DialogTitle></DialogTitle>
              <DialogDescription>
                <img src="/logo.svg"></img>
                <h2 className='font-bold text-lg mt-7'>Sign in with Google</h2>
                <p>Sign in to the app with Google Authentication securely</p>
                <Button onClick= {login}
                  className='w-full mt-5 flex gap-4 items-center'> 
                    <FcGoogle className='h-7 w-7'/>Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  )
}

export default CreateTrip