import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

setTimeout(() => {
  const splash = document.getElementById('splash')
  if (splash) splash.classList.add('hidden')
}, 1500)
