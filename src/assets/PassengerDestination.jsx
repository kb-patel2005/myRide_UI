import React, { useState, useEffect } from 'react'
import { useLocation, useOutletContext } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet"
import Chat from './Chat';
import "leaflet/dist/leaflet.css"

export default function PassengerDestination() {

    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [startLat, setStartLat] = useState(null);
    const [startLon, setStartLon] = useState(null);
    const [isFetch, setIsFetch] = useState(false);
    const { state } = useLocation();
    const destinationlatitude = state.destinationlatitude;
    const destinationlongitude = state.destinationlongitude;
    const { stompClient, connected } = useOutletContext();
    const [msg, setMsg] = useState([]);
    const [input, setInput] = useState({
        name: "rider",
        msg: ""
    });
    const [toggleChat, setToggleChat] = useState("0");

    const fetchRoute = (startLat, startLon, endLat, endLon) => {
        const url = `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.routes && data.routes.length > 0) {
                    const route = data.routes[0]
                    const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]])
                    console.log(route, coordinates)
                    setRouteCoordinates(coordinates)
                } else {
                    setError("Could not fetch route")
                }
            })
            .catch((err) => {
                console.error("Routing Error:", err)
                setError("Error fetching route")
            })
    }

    useEffect(() => {
        if (!stompClient || !connected || !state?.rId) return;

        const subscription = stompClient.subscribe(
            `/topic/rider/${state.rId}`,
            (ridemsg) => {
                const receivedride = JSON.parse(ridemsg.body);
                setMsg((prev) => [...prev, receivedride]);
            }
        );

        return () => subscription.unsubscribe();
    }, [stompClient, connected, state?.rId]);

    useEffect(() => {

        stompClient.subscribe(`/topic/rider/${state.wholeride}`, (ridemsg) => {
            console.log(ridemsg)
            const receivedride = JSON.parse(ridemsg.body);
            setMsg((prev) => [...prev, receivedride]);
        });

        if (!navigator.geolocation) {
            setError("Geolocation not supported")
            return
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setStartLat(latitude)
                setStartLon(longitude)
                setIsFetch(true)
            },
            (err) => {
                console.error("Geolocation error:", err)
                setError("Unable to get location")
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
        )

        return () => navigator.geolocation.clearWatch(watchId)
    }, [])

    useEffect(() => {
        if (startLat && startLon && destinationlatitude && destinationlongitude) {
            console.log(destinationlatitude, destinationlongitude);
            fetchRoute(startLat, startLon, destinationlatitude, destinationlongitude)
        }
    }, [startLat, startLon, destinationlatitude, destinationlongitude])

    const sendMessage = (rideDetails) => {
        console.log(stompClient);
        if (stompClient && stompClient.connected) {
            return stompClient.send(`/app/${state.wholeride}/sendride`, {}, JSON.stringify(rideDetails));
        } else {
            alert("WebSocket not connected yet");
        }
    };

    return (
        <div className='mt-[10vh] relative max-w-[1000px] min-w-[300px] mx-auto bg-gray-200 bg-opacity-20 backdrop-blur-sm rounded-lg shadow-md p-4'>

            <button className='bg-purple-700 text-white px-5 py-2 cursor-pointer' onClick={()=>setToggleChat("0")}>Chat with passenger</button>
            {isFetch ? (
                <MapContainer
                    center={[startLat, startLon]}
                    zoom={10}
                    style={{ height: "500px", width: "80%", minWidth: "300px", margin: "0 auto", marginTop: "20px", borderRadius: "10px", border: "1px solid #ccc", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",zIndex: 2 }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {routeCoordinates.length > 0 && (
                        <Polyline positions={routeCoordinates} color="blue" />
                    )}

                    {startLat && startLon && (
                        <Marker position={[startLat, startLon]}>
                            <Popup>Start</Popup>
                        </Marker>
                    )}
                    {destinationlatitude && destinationlongitude && (
                        <Marker position={[parseFloat(destinationlatitude), parseFloat(destinationlongitude)]}>
                            <Popup>Destination</Popup>
                        </Marker>
                    )}
                </MapContainer>) : ""}


            <div 
            className={`absolute z-50 w-[100%] top-0 left-[${toggleChat}] bg-opacity-20 backdrop-blur-sm rounded-lg shadow-md`}
            style={{ transition: "left 0.3s ease-in-out", left: toggleChat }}>
                <button className='bg-purple-400 px-5 text-white py-3 cursor-pointer' onClick={() => setToggleChat("-100vw")}>Close Chat</button>
                <div className='m-2.5 w-[90%] flex flex-col max-w-[600px] max-h-[70vh] overflow-y-auto mt-4 p-2 border border-gray-300 rounded-lg shadow-md mx-auto'>
                    {
                        msg.map((e, i) => (
                            <Chat
                                key={i}
                                align={e.name === "rider" ? "right" : "left"}
                                name={e.name}
                                msg={e.msg}
                            />
                        ))
                    }
                </div>
                {connected && (
                    <>
                    
                    < div className='mt-2 w-[80%] min-w-[300px] max-w-[600px] mx-auto flex gap-2' >
                        <input type='text'
                        value={input.msg}
                            className='p-1 border border-gray-300 rounded w-full'
                            placeholder='enter msg for cabe driver'
                            onChange={(e) => setInput({ ...input, msg: e.target.value })} />
                        <button
                            className='p-1 bg-purple-300 text-slate-900'
                            onClick={() => {
                                sendMessage(input);
                                setInput({ ...input, msg: "" });
                            }}
                        >Send</button>
                    </div>
                    </>)}
            </div>
        </div>
    )
}
