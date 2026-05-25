import React, { useState, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"
import { useSelector } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'

export default function Bookride() {
  const [location, setLocation] = useState("")
  const [pickupLocation, setPickupLocation] = useState({ latitude: null, longitude: null })
  const [destinationLocation, setDestinationLocation] = useState({ latitude: null, longitude: null })
  const [price, setPrice] = useState(0);
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState("driving")
  const navigate = useNavigate();
  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionsRef = useRef(null)
  const user = useSelector(state => state.userSlice.user)
  const { sendMessage } = useOutletContext();

  const apiKey = "d29275b03cc2416690c59675b288e832"

  useEffect(() => {
    if (Object.keys(user).length <= 0) {
      alert("for access this page login first")
      navigate('/login')
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("rideDetails") === user.id) {
      navigate('/info', { state: { rId: localStorage.getItem("rideDetails") } })
    }
  }, [user.id]);

  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in km
  }


  const handleLocationChange = (e) => {
    setLocation(e.target.value)

    if (e.target.value.trim().length > 2) {
      fetchSuggestions(e.target.value)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const fetchSuggestions = (query) => {
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}&limit=15`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setSuggestions(data.results)
          setShowSuggestions(true)
        }
      })
      .catch((err) => console.error("Suggestion Error:", err))
  }

  const handleSuggestionClick = (suggestion) => {
    const { lat, lng } = suggestion.geometry
    setLocation(suggestion.formatted)
    setDestinationLocation({ latitude: lat, longitude: lng })
    setSuggestions([])
    setShowSuggestions(false)
    setValidated(false)
  }

  const getCurrentPosition = (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    setShowSuggestions(false)

    if (!location.trim()) {
      setError("Please enter a location")
      setLoading(false)
      return
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const userLat = position.coords.latitude
          const userLon = position.coords.longitude
          setPickupLocation({
            latitude: userLat,
            longitude: userLon
          });
          console.log("User Location - Lat:", userLat, "Lon:", userLon)

          // If destination not set from autocomplete, fetch it
          if (!destinationLocation.latitude || !destinationLocation.longitude) {
            fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(data)
                if (data.results && data.results.length > 0) {
                  console.log(data);
                  const { lat, lng } = data.results[0].geometry
                  setDestinationLocation({ latitude: lat, longitude: lng })
                  setValidated(true)
                  console.log("Destination - Lat:", lat, "Lon:", lng)
                  fetchRoute(userLat, userLon, lat, lng)
                } else {
                  setError("Location not found")
                }
                setLoading(false)
              })
              .catch((err) => {
                console.error("API Error:", err)
                setError("Error fetching location")
                setLoading(false)
              })
          } else {
            setValidated(true)
            fetchRoute(userLat, userLon, destinationLocation.latitude, destinationLocation.longitude)
            setLoading(false)
          }
        },
        (error) => {
          console.error("Geolocation Error:", error)
          setError("Unable to get your location")
          setLoading(false)
        },
        { enableHighAccuracy: true }
      )
    } else {
      setError("Geolocation is not supported by this browser")
      setLoading(false)
    }
  }

  const fetchRoute = (startLat, startLon, endLat, endLon) => {
    const url = `https://router.project-osrm.org/route/v1/${mode}/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0]
          const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]])
          setRouteCoordinates(coordinates)
          console.log("Route fetched:", coordinates)
        } else {
          setError("Could not fetch route")
        }
      })
      .catch((err) => {
        console.error("Routing Error:", err)
        setError("Error fetching route")
      })
  }

  const bookride = () => {
    
    const rideDetails = {
      driverId: "",
      driverNumber: "",
      location:location,
      passengerId: user.id,
      passengerNumber: user.phone,
      passengerName: user.name,
      driverlatitude: "",
      driverlongitude: "",
      pickuplatitude: pickupLocation.latitude,
      pickuplongitude: pickupLocation.longitude,
      dropofflatitude: destinationLocation.latitude,
      dropofflongitude: destinationLocation.longitude,
      fare: haversine(pickupLocation.latitude, pickupLocation.longitude, destinationLocation.latitude, destinationLocation.longitude),
      status:"pick ride",
      price: price.toFixed(2)
    };

    sendMessage(rideDetails);
  
  };

  return (
    <div className='flex flex-col align-middle mt-[8vh] justify-center sm:mx-auto max-w-[1080px] rounded-2xl shadow-2xl shadow-purple-400 border border-purple-500 p-4'>
      <form className='p-3 m-2' onSubmit={getCurrentPosition}>
        <h1 className='text-4xl font-bold text-purple-400 mb-5'>Ride Book</h1>
        <div className='text-slate-400 mb-3'>Enter destination location</div>

        {/* Input with Autocomplete */}
        <div className='relative mb-4'>
          <input
            type='text'
            className='w-full p-1.5 rounded-lg ring-purple-400 ring-2 outline-none focus:ring-purple-500 focus:shadow-2xl focus:shadow-purple-400'
            placeholder='Enter Location'
            value={location}
            onChange={handleLocationChange}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            required
          />

          {/* Autocomplete Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className='absolute top-full left-0 right-0 bg-white border border-purple-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg z-10'
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className='p-3 hover:bg-purple-100 cursor-pointer border-b border-gray-200 transition'
                >
                  <div className='text-sm font-semibold text-purple-600'>
                    {suggestion.formatted.split(',')[0]}
                  </div>
                  <div className='text-xs text-gray-500'>
                    {suggestion.formatted}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Transport Mode Buttons */}
        <div className='flex flex-wrap max-w-[480px] m-auto flex-row justify-between gap-2'>
          <button
            type='submit'
            onClick={() => {
              setMode("driving");
              const a = haversine(pickupLocation.latitude, pickupLocation.longitude, destinationLocation.latitude, destinationLocation.longitude);
              setPrice(10 + (a - 1) * 5);

            }}
            className='mt-5 bg-purple-400 p-1.5 sm:p-2 rounded-2xl text-white hover:bg-purple-500 transition disabled:opacity-50'
            disabled={loading}
          >
            {loading ? "Loading..." : (
              <div className='text-center'>
                <div className='text-5xl sm:text-7xl'>🚗</div>
                <br />
                <div className='font-normal sm:text-xl'>Driving</div>
              </div>
            )}
          </button>
          <button
            type='submit'
            onClick={() => {
              setMode("walking");
              setPrice(0);
            }}
            className='mt-5 bg-purple-400 p-1.5 sm:p-2 rounded-2xl text-white hover:bg-purple-500 transition disabled:opacity-50'
            disabled={loading}
          >
            {loading ? "Loading..." : (
              <div className='text-center'>
                <div className='text-3xl sm:text-7xl'>🚶</div>
                <br />
                <div className='font-normal sm:text-xl'>Walking</div>
              </div>
            )}
          </button>
          <button
            type='submit'
            onClick={() => {
              setMode("cycling");
              const a = haversine(pickupLocation.latitude, pickupLocation.longitude, destinationLocation.latitude, destinationLocation.longitude);
              setPrice(10 + (a - 1) * 5);
            }}
            className='mt-5 bg-purple-400 p-1.5 sm:p-2 rounded-2xl text-white hover:bg-purple-500 transition disabled:opacity-50'
            disabled={loading}
          >
            {loading ? "Loading..." : (
              <div className='text-center'>
                <div className='text-3xl sm:text-7xl'>🚴</div>
                <br />
                <div className='font-normal sm:text-xl'>Cycling</div>
              </div>
            )}
          </button>
        </div>

        {error && <div className='mt-4 p-3 bg-red-100 text-red-700 rounded'>{error}</div>}
      </form>

      {validated && pickupLocation.latitude && pickupLocation.longitude && destinationLocation.latitude && destinationLocation.longitude && (
        <div className='mt-5'>
          <MapContainer
            center={[pickupLocation.latitude, pickupLocation.longitude]}
            zoom={13}
            style={{ height: "500px", width: "100%", borderRadius: "12px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />

            {routeCoordinates.length > 0 && (
              <Polyline
                positions={routeCoordinates}
                color="#a855f7"
                weight={10}
                opacity={0.8}
              />
            )}

            <Marker position={[pickupLocation.latitude, pickupLocation.longitude]}>
              <Popup>📍 Your Location</Popup>
            </Marker>
            <Marker position={[destinationLocation.latitude, destinationLocation.longitude]}>
              <Popup>🎯 Destination</Popup>
            </Marker>
          </MapContainer>
          <div className='mt-4 text-center text-purple-600 font-semibold text-xl'>
            {console.log(haversine(pickupLocation.latitude, pickupLocation.longitude, destinationLocation.latitude, destinationLocation.longitude))}
            Price: ₹ {price.toFixed(2)}
          </div>
          <button className='w-full mt-4 cursor-pointer  bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition' 
            onClick={() => { 
              bookride();
              localStorage.setItem("userDetails", JSON.stringify(user));
              navigate('/info',{state:{ rId : user.id }});  
            }}>
            Book Now
          </button>
        </div>
      )}
    </div>
  )

}