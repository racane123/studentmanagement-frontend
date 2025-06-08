import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider, createTheme } from '@mui/material'
import { store } from './store'
import './index.css'
import App from './App.tsx'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ChakraProvider>
    </Provider>
  </StrictMode>,
)
