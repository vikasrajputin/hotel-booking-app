import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography, Card, CardMedia, Button,AppBar,Toolbar,IconButton,Avatar,Menu,MenuItem } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { fetchImages } from '../services/commonServices'; // Import the fetchImages function
import { RoomType } from './RoomType';
import { PropertyRules } from './PropertyRules';
import { UserRating } from './UserRating';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
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
  );



export const RoomDetail = () => {






    
    const location = useLocation();
    // const { hotel } = location.state || {};
    const { hotel } = location.state || {};
    const { city, checkIn, checkOut, rooms, adults, childrens, priceRange } = useBooking();
    const navigate = useNavigate(); // Add this line
    const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        const fetchHotelImages = async () => {
            if (hotel) {
                const fetchedImages = await fetchImages(hotel.hotelId, hotel.roomType);
                setImages(fetchedImages);
            }
        };

        fetchHotelImages();
    }, [hotel]);

    if (!hotel) {
        return <Typography variant="h6">No hotel data available</Typography>;
    }


    const handleBookingClick = () => {
        navigate('/booking', { state: { hotel , roomType: hotel.roomType, adjustedPrice: hotel.adjustedPrice, room: hotel.perNightRoom } });
    };

    const handleBackButtonClick = () => {
        navigate('/hotels', { state: { hotel } }); // Navigate to the room details page
    };


    return (
        <Box sx={{ backgroundColor: '#f2f2f2'}}>
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
            <Box sx={{ padding: '20px', border: '1px solid silver', margin: "80px", borderRadius: "10px", background: 'white' }}>
                
                <Grid container spacing={2}>
                    <Grid item xs={6} md={5}>
                        <Typography component="div" variant="h5" sx={{ fontSize: '23px', lineHeight: '30px', color: '#000', fontWeight: 'bold' }}>
                            {hotel.hotelName}
                        </Typography>
                        <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 'none' }}>
                            <CardMedia
                                component="img"
                                image={images[0] ? `data:image/jpeg;base64,${images[0]}` : '/images/room10.jpg'}
                                sx={{ width: 500, height: 280, borderRadius: "4px" }}
                                alt="Main hotel image"
                            />
                        </Card>
                    </Grid>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingLeft: '10px', paddingTop: '45px' }}>
                        {images.slice(1, 3).map((image, index) => (
                            <CardMedia
                                key={index}
                                component="img"
                                image={`data:image/jpeg;base64,${image}`}
                                sx={{ width: 260, height: 132, borderRadius: "4px" }}
                                alt={`Thumbnail ${index + 1}`}
                            />
                        ))}
                    </Box>

                    <Grid item xs={6} md={4}>
                        <Box sx={{ padding: '10px', border: '1px solid black', marginTop: "30px", borderRadius: "10px", gap: 5 }}>
                            <Typography component="div" variant="h5" sx={{ fontSize: '23px', lineHeight: '20px', color: '#000', fontWeight: 'bold' }}>
                                {hotel.roomType} Room
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mt: 1, color: '#0084ff', fontSize: '14px', fontWeight: 700, lineHeight: '17px', mt: 1 }}>
                                <span style={{ color: '#4a4a4a', fontSize: '14px', lineHeight: '17px' }}>Fits {adults} Adults {childrens} children | {hotel.perNightRoom} room</span>
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mt: 1, color: '#4a4a4a', fontSize: '14px', fontWeight: 900, lineHeight: '17px', mt: 1 }}>
                                <ul>
                                    <li>No meals included</li>
                                    <li>Free Cancellation till check-in</li>
                                </ul>
                            </Typography>
                            <Typography variant="h5" color="text.secondary" component="div" sx={{ fontSize: '23px', lineHeight: '20px', color: '#000', fontWeight: 'bold', mt: 1 }}>
                                ₹ {hotel.adjustedPrice}<span style={{ color: '#4a4a4a', fontSize: '14px', lineHeight: '17px', paddingLeft: '10px' }}>+ 549 taxes</span>
                            </Typography>
                            <Button variant='contained' sx={{ width: '200px', height: '35px', background: 'linear-gradient(93deg, #246497, #0240ab)', mt: 1 }} onClick={handleBookingClick}>Book This Now</Button>
                        </Box>

                        <Box sx={{ padding: '10px', border: '1px solid black', marginTop: "20px", borderRadius: "10px" }}>
                            <Typography component="div" variant="h5" sx={{ fontSize: '23px', lineHeight: '20px', color: '#000', fontWeight: 'bold' }}>
                                <Button variant='contained' sx={{ minWidth: '0px', width: '78px', height: '56px', background: 'linear-gradient(93deg, #246497, #0240ab)', borderRadius: '16px' }}>{hotel.averageRating}</Button> Very Good
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Box>
                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mt: 1, color: '#4a4a4a', fontSize: '11px', fontWeight: 900, lineHeight: '17px', mt: 1 }}>
                            Welcome to Hotel Nirvana, a tranquil oasis in the bustling neighborhood of Mahipalpur. Our hotel is strategically located.
                        </Typography>
                    </Box>
                    <Box sx={{ padding: '20px', marginTop: "20px" }}>
                        <Typography component="div" variant="h5" sx={{ fontSize: '23px', lineHeight: '20px', color: '#000', fontWeight: 'bold' }}>
                            Amenities
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, padding: 0, marginTop: 1 }}>
                            <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Restaurant</a></li>
                            <li><a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>Power BackUp</a></li>
                            <li><a href="#service" style={{ textDecoration: 'none', color: 'inherit' }}>Newspaper</a></li>
                            <li><a href="#why" style={{ textDecoration: 'none', color: 'inherit' }}>Housekeeping</a></li>
                            <li><a href="#gallery" style={{ textDecoration: 'none', color: 'inherit' }}>Laundry Service</a></li>
                            <li><a href="#contact" style={{ textDecoration: 'none', color: 'inherit' }}>Free Wi-Fi</a></li>
                        </Box>
                    </Box>
                </Grid>
            </Box>
            <RoomType></RoomType>
            <PropertyRules></PropertyRules>
            <UserRating></UserRating>
        </Box>
    );
};
