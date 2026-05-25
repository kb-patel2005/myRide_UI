import React, { useState } from "react";
import { findDistance } from "./Slices/websocketfuction";
import { useNavigate } from "react-router-dom";

export default function RideDetailCard({ id, status,phone, distance, cost, location, address, riderlatitude, riderlongitude, pickuplatitude, pickuplongitude, destinationlatitude, ind, destinationlongitude, name, wholeride }) {

  const navigate = useNavigate();


  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-purple-200 border-opacity-20 rounded-lg mb-4 shadow-md">
      <div className="flex flex-row flex-wrap py-4 px-2 gap-4 bg-opacity-10 bg-purple-100 w-full justify-around items-center rounded-lg">

        {/* User Section */}
        <div className="flex flex-col gap-2">
          <p className="flex text-purple-800">
            <span className="text-sm font-bold text-purple-700">Name : </span>
            <span className="text-sm font-bold text-purple-400">{name}</span>
          </p>
          <p className="flex text-purple-800">
            <span className="text-sm font-bold text-purple-700">Phone : </span>
            <span className="text-sm font-bold text-purple-400">{phone}</span>
          </p>
          <p className="flex text-purple-800">
            <span className="text-sm font-bold text-purple-700">Distance : </span>
            <span className="text-sm font-bold text-purple-400">{parseFloat(distance).toFixed(2)} km</span>
          </p>
          <p className="flex text-purple-800">
            <span className="text-sm font-bold text-purple-700">Earn : </span>
            <span className="text-sm font-bold text-purple-400">{cost}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row flex-wrap justify-center gap-4">
            <div className="flex max-w-fit items-baseline w-full gap-2 justify-center">
              {/* Rider Emoji */}
              <div className="flex flex-col items-center max-w-[500px]">
                <span className="text-2xl">🚴</span>
                <span className="mt-1 text-[10px] font-bold text-gray-700">Rider</span>
              </div>

              {/* Connecting Line */}
              <div className="text-center font-bold">
                <p className="text-[10px]">{(findDistance(riderlatitude, riderlongitude, pickuplatitude, pickuplongitude)).toFixed(2)}</p>
                <p className="text-[8px]">km</p>
                <p className="border border-[1px] border-dashed border-gray-400"></p>
              </div>
              {/* Passenger Emoji */}
              <div className="flex flex-col items-center">
                <span className="text-2xl">🧍</span>
                <span className="mt-1 text-[10px] font-bold text-gray-700">Pickup</span>
              </div>
            </div>
            <div className="flex max-w-fit items-baseline w-full gap-2 justify-center">
              <div className="flex flex-col items-center">
                <span className="text-2xl">🧍</span>
                <span className="mt-1 text-[10px] font-bold text-gray-700">Pickup</span>
              </div>
              <div className="text-center font-bold">
                <p className="text-[10px]">{(findDistance(pickuplatitude, pickuplongitude, destinationlatitude, destinationlongitude)).toFixed(2)}</p>
                <p className="text-[8px]">km</p>
                <p className="border border-[1px] border-dashed border-gray-400"></p>
              </div>
              {/* Passenger Emoji */}
              <div className="flex flex-col items-center">
                <span className="text-2xl">📍</span>
                <span className="mt-1 text-[10px] font-bold text-gray-700">destination</span>
              </div>
            </div>
          </div>
          <p>{location}</p>
          
          <div>
            { status != 'tackle' ? (
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-4 rounded"
              onClick={() => {
                navigate('/loactiondashboard', { state: { pickuplatitude, pickuplongitude, destinationlatitude, destinationlongitude,riderlatitude,riderlongitude, phone, ind, wholeride } })
              }}>
              pick up
            </button>
            ):(<><p className="font-bold text-red-300">already tackle by other rider</p></>)}
          </div>
        </div>
      </div>

    </div>
  );
}
