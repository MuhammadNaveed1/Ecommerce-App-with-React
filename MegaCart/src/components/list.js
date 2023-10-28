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

export default function AlignItemsList({value, deleteItems, cartDataQty}) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          < img alt='img' src={value.image} style={{width: 80,height: 100,objectFit: 'contain'}} />
        </ListItemAvatar>
        <div className='list-text'>
            <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body1"
            color="text.primary"
            >
                {value.title}
            </Typography>
            <Typography variant="body2">
                {`${value.price} $`}
            </Typography>
            <div className='cart-qty'>
            <Typography variant="body2">
                {`QTY :`}</Typography>
                <RemoveIcon onClick={()=> value.qty > 0 && cartDataQty('delete', value.id)} fontSize='small' className='qty-btn' />
                <span style={{fontSize:15}}>{value.qty}</span>
                <AddIcon onClick={()=> cartDataQty('add', value.id)} fontSize='small' className='qty-btn'/>
                <DeleteIcon onClick={(()=> deleteItems(value.id))} className='delete-item-btn' style={{position: 'absolute', right: 0, color:'red', cursor: 'pointer'}} fontSize='small' />
            </div>
        </div>
      </ListItem>
      <Divider variant="fullwidth" component="li" />
    </List>
  );
}