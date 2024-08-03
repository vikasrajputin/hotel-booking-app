import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography, Card, CardMedia, Button, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export const PropertyRules = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const sectionRef = sections[newValue];
        if (sectionRef && sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const restrictionsRef = React.useRef(null);
    const guestProfileRef = React.useRef(null);
    const idProofRelatedRef = React.useRef(null);

    const sections = {
        1: restrictionsRef,
        2: guestProfileRef,
        3: idProofRelatedRef,
    };

    return (
        
        <Box sx={{ padding: '20px', border: '1px solid silver', margin: "80px", borderRadius: "10px",  background: 'white'  }}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography component="div" variant="h5" sx={{ fontSize: '23px', lineHeight: '30px', color: '#000', fontWeight: 'bold' }}>
                        Property Rules
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                        Check-In:12 PM &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Check-Out:10 AM
                    </Typography>
                    <Divider orientation="horizontal" flexItem />
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', mt: 2, gap: 30 }}>
                        <Box>
                            <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Guests below 18 years of age are not allowed at the property.</a></li>
                            <li><a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>Passport, Aadhar and Driving License are accepted as ID proof(s)</a></li>
                        </Box>
                        <Box>
                            <li><a href="#why" style={{ textDecoration: 'none', color: 'inherit' }}>Pets are not allowed.</a></li>
                            <li><a href="#gallery" style={{ textDecoration: 'none', color: 'inherit' }}>Outside food is not allowed</a></li>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} >
                   
                    <Box sx={{ gap: 6, marginTop: '10px' }}>
        <Button 
            variant="outlined" 
            onClick={handleClickOpen}
            sx={{
                color: 'black', // Text color
                borderColor: 'black', // Border color
                '&:hover': {
                    borderColor: 'black', // Border color on hover
                    backgroundColor: 'transparent', // Prevent background color change on hover
                },
            }}
        >
            Restrictions
        </Button>
        <Button 
            variant="outlined" 
            onClick={handleClickOpen}
            sx={{
                color: 'black', // Text color
                borderColor: 'black', // Border color
                '&:hover': {
                    borderColor: 'black', // Border color on hover
                    backgroundColor: 'transparent', // Prevent background color change on hover
                },
                marginLeft:'10px'
            }}
        >
            Guest Profile
        </Button>
        <Button 
            variant="outlined" 
            onClick={handleClickOpen}
            sx={{
                color: 'black', // Text color
                borderColor: 'black', // Border color
                '&:hover': {
                    borderColor: 'black', // Border color on hover
                    backgroundColor: 'transparent', // Prevent background color change on hover
                },
                   marginLeft:'10px'
            }}
        >
            ID Proof Related
        </Button>
    </Box>
                    
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"House Rules & Information"}
                        </DialogTitle>
                        <DialogContent>
                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab label="Restrictions" value="1" />
                                            <Tab label="Guest Profile" value="2" />
                                            <Tab label="ID Proof Related" value="3" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <Box ref={restrictionsRef}>
                                            <Typography component="div" variant="h5" sx={{ fontSize: '23px', lineHeight: '30px', color: '#000', fontWeight: 'bold' }}>
                                                Restrictions
                                            </Typography>
                                            <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Guests below 18 years of age are not allowed at the property.</a></li>
                                            <li><a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>Passport, Aadhar and Driving License are accepted as ID proof(s)</a></li>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <Box ref={guestProfileRef}>
                                            <Typography component="div" variant="h5" sx={{ fontSize: '23px', lineHeight: '30px', color: '#000', fontWeight: 'bold' }}>
                                                Guest Profile
                                            </Typography>
                                            <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Guests below 18 years of age are not allowed at the property.</a></li>
                                            <li><a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>Passport, Aadhar and Driving License are accepted as ID proof(s)</a></li>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value="3">
                                        <Box ref={idProofRelatedRef}>
                                            <Typography component="div" variant="h5" sx={{ fontSize: '23px', lineHeight: '30px', color: '#000', fontWeight: 'bold' }}>
                                                ID Proof Related
                                            </Typography>
                                            <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Guests below 18 years of age are not allowed at the property.</a></li>
                                            <li><a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>Passport, Aadhar and Driving License are accepted as ID proof(s)</a></li>
                                        </Box>
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </DialogContent>
                    </Dialog>
                </Grid>
            </Grid>
        </Box>
    )
}
