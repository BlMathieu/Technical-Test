import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './view/app/App.tsx'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import WindowReducer from './reducer/WindowReducer';
import ProductReducer from './reducer/ProductReducer';
import JwtReducer from './reducer/JwtReducer';
import BasketReducer from './reducer/BasketReducer.ts'
const store = configureStore({
  reducer:{
    jwtReducer: JwtReducer,
    productReducer: ProductReducer,
    windowReducer: WindowReducer,
    basketReducer: BasketReducer,
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
