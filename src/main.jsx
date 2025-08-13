import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// importing font awesome library
import'@fortawesome/fontawesome-free/css/all.css'
// importing flowbite library
import 'flowbite'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
