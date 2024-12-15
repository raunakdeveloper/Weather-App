import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { addSearchTag, getSearchHistory, deleteSearchTag, fetchWeatherData } from '../utils/api';
import Spinner from '../components/Spinner';
import WeatherDisplay from '../components/WeatherDisplay';

const Home = () => {
  const { user } = useAuth();
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSearchHistory();
  }, []);

  const fetchSearchHistory = async () => {
    try {
      const historyData = await getSearchHistory();
      setRecentSearches(historyData);
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const weatherData = await fetchWeatherData(city);
      setWeather(weatherData);
      await addSearchTag(city);
      await fetchSearchHistory();
      setCity('');
    } catch (error) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTag = async (id) => {
    try {
      await deleteSearchTag(id);
      await fetchSearchHistory();
    } catch (error) {
      console.error('Error deleting search tag:', error);
    }
  };

  const handleTagClick = async (tag) => {
    setLoading(true);
    setError('');
    try {
      const weatherData = await fetchWeatherData(tag);
      setWeather(weatherData);
    } catch (error) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Weather Search</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:ml-4"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <Spinner />}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <WeatherDisplay weather={weather} />

      <h2 className="text-2xl font-bold mb-4">Recent Searches</h2>
      <div className="flex flex-wrap gap-2 justify-start">
        {recentSearches.map((search) => (
          <div
            key={search._id}
            className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 flex items-center"
          >
            <span
              className="cursor-pointer"
              onClick={() => handleTagClick(search.searchTag)}
            >
              {search.searchTag}
            </span>
            <button
              onClick={() => handleDeleteTag(search._id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
