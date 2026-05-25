import React, { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import Chat from "./Chat";

export default function ReleaseRide() {
  const { state } = useLocation();
  const { stompClient, connected } = useOutletContext();

  const [msg, setMsg] = useState([]);
  const [input, setInput] = useState({ name: "passenger", msg: "" });

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


  const sendMessage = (ridemsg) => {
    if (connected) {
      stompClient.send(
        `/app/${state.rId}/sendride`,
        {},
        JSON.stringify(ridemsg)
      );
    } else {
      alert("WebSocket not connected");
    }
  };

  return (
    <div className="mt-[8vh] w-[80%] max-w-[1000px] min-w-[300px] mx-auto bg-gray-200 bg-opacity-20 backdrop-blur-sm rounded-lg shadow-md">
      <div className='flex flex-col max-h-[85vh] overflow-y-auto mt-4 p-2 border border-gray-300 rounded-lg shadow-md mx-auto'>
        {
          msg.map((e, i) => (
            <Chat
              key={i}
              align={e.name === "passenger" ? "right" : "left"}
              name={e.name}
              msg={e.msg}
            />
          ))
        }
      </div>

      {connected && (
        <div className="mt-[1vh] flex gap-2">
          <input
            type="text"
            className="p-1 border border-gray-300 rounded w-full"
            placeholder="enter msg for cab driver"
            value={input.msg}
            name="msg"
            onChange={(e) => setInput({ ...input, msg: e.target.value })}
          />
          <button
            className="p-1 bg-purple-300 px-3 border border-2 border-purple-400 text-slate-900 rounded"
            onClick={() => {
              sendMessage(input)
              setInput({ ...input, msg: "" });
            }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}