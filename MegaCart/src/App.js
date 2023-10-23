import './App.css';
import Home from './pages/home';
import CartItems from './context/cartItems';
import {useState } from 'react';

function App() {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || [])
  return (
    <>
    <CartItems.Provider value={[cartItems, setCartItems]}>
    <Home />
    </CartItems.Provider>
    </>
  );
}

export default App;
