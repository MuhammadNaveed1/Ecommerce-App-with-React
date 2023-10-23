import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import BasicMenu from './menu';
import TemporaryDrawer from './drawer';
import CartItems from '../context/cartItems';
import { useContext } from 'react';

const drawerWidth = 240;
const navItems = 'All Products';
const navItemsMobile = ['All Products', "men's clothing", "women's clothing", 'jewelery', 'electronics']

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { selectedCategoryfunc } = props;

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const cartItems = useContext(CartItems);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const getCategoryFunc = (selectedCategory) => {
    selectedCategoryfunc(selectedCategory);
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
      MegaCart
      </Typography>
      <Divider />
      <List>
        {navItemsMobile.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText onClick={() => item === 'All Products' ? selectedCategoryfunc('') : selectedCategoryfunc(`category/${item}`)} primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        <IconButton onClick={() => setOpenDrawer(!openDrawer)}
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={cartItems[0].length} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" style={{ backgroundColor: '#bfdbba', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontWeight: 'bold' }}
          >
            MegaCart
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button onClick={() => selectedCategoryfunc('')} sx={{ color: '#fff' }} className='nav-btn'>
              {navItems}
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <BasicMenu getCategoryFunc={getCategoryFunc} />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={cartItems[0].length} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      < TemporaryDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;