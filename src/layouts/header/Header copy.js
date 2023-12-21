import * as React from 'react';
import './Header.css';
import AnimatedCoin from '../../assets/images/animatedCoin.gif';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import NotificationData from '../../datafiles/dashboard/notificationMenuData.json'
import SharedDrawer from '../../features/drawers/Drawer';
import SettingDrawer from '../../components/drawerBody/SettingDrawer'
import { useSelector, useDispatch } from 'react-redux';
import { openDrawer, closeDrawer } from '../../features/drawers/drawerSlice';
import { Link } from 'react-router-dom';
import { setCurrentRoute } from '../../features/sidebarRouting/sidebarSelectionSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import ApiService from '../../utils/ApiService';
import { removeSearch, removeSearchList, searchDataList, searchValueSet } from '../../features/headerSearch/headerSearch';
import { useState } from 'react';
import { useMemo } from 'react';
import { loaderData } from '../../features/loader/loaderDashboard';
import { setPageNo } from '../../features/dashboardData/dashboardData';
import { setUserInfo } from '../../features/userInfoStore/userSlice';

const ITEM_HEIGHT = 48;
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '3rem',
    border: '1px solid #EEF6FF',
    backgroundColor: '#FFFFFF;',
    '&:hover': {
        backgroundColor: '#FFFFFF;',
    },
    marginRight: theme.spacing(2),
    width: '80%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    [theme.breakpoints.up('xs')]: {
        // marginLeft: theme.spacing(3),
        width: '90% !important',
        borderRadius: '0rem !important',
        marginLeft: '1rem !important'
    },

}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',

    '& .MuiInputBase-root': {
        width: '100% !important',
    },

    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),

        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '35rem',
        },
    },
}));

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));
//HOOK FOR 3 DOT MENU

export default function PrimarySearchAppBar() {
    const { image } = useSelector(state => state.profile);
    const drawerState = useSelector(state => state.drawer);
    const [anchorE3, setAnchorE3] = React.useState(null);
    const [showSearchInput, setShowSearchInput] = useState(false);
    const open2 = Boolean(anchorE3);
    const handleClick2 = (event) => {
        setAnchorE3(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorE3(null);
    };

    const dispatch = useDispatch();
    const componentDrawer = (id) => {
        console.log("Faltu")
        dispatch(openDrawer(id));
    }
    const cancel = (id) => {
        dispatch(closeDrawer(id));
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userList, setUserList] = React.useState([]);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [searchValue, setSearchValue] = useState('')
    const [companyData, setCompanyData] = useState([])
    const searchValueState = useSelector((state) => (state.search?.searchValue));
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    // const handleMobileMenuOpen = (event) => {
    //     setMobileMoreAnchorEl(event.currentTarget);
    // };
    /////
    // const [anchorE2, setAnchorE2] = React.useState(null);

    const [anchorE2, setAnchorE2] = React.useState(null);
    const open = Boolean(anchorE2);
    const handleClick1 = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorE2(null);
    };

    ////
    const [anchorE5, setAnchorE5] = React.useState(null);
    const openSearch = Boolean(anchorE5);
    const handleSearchClick = (event) => {
        setAnchorE5(event.currentTarget);
    };
    const handleSearchClose = () => {
        setAnchorE5(null);
    };


    //list view//
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    /////

    useEffect(() => {
        ApiService.get('userInfo').then(res => {
            let response = res.data.data
            if (response) {
                setUserList(response)
                dispatch(setUserInfo(response));
            }
        })
        ApiService.get('comapnyLog').then(res => {
            let response = res.data.data
            if (response) {
                setCompanyData(response)
            }
        })
       
    }, [])

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <>
            <Menu
                className='menu-btn-style'
                anchorEl={anchorEl}
                id="account-menu"
                open={isMenuOpen}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        width: '12rem',
                    },
                }}
            >
                <MenuItem>
                    <Box>
                        <Box>Welcome </Box>
                        <Box>
                            {userList?.userName + " " + userList?.lastName}
                        </Box>
                    </Box>
                </MenuItem>
                <Divider />
                {/* <MenuItem onClick={(e) => { console.log(e); componentDrawer('setting'); dispatch(setCurrentRoute('/setting')) }}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem> */}
                <Link to="https://myaccount.tinggit.com/" className='disable-link-styles' onClick={() => { dispatch(setCurrentRoute('/profile')) }}>
                    <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                </Link>
                <Divider sx={{ my: '.5rem' }} />
                <Link to="/logout">
                    <MenuItem>
                        LOG OUT
                    </MenuItem>
                </Link>
            </Menu>
        </>
    );
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem>
                <IconButton size="small" color="inherit">
                    <Badge color="secondary">
                        <span className='coinSize'><img src={AnimatedCoin} alt="React Logo" /></span>
                        <span className='numericSize'>20</span>
                    </Badge>
                </IconButton>
                <p>Coins</p>
            </MenuItem>

            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >

                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    // ----------------- SEARCH API CALLING METHOD ------------
    function userListHandler() {
        let params = {
            search: searchValue
        }
        dispatch(loaderData(true))
        let apiName = window.location.pathname == "/tags" ? 'tagSearch' : 'search'
        ApiService.get(apiName, params).then((res) => {
            let data = res.data.data
            if (data) {
                dispatch(searchDataList(data));
            } else {
                dispatch(searchDataList([]));

            }
            dispatch(setPageNo(0))
            dispatch(loaderData(false))

        }).catch((error) => {
            dispatch(loaderData(false))
            console.log(error);
            dispatch(searchDataList(["error"]));
            // setSnackBar({ dataLoad: true, message: error.message, severity: "error" })
        })
    }
    useMemo(() => {
        if (searchValueState) {
            setSearchValue(searchValueState)
        } else {
            setSearchValue('')
        }
    }, [searchValueState])
    useEffect(
        function () {
            if (searchValue) {
                let delaySearch;
                dispatch(loaderData(true))
                delaySearch = setTimeout(() => {
                    userListHandler();
                }, 1000);
                return () => clearTimeout(delaySearch);
            } else {
                dispatch(removeSearchList([]));
                dispatch(removeSearch(''));
            }
        },
        [searchValue]
    );


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className='app-style'>
                <Toolbar sx={{ paddingRight: "0px !important" }}>
                    <Grid container spacing={2} >
                        <Grid item xs={4} lg={2} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box className='container logoWH' sx={{ paddingTop: '3px' }}>
                                <img className='logoSize' src={companyData.company_logo ? companyData.company_logo : "https://gatewayapi.eela.tech/media/?file=default.png"}
                                    onError={(e) => {
                                        e.target.src = 'https://gatewayapi.eela.tech/media/?file=default.png';
                                    }}
                                    alt="React Logo" />
                                {/* <img src={img} alt="Selected profile image" /> */}
                            </Box>
                        </Grid>
                        {(!drawerState.sidebarIsOpen) && <Grid item xs={4} sm={8} lg={8} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {window.location.pathname == "/" || window.location.pathname == "/tags" || window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) == "/folder" ? <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: "center" }}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon sx={{ color: '#64748B' }} />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        id="searchTour"
                                        value={searchValue}
                                        onChange={(e) => dispatch(searchValueSet(e.target.value))}
                                        placeholder="Search here"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                            </Box> : ""}
                            {window.location.pathname == "/" || window.location.pathname == "/tags" || window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) == "/folder" ? <Box sx={{ display: { xs: 'flex', sm: 'none' }, width: { xs: '68%' }, marginLeft: { xs: '6rem' } }}>
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={openSearch ? 'long-menu' : undefined}
                                    aria-expanded={open ? 'true' : 'false'} // Change here
                                    aria-haspopup="true"
                                    onClick={handleSearchClick}
                                >
                                    <SearchIcon />
                                </IconButton>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                        left: '60px' // Change here
                                    }}
                                    anchorEl={anchorE5}
                                    open={openSearch}
                                    onClose={handleSearchClose}
                                >
                                    {window.location.pathname == "/" || window.location.pathname == "/tags" || window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) == "/folder" ? <Box className='search-panel '>
                                        <Search isTrash={false} >
                                            <SearchIconWrapper>
                                                <SearchIcon sx={{ color: '#64748B' }} />
                                            </SearchIconWrapper>
                                            <StyledInputBase
                                                id="searchTour"
                                                sx={{ color: 'black' }}
                                                value={searchValue}
                                                onChange={(e) => setSearchValue(e.target.value)}
                                                placeholder="Search here"
                                                inputProps={{ 'aria-label': 'search' }}
                                            />
                                        </Search>
                                    </Box> : null}
                                </Menu>
                            </Box> : null}
                        </Grid>}
                        <Grid item xs={4} lg={2} sm={2}>
                            <Box sx={{ display: { xs: 'none', sm: 'flex', justifyContent: 'flex-end' } }}>
                                <Menu
                                    // className='menu-size'
                                    id="basic-menu"
                                    sx={{ top: '-20px', left: '-80px' }}
                                    anchorEl={anchorE2}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {/*3 dot menu is defined here*/}
                                    <Box>
                                        <Box>
                                            <ListItem secondaryAction={
                                                <Box>
                                                    <IconButton
                                                        aria-label="more"
                                                        id="long-button"
                                                        aria-controls={open ? 'long-menu' : undefined}
                                                        aria-expanded={open ? 'true' : undefined}
                                                        aria-haspopup="true"
                                                        onClick={handleClick2}
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        id="long-menu"
                                                        sx={{ left: '-100px' }}
                                                        anchorEl={anchorE3}
                                                        open={open2}
                                                        onClose={handleClose2}
                                                        PaperProps={{
                                                            style: {
                                                                maxHeight: ITEM_HEIGHT * 4.5,
                                                                width: '20ch',
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem> Mark all as read</MenuItem>
                                                    </Menu>
                                                </Box>}>
                                                <ListItemText primary={<Typography variant='h6'>Notifications (7)</Typography>} secondary={<Typography variant="body2">You have 2 unread messages</Typography>} />
                                            </ListItem>
                                        </Box>
                                        <Box className='table-height' style={{ height: '20rem', overflow: 'auto', }}>
                                            {NotificationData.map((key, index) => {
                                                return (
                                                    <List dense={dense} key={index} sx={{ padding: '0rem', cursor: 'pointer' }} >
                                                        <ListItem sx={{ ':hover': { bgcolor: 'var(--color-lightblue)', }, }} secondaryAction={<ListItemText edge="end" primary={<Typography variant="caption" color='var(--color-dashboard-tasklist)' fontWeight='var(--font-weight-5)'>5m ago</Typography>} />}>
                                                            <ListItemAvatar>
                                                                <IconButton>
                                                                    <img src={key.icon} alt="React Logo" />
                                                                </IconButton>
                                                            </ListItemAvatar>
                                                            <ListItemText sx={{ pr: 'var(--padding-tasklist-element5)' }} primary={<Typography variant="subtitle2">{key.primary}</Typography>} secondary={<Typography variant="body2">{key.secondary}</Typography>} />
                                                        </ListItem>
                                                        <Divider />
                                                    </List>
                                                )
                                            })}
                                        </Box>

                                    </Box>
                                </Menu>
                                {!drawerState.sidebarIsOpen && <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    {userList?.userAvatar != "https://gatewayapi.eela.tech/media/?file=default.png" ?
                                        <Avatar id="profile-icon" alt="user-avatar" src={userList?.userAvatar} sx={{ width: 35, height: 35 }} />
                                        :
                                        <AccountCircleIcon />}
                                </IconButton>}
                            </Box>
                            {!drawerState.sidebarIsOpen && <Box sx={{ display: { xs: 'flex', sm: 'none', justifyContent: 'flex-end' } }}>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    {userList?.userAvatar != "https://gatewayapi.eela.tech/media/?file=default.png" ?
                                        <Avatar id="profile-icon" alt="user-avatar" src={userList?.userAvatar} sx={{ width: 35, height: 35 }} />
                                        :
                                        <AccountCircleIcon />}
                                </IconButton>
                            </Box>}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <SharedDrawer id='setting'>
                <Box className="tasklist_drawer">
                    <SettingDrawer parentId='setting' />
                </Box>
            </SharedDrawer>
        </Box>
    );
}