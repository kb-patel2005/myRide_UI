import React, { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate, useOutletContext } from "react-router-dom"
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useDispatch, useSelector } from "react-redux"
import { updateride } from "./Slices/userSlice"

function PassengerLocation() {
    const [routeCoordinates, setRouteCoordinates] = useState([])
    const items = [];
    const dispatch = useDispatch();
    const inputsRef = useRef({});
    const [error, setError] = useState(null)
    const [startLat, setStartLat] = useState(null)
    const [startLon, setStartLon] = useState(null)
    const [otp, setOtp] = useState("");
    const [show, setShow] = useState(false)
    const [generatedotp, setGeneratedOTP] = useState("")
    const navigate = useNavigate()
    const { state } = useLocation()
    const destinationlatitude = state.destinationlatitude;
    const destinationlongitude = state.destinationlongitude;
    const rider = useSelector(state=> state.userSlice.rider)


    const fetchRoute = async (startLat, startLon, endLat, endLon) => {
        try {
            const url = `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`
            const response = await fetch(url)
            const data = await response.json()

            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0]
                const coordinates = route.geometry.coordinates.map(coord => [
                    coord[1], // latitude
                    coord[0], // longitude
                ])
                setRouteCoordinates(coordinates)
                console.log("Route fetched:", coordinates)
            } else {
                setError("Could not fetch route")
            }
        } catch (err) {
            console.error("Routing Error:", err)
            setError("Error fetching route")
        }
    }

    const sendSMS = () => {
        let generatedOTP = Math.floor(100000 + Math.random() * 900000);

        setGeneratedOTP(generatedOTP);
        console.log(destinationlatitude, destinationlongitude)
        if (parseInt(state.phone) > 9999999999) {
            alert("Please enter a valid phone number");
            return;
        }
        setShow(true);
        window.location.href = `sms:+91${state.phone}?body=${generatedOTP}`;

    }

    for (let i = 1; i <= 6; i++) {
        items.push(<input
            key={i}
            type="text"
            name={`otp${i}`}
            maxLength="1"
            ref={(el) => (inputsRef.current[`otp${i}`] = el)}
            onChange={
                (e) => {
                    setOtp((prev) => prev + e.target.value)
                    inputsRef.current[`otp${i + 1}`]?.focus();
                }
            }
            style={{
                width: "32px",
                height: "32px",
                textAlign: "center",
                fontSize: "20px",
                border: "1px solid black",
                borderRadius: "4px"
            }}
            required
        />);
    }

    // Watch user location in real time
    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation not supported")
            return
        }
        console.log(state)

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setStartLat(latitude)
                setStartLon(longitude)
            },
            (err) => {
                console.error("Geolocation error:", err)
                setError("Unable to get location")
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
        )

        return () => navigator.geolocation.clearWatch(watchId)
    }, [])

    // Fetch route whenever start location changes
    useEffect(() => {
        if (startLat && startLon && state?.destinationlatitude && state?.destinationlongitude) {
            console.log("Fetching route from", startLat, startLon, "to", state.pickuplatitude, state.pickuplongitude)
            fetchRoute(startLat, startLon, state.pickuplatitude, state.pickuplongitude)
        }
    }, [startLat, startLon, state?.pickuplatitude, state?.pickuplongitude])

    return (
        <div className="mt-20">
            <h2 className="text-center text-2xl font-bold text-purple-700 w-full">Real-Time Track Passenger Location</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {routeCoordinates.length > 0 ? (<>
                <MapContainer
                    center={[startLat || 0, startLon || 0]}
                    zoom={13}
                    style={{ height: "500px", width: "80%", minWidth: "300px", margin: "0 auto", marginTop: "20px", borderRadius: "10px", border: "1px solid #ccc", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", zIndex: "-5" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Polyline positions={routeCoordinates} color="blue" />
                    {startLat && startLon && (
                        <Marker position={[startLat, startLon]}>
                            <Popup>Start</Popup>
                        </Marker>
                    )}
                    {state?.pickuplatitude && state?.pickuplongitude && (
                        <Marker position={[state.pickuplatitude, state.pickuplongitude]}>
                            <Popup>Destination</Popup>
                        </Marker>
                    )}
                </MapContainer>
                <button className="px-4 py-1.5 my-2 mx-auto w-[80%] align-middle block rounded bg-green-500 text-white font-bold"
                    onClick={() => {
                        sendSMS();
                        setShow(true);
                    }}
                >Pickup</button>
                <div>
                    {show ?
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault()
                                if (generatedotp == otp) {
                                    await dispatch(updateride({...state.wholeride, status: 'tackle',driverId:rider.id, driverNumber:rider.phone, driverlatitude:state.riderlatitude, driverlongitude:state.riderlongitude}))
                                    localStorage.setItem("rideDetails", JSON.stringify(state.wholeride));
                                    navigate('/passengerdestination', { state: { destinationlatitude: state.destinationlatitude, destinationlongitude: state.destinationlongitude, wholeride: state.wholeride.passengerId } });
                                } else {
                                    alert('wrong otp');
                                }
                            }}
                            className='max-w-[600px] mx-auto my-6 p-6 bg-white bg-opacity-6 backdrop-blur-sm rounded-2xl border border-purple-600 shadow-purple-500 shadow-xl'>
                            <h2 className='text-4xl font-bold text-shadow-purple-400 text-purple-400 mb-5 text-center'>Enter OTP</h2>
                            <div style={{ display: "flex", gap: "8px", height: "40px", marginBottom: "10px", justifyContent: "center" }}>
                                {items}
                            </div>

                            <input
                                type='submit'
                                value='Register'
                                className='w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition'
                            />
                        </form>
                        : ""}
                </div>
            </>
            ) : (
                <p>Fetching route...</p>
            )}

        </div>
    )
}

export default PassengerLocation