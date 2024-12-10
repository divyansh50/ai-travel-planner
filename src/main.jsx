import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import ViewTrip from './view-trip/[tripId]/index'
import MyTrips from './my-trips/index'


const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>
  },
  {
    path: '/create-trip',
    element: <CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element: <ViewTrip></ViewTrip>
  },
  {
    path:'/my-trips',
    element: <MyTrips></MyTrips>
  }
])

createRoot(document.getElementById('root')).render(
  
    <GoogleOAuthProvider clientId= {import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster/>
    <RouterProvider router = {router}/>
    </GoogleOAuthProvider>
)
