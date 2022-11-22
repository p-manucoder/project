import React, { useRef, useState, useEffect } from "react";

import { googleAPIKey } from "./../apiKeys";
import Select from "react-select";
import citiesData from "../googleMapData/cities.json";
import statesData from "../googleMapData/states.json";
import { useDebounce } from "use-debounce";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvent,
  Popup,
  useMap,
} from "react-leaflet";
import { Link, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import * as L from "leaflet";
// import "leaflet-defaulticon-compatibility" ;
import { getRequest } from "../serviceCalls";
import axios from "axios";
import MapInfoBox from "./MapInfoBox";

function GlobalMap() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("khojUserToken");
    if (!token) navigate("/");
  }, []);
  const [selectedLocation, setSelectedLocation] = useState({
    position: { lat: 28.6139, lon: 77.209 },
  });
  const mapCenter = { lat: 28.6139, lng: 77.209 };
  const getLocation = async () => {};
  const [posts, setPosts] = useState([]);
  useEffect(async () => {
    await getRequest("/post/get-posts").then((res) => setPosts(res.posts));
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <div className="map-div global-map h-75 p-2 ">
        <MapContainer center={mapCenter} zoom={8}>
          <TileLayer
            url={
              "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=jtKxuV2yucQdFLCbYPcb"
            }
            attribution={
              '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            }
          />
          {posts.length > 0 &&
            posts?.map((post) => (
              <Marker
                position={[post?.location?.lat, post?.location?.lng]}
                key={Math.random(0, 235) + Math.random(0, 235) + " "}
                icon={
                  new Icon({
                    iconUrl: markerIconPng,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                  })
                }
              >
                <Popup>
                  <MapInfoBox post={post} />{" "}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default GlobalMap;
