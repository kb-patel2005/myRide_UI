import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import RideDetailCard from './RideDetailCard';
import axios from 'axios';

export default function Riderdashboard() {
  const [location, setLocation] = useState({});
  const navig = useNavigate();
  const selector = useSelector((state) => state.userSlice);
  const [ride, setRides] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  const pageSize = 3;
  const [flag, setFlag] = useState(false);
  const { setrides, stompClient } = useOutletContext();

  useEffect(() => {
    if (Object.keys(selector.rider).length <= 0) {
      alert("Please login as Rider to access the dashboard.");
      navig('/login');
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        while (totalPages === null || page < totalPages) {
          const res = await axios.get(
            `http://localhost:8080/rides?page=${page}&size=${pageSize}`
          );
          setRides(prev => [...prev, ...res.data.content]);
          setTotalPages(res.data.totalPages);
          page++;
        }
      } catch (err) {
        console.error('Error fetching product', err);
      }
    };

    fetchRides();
  }, []);


  return (
    <div className="p-6 mt-[7vh] max-w-4xl m-auto relative min-h-[90vh] flex flex-col gap-6">
      <div>
        <h1 className='text-purple-700 text-2xl font-extrabold'>Rider DashBoard</h1>
        <p className='text-purple-500 font-medium'>Welcome, {selector.rider.name}!</p>
      </div>

      <div className='bg-amber-100 text-[12px] font-normal text-sm absolute left-0 bottom-0 rounded-lg p-3 text-amber-400'>
        <p>for your information avoid this! </p>
        <p>
          Your current location Latitude: {(location.lat)} Longitude: {(location.lon)}
        </p>
      </div>

      {/* Uncomment when ready */}
      <div>
        <h2 className='text-purple-500 text-2xl font-medium'>Current Ride Details</h2>
        <br />
        {ride && ride.length > 0 ? (
          <ul>
            {ride.map((ride, index) => (
              <RideDetailCard
                key={index}
                ind={ride.rideId}
                id={ride.passengerId}
                name={ride.passengerName}
                location={ride.location}
                phone={ride.passengerNumber}
                distance={ride.fare}
                cost={ride.price}
                status={ride.status}
                pickuplatitude={ride.pickuplatitude}
                pickuplongitude={ride.pickuplongitude}
                destinationlatitude={ride.dropofflatitude}
                destinationlongitude={ride.dropofflongitude}
                riderlatitude={location.lat}
                riderlongitude={location.lon}
                wholeride={ride}
              />
            ))}
          </ul>
        ) : (
          <p className='text-red-300 font-extrabold text-xl'>No rides available.</p>
        )}
      </div>
    </div>
  );
}