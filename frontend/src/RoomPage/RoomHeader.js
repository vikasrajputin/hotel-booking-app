import React, { useState,useEffect  } from 'react';
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
    FormControlLabel,
    Avatar,
    IconButton,
    Switch
} from '@mui/material';
import { styled, width } from '@mui/system';
import Menu from '@mui/material/Menu';


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





export const RoomHeader = () => {
    

    const [tabValue, setTabValue] = useState(0);
    const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(1);
    const [priceAnchorEl, setPriceAnchorEl] = useState(null);
   const [priceRange, setPriceRange] = useState('₹ 0 - ₹ 1500');
    const [city, setCity] = useState('Maharashtra');
    const [checkIn, setCheckIn] = useState('2024-08-20');
    const [checkOut, setCheckOut] = useState('2024-08-21');
    const [sortOrder, setSortOrder] = useState('');
    const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);

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
            setChildren(event.target.value);
        };
        
        
        const handlePriceClick = (event) => {
            setPriceAnchorEl(event.currentTarget);
        };
        
        const handlePriceClose = () => {
            setPriceAnchorEl(null);
        };
        
        const handlePriceSelect = (price) => {
        
        };
        
        const handleAvatarClick = (event) => {
            setAvatarAnchorEl(event.currentTarget);
          };
        
          const handleAvatarClose = () => {
            setAvatarAnchorEl(null);
          };
        
          const handleProfileMenuClick = (option) => {
            if (option === 'profile') {
              // Handle profile click
            } else if (option === 'logout') {
              // Handle logout click
            }
            handleAvatarClose();
          };
    
  return (
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
                                      defaultValue={top08States[2]}
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
                                      value={`${rooms} Room${rooms > 1 ? 's' : ''}, ${adults} Adult${adults > 1 ? 's' : ''}, ${children} Children`}
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
                                                      <Select value={children} onChange={handleChildrenChange} sx={{ ml: 30, width: '90px', height: '40px' }}>
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
                                      <MenuItem onClick={() => handlePriceSelect('₹ 5000+')}>₹ 5000+</MenuItem>
                                  </Menu>
                                  <Button variant="contained" sx={{ ml: 3, width: '150px', height: '43px', borderRadius: '32px' }} >Search</Button>
                              </Box>
                          </Toolbar>
                      </AppBar>
               
              </Grid>
              </Grid>
  )
}
