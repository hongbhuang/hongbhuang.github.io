import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import { store } from './store'
import App from './App.jsx'
import './i18n/i18n'

// Note: the ThemeProvider lives inside <App /> (driven by the Redux theme
// slice), NOT here. Wrapping it again at the root would freeze the theme
// in 'light' mode for everything outside <App> and produce two independent
// theme contexts — the second one (from App) is the one child components
// see, but the AppBar/Tooltip rendered at the outer level would still be
// stuck on light, causing a flash on dark-mode first paint.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </StrictMode>,
)
