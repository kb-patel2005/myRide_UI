import React, { useEffect } from 'react'
import './Home.css'
import { useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setRider, setUser } from '../Slices/userSlice.jsx'
import { useOutletContext } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {stompClient, connected} = useOutletContext();

  useEffect(() => {
    try {
      if (localStorage.getItem("rideDetails")) {
        if (!stompClient || !connected) {
          alert("WebSocket is not connected");

        }
        const rideDetails = JSON.parse(localStorage.getItem("rideDetails"));
        dispatch(setRider(rideDetails));
        
        navigate('/passengerdestination', { 

          state: { 
            destinationlatitude: rideDetails.destinationlatitude, 
            destinationlongitude: rideDetails.destinationlongitude, 
            wholeride: rideDetails.passengerId 
          } 
        });
      } else if (localStorage.getItem("userDetails")) {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        dispatch(setUser(userDetails));
        navigate('/info', { state: { rId: userDetails.id } });
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      localStorage.removeItem("rideDetails");
      localStorage.removeItem("userDetails");
    }
  }, []);



  return (
    <div className='mt-[7vh] flex items-center justify-center' style={{ width: "revert" }}>
      <div className='max-w-5xl w-full'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-[32px] sm:text-5xl font-bold text-purple-500 mb-4 py-4'>Welcome to enjoyRide</h1>
          <p className='text-lg text-purple-500'>Your trusted taxi service for safe and comfortable travel</p>
        </div>

        {/* Features Grid */}
        <div className='grid sm:grid-cols-2 gap-8 justify-center mb-16'>
          <div className='bg-opacity-10 backdrop-blur-sm border border-purple-200 border-opacity-20 rounded-lg p-8 text-center shadow-lg hover:shadow-purple-300 hover:-translate-y-3 transition-all duration-300'>
            <div className='text-5xl mb-4'>🚗</div>
            <h3 className='text-xl font-bold text-purple-500 mb-2'>Easy Booking</h3>
            <p className='text-purple-900 text-sm'>Book your ride in just a few taps</p>
          </div>

          <div className='bg-opacity-10 backdrop-blur-sm border border-purple-200 border-opacity-20 rounded-lg p-8 text-center shadow-lg hover:shadow-purple-300 hover:-translate-y-3 transition-all duration-300'>
            <div className='text-5xl mb-4'>⭐</div>
            <h3 className='text-xl font-bold text-purple-500 mb-2'>Professional Drivers</h3>
            <p className='text-purple-900 text-sm'>Experienced and verified drivers</p>
          </div>

          <div className='bg-opacity-10 backdrop-blur-sm border border-purple-200 border-opacity-20 rounded-lg p-8 text-center shadow-lg hover:shadow-purple-300 hover:-translate-y-3 transition-all duration-300'>
            <div className='text-5xl mb-4'>💰</div>
            <h3 className='text-xl font-bold text-purple-500 mb-2'>Best Prices</h3>
            <p className='text-purple-900 text-sm'>Affordable rates with no hidden charges</p>
          </div>

          <div className='bg-opacity-10 backdrop-blur-sm border border-purple-200 border-opacity-20 rounded-lg p-8 text-center shadow-lg hover:shadow-purple-300 hover:-translate-y-3 transition-all duration-300'>
            <div className='text-5xl mb-4'>🛡️</div>
            <p className='text-xl font-bold text-purple-500 mb-2'>Safe & Secure</p>
            <p className='text-puple-900 text-sm'>Your safety is our priority</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className='bg-transparent bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center border shadow-[0_10px_25px_rgba(168,85,247,0.3)] border-purple-500 border-opacity-20'>
          <h2 className='text-4xl font-bold text-purple-500 mb-3'>Ready to ride?</h2>
          <p className='text-purple-900 mb-8 text-[14px] sm:text-lg'>Download our app or book online</p>
          <button className='bg-purple-400 text-white font-bold py-3 px-12 rounded-lg hover:scale-110 hover:shadow-xl transition-all duration-300'>
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}
