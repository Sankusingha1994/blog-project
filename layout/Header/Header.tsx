
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


const DarkModeToggle = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {
     return (
     <Button onClick={toggleDarkMode}>
           {darkMode ? <LightModeIcon/> : <DarkModeIcon/>}
         </Button>
       );
      };

const NavigationBar = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const toggleDarkMode = () => {
              setDarkMode((prev) => !prev);
            };
        
            const theme = createTheme({
              palette: {
                mode: darkMode ? "dark" : "light",
              },
            });



  useEffect(() => {
    const uid = localStorage.getItem('uid');
    setIsLoggedIn(!!uid);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('uid');
    setIsLoggedIn(false);
    router.push('/');
  };

  

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar sx={{background:"orange"}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            <Link href="/">
              <Button sx={{ color: 'White', textDecoration: 'none', fontSize:"40px", fontWeight:"20px" }}>BLOGER</Button>
            </Link>
          </Typography>
          {!isLoggedIn ? (
            <>
              <Button color="inherit">
                <Link href="/signin">
                  <Button sx={{ color: 'White', textDecoration: 'none' }}>Signup</Button>
                </Link>
              </Button>
              <Button color="inherit">
                <Link href="/login">
                  <Button sx={{ color: 'White', textDecoration: 'none' }}>Login</Button>
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link href="/createblog">
                  <Button sx={{ color: 'White', textDecoration: 'none' }}>Create Blog</Button>
                </Link>
              </Button>
              <Button sx={{color:"White"}} onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          <CssBaseline />
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavigationBar;
