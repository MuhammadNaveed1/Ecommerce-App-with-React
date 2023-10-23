import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../App.css'
import CartItems from '../context/cartItems';
import { useContext } from 'react';

export default function MediaCard({products,setOpen,viewDetails}) {
  const cartItems = useContext(CartItems);
  const addToCart = ()=> {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products;
    product.qty= 0;
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartItems[1](cart)
  }
  return (
    <Card sx={{margin: 2, width: 300}} className='card'>
      <div>
        <img alt='img' src={products.image} style={{width: '100%', height: 240, objectFit: 'contain'}} />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${products.price} $`}
        </Typography>
        <Typography variant="body1" color="text.secondary" style={{height: 25}}>
          {products.title.slice(0,30)}...
        </Typography>
      </CardContent>
      <CardActions>
      <Button className='card-btn add-btn' onClick={()=> addToCart()}>Add to cart</Button>
      <Button className='card-btn detail-btn' onClick={()=> {setOpen(true); viewDetails(products)}}>View details</Button>  
      </CardActions>
    </Card>
  );
}