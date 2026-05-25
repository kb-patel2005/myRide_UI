import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export function connect(a) {
    const client = new Client({
        webSocketFactory: () => new SockJS("http://localhost:8080/ride"),
        onConnect: () => {
            console.log("Connected to WebSocket server");
            client.subscribe("/topic/rider", (msg) => {
                console.log("Received message:", msg.body);
            });
        },
    });
    a = client;
    a.activate();
}

export function sendMessage(rideDetails,a) {
    if (a && a.connected) {
        a.publish({
            destination: "/app/sendride",
            body: JSON.stringify(rideDetails),
        });
    }
}

export const findDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}
      