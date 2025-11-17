import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// importing font awesome library
import '@fortawesome/fontawesome-free/css/all.css'
// importing flowbite library
import 'flowbite'
import './index.css'
import App from './App.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />

    </QueryClientProvider>
  </StrictMode>,
)
