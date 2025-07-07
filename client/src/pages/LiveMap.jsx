import React, { useEffect, useState } from 'react'
import "leaflet/dist/leaflet.css";

import socket from '../services/socket.js'
 import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


function LiveMap() {
  const [busLocations,setBusLocations] = useState([])
    useEffect(()=>{
        socket.on("locationUpdate",(data) => {
            setBusLocations(data)
        })
        return () =>{
            socket.off("locationUpdate")
        }
    },[])
  return (
    <div className='h-screen w-screen'>
        <MapContainer 
        center={[28.6139,77.2090]}
        zoom={13}
        scrollWheelZoom={true}
       className='h-full w-full'
        
        >
      <TileLayer 
      className='h-full w-full'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; OpenStreetMap contributors'
/>
{
    busLocations.map((bus) => (
        <Marker key={bus.busId} position={[bus.lat,bus.lng]}>
            <Popup>
                <b>{bus.busId}</b>
                <br />
                Lat:{bus.lat.toFixed(4)}
                <br />
                Lng : {bus.lng.toFixed(4)}
            </Popup>
        </Marker>
    ))
}
        </MapContainer>
    </div>
  )
}

export default LiveMap