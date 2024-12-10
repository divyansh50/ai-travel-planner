import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Header() {
  const [openDialog, setOpenDialog]=useState(false);
  const users=JSON.parse(localStorage.getItem('user'));
  const login = useGoogleLogin({
    onSuccess:(response)=>getUserProfile(response),
    onError:(error)=>console.log(error)
  });

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
      window.location.reload();
    })
  }
;
  useEffect(()=>{
    console.log(users);
  },[])

  const openDialogTrue=()=>{
    setOpenDialog(true);
  }
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
        <img src='/logo.svg'></img>
        <div>
          {users?
          <div className='flex items-center gap-3'>
            <a href="/create-trip">
            <Button variant="outline" className='rounded-full text-black'>+ Create Trip</Button>
            </a>
            <a href="/my-trips">
            <Button variant="outline" className='rounded-full text-black'>My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={users?.picture} className='h-[35px] w-[35px] rounded-full '></img>
              </PopoverTrigger>
              <PopoverContent>
                <a href='/'>
                <h2  className='cursor-pointer text-black'onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  // window.location.reload();
                }}>Logout</h2>
                </a>
              </PopoverContent>
            </Popover>

          </div>
            :<Button onClick={openDialogTrue}>Sign in</Button>
          }
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
  )
}

export default Header