import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WeatherContext = createContext();

export const useWeather = () => {
	return useContext(WeatherContext);
};

export const WeatherProvider = ({ children }) => {
	const [data, setData] = useState({});
	const [location, setLocation] = useState('Nairobi'); // Set default location to Nairobi
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
    const [language, setLanguage] = useState('ENGLISH')
    
	useEffect(() => {
		// Fetch weather data for default location when component mounts
		searchLocation(location);
	}, [location]); // Trigger searchLocation when location changes

	const searchLocation = async (location) => {
		setLoading(true);
		try {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`;
			const response = await axios.get(url);
			setData(response.data);
			setError(null);
		} catch (error) {
			//console.error('Error fetching weather data:', error);
			setData({});
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const values = {
		data,
		location,
		setLocation,
		loading,
		error,
		language,
		setLanguage,
	};

	return <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>;
};
