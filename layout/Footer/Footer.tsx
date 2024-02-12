import React from 'react';
import { Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <footer style={{marginTop:"50px"}}>
            <Typography variant="body2" align="center">
                © {new Date().getFullYear()} BLOGER
            </Typography>
            <Typography variant="body2" align="center">
                Made by <Link href="#">SOUMYAJIT SINGHA</Link>
            </Typography>
        </footer>
    );
};

export default Footer;
