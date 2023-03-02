import '@/styles/globals.css';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AmbarProvider } from '@/src/context';

export default function App({ Component, pageProps }) {
  return <AmbarProvider>
    <Component {...pageProps} />
  </AmbarProvider>
}
