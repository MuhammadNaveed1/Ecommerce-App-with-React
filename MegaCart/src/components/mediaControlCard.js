import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import '../App.css'
import { Typography } from '@mui/material';

export default function MediaControlCard({ product }) {
  return (
    <Card sx={{ display: 'flex', boxShadow: 'none',}}>
      <CardMedia
        component="img"
        sx={{ width: 200, objectFit: 'contain' }}
        image={product.image}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
        <CardContent>
          <Typography variant='h6'>
            {product.title}
          </Typography>
          <Typography variant='body2' style={{ marginTop: 10 }}>
            {product.description}
          </Typography>
          <Typography variant='h5' style={{ marginTop: 10 }}>
            {`${product.price} $`}
          </Typography>
            <Button className='card-btn add-btn viewcard-btn' style={{ marginTop: 10}}>Add to cart</Button>
        </CardContent>
      </Box>
    </Card>
  );
}
