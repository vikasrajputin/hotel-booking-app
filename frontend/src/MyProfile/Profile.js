import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Paper, Avatar, Divider, Select, MenuItem, FormControl, InputLabel, Button,AppBar,Toolbar,IconButton,  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow } from '@mui/material';
import { fetchUserInfo, fetchUserBookingsHistory, fetchUserBookingsByDateRange } from '../services/commonServices';

import { styled, width } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


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
)








const Profile = () => {
  const [bookingData, setBookingData] = useState([]);
  const [userInfo, setUserInfo] = useState({ userNames: '', userEmail: '' });
  const [monthstart, setMonthStart] = useState('');
  const [monthend, setMonthEnd] = useState('');
  const [day, setDay] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);
  const navigate = useNavigate(); // Add this line
  // Fetch user ID from local storage
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      loadUserData(userId);
    }
  }, []);

  const loadUserData = async (userId) => {
    try {
      const userInfo = await fetchUserInfo(userId);
      setUserInfo(userInfo);

      const bookingHistory = await fetchUserBookingsHistory(userId);
      setBookingData(bookingHistory);
      setFilteredBookings(bookingHistory);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleMonthStartChange = (event) => {
    setMonthStart(event.target.value);
  };
  const handleMonthEndChange = (event) => {
    setMonthEnd(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const filterBookings = async () => {
    const userId = localStorage.getItem('userId');
    const currentYear = new Date().getFullYear();
    try {
      if (monthstart && monthend) {
        const bookingsByDateRange = await fetchUserBookingsByDateRange(userId, monthstart, monthend, currentYear);
        setFilteredBookings(bookingsByDateRange);
      } else {
        setFilteredBookings(
          bookingData.filter(booking => {
            const bookingDate = new Date(booking.checkInDate);
            return (!monthstart || bookingDate.getMonth() + 1 >= parseInt(monthstart)) &&
                   (!monthend || bookingDate.getMonth() + 1 <= parseInt(monthend)) ;
                  
          })
        );
      }
    } catch (error) {
      console.error('Error filtering bookings:', error);
    }
  };

  const handleBackButtonClick = () => {
    navigate('/hotels' ); // Navigate to the room details page
};




  return (
    <Box>
      <Grid container alignItems="center">
 <Grid item xs={12} >
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
                            <IconButton onClick={handleBackButtonClick}>
                                <ArrowBackIcon /> {/* Replace with your back arrow icon */}
                            </IconButton>
                        </Box>
         
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      </Grid>
      </Grid> 
    <Grid container spacing={3} sx={{ padding: 3, justifyContent: 'center' }}>
      {/* User Info Section */}
      <Grid item xs={3} sm={6} md={3}>
        <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar alt="User Avatar" sx={{ width: 100, height: 100, marginBottom: 2 }}>
              {userInfo.userNames ? userInfo.userNames.charAt(0) : ''}
            </Avatar>
            <Typography variant="h6">{userInfo.userNames}</Typography>
            <Typography variant="body1">{userInfo.userEmail}</Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Booking History Section */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 2, margin: 5 }}>
          <Typography variant="h6" gutterBottom>
            Booking History
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="month-label">Month Start</InputLabel>
              <Select
                labelId="month-label"
                id="month start"
                value={monthstart}
                label="Month"
                onChange={handleMonthStartChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={1}>January</MenuItem>
                <MenuItem value={2}>February</MenuItem>
                <MenuItem value={3}>March</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>August</MenuItem>
                <MenuItem value={9}>September</MenuItem>
                <MenuItem value={10}>October</MenuItem>
                <MenuItem value={11}>November</MenuItem>
                <MenuItem value={12}>December</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="month-label">Month End</InputLabel>
              <Select
                labelId="month-label"
                id="month end"
                value={monthend}
                label="Month"
                onChange={handleMonthEndChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={1}>January</MenuItem>
                <MenuItem value={2}>February</MenuItem>
                <MenuItem value={3}>March</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>August</MenuItem>
                <MenuItem value={9}>September</MenuItem>
                <MenuItem value={10}>October</MenuItem>
                <MenuItem value={11}>November</MenuItem>
                <MenuItem value={12}>December</MenuItem>
              </Select>
            </FormControl>
           
            <Button variant="contained" onClick={filterBookings}>Filter</Button>
          </Box>
          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="booking history table">
                                <TableHead>
                                    <TableRow>
                                      
                                        <TableCell>Hotel Name</TableCell>
                                        <TableCell>City</TableCell>
                                        <TableCell>Check-in Date</TableCell>
                                        <TableCell>Check-out Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredBookings.map((booking) => (
                                        <TableRow key={booking.id}>
                                           
                                            <TableCell>{booking.hotelName}</TableCell>
                                            <TableCell>{booking.cityLocation}</TableCell>
                                            <TableCell>{booking.checkInDate}</TableCell>
                                            <TableCell>{booking.checkOutDate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
        </Paper>
      </Grid>
    </Grid>
    </Box>
  );
};

export default Profile;
