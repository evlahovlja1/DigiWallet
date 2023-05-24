import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    }

	return (
        <Box className="home-container">
            <Box className="home-banner-container">
                <Box className="home-bannerImage-container">
                    <img src={BannerBackground} alt=""></img>
                </Box>
                <Box className="home-text-section">
                    <h1 className="primary-heading">
                        Welcome to Digipay!
                    </h1>
                    <p className="primary-text">
                        Faster and smarter way to manage your payment accounts.
                    </p>
                    <button className="secondary-button" onClick={handleGetStarted}>
                        Get Started
                    </button>
                </Box>
                <Box className="home-image-section">
                    <img src={BannerImage} alt="" />
                </Box>
            </Box>
        </Box>
		
	);
};

export default HomePage;
