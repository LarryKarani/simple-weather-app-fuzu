
import React, {Suspense} from 'react';
import Weather from './componets/Weather';
import ErrorBoundary from './componets/ErrorBoundary';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './i18n/locales';
import { messages } from './i18n/messages';
import { useWeather } from './context/weatherContext';
function App() {

const { language } = useWeather();
  const locale = LOCALES[language];
  return (
        <IntlProvider 
            messages={messages[locale]}
            locale={locale} 
            defaultLocale={LOCALES.ENGLISH}
        >
            <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                    <Weather />
                </Suspense>
            </ErrorBoundary>
        </IntlProvider>
	);
}

export default App;
