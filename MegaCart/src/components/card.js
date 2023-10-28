import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../App.css'
import CartItems from '../context/cartItems';
import { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState } from 'react';
import Rating from '@mui/material/Rating';

export default function MediaCard({ products, setOpen, viewDetails }) {
  const [snackOpen, setSnackOpen] = useState(false)
  const cartItems = useContext(CartItems);
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products;
    const index = cartItems[0].findIndex((v) => v.id === products.id);
    if (index !== -1) {
      cart.splice(index, 1, { ...cart[index], qty: cart[index]?.qty + 1 });
      const updatedPrice = Number(cart[index].price) + product.price;
      cart[index].price = updatedPrice.toFixed(2);
    }
    else {
      cart.push({ ...product, qty: 1, originalPrice: product.price });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    cartItems[1](cart);
    setSnackOpen(true);
  }
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Card sx={{ margin: 2, width: 300 }} className='card'>
      <div>
        <img alt='img' src={products.image} style={{ width: '100%', height: 240, objectFit: 'contain' }} />
      </div>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={snackOpen} autoHideDuration={2000} onClose={()=> setSnackOpen(false)}>
        <Alert onClose={()=> setSnackOpen(false)} severity="success" sx={{ width: '100%', backgroundColor:'#9cc694' }}>
        Added Product to your cart.
        </Alert>
      </Snackbar>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${products.price} $`}
        </Typography>
        <Typography variant="body1" color="text.secondary" style={{ height: 25, }}>
          {products.title.slice(0, 30)}...
        </Typography>
      </CardContent>
      <CardActions style={{display: 'inline-block'}}>
      <Typography variant="body1" color="text.secondary">
        <Rating name="read-only" value={products.rating.rate} readOnly />
        </Typography>
        <Button className='card-btn add-btn' onClick={() => addToCart()}>Add to cart</Button>
        <Button className='card-btn detail-btn' onClick={() => { setOpen(true); viewDetails(products,setSnackOpen ) }}>View details</Button>
      </CardActions>
    </Card>
  );
}