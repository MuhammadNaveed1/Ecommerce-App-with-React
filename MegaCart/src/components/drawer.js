import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import AlignItemsList from './list';
import CartItems from '../context/cartItems';
import { useContext } from 'react';

export default function TemporaryDrawer({openDrawer, setOpenDrawer, deleteItems}) {
    const cartItems = useContext(CartItems);
    const cartDataQty = (task, id)=> {
        const cartData = JSON.parse(localStorage.getItem('cart'));
        const index = cartData.findIndex((value)=> value.id === id);
        if (task === 'add') {
            const updatedQty = cartData[index].qty + 1;
            const updatedPrice = Number(cartData[index].price) + cartData[index].originalPrice;
            cartData[index].qty = updatedQty;
            cartData[index].price = updatedPrice.toFixed(2);
            localStorage.setItem('cart', JSON.stringify(cartData));
            cartItems[1](cartData);
        }
        else {
            const updatedQty = cartData[index].qty - 1;
            const updatedPrice = Number(cartData[index].price) - cartData[index].originalPrice;
            cartData[index].qty = updatedQty;
            cartData[index].price = updatedPrice.toFixed(2);
            localStorage.setItem('cart', JSON.stringify(cartData));
            cartItems[1](cartData);
        }
    }
    // console.log(cartItems[0])
    const [state, setState] = React.useState({
        right: false,
    });
    React.useEffect(()=> {
        setState({right: openDrawer})
    },[openDrawer])
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ state, [anchor]: open});
        setOpenDrawer(false);
    };
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {cartItems[0].map((value, index)=> <AlignItemsList key={index} value={value} deleteItems={deleteItems} cartDataQty={cartDataQty}/>)}
            </List>
        </Box>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}