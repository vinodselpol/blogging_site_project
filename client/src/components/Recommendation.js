import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { LocationMarkerIcon } from '@heroicons/react/solid'; // For the user location
import { LocationMarkerIcon as LocationMarkerOutlineIcon } from '@heroicons/react/outline'; // For random markers

function Recommendation() {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [randomMarkers, setRandomMarkers] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            const basePosition = [position.coords.latitude, position.coords.longitude];
            setCurrentPosition(basePosition);
            setRandomMarkers(generateRandomMarkers(basePosition, 9));
        });
    }, []);

    const generateRandomMarkers = (basePosition, count) => {
        const markers = [];
        for (let i = 0; i < count; i++) {
            markers.push({
                lat: basePosition[0] + (Math.random() - 0.5) * 0.1,
                lng: basePosition[1] + (Math.random() - 0.5) * 0.1
            });
        }
        return markers;
    };

    const createSvgIcon = (path, color) => {
        const svgIcon = new L.DivIcon({
            html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}">${path}</svg>`,
            iconSize: [30, 42],
            iconAnchor: [15, 21],
            popupAnchor: [0, -21],
            className: ''
        });
        return svgIcon;
    };

    // Heroicon SVG path
    const heroiconPath = `
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    `;

    const userMarkerIcon = createSvgIcon(heroiconPath, 'green');
    const randomMarkerIcon = createSvgIcon(heroiconPath, 'blue');

    return (
        <MapContainer center={currentPosition || [51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {currentPosition && (
                <Marker position={currentPosition} icon={userMarkerIcon}>
                    <Popup>You are here!</Popup>
                </Marker>
            )}
            {randomMarkers.map((marker, index) => (
                <Marker key={index} position={[marker.lat, marker.lng]} icon={randomMarkerIcon}>
                    <Popup>Random Point {index + 1}</Popup>
                </Marker>
            ))}
            {currentPosition && <ChangeView center={currentPosition} zoom={13} />}
        </MapContainer>
    );
}

const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
};

export default Recommendation