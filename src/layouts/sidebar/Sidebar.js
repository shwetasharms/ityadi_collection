import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Header from '../header/Header'
import Footer from '../../layouts/footer/Footer';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsIcon from '@mui/icons-material/Groups';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentRoute } from '../../features/sidebarRouting/sidebarSelectionSlice';
import './Sidebar.css'
// import Tooltip from '@mui/material/Tooltip';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { searchValueSet } from '../../features/headerSearch/headerSearch';
import { setPageNo } from '../../features/dashboardData/dashboardData';
import PushPinIcon from '@mui/icons-material/PushPin';
import CloseIcon from '@mui/icons-material/Close';
import { sidebarOpenDrawer } from '../../features/drawers/drawerSlice';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: '#2563EB',

    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#fff',
        color: '#000000',
        fontWeight: '400',
        boxShadow: '-1px 0px 6px #aaa',
        // padding: "15px",
        fontSize: theme.typography.pxToRem(14),
        border: '1px solid #2563EB',
        borderRadius: 2,
        // zIndex:10000
    },
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    height: `calc(100vh - 0px - ${theme.spacing(9)})`,
    height: '100%',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    borderRight: 0,
    // position: 'relative',
    top: 61,
    paddingRight: 15,
});

const closedMixin = (theme) => ({
    // height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - ${theme.spacing(9)})`,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    borderRight: 0,
    background: '#ffffff',
    top: 63,
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('xs')]: {
        width: `calc(${theme.spacing(0)} + 1px)`,
    },
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    [theme.breakpoints.up('md')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    [theme.breakpoints.up('lg')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => (prop !== 'open' || prop !== 'mobileOpen'),
})(({ theme, open, mobileOpen }) => ({
    // zIndex: theme.zIndex.drawer - 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...((open || mobileOpen) && {
        // width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => (prop !== 'open' || prop !== 'mobileOpen') })(
    ({ theme, open, mobileOpen }) => ({
        flexShrink: 0,
        whiteSpace: 'nowrap',
        zIndex: 2,
        boxSizing: 'border-box',
        ...((open || !mobileOpen) && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...((!open || mobileOpen) && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Sidebar({ isTrash, children, ...props }) {
    const [open, setOpen] = React.useState(false);
    const { currentRoute } = useSelector(state => state.routing)
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedTab, setSelectedTab] = useState(localStorage.getItem('selectedTab') || '/');
    const dispatch = useDispatch();
    const handleDrawerOpen = () => {
        dispatch(sidebarOpenDrawer(false));
        if (open === true) {
            setOpen(false);
        }
        else {
            setOpen(true);
        }
    };

    const handleDrawerToggle = () => {
        if (mobileOpen === false) {
            setMobileOpen(true);
            dispatch(sidebarOpenDrawer(true));
        }
        else {
            setMobileOpen(false);
            dispatch(sidebarOpenDrawer(false));
        }
    };

    const itemsList = [
        // {
        //     label: "File Library",
        //     icon: <FolderIcon />,
        //     path: "/"
        // },
        // {
        //     label: "Shared",
        //     icon: <AccountBoxIcon />,
        //     path: "/shared"
        // },
        // {
        //     label: "Pinned",
        //     icon: <PushPinIcon />,
        //     path: "/pinned"
        // },
        {
            label: "App List",
            icon: <AccessTimeFilledIcon />,
            path: "/"
        },
        // {
        //     label: "Trash",
        //     icon: <DeleteSweepIcon />,
        //     path: "/trash"
        // },
        // {
        //     label: "Tags",
        //     icon: <LocalOfferIcon />,
        //     path: "/tags"
        // },

    ];

    const handleListItemClick = (e, path) => {
        dispatch(setPageNo(0));
        dispatch(setCurrentRoute(path));
        dispatch(searchValueSet(''));
        setSelectedTab(path);
        localStorage.setItem('selectedTab', path);
    };

    useEffect(() => {
        const handleBackButton = () => {
            let getItem = localStorage.getItem('myContextState')
            const myContextState = JSON.parse(getItem);
            if (window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) == "/folder" && myContextState[0].name == "Pinned") {
                dispatch(setCurrentRoute('/pinned'));

            } else if (window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) == "/folder" && myContextState[0].name == "File Library") {
                dispatch(setCurrentRoute('/'));

            } else {
                dispatch(setCurrentRoute(window.location.pathname));

            }
            dispatch(setPageNo(0))
        };

        window.addEventListener('popstate', handleBackButton);

        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener('popstate', handleBackButton);
        };
    }, []);

    useEffect(() => {
        dispatch(setCurrentRoute(selectedTab));
    }, [selectedTab]);

    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', background: '#EEF6FF' }}>
                    <AppBar position="fixed" open={mobileOpen} sx={{ background: "#EEF6FF", boxShadow: 'none' }}>
                        <Toolbar>
                            <IconButton
                                id="sideBarExpand"
                                color="black"
                                aria-label="open drawer"
                                onClick={(window.innerWidth > 600) ? handleDrawerOpen : handleDrawerToggle}
                                edge="start"
                                sx={{
                                    mb: isTrash ? '2rem !important' : '',
                                    marginRight: 0,
                                    ...(open),
                                    color: '#000000',
                                    display: { xs: 'block', sm: 'block' },
                                    '& .MuiDrawer-paper': { boxSizing: 'border-box' },
                                }}
                            >
                                {/* <MenuIcon /> */}
                                {(!mobileOpen) ? <MenuOpenIcon /> :
                                    <CloseIcon sx={{ color: 'var(--color-black)' }} />}
                            </IconButton>
                            <Header />
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className="sidebar-drawer"
                        variant={(window.innerWidth > 600) ? "permanent" : "temporary"}
                        open={(window.innerWidth > 600) ? open : mobileOpen}
                        onClose={(window.innerWidth > 600) ? handleDrawerOpen : handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            top: 60,
                            // width:{xs:"100%"},
                            // display: { xs: 'none', sm:'block' },
                            backgroundColor: "#ffffff",
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', top: "70px", },
                            '& .MuiDrawer-paperAnchorLeft:not(.MuiDrawer-paperAnchorDockedLeft)': { width: { xs: "100%" } }
                        }}

                    >
                        {/* <IconButton aria-label="upload picture" component="label" sx={{justifyContent:"end"}}  color='var(--color-black)'>
                        </IconButton> */}
                        <List sx={{ textAlign: '-webkit-center' }}>
                            {itemsList.map((text, index) => (
                                <ListItem key={text.label} disablePadding sx={{ display: 'block' }}
                                    component={Link}
                                    to={text.path}
                                    onClick={(e) => handleListItemClick(e, text.path)}
                                    className={(mobileOpen || open) ? "open-selected-tab" : "close-selected-tab"}

                                    style={
                                        currentRoute === text.path
                                            // window.location.pathname === text.path 
                                            // window.location.pathname === text.path || ( window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) == "/folder" && currentRoute === text.path)
                                            ? {
                                                background: '#DBEAFE',
                                                // boxShadow: "2px 3px 6px rgba(0, 0, 0, 0.3)",
                                            }
                                            : {}
                                    }
                                >
                                    <HtmlTooltip title={open ? '' : text.label} placement="right" arrow>
                                        <ListItemButton sx={{ minHeight: 48, justifyContent: (mobileOpen || open) ? 'initial' : 'center', px: 2.5, cursor: currentRoute === text.path ? "auto" : "pointer" }}>
                                            <ListItemIcon style={currentRoute === text.path ? { color: "#3C82F5", cursor: 'auto' } : { color: '#96A5B8' }}
                                                // <ListItemIcon style={window.location.pathname === text.path ? { color: "#3C82F5", cursor: 'auto' } : { color: '#96A5B8' }}
                                                // <ListItemIcon style={window.location.pathname === text.path || ( window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) == "/folder" && currentRoute === text.path)? { color: "#3C82F5", cursor: 'auto' } : { color: '#96A5B8' }}
                                                sx={{ minWidth: 0, mr: (mobileOpen || open) ? 3 : 'auto', justifyContent: 'center' }}>
                                                {text.icon}
                                            </ListItemIcon>
                                            <ListItemText disableTypography primary={<Typography variant="body1" style={currentRoute === text.path ? { color: 'rgba(4, 5, 7, 0.87)', fontWeight: 700 } : { color: '#000000' }}>{text.label}</Typography>} sx={{ opacity: (mobileOpen || open) ? 1 : 0 }} />
                                        </ListItemButton>
                                    </HtmlTooltip>
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    {/* <Tooltip title={text.label} placement="right" arrow> */}
                    <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` }, pt: { xs: 8, sm: 8, md: 8, lg: 8.8, xl: 8.8 }, pl: 2, pr: 2, background: '#EEF6FF', minHeight: '94vh', minWidth: 0 }}>
                        {children}
                    </Box>
                    {/* </Tooltip> */}
                </Box>
            </Box >
            <Grid item xs={12}>
                <AppBar position="static" sx={{ background: "#FFFFFF" }}>
                    <Footer />
                </AppBar>
            </Grid>
        </>
    );
}