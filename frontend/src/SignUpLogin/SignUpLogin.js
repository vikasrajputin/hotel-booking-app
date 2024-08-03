import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, FormControlLabel, Checkbox, Button, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signup, login } from '../services/authServices';

export const SignUpLogin = () => {
    const [activeForm, setActiveForm] = useState('signup');
    const [bgImageIndex, setBgImageIndex] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        termsAccepted: false,
    });

    const navigate = useNavigate();

    const bgImages = [
        'https://plus.unsplash.com/premium_photo-1682913629540-3857602b540c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1439130490301-25e322d88054?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1506059612708-99d6c258160e?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setBgImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const handleSwitchForm = (form) => {
        setActiveForm(form);
    };

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const resetFormData = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            termsAccepted: false,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (activeForm === 'signup') {
                if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.termsAccepted) {
                    alert('Please fill out all fields and accept terms.');
                    return;
                }
                await signup(formData);
                alert('Signup successful');
                resetFormData();
                setActiveForm('login');
            } else {
                if (!formData.email || !formData.password) {
                    alert('Please fill out all fields.');
                    return;
                }
                await login(formData);
                alert('Login successful');
                resetFormData();
                navigate('/hotels');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                height: '100vh',
                padding: 0,
                margin: 0,
                backgroundImage: `url(${bgImages[bgImageIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transition: 'background-image 1s ease-in-out',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    maxWidth: '470px',
                    width: '100%',
                    borderRadius: '12px',
                    padding: '20px 30px 50px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        right: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography
                        variant="h5"
                        component="header"
                        align="center"
                        sx={{
                            fontSize: '30px',
                            fontWeight: '600',
                            color: activeForm === 'signup' ? '#fff' : '#333',
                            opacity: activeForm === 'signup' ? 1 : 0.6,
                            cursor: 'pointer',
                        }}
                        onClick={() => handleSwitchForm('signup')}
                    >
                        Signup
                    </Typography>
                    <Typography
                        variant="h5"
                        component="header"
                        align="center"
                        sx={{
                            fontSize: '30px',
                            fontWeight: '600',
                            color: activeForm === 'login' ? '#333' : '#fff',
                            opacity: activeForm === 'login' ? 1 : 0.6,
                            cursor: 'pointer',
                        }}
                        onClick={() => handleSwitchForm('login')}
                    >
                        Login
                    </Typography>
                </Box>

                <Box
                    component={Paper}
                    sx={{
                        mt: '60px',
                        p: '20px',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                        {activeForm === 'signup' && (
                            <>
                                <TextField
                                    variant="outlined"
                                    label="First name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    sx={{
                                        background: 'rgba(255, 255, 255, 0.5)',
                                        borderRadius: '8px',
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    label="Last name"
                                    name="lastName"
                                    required
                                    fullWidth
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    sx={{
                                        background: 'rgba(255, 255, 255, 0.5)',
                                        borderRadius: '8px',
                                    }}
                                />
                            </>
                        )}
                        <TextField
                            variant="outlined"
                            label="Email address"
                            name="email"
                            required
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                            sx={{
                                background: 'rgba(255, 255, 255, 0.5)',
                                borderRadius: '8px',
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Password"
                            name="password"
                            type="password"
                            required
                            fullWidth
                            value={formData.password}
                            onChange={handleChange}
                            sx={{
                                background: 'rgba(255, 255, 255, 0.5)',
                                borderRadius: '8px',
                            }}
                        />
                        {activeForm === 'signup' && (
                            <FormControlLabel
                                control={<Checkbox name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />}
                                label={<Typography sx={{ color: '#fff' }}>I accept all terms & conditions</Typography>}
                                sx={{ color: '#fff' }}
                            />
                        )}
                        {activeForm === 'login' && (
                            <Link href="#" underline="hover" align="right" sx={{ color: '#fff' }}>
                                Forgot password?
                            </Link>
                        )}
                        <Button type="submit" variant="contained" fullWidth>
                            {activeForm === 'signup' ? 'Signup' : 'Login'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};