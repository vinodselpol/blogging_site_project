import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Recommendation() {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [eventsData, setEventsData] = useState({ musical_events: [], sport_events: [], restaurants: [] });
    const navigate = useNavigate(); // Use useNavigate hook

    useEffect(() => {
        // Fetch data from /getlatlong endpoint
        fetch('http://localhost:8000/api/agent/getlatlong')
            .then(response => response.json())
            .then(data => {
                setEventsData(data);
                // Set current position if available
                navigator.geolocation.getCurrentPosition(function(position) {
                    const basePosition = [position.coords.latitude, position.coords.longitude];
                    setCurrentPosition(basePosition);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

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

    const renderMarkers = (events, iconColor) => {
        return events.map((event, index) => (
            <Marker key={index} position={[event.coordinates.latitude, event.coordinates.longitude]} icon={createSvgIcon(heroiconPath, iconColor)}>
                <Popup>
                <div>
                    <h3>{event.title}</h3>
                    {event.operatingHours && (
                        <div>
                            <p><strong>Operating Hours:</strong></p>
                            <ul>
                                {Object.entries(event.operatingHours).map(([day, hours]) => (
                                    <li key={day}><strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {hours}</li>
                                ))}
                            </ul>
                        </div>
                    )}

{event.date && (
                            <p><strong>Date & Time:</strong> {event.date.when}</p>
                        )}
                </div>
            </Popup>
            </Marker>
        ));
    };

  
    const heroiconPath = `
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    `;

    const handleNavigateToHomePage = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <MapContainer center={currentPosition || [51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <button onClick={handleNavigateToHomePage} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
                Go to Home
            </button>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {currentPosition && (
                <Marker position={currentPosition} icon={createSvgIcon(heroiconPath, 'green')}>
                    <Popup>You are here!</Popup>
                </Marker>
            )}
            {renderMarkers(eventsData.musical_events, 'blue')}
            {renderMarkers(eventsData.sport_events, 'red')}
            {renderMarkers(eventsData.restaurants, 'orange')}
            {currentPosition && <ChangeView center={currentPosition} zoom={13} />}
        </MapContainer>
    );
}

const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
};

export default Recommendation;


