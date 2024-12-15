import React from 'react';

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="border p-4 my-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">{weather.location.name}, {weather.location.country}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 p-2 rounded">
          <span className="font-medium">Temperature:</span> {weather.current.temperature}°C
        </div>
        <div className="bg-green-100 p-2 rounded">
          <span className="font-medium">Weather:</span> {weather.current.weather_descriptions[0]}
        </div>
        <div className="bg-yellow-100 p-2 rounded">
          <span className="font-medium">Humidity:</span> {weather.current.humidity}%
        </div>
        <div className="bg-purple-100 p-2 rounded">
          <span className="font-medium">Wind:</span> {weather.current.wind_speed} km/h
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;

