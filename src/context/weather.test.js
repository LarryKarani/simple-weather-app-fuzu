import React from 'react';
import { render, waitFor } from '@testing-library/react'; 


import axios from 'axios';
import { WeatherProvider, useWeather } from './weatherContext';

// Mock axios module
jest.mock('axios');

describe('WeatherProvider', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('fetches weather data successfully', async () => {
		const responseData = {
			data: {
				name: 'Nairobi',
				main: { temp: 75 },
				weather: [{ main: 'Clear' }],
				wind: { speed: 10 },
			},
		};

		axios.get.mockResolvedValueOnce(responseData);

		let useWeatherResult;
		const TestComponent = () => {
			useWeatherResult = useWeather();
			return null;
		};

		render(
			<WeatherProvider>
				<TestComponent />
			</WeatherProvider>
		);

		await waitFor(() => {
			expect(useWeatherResult.loading).toBe(false);
		});

		await waitFor(() => {
			expect(useWeatherResult.error).toBe(null);
		});

		await waitFor(() => {
			expect(useWeatherResult.data.name).toBe('Nairobi');
		});

		await waitFor(() => {
			expect(useWeatherResult.data.main.temp).toBe(75);
		});
	});

	it('sets error state when fetching weather data fails', async () => {
		const errorMessage = 'Failed to fetch';

		axios.get.mockRejectedValueOnce(new Error(errorMessage));

		let useWeatherResult;
		const TestComponent = () => {
			useWeatherResult = useWeather();
			return null;
		};

		render(
			<WeatherProvider>
				<TestComponent />
			</WeatherProvider>
		);

		await waitFor(() => {
			expect(useWeatherResult.loading).toBe(false);
		});

		await waitFor(() => {
			expect(useWeatherResult.error).toEqual(new Error(errorMessage));
		});

		await waitFor(() => {
			expect(useWeatherResult.data).toEqual({});
		});
	});

	// Add more test cases as needed
});
