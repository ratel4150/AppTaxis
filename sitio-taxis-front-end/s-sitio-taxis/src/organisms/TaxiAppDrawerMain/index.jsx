
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Badge, Collapse, Paper } from '@mui/material';
import menuApi from '../../api/menu.api';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuLayout from '../../templates/MenuLayout';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


function RenderSubMenuStatus({ openSubMenus,menus }) {
  console.log(openSubMenus);
  switch (Object.keys(openSubMenus).length) {
    case 0:
      return (
        <div>
          {/* Contenido que se muestra cuando openSubMenus está vacío */}
          No hay submenús abiertos
        </div>
      );
    default:
      return (
        <div>
          {/* Contenido que se muestra cuando hay submenús abiertos */}
          
          <Box>
            {Object.entries(openSubMenus).map(([submenuTitle, isOpen]) => (
              <Paper key={submenuTitle}>
                {isOpen ? (submenuTitle === 'Menus' ? <MenuLayout menus={menus} /> : null) : null}
              </Paper>
            ))}
          </Box>
        </div>
      );
  }
}
function TaxiAppDrawerMain() {

  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [menus, setMenus] = React.useState([]);
  const [openSubMenus,setOpenSubMenus] = React.useState({})


  console.log(openSubMenus);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fetchMenus = async () => {
    try {
      const data = await menuApi.getMenus();
  
      // Filtrar los menús para incluir solo aquellos con active === true
      const activeMenus = data.filter(menu => menu.active === true);
  
      setMenus(activeMenus);
    } catch (error) {
      console.error('Error al obtener menús:', error);
    }
  };

  
  const handleClick = () => {
    setOpenMenu(!openMenu);
  };


 

  React.useEffect(() => {
   
    fetchMenus();
  }, []); //


  const handleSubMenuClick = (submenuTitle) => {
    setOpenSubMenus((prevOpenSubMenus) => {
      const newOpenSubMenus = { ...prevOpenSubMenus };

      // Cerrar todos los submenús existentes
      Object.keys(newOpenSubMenus).forEach((key) => {
        newOpenSubMenus[key] = false;
      });

      // Abrir o cerrar el submenú seleccionado
      newOpenSubMenus[submenuTitle] = !prevOpenSubMenus[submenuTitle];

      return newOpenSubMenus;
    });
  };


  console.log(menus);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
            /*   aria-controls={menuId} */
              aria-haspopup="true"
            /*   onClick={handleProfileMenuOpen} */
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        {/*     <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton> */}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menus?.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={handleClick}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon 
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text.title} sx={{ opacity: open ? 1 : 0 }} />
                {openMenu ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {text.submenus.map((submenu, subIndex) => (
                  <ListItemButton key={submenu.title} sx={{ pl: 4 }} onClick={()=>handleSubMenuClick(submenu.title)}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={submenu.title} />
                  </ListItemButton>
                ))}
        </List>
      </Collapse>
            </ListItem>
          ))}
        </List>
     
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {Object.keys(openSubMenus).length === 0 ? (
    <Box  component="section" sx={{ p: 1,width:"100%",height:"auto" }}>
      {/* Contenido que se muestra cuando openSubMenus está vacío */}
      No hay submenús abiertos
    </Box>
  ) : (
    // Contenido que deseas mostrar cuando hay submenús abiertos
    // Puedes utilizar openSubMenus para personalizar el contenido
    <RenderSubMenuStatus openSubMenus={openSubMenus} menus={menus}/>
  )}
      </Box>
    </Box>
  );
}

export default TaxiAppDrawerMain