import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import AlignItemsList from './list';
import CartItems from '../context/cartItems';
import { useContext } from 'react';

export default function TemporaryDrawer({openDrawer, setOpenDrawer}) {
    const cartItems = useContext(CartItems);
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
                {cartItems[0].map((v, i)=> <AlignItemsList key={i} image={v.image} title={v.title} price={v.price} />)}
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