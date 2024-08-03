import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography, Card, CardMedia, Button, Divider } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchRoomsByHotelNames, fetchImages } from '../services/commonServices';
import { useBooking } from '../contexts/BookingContext';

export const RoomType = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [room, setRooms] = useState([]);
    const [roomImages, setRoomImages] = useState({});
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const location = useLocation();
    const { hotel } = location.state || {};
    const { city, checkIn, checkOut, rooms, adults, childrens, priceRange } = useBooking();

    useEffect(() => {
        if (hotel) {
            const fetchRooms = async () => {
                try {
                    const response = await fetchRoomsByHotelNames({
                        hotelNames: hotel.hotelName,
                        dateIn: checkIn,
                        dateOut: checkOut,
                        adults: adults,
                        children: childrens
                    });
                    setRooms(response);
                } catch (error) {
                    console.error('Error fetching rooms:', error);
                }
            };
            fetchRooms();
        }
    }, [hotel]);

    const fetchImagesForRoomType = async (roomType) => {
        if (hotel && !roomImages[roomType]) {
            try {
                const fetchedImages = await fetchImages(hotel.hotelId, roomType);
                setRoomImages((prev) => ({ ...prev, [roomType]: fetchedImages }));
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }
    };

    if (!hotel) {
        return <Typography variant="h6">No hotel data available</Typography>;
    }


    const handleBookingClick = (roomType,adjustedPrice) => {
        navigate('/booking', { state: { hotel, roomType, adjustedPrice } });
    };



    return (
    
            <Box sx={{ padding: '20px', border: '1px solid silver', margin: "80px", borderRadius: "10px", background: 'white' }}>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Room Type
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Deluxe</MenuItem>
                    <MenuItem onClick={handleClose}>Superdeluxe</MenuItem>
                </Menu>

                {room.map((room) => (
                    <Box key={room.roomType} sx={{ marginTop: "10px" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={4}>
                                <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 'none' }}>
                                    <CardMedia
                                        component="img"
                                        image={roomImages[room.roomType] && roomImages[room.roomType][0] ? `data:image/jpeg;base64,${roomImages[room.roomType][0]}` : '/images/room10.jpg'}
                                        sx={{ width: 500, height: 300, borderRadius: "4px" }}
                                        alt="Main room image"
                                        onLoad={() => fetchImagesForRoomType(room.roomType)}
                                    />
                                </Card>
                                <Typography component="div" variant="h5" sx={{ fontSize: '23px', lineHeight: '20px', color: '#000', fontWeight: 'bold', marginTop: '10px' }}>
                                    {room.roomType} Room
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 1 }}>
                                    <Box>
                                        <li><a href="#" style={{ textDecoration: 'none', color: 'inherit', marginTop: '10px' }}>Restaurant</a></li>
                                        <li><a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>Power BackUp</a></li>
                                        <li><a href="#service" style={{ textDecoration: 'none', color: 'inherit' }}>Newspaper</a></li>
                                    </Box>
                                    <Box>
                                        <li><a href="#why" style={{ textDecoration: 'none', color: 'inherit' }}>Housekeeping</a></li>
                                        <li><a href="#gallery" style={{ textDecoration: 'none', color: 'inherit' }}>Laundry Service</a></li>
                                        <li><a href="#contact" style={{ textDecoration: 'none', color: 'inherit' }}>Free Wi-Fi</a></li>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Box sx={{ padding: '10px', marginTop: "30px", borderRadius: "10px", gap: 5 }}>
                                    <Typography component="div" variant="h5" sx={{ fontSize: '18px', lineHeight: '20px', color: '#000', fontWeight: 'bold' }}>
                                        Room With Free Cancellation
                                    </Typography>
                                    <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Free stay for the kid</a></li>
                                    <li><a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>No meals included</a></li>
                                    <li><a href="#service" style={{ textDecoration: 'none', color: 'inherit' }}>Non-Refundable</a></li>
                                </Box>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Box sx={{ padding: '10px', marginTop: "30px", borderRadius: "10px", gap: 5 }}>
                                    <Typography variant="h5" color="text.secondary" component="div" sx={{ fontSize: '23px', lineHeight: '20px', color: '#000', fontWeight: 'bold', mt: 1 }}>
                                        ₹ {room.adjustedPrice}
                                        <div><span style={{ color: '#4a4a4a', fontSize: '14px', lineHeight: '17px', paddingLeft: '10px' }}>+ 549 taxes & fees /per night</span></div>
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mt: 1, color: '#0084ff', fontSize: '14px', fontWeight: 700, lineHeight: '17px', mt: 1 }}>
                                <span style={{ color: '#4a4a4a', fontSize: '14px', lineHeight: '17px' }}>Fits {adults} Adults {childrens} children | {hotel.perNightRoom} room</span>
                            </Typography>
                                    <Button variant='contained' sx={{ width: '200px', height: '35px', background: 'linear-gradient(93deg, #246497, #0240ab)', mt: 1 }}   onClick={() => handleBookingClick(room.roomType,room.adjustedPrice)}>Book This Now</Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Divider />
                    </Box>
                ))}
            </Box>
      
    );
};
