import React from 'react';
import { styled } from '@mui/system';
import Rating from '@mui/material/Rating';
import {
    Box,
    Grid,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    TextField,
} from '@mui/material';

// Styled component for the image
const Image = styled('div')({
    backgroundImage: `url(images/ocean.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    width: '100%',
});

const ImageContainer = styled(Box)(({ theme }) => ({
    height: '75vh', // Adjust initial height for large screens
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        height: '50vh', // Adjust height for medium screens
    },
    [theme.breakpoints.down('sm')]: {
        height: '30vh', // Adjust height for small screens
    },
}));

const CustomBox = styled(Box)(({ theme }) => ({
    border: '1px solid silver',
    borderRadius: theme.shape.borderRadius,
    // margin: theme.spacing(1), // Margin to add spacing
    padding: theme.spacing(1), // Padding inside the box
    display: 'flex',
    flexDirection: 'column',
    width: '100%', // Make width responsive
    [theme.breakpoints.up('sm')]: {
        width: 'auto', // Adjust width for larger screens
    },
}));

const CustomLabel = styled('label')({
    marginBottom: '8px', // Space between label and input
    fontSize: '16px',
});

const CustomInput = styled('input')(({ theme }) => ({
    padding: theme.spacing(1),
    fontSize: '16px',
    // borderRadius: theme.shape.borderRadius,
    // border: '1px solid silver',
}));

export const Home = () => {
    return (
        <Box sx={{ width: '100%', margin: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <ImageContainer>
                <Image />
            </ImageContainer>

            <Box sx={{ width: '100%', margin: 'auto', textAlign: 'center', marginTop: "-390px" }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={10} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', pb: 10, pt: 10, borderRadius: '8px'}}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                            <CustomBox>
                                <CustomLabel htmlFor="location">Location</CustomLabel>
                                <CustomInput id="location" type="text"
                                
                                defaultValue="GOA" /> 
                            </CustomBox>
                            <CustomBox>
                                <CustomLabel htmlFor="check-in">Check-In</CustomLabel>
                                <CustomInput id="check-in" type="date" defaultValue="01/25/2024" />
                            </CustomBox>
                            <CustomBox>
                                <CustomLabel htmlFor="check-out">Check-Out</CustomLabel>
                                <CustomInput id="check-out" type="date" defaultValue="Default Value" />
                            </CustomBox>
                            <CustomBox>
                                <CustomLabel htmlFor="rooms-guests">Rooms & Guests</CustomLabel>
                                <CustomInput id="rooms-guests" type="text" defaultValue="1 Room 2 Adults" />
                            </CustomBox>
                            <CustomBox>
                                <CustomLabel htmlFor="price-per-night">Price Per Night</CustomLabel>
                                <CustomInput id="price-per-night" type="number" defaultValue="1000" />
                            </CustomBox>
                        </Box>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                            Search
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={10} sx={{ display: 'flex', justifyContent: 'space-around', mt: 5, backgroundColor: 'white', pb: 6, pt: 4, borderRadius: '8px' }}>
                    <Card sx={{ maxWidth: 345, mb: 4 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="images/hotels01.jpg"
                                    title="Hyderabad"
                                />
                                <CardContent>
                                <Grid container justifyContent="space-between">
                                    <Grid item xs={6}>
                                        <Typography gutterBottom variant="h6" component="div">
                                            HYDERABAD
                                        </Typography>
                                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                                    </Grid>
                                    <Grid item xs={6} textAlign="right">
                                        <Typography gutterBottom variant="h6" component="div">
                                            4000
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Per night
                                        </Typography>
                                    </Grid>
                                </Grid>
                               
                            </CardContent>
                        </Card>

                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image="images/hotels04.jpg"
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    MUMBAI
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>

                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image="images/hotels03.jpg"
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    GOA
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Home;
