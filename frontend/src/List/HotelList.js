import React, { useState, useEffect } from 'react';
import { Grid, Checkbox, FormControlLabel, FormGroup, Typography, Box, Card, CardContent, CardMedia, Button } from '@mui/material';
import axios from 'axios';
import { fetchImages } from '../services/commonServices'; // Import the fetchImages function
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useBooking } from '../contexts/BookingContext';

const HotelList = ({ hotels = []}) => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    // State to store images
    const { city, checkIn, checkOut, rooms, adults, childrens, priceRange } = useBooking();

    const [hotelImages, setHotelImages] = useState({});

    

    const handlePriceFilterChange = (event) => {
    
      };
   
    // Handler for star category checkbox change (if needed)
    const handleStarCategoryChange = (event) => {
        // Implement as neededyy
    };

    // Handler for user rating checkbox change (if needed)
    const handleUserRatingChange = (event) => {
        // Implement as needed
    };

   

  // Fetch images for all hotels when component mounts
  useEffect(() => {
    const fetchAllImages = async () => {
        const images = {};
        for (const hotel of hotels) {
            const fetchedImages = await fetchImages(hotel.hotelId, hotel.roomType);
            images[hotel.hotelId] = fetchedImages;
        }
        setHotelImages(images);
    };

    fetchAllImages();
}, [hotels]);
   


const handleUserRating = async () => {
    const minPrice = priceRange.split(' ')[1];
    const maxPrice = priceRange.includes('+') ? null : priceRange.split(' ')[4];
    try {
        const data = await ({
            stateLocation: city,
            adults: adults,
            children: childrens,
            minPrice: minPrice,
            maxPrice: maxPrice,
            dateIn: checkIn,
            dateOut: checkOut,
        });
       
        console.log(data);
    } catch (error) {
        console.error("Error fetching hotels data", error);
    }
   
   
};

   
    



    // Early return if hotels are empty or falsy
    if (!hotels || hotels.length === 0) {
        return (
            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mt: 2 }}>
                No hotels found.
            </Typography>
        );
    }

    return (
        <Box>
            <Grid container>
                <Grid item xs={12} sm={1.9}>
                    

                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                            Star Category
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox onChange={handleStarCategoryChange} />}
                                label="3 Star"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={handleStarCategoryChange} />}
                                label="4 Star"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={handleStarCategoryChange} />}
                                label="5 Star"
                            />
                        </FormGroup>
                    </Box>

                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                            User Rating
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox onChange={handleUserRatingChange} />}
                                label="Excellent: 4.2+"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={handleUserRatingChange} />}
                                label="Very Good: 3.5+"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={handleUserRatingChange} />}
                                label="Good: 3+"
                            />
                        </FormGroup>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box sx={{ mt: 3 }}>
                        {hotels.length > 0 && (
                            <Typography variant="h5" component="div" sx={{ fontSize: '23px', lineHeight: '20px', color: '#000', fontWeight: 'bold' }}>
                                Showing Properties in {hotels[0].stateLocation}
                            </Typography>
                        )}
                    </Box>

                    {hotels.map((hotel, index) => (
                        <React.Fragment key={index}>
                            <Box sx={{ border: "1px solid silver", mt: 2, p: 1, boxShadow: 'none', borderRadius: '4px' }}  onClick={() => navigate('/roomDetails', { state: { hotel } })}>
                                <Grid container>
                                    <Grid item xs={12} sm={3}>
                                        <Box>
                                            <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 'none' }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ width: 260, mb: 1, borderRadius: "4px" }}
                                                        image={hotelImages[hotel.hotelId] ? `data:image/jpeg;base64,${hotelImages[hotel.hotelId][0]}` : ''}
                                                        alt="Main hotel image"
                                                    />
                                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                                        {hotelImages[hotel.hotelId] && hotelImages[hotel.hotelId].slice(1).map((thumbnail, idx) => (
                                                            <CardMedia
                                                                key={idx}
                                                                component="img"
                                                                sx={{ width: 59, height: 60, borderRadius: "4px" }}
                                                                image={`data:image/jpeg;base64,${thumbnail}`}
                                                                alt={`Thumbnail ${idx + 1}`}
                                                            />
                                                        ))}
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box>
                                            <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 'none' }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                                        <Typography component="div" variant="h5" sx={{ fontSize: '23px', lineHeight: '20px', color: '#000', fontWeight: 'bold' }}>
                                                            {hotel.hotelName}
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mt: 1, color: '#0084ff', fontSize: '14px', fontWeight: 700, lineHeight: '17px', mt: 2 }}>
                                                            {hotel.cityLocation} <span>|</span> <span style={{ color: '#4a4a4a', fontSize: '14px', lineHeight: '17px' }}>  {hotel.nearplace}</span>
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mt: 1, color: '#4a4a4a', fontSize: '14px', fontWeight: 900, lineHeight: '17px', mt: 2 }}>
                                                            Rooms In HomeStay <span>|</span> <span style={{ color: '#4a4a4a', fontSize: '12px', fontWeight: 400, lineHeight: '14px' }}>{hotel.rooms} Bedrooms | Sleeps {hotel.adults} Guests</span>
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mt: 1, color: '#00a19c', fontWeight: 400, lineHeight: '14px', mt: 2 }}>
                                                            Free stay for both the kids
                                                        </Typography>
                                                    </CardContent>
                                                </Box>
                                            </Card>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <Box>
                                            <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 'none' }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                                       <Typography component="div" variant="h6" sx={{ fontSize: '16px', color: '#0b58b4', lineHeight: '16px', fontWeight: 900 }}>
    {hotel.reviewTitle ? (
        <>
    {hotel.reviewTitle}<span>&nbsp;</span>
            <Button variant='contained' sx={{ minWidth: '0px', width: '34px', height: '30px', background: 'linear-gradient(93deg, #246497, #0240ab)' }}>
                {hotel.averageRating}
            </Button>
        </>
    ) : (
        'No rating'
    )}
</Typography>
                                                        <Typography variant="body2" color="text.secondary" component="div">
                                                            ({hotel.ratingCount} ratings)
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" component="div" sx={{ mt: 5, textDecoration: 'line-through' }}>₹ 15000</Typography>
                                                        <Typography variant="h5" color="text.secondary" component="div" sx={{ fontSize: '23px', lineHeight: '20px', color: '#000', fontWeight: 'bold' }}>
                                                            ₹ {hotel.adjustedPrice}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" component="div" sx={{ mt: 1 }}>
                                                            + ₹ 176 taxes & fees
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" component="div">
                                                            Per Night for {hotel.perNightRoom} Rooms
                                                        </Typography>
                                                    </CardContent>
                                                </Box>
                                            </Card>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </React.Fragment>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default HotelList;
