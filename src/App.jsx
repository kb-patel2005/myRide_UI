import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './assets/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

let stompClient = null;

function App() {
  const [rides, setrides] = useState([]);
  const [connected, setConnected] = useState(false);


  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ride");
    stompClient = over(socket);
    // Connect and subscribe only after connection is ready
    stompClient.connect({}, () => {
      setConnected(true);
      stompClient.subscribe("/topic/rider", (ride) => {
        const receivedride = JSON.parse(ride.body);
        setrides((prev) => [...prev, receivedride]);
      });
    },
      (error) => { console.error("WebSocket connection error:", error) });
  }, []);

  const sendMessage = (rideDetails) => {
    if (stompClient && connected) {
      stompClient.send("/app/sendride", {}, JSON.stringify(rideDetails));
    } else {
      alert("WebSocket not connected yet");
    }
  };

  return (
    <>
      <Navbar />
      <Outlet context={{ rides, setrides, sendMessage, stompClient, connected }} />
    </>
  );
}

export default App;