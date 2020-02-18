import '../assets/styles.scss'
import Provider from '../components/provider';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return(
    <Provider>
      <Component {...pageProps} />
    </Provider>
  ) 
}