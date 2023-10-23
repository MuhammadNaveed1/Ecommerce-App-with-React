import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import '../App.css'

export default function AlignItemsList({image,title, price}) {
    // const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || [])
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          < img alt='img' src={image} style={{width: 80,height: 100,objectFit: 'contain'}} />
        </ListItemAvatar>
        <div className='list-text'>
            <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body1"
            color="text.primary"
            >
                {title}
            </Typography>
            <Typography variant="body2">
                {`${price} $`}
            </Typography>
            <div className='cart-qty'>
            <Typography variant="body2">
                {`QTY :`}</Typography>
                <RemoveIcon fontSize='small' className='qty-btn' />
                <span style={{fontSize:15}}>6</span>
                <AddIcon fontSize='small' className='qty-btn'/>
                <DeleteIcon style={{position: 'absolute', right: 0, color:'red', cursor: 'pointer'}} fontSize='small' />
            </div>
        </div>
      </ListItem>
      <Divider variant="fullwidth" component="li" />
    </List>
  );
}