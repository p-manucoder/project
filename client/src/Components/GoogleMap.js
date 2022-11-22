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
import * as L from "leaflet";
import { getRequest } from "../serviceCalls";
import axios from "axios";
import MapInfoBox from "./MapInfoBox";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

function GoogleMapContainer({ setFormData, formData }) {
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 2000);

  useEffect(() => {
    getLocation();
    setShowSuggestions(true);
  }, [value]);
  const setMapDataIntoForm = () => {
    // location = {lat,lng, address}
    // state
    // city
    let location = {
      lat: selectedLocation.position.lat,
      lng: selectedLocation.position.lon,
      address: selectedLocation.address.freeformAddress,
    };
    let state = selectedLocation.address.countrySubdivision;
    let city = selectedLocation.address.countrySecondarySubdivision;
    let tempData = formData;
    formData["city"] = city;
    formData["state"] = state;
    formData["location"] = location;
    setFormData(tempData);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("khojUserToken");
    if (!token) navigate("/");
  }, []);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const mapCenter = { lat: 28.6139, lng: 77.209 };
  const mapRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    position: { lat: 28.6139, lon: 77.209 },
  });
  const getLocation = async () => {
    const { data } = await axios.get(
      `https://api.tomtom.com/search/2/geocode/${value}.json?key=KFKaMj6LJEBdv3AR7M7em8Cu2P4BFVSa&limit=5`
    );
    setSearchResults(data?.results);
  };
  const [map, setMap] = useState(null);
  useEffect(() => {
    // mapRef.current.s
    if (map)
      map.flyTo(
        [
          parseFloat(selectedLocation.position.lat),
          parseFloat(selectedLocation.position.lon),
        ],
        12
      );
  }, [selectedLocation]);

  return (
    <div
      style={{
        position: "relative",
        maxHeight: "75vh",
        overflow: "hidden",
        width: "97vw",
      }}
      className="px-2"
    >
      <div className="map-search-box">
        <div>
          <div className="d-flex gap-3">
            <input
              onChange={(e) => setText(e.target.value)}
              className="map-searchInput  width-px"
            />
          </div>
          {text && showSuggestions && (
            <div className="search-suggestion-box width-px">
              <ul>
                {searchResults.map((result) => (
                  <div
                    style={{
                      borderBottom: "2px solid black",
                      marginLeft: "-25px",
                      padding: "5px",
                    }}
                    className="control-overflow"
                    role="button"
                    onClick={() => {
                      setSelectedLocation(result);
                      setShowSuggestions(false);
                    }}
                  >
                    {result.address?.freeformAddress}
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          {/* <Link to="/create-post"> */}
          <button
            className="btn btn-primary"
            onClick={(e) => setMapDataIntoForm()}
          >
            Select
          </button>
          {/* </Link> */}
        </div>
      </div>
      <div className="map-div w-100">
        <MapContainer
          center={mapCenter}
          zoom={8}
          ref={mapRef}
          whenCreated={setMap}
        >
          <TileLayer
            url={
              "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=jtKxuV2yucQdFLCbYPcb"
            }
            attribution={
              '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            }
          />
          {selectedLocation && (
            <Marker
              position={[
                selectedLocation.position.lat,
                selectedLocation.position.lon,
              ]}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              {/* <Popup><MapInfoBox /></Popup> */}
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default GoogleMapContainer;
