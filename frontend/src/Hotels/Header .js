
import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import {
    AppBar,
    Box,
    Button,
    Grid,
    Tab,
    Tabs,
    TextField,
    Toolbar,
    Typography,
    InputBase,
    Chip,
    Autocomplete,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Avatar,
    FormControlLabel,
    Switch
} from '@mui/material';
import { styled, width } from '@mui/system';
import Menu from '@mui/material/Menu';

import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HotelList from '../List/HotelList';
import {
    searchHotels,
    sortByPrice,
    getHotelsByUserRating,
    searchHotelsByName
} from '../services/commonServices';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';





const Search = styled('div')(({ theme }) => ({
    position: 'relative',

    marginLeft: "40px",
    backgroundColor: 'white', // Change to a lighter shade on hover

    width: '290px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0, // Position on the left side
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    paddingLeft: theme.spacing(6), // Ensure space for the search icon on the left
    paddingRight: theme.spacing(2),
    height: '100%',
    '& .MuiInputBase-input': {
        width: '100%',
    },
}));

const LogoContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
  });
  
  const LogoText = styled(Typography)(({ theme }) => ({
    fontFamily: 'Arial, sans-serif',
    fontWeight: 700,
    fontSize: '24px',
    marginRight: '4px',
  }));
  
  const LogoDot = styled(Typography)(({ theme }) => ({
    color: '#F34336',
  }));
  
  const LogoTrip = styled(Typography)(({ theme }) => ({
    color: '#1E87F0',
  }));

  const Icon = styled('img')({
    height: '25px', // Adjust the size as needed
    marginRight: '40px', // Space between icon and label
    backgroundColor: 'white', // White background for icons
  });
  
  const IconLabel = styled(Typography)({
    fontSize: '12px', // Adjust the size as needed
    textAlign: 'center',
    color:'silver',
    marginRight:'40px'
  });
  
  const IconWithLabel = ({ src, alt, label }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 1 }}>
      <Icon src={src} alt={alt} />
      <IconLabel>{label}</IconLabel>
    </Box>
  );

const Header = ({hotels, setHotels }) => {
    const [tabValue, setTabValue] = useState(0);
    const [open, setOpen] = useState(false);
    const { city, setCity, checkIn, setCheckIn, checkOut, setCheckOut, rooms, setRooms, adults, setAdults, childrens, setChildrens, priceRange, setPriceRange } = useBooking();
//   const [rooms, setRooms] = useState(1);
//     const [adults, setAdults] = useState(2);
//     const [children, setChildren] = useState(1);
    const [priceAnchorEl, setPriceAnchorEl] = useState(null);
    // const [priceRange, setPriceRange] = useState('₹ 0 - ₹ 1500');
    // const [city, setCity] = useState('Maharashtra');
    // const [checkIn, setCheckIn] = useState('2024-08-20');
    // const [checkOut, setCheckOut] = useState('2024-08-21');
    const [sortOrder, setSortOrder] = useState('');
     const [searchQuery, setSearchQuery] = useState('');
     const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
     const navigate = useNavigate(); // Initialize useNavigate

    const top08States = [
        { title: 'Goa' },
        { title: 'Delhi' },
        { title: 'Maharashtra' },
        { title: 'Gujarat' },
        { title: 'Uttar Pardesh' },
        { title: "Rajasthan" },
        { title: 'Punjab' },
        {
          title: 'Bihar',
         
        },];


        const handleSearch = async () => {
            const minPrice = priceRange.split(' ')[1];
            const maxPrice = priceRange.includes('+') ? null : priceRange.split(' ')[4];
            try {
                const data = await searchHotels({
                    stateLocation: city,
                    adults: adults,
                    children: childrens,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    dateIn: checkIn,
                    dateOut: checkOut,
                });
                setHotels(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching hotels data", error);
            }
           
           
        };
    
        const handleSortOrderChange = async (order) => {
            const minPrice = priceRange.split(' ')[1];
            const maxPrice = priceRange.includes('+') ? null : priceRange.split(' ')[4];
            try {
                const data = await sortByPrice(order, {
                    stateLocation: city,
                    adults: adults,
                    children: childrens,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    dateIn: checkIn,
                    dateOut: checkOut,
                });
                setHotels(data);
                console.log(data);
            } catch (error) {
                console.error(`Error fetching hotels data by ${order} price`, error);
            }
        };
    
        const handleUserRating = async () => {
            const minPrice = priceRange.split(' ')[1];
            const maxPrice = priceRange.includes('+') ? null : priceRange.split(' ')[4];
            try {
                const data = await getHotelsByUserRating({
                    stateLocation: city,
                    adults: adults,
                    children: childrens,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    dateIn: checkIn,
                    dateOut: checkOut,
                });
                setHotels(data);
                console.log(data);
            } catch (error) {
                console.error(`Error fetching hotels data by price`, error);
            }
        };
    
        const handleSearchBar = async () => {
            if (searchQuery.trim() === '') {
                handleSearch();
                setTabValue(0);
                return;
            }
            const minPrice = priceRange.split(' ')[1];
            const maxPrice = priceRange.includes('+') ? null : priceRange.split(' ')[4];
            try {
                const data = await searchHotelsByName({
                    stateLocation: city,
                    adults,
                    children:childrens,
                    minPrice,
                    maxPrice,
                    dateIn: checkIn,
                    dateOut: checkOut,
                    hotelNames: searchQuery,
                });
                setHotels(data);
                console.log(data);
                setTabValue(0);
            } catch (error) {
                console.error('Error fetching hotels data by search query', error);
            }
        };

        


        useEffect(() => {
            handleSearch();
        }, []);// Run once when the component mounts





        const handleTabChange = (event, newValue) => {
            setTabValue(newValue);
            if (newValue === 1) {
                handleUserRating();
                setSortOrder('userRating');
            } else if (newValue === 2) {
                handleSortOrderChange('desc');
                setSortOrder('high');
            } else if (newValue === 3) {
                handleSortOrderChange('asc');
                setSortOrder('low');
            } else {
                setSortOrder('');
                handleSearch();
            }
        };

const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};
const handleRoomsChange = (event) => {
    setRooms(event.target.value);
};

const handleAdultsChange = (event) => {
    setAdults(event.target.value);
};

const handleChildrenChange = (event) => {
    setChildrens(event.target.value);
};


const handlePriceClick = (event) => {
    setPriceAnchorEl(event.currentTarget);
};

const handlePriceClose = () => {
    setPriceAnchorEl(null);
};

const handlePriceSelect = (price) => {
    setPriceRange(price);
    setPriceAnchorEl(null);
};
const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
};

const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
        handleSearchBar();
    }
};

const handleSearchIconClick = () => {
    handleSearchBar();
};


const handleAvatarClick = (event) => {
    setAvatarAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarAnchorEl(null);
  };

  const handleProfileMenuClick = (option) => {
    if (option === 'profile') {
        navigate('/profile');
        // Handle profile click
    } else if (option === 'logout') {
        // Handle logout click
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId'); 
        localStorage.removeItem('token');// Remove the token from localStorage
        navigate('/sign'); // Redirect to the SignUpLogin page
    }
    handleAvatarClose();
};




  return (
   
   
        <Box>
           
  <Grid container alignItems="center">
  <Grid item xs={12} >
    {/* Header1 */}
  <AppBar position="static" sx={{ background:'white',pt:1}}>
        <Toolbar>
        <LogoContainer>
      <LogoText color="textPrimary">Book</LogoText>
      <LogoTrip className="logo-trip">My</LogoTrip>
      <LogoText color="textPrimary">Trip</LogoText>
      <LogoDot className="logo-dot">.</LogoDot>
    </LogoContainer>
    <Box sx={{ display: 'flex', alignItems: 'center', ml: 5 }}>
    <IconWithLabel src='/logo/airplane.png' alt="airoplane" label="Flights" />
    <IconWithLabel src='/logo/residential.png' alt="Chair Icon"  label="Hotels"/>
    <IconWithLabel src='/logo/homestay.png' alt="Airplane Icon"   label="Homestays" />
    <IconWithLabel src='/logo/train.png' alt="Bus Icon"  label="Trains"  />
    <IconWithLabel src='/logo/bus.png' alt="Airplane Icon"   label="Buses" />
    <IconWithLabel src='/logo/cab.png' alt="Cab Icon"  label="Cabs" />
    <IconWithLabel src='/logo/chair.png' alt="Airplane Icon" label="Holidays" />
   
              </Box>
              <Box sx={{ marginLeft: 'auto' }}>
              <IconButton onClick={handleAvatarClick}>
                <Avatar alt="User" src="/static/images/avatar/1.jpg" />
              </IconButton>
              <Menu
                anchorEl={avatarAnchorEl}
                open={Boolean(avatarAnchorEl)}
                onClose={handleAvatarClose}
              >
                <MenuItem onClick={() => handleProfileMenuClick('profile')}>My Profile</MenuItem>
                <MenuItem onClick={() => handleProfileMenuClick('logout')}>Logout</MenuItem>
              </Menu>
            </Box>
         
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
     

</Grid>
{/* </Grid> */}
 


            {/* Header2 */}
            {/* <Grid container alignItems="center"> */}
            <Grid item xs={12}>
                <AppBar position="sticky" sx={{ zIndex: 1100, background: 'linear-gradient(180deg, #051320, #0c2540)' }}>
                        <Toolbar>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <Autocomplete
                                    id="size-small-filled"
                                    size="small"
                                    options={top08States}
                                    getOptionLabel={(option) => option.title}
                                    defaultValue={top08States[0]}
                                     isOptionEqualToValue={(option, value) => option.title === value.title}
                                    sx={{ maxWidth: "200px" }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="filled"
                                            label="CITY, AREA OR PROPERTY"
                                            placeholder="Favorites"
                                            InputProps={{ ...params.InputProps, disableClearable: true }}
                                            sx={{
                                                '& .MuiInputLabel-root': {
                                                    color: '#0084ff',
                                                },
                                                '& .MuiFilledInput-input': {
                                                    color: '#fff',
                                                },
                                                '& .MuiFilledInput-root': {
                                                    backgroundColor: '#30414f',
                                                },
                                                width: '200px'
                                            }}
                                        />
                                    )}
                                    onChange={(event, newValue) => setCity(newValue ? newValue.title : '')}
                                />
                                <TextField
                                    label="CHECK-IN"
                                    variant="filled"
                                    size="small"
                                    type="date"
                                    defaultValue={checkIn}
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: '#0084ff',
                                        },
                                        '& .MuiFilledInput-input': {
                                            color: '#fff',
                                        },
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: '#30414f',
                                        },
                                        marginLeft: 2,
                                        marginRight: 2,
                                    }}
                                    onChange={(event) => setCheckIn(event.target.value)}
                                />
                                <TextField
                                    label="CHECK-OUT"
                                    variant="filled"
                                    size="small"
                                    type="date"
                                    defaultValue={checkOut}
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: '#0084ff',
                                        },
                                        '& .MuiFilledInput-input': {
                                            color: '#fff',
                                        },
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: '#30414f',
                                        },
                                    }}
                                    onChange={(event) => setCheckOut(event.target.value)}
                                />
                                <TextField
                                    label="ROOMS & GUESTS"
                                    variant="filled"
                                    size="small"
                                    value={`${rooms} Room${rooms > 1 ? 's' : ''}, ${adults} Adult${adults > 1 ? 's' : ''}, ${childrens} Children`}
                                    onClick={handleClickOpen}
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: '#0084ff',
                                        },
                                        '& .MuiFilledInput-input': {
                                            color: '#fff',
                                        },
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: '#30414f',
                                        },
                                        marginLeft: 2,
                                        marginRight: 2,
                                        cursor: 'pointer'
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Rooms & Guests</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Select the number of rooms and guests.
                                        </DialogContentText>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                                            <FormControl>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Typography>Room</Typography>
                                                    <Select value={rooms} onChange={handleRoomsChange} sx={{ ml: 32, width: '90px', height: '40px' }}>
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                    </Select>
                                                </Box>
                                            </FormControl>
                                            <FormControl>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Typography>Adults</Typography>
                                                    <Select value={adults} onChange={handleAdultsChange} sx={{ ml: 32, width: '90px', height: '40px' }}>
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                    </Select>
                                                </Box>
                                            </FormControl>
                                            <FormControl>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Typography>Children</Typography>
                                                    <Select value={childrens} onChange={handleChildrenChange} sx={{ ml: 30, width: '90px', height: '40px' }}>
                                                        <MenuItem value={0}>0</MenuItem>
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                    </Select>
                                                </Box>
                                            </FormControl>
                                        </Box>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button variant="contained" onClick={handleClose}>Apply</Button>
                                    </DialogActions>
                                </Dialog>
                                <TextField
                                    label="PRICE PER NIGHT"
                                    variant="filled"
                                    size="small"
                                    value={priceRange}
                                    onClick={handlePriceClick}
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: '#0084ff',
                                        },
                                        '& .MuiFilledInput-input': {
                                            color: '#fff',
                                        },
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: '#30414f',
                                        },
                                        cursor: 'pointer'
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <Menu
                                    id="price-menu"
                                    anchorEl={priceAnchorEl}
                                    open={Boolean(priceAnchorEl)}
                                    onClose={handlePriceClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'price-textfield',
                                    }}
                                >
                                    <MenuItem onClick={() => handlePriceSelect('₹ 0 - ₹ 1500')}>₹ 0 - ₹ 1500</MenuItem>
                                    <MenuItem onClick={() => handlePriceSelect('₹ 1500 - ₹ 2500')}>₹ 1500 - ₹ 2500</MenuItem>
                                    <MenuItem onClick={() => handlePriceSelect('₹ 2500 - ₹ 5000')}>₹ 2500 - ₹ 5000</MenuItem>
                                    <MenuItem onClick={() => handlePriceSelect('₹ 5000 - ₹ 10000')}>₹ 5000+</MenuItem>
                                </Menu>
                                <Button variant="contained" sx={{ ml: 3, width: '150px', height: '43px', borderRadius: '32px' }} onClick={handleSearch}>Search</Button>
                            </Box>
                        </Toolbar>
                    </AppBar>
             
            </Grid>
        {/* </Grid> */}


            {/* Header3 */}
           
            {/* <Grid container> */}
                <Grid item xs={12} >
                    <AppBar position="sticky" color="inherit" sx={{ top: '150px', background: 'linear-gradient(180deg, #0c2540, #174476)' }}>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ color: '#fff' }}>
                                247 Properties In {city}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Grid>
            {/* </Grid> */}
 
            {/* Header4 */}
            {/* <Grid container> */}
                <Grid item xs={12} >
                    <AppBar position="sticky" color="inherit" sx={{ top: '500px', background: 'linear-gradient(269.96deg, #e1ebf7, #daf8fe)' }}>
                        <Toolbar>

                            <Typography variant="h7" component="div" sx={{ color: 'black' }}>
                                SORT BY:
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
                                <Tabs value={tabValue} onChange={handleTabChange} centered  >
                                    <Tab label="Popular" />
                                    <Tab label="User Rating (Highest First)" sx={{ ml: 4 }} />
                                    <Tab label="Price (High First)" sx={{ ml: 4 }} />
                                    <Tab label="Price (Low First)" sx={{ ml: 4 }} />
                                </Tabs>
                                <Search>
                                <StyledInputBase
                                    placeholder="Search for locality / hotel name"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    onKeyDown={handleSearchKeyDown}
                                />
                                <SearchIconWrapper onClick={handleSearchIconClick}>
                                    <SearchIcon sx={{ color: 'black' }} />
                                </SearchIconWrapper>
                            </Search>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Grid>

            {/* Main Content */}
            <Box>
                <HotelList hotels={hotels} checkIn={checkIn} checkOut={checkOut} setHotels={setHotels}  priceRange={priceRange} setPriceRange={setPriceRange} />
            </Box>
        </Box>
   
  );
};

export default Header;
