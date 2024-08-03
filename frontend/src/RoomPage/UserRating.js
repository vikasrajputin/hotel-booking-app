import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, Card, CardContent, Divider, Avatar, Button } from '@mui/material';
import { fetchUserRating } from '../services/commonServices'; // Import the fetchUserRating function

export const UserRating = () => {
  const location = useLocation();
  const { hotel } = location.state || {};
  const hotelId = hotel ? hotel.hotelId : null;
  
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
        try {
            if (hotelId) {
                const response = await fetchUserRating(hotelId);
                setRatings(response || []); // Ensure `response` is in the expected format
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setRatings([]);
        }
    };

    fetchReviews();
}, [hotelId]);

  return (
    
    <Box sx={{ padding: '20px', border: '1px solid silver', margin: "80px", borderRadius: "10px",  background: 'white'  }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="div" variant="h5" sx={{ fontSize: '23px', lineHeight: '30px', color: '#000', fontWeight: 'bold' }}>
            User Rating & Reviews
          </Typography>
          <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
        </Grid>

        {ratings.length > 0 ? (
          ratings.map((rating, index) => (
            <Grid item xs={12} key={index}>
              <Card variant="outlined" sx={{ background: 'white' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar>{rating.user.charAt(0)}</Avatar>
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h6">{rating.user}</Typography>
                        <Typography variant="body2" color="text.secondary">{rating.ratingDate}</Typography>
                      </Box>
                    </Box>
                    <Button variant='contained' sx={{ minWidth: '0px', width: '78px', height: '56px', background: 'linear-gradient(93deg, #246497, #0240ab)', borderRadius: '16px' }}>
                      {rating.ratings}
                    </Button>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {rating.comments}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No reviews available</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
