import React from 'react';
import { useWeather } from '../context/weatherContext';
import Loader from './Loader';
import  ToggleLanguageButton from './ToggleButton'
import './weather.css';
import { FormattedMessage } from 'react-intl';

const Weather = () => {
	const { data, location, setLocation, loading, error } = useWeather();
	return (
		<div className='app'>
			<ToggleLanguageButton />
			<div className='search'>
				<div>
					<h6 className='search-header'>{<FormattedMessage id='search_header_text' />}</h6>
					<input value={location} onChange={(event) => setLocation(event.target.value)} placeholder='Enter Location' type='text' />
				</div>
			</div>

			<div className='container'>
				{loading ? (
					<Loader />
				) : (
					<>
						<div>
							<div className='top'>
								<div className='location'>
									<p>{data.name}</p>
								</div>
								<div className='temp'>{data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}</div>
								<div className='description'>{data.weather ? <p>{data.weather[0].main}</p> : null}</div>
							</div>
							{data.name && (
								<div className='bottom'>
									<div className='feels'>
										{data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
										<p>
											<FormattedMessage id='feels_like' />
										</p>
									</div>
									<div className='humidity'>
										{data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
										<p>
											<FormattedMessage id='humidity' />
										</p>
									</div>
									<div className='wind'>
										{data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
										<p>
											<FormattedMessage id='wind_speed' />
										</p>
									</div>
								</div>
							)}
						</div>
					</>
				)}
				{error && (
					<p style={{ margin: '0 auto' }}>
						{error?.message === 'Request failed with status code 404' ? <FormattedMessage id='wrong_location' /> : <FormattedMessage id='no_location' />}
					</p>
				)}
			</div>
		</div>
	);
};

export default Weather;
