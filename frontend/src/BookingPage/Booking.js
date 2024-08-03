import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography, List, ListItem, ListItemText, Divider, ListSubheader, Chip, FormControl, InputLabel, Select, MenuItem, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,AppBar,Toolbar,Menu,Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useBooking } from '../contexts/BookingContext';
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


export const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate

    const { hotel } = location.state || {};
    const { roomType } = location.state || {};
    const { adjustedPrice } = location.state || {};
    const { room } = location.state || {};


    const [open, setOpen] = useState(false);
    const [guests, setGuests] = useState([]);
    const { city, checkIn, checkOut, rooms, adults, childrens, priceRange } = useBooking();
    const [guestDetails, setGuestDetails] = useState({
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        mobile: ''
    });




    const [totalAmount, setTotalAmount] = useState({
        totalDay: 0,
        totalDayRoomPriceCount: 0,
        totalDiscount: 0,
        priceAfterDiscount: 0,
        taxesAdd: 0,
        finalPrice: 0
    });

    useEffect(() => {
        if (checkIn && checkOut && rooms && priceRange) {
            const fetchPrice = async () => {
                const request = {
                    checkInTime: checkIn,
                    checkOutTime: checkOut,
                    totalRoom: room,
                    totalPrice: adjustedPrice
                };
                try {
                    const response = await axios.post('http://localhost:8081/calculate', request);
                    setTotalAmount(response.data);
                } catch (error) {
                    console.error('Error calculating price:', error);
                }
            };
            fetchPrice();
        }
    }, [checkIn, checkOut, room, adjustedPrice]);







    const handleChange = (e) => {
        const { name, value } = e.target;
        setGuestDetails({
            ...guestDetails,
            [name]: value
        });
    };

    const handleAddGuest = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const { title, firstName, lastName, email, mobile } = guestDetails;
        if (title && firstName && lastName && email && mobile) {
            setGuests([...guests, guestDetails]);
            setGuestDetails({ title: '', firstName: '', lastName: '', email: '', mobile: '' });
            setOpen(false);
        } else {
            alert("Please fill in all guest details");
        }
    };

    const handleRemoveGuest = (index) => {
        const updatedGuests = guests.filter((_, i) => i !== index);
        setGuests(updatedGuests);
    };
    const formatDate = (dateString) => {
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}T11:00:00`; // Default time is 11:00:00
    };

    const handlePayNow = async () => {
        if (guests.length !== adults+childrens) {
            alert(`Total number of guests Not must match the number of adults (${adults+childrens})`);
            return;
        }

        const userId = localStorage.getItem('userId');
        const request = {
            numOfAdults: adults,
            numOfChildren: childrens,
            paymentOption: "BANK_TRANSFER",
            checkInTime: formatDateTime(checkIn),
            checkOutTime: formatDateTime(checkOut),
            guestInfos: guests.map(guest => ({
                firstName: guest.firstName,
                lastName: guest.lastName,
                age: 35, // Replace with actual age if available
                moibleNo: guest.mobile
            }))
        };

        try {
            const response = await axios.post(`http://localhost:8081/hotel/${hotel.hotelId}/room/${hotel.roomId}/user/${userId}/booking`, request);
            alert('Booking successful!');
        } catch (error) {
            console.error('Error making booking:', error);
            alert('Error making booking. Please try again.');
        }
    };


    

    const handleBackButtonClick = () => {
        navigate('/roomDetails', { state: { hotel } }); // Navigate to the room details page
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
        <Box sx={{  padding: '10px', margin: '30px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={9}>
                    <Box sx={{ border: '1px solid silver', padding: '10px',borderRadius:'8px', boxShadow: 2 }}>
                        <Typography component="div" variant="h5" sx={{ fontSize: '23px', lineHeight: '30px', color: '#000', fontWeight: 'bold' }}>
                           {hotel.hotelName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="div" sx={{ mb: 2 }}>
                            Property No. L-74, Situated in the extended Abadi of Village Mahipalpur, New Delhi-110037, Delhi, India
                        </Typography>
                        <Divider  />
                        <Grid container spacing={2} alignItems="center" mt={'10px'} mb={'10px'}>
                            <Grid item xs={2}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary" component="div">
                                        Check-In: 12 PM
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" component="div">
                                    {formatDate(checkIn)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" component="div">
                                        12 PM
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={2}>
                            <Chip label={`${totalAmount.totalDay} Night`} sx={{ background: '#f2f2f2', borderRadius: '4px' }} />
                            </Grid>
                            <Grid item xs={2}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary" component="div">
                                        Check-Out: 11 AM
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" component="div">
                                    {formatDate(checkOut)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" component="div">
                                        11 AM
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body2" color="text.secondary" component="div" sx={{ mt: 2 }}>
                                {hotel.perNightRoom} Nights | {adults} Adults | {childrens} Children | {room} Room
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider/>
                        <Grid container spacing={2} alignItems="center" pt={"20px"}>
                            <Grid item xs={12}>
                                <Box>
                                    <Typography component="div" variant="h5" sx={{ fontSize: '23px', lineHeight: '30px', color: '#000', fontWeight: 'bold' }}>
                                    {roomType} Room
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" component="div">
                                    Fits {adults} Adults | {childrens} Children | {room} Room
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mt: 1, color: '#4a4a4a', fontSize: '14px', fontWeight: 900, lineHeight: '17px', mt: 1 }}>
                                        <ul>
                                            <li>No meals included</li>
                                            <li>Free Cancellation till check-in</li>
                                        </ul>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box>
                        <List sx={{ boxShadow: 3, borderRadius: '8px' }}>
                            <ListItem>
                                <ListItemText primary="Price Breakup" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={` ${hotel.perNightRoom} Room x ${totalAmount.totalDay} Night`} /><span style={{ float: 'right' }}>₹ {totalAmount.totalDayRoomPriceCount}</span>
                            </ListItem>
                            <Divider component="li" />
                            <ListItem>
                                <ListItemText primary="Total Discount" /><span style={{ float: 'right' }}>₹ {totalAmount.totalDiscount}</span>
                            </ListItem>
                            <Divider component="li" />
                            <ListItem>
                                <ListItemText primary="Price after Discount" /><span style={{ float: 'right' }}>₹ {totalAmount.priceAfterDiscount}</span>
                            </ListItem>
                            <Divider component="li" />
                            <ListItem>
                                <ListItemText primary="Taxes & Service Fees" /> <span style={{ float: 'right' }}>₹ {totalAmount.taxesAdd}</span>
                            </ListItem>
                            <Divider component="li" />
                            <ListSubheader>
                                Total Amount to be paid <span style={{ float: 'right' }}>₹ {totalAmount.finalPrice}</span>
                            </ListSubheader>
                        </List>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ mt: 4,  border: '1px solid silver', padding: '10px',borderRadius:'8px',boxShadow: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography component="div" variant="h5" sx={{ fontSize: '23px', lineHeight: '30px', color: '#000', fontWeight: 'bold', mb: 2 }}>
                            Guest Details
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>Title</InputLabel>
                                        <Select
                                            label="Title"
                                            name="title"
                                            value={guestDetails.title}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="Mr">Mr</MenuItem>
                                            <MenuItem value="Mrs">Mrs</MenuItem>
                                            <MenuItem value="Ms">Ms</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        variant="outlined"
                                        value={guestDetails.firstName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        variant="outlined"
                                        value={guestDetails.lastName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Email ID"
                                        name="email"
                                        variant="outlined"
                                        value={guestDetails.email}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Mobile Number"
                                        name="mobile"
                                        variant="outlined"
                                        value={guestDetails.mobile}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="link" className="text-button" onClick={handleAddGuest}>Add Guest</Button>
                    </Grid>
                    <Grid item xs={12}>
                        {guests.map((guest, index) => (
                            <Box key={index} sx={{ mt: 1,  border: '1px solid silver', padding: '10px',borderRadius:'8px',boxShadow: 2 , position: 'relative' }}>
                                <IconButton
                                    sx={{ position: 'absolute', top: '5px', right: '5px' }}
                                    onClick={() => handleRemoveGuest(index)}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="body2">
                                    {guest.title} {guest.firstName} {guest.lastName}
                                </Typography>
                                <Typography variant="body2">
                                    Email: {guest.email}
                                </Typography>
                                <Typography variant="body2">
                                    Mobile: {guest.mobile}
                                </Typography>
                            </Box>
                        ))}
                    </Grid>
                </Grid>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Guest</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={3} pt={'10px'}>
                                <FormControl fullWidth>
                                    <InputLabel>Title</InputLabel>
                                    <Select
                                        label="Title"
                                        name="title"
                                        value={guestDetails.title}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="mr">Mr</MenuItem>
                                        <MenuItem value="mrs">Mrs</MenuItem>
                                        <MenuItem value="ms">Ms</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    variant="outlined"
                                    value={guestDetails.firstName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    variant="outlined"
                                    value={guestDetails.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Email ID"
                                    name="email"
                                    variant="outlined"
                                    value={guestDetails.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Mobile Number"
                                    name="mobile"
                                    variant="outlined"
                                    value={guestDetails.mobile}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>




            </Box>
            <Box sx={{ mt: 4,  border: '1px solid silver', padding: '10px',borderRadius:'8px', display: 'flex', justifyContent: 'center', alignItems: 'center',boxShadow: 2 }}>
    <Grid container spacing={2} justifyContent="center">
        <Grid item>
        <Button variant='contained' sx={{ width: '200px', height: '35px', background: 'linear-gradient(93deg, #246497, #0240ab)', mt: 1 }} onClick={handlePayNow}>Pay Now</Button>
        </Grid>
    </Grid>
</Box>

        </Box>
        </Box>
    )
}
