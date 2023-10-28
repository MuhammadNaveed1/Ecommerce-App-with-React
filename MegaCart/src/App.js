import './App.css';
import CartItems from './context/cartItems';
import {useState } from 'react';
import AppRouter from './config/router';

function App() {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  return (
    <>
    <CartItems.Provider value={[cartItems, setCartItems]}>
    <AppRouter />
    </CartItems.Provider>
    </>
  );
}

export default App;
