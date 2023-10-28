import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import AlignItemsList from './list';
import CartItems from '../context/cartItems';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import '../App.css'

export default function TemporaryDrawer({ openDrawer, setOpenDrawer, deleteItems }) {
    const cartItems = useContext(CartItems);
    const navigate = useNavigate();
    const cartDataQty = (task, id) => {
        const cartData = JSON.parse(localStorage.getItem('cart'));
        const index = cartData.findIndex((value) => value.id === id);
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
    const checkOut = ()=> {
        navigate('/checkout')
    }
    const [state, setState] = React.useState({
        right: false,
    });
    React.useEffect(() => {
        setState({ right: openDrawer })
    }, [openDrawer])
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ state, [anchor]: open });
        setOpenDrawer(false);
    };
    const list = (anchor) => (
        <Box
            className='drawer'
            sx={{
                width: {
                    md: 400,
                    sm: 300,
                    xs: 300
                }
            }}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
                <Button onClick={() => setOpenDrawer(false)}><ArrowBackIcon style={{ color: 'green' }} /></Button>
            </Stack>
            <List>
                {cartItems[0].length > 0
                    ?
                    cartItems[0].map((value, index) =>
                        <AlignItemsList key={index} value={value} deleteItems={deleteItems} cartDataQty={cartDataQty} />
                    )
                    :
                    <Stack sx={{ width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center', }} spacing={2}>
                        <Alert sx={{ width: '80%', height: 100, justifyContent: 'center', alignItems: 'center', color: '#9c7d51', borderColor: 'rgb(255 152 0)' }} color="warning" variant="outlined" severity='info'>
                            Your Cart is Empty
                        </Alert>
                    </Stack>}
                {cartItems[0].length > 0 &&
                    <div className='checkoutBtn-div'>
                        <Button variant="contained" onClick={()=> checkOut()} style={{ width: '60%', height: 40, backgroundColor: '#bfdbba', boxShadow: 'none' }}>Checkout</Button>
                    </div>
                }
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