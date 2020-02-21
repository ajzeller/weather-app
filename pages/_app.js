import '../assets/styles.scss'
import Provider from '../components/provider';
import { WeatherProvider } from '../lib/weather';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return(
    <WeatherProvider>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </WeatherProvider>

  ) 
}