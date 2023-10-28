import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import '../App.css'
import { Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CartItems from '../context/cartItems';
import { useContext } from 'react';

export default function MediaControlCard({ product }) {
  const cartItems = useContext(CartItems);
  const productData = product[0];
  const addToCart = (id)=> {
    const cartData = JSON.parse(localStorage.getItem('cart'));
    const index = cartData.findIndex((value)=> value.id === id);
    if (index !== -1) {
      cartData.splice(index, 1, { ...cartData[index], qty: cartData[index]?.qty + 1 });
      const updatedPrice = Number(cartData[index].price) + productData.price;
      cartData[index].price = updatedPrice.toFixed(2);
      product[1](true);
    }
    else {
      cartData.push({ ...productData, qty: 1, originalPrice: productData.price });
      product[1](true);
    }
    localStorage.setItem('cart', JSON.stringify(cartData));
    cartItems[1](cartData);
  }
  return (
    <Card sx={{ display: 'flex', boxShadow: 'none', width: '100%'}} className='media-card'>
      <CardMedia
      className='media-card-image'
        component="img"
        sx={{ width: 200, objectFit: 'contain' }}
        image={productData.image}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 2, width: '100%' }}>
        <CardContent>
          <Typography variant='h6' className='media-card-title'>
            {productData.title}
          </Typography>
          <Typography variant='body2' className='media-card-typography' style={{ marginTop: 10}}>
              {productData.description}
          </Typography>
          <Stack direction="row" spacing={1} className='media-card-typography' style={{marginTop: 10}}>
          <Chip label={productData.category} />
          </Stack>
          <Typography variant='h5' className='media-card-typography' style={{ marginTop: 10 }}>
            {`${productData.price} $`}
          </Typography>
            <Button className='card-btn add-btn viewcard-btn' onClick={()=> addToCart(productData.id)} style={{ marginTop: 10}}>Add to cart</Button>
        </CardContent>
      </Box>
    </Card>
  );
}
