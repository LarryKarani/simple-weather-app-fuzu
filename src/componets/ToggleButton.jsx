import { useWeather } from '../context/weatherContext';
import './toggleButton.css'

const ToggleLanguageButton = () => {
    const { language, setLanguage } = useWeather();
    const languages = ['ENGLISH', 'SWAHILI']
	  const handleChange = (event) => {
    setLanguage(event.target.value);
  };
  return (
			<select value={language} onChange={handleChange} className='language-selector'>
				{languages.map((language, index) => (
					<option key={index} value={language}>
						{language}
					</option>
				))}
			</select>
		);
};

export default ToggleLanguageButton;
