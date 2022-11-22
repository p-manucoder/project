import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
const GoogleMaps2 = () => {
  var myIcon = L.icon({
    iconUrl: "/images/marker-icon.png",
    iconSize: [28, 40],
    // iconAnchor: [124, 32],
    // popupAnchor: [-3, -76],
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94],
  });

  const mapRef = useRef(null);
  function MyComponent({ setMapCenter }) {
    const mapEvents = useMapEvents({
      zoomend: () => {},
      click: () => {
        setMapCenter([
          mapRef.current._lastCenter.lat,
          mapRef.current._lastCenter.lng,
        ]);
      },
    });

    // setZoomLevel2(zoomLevel);

    return null;
  }
  const [mapCenter, setMapCenter] = useState([28.55616, 77.100281]);
  useEffect(() => {}, [mapCenter]);
  function ChangeView() {
    const map = useMap();
    map.flyTo(mapCenter);
    // map.setView(mapCenter, 8);
    return null;
  }
  return (
    <div>
      {" "}
      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={8}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        zoomAnimation
        fadeAnimation
      >
        <MyComponent setMapCenter={setMapCenter} />
        <ChangeView />
        <TileLayer
          url={
            "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=jtKxuV2yucQdFLCbYPcb"
          }
          attribution={
            '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          }
        />
        <Marker position={mapCenter}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>{" "}
      </MapContainer>
      {/* <button onClick={(e) => getZoom()}>Check</button> */}
    </div>
  );
};

export default GoogleMaps2;
