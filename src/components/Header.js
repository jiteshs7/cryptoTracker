import React from 'react'
import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, ThemeProvider} from '@material-ui/styles';
import {useNavigate} from 'react-router-dom';

import {CryptoState} from '../helper/CryptoContext';
import { darkTheme } from '../helper/constants';
import AuthModal from './auth/AuthModal';
import Sidebar from './Sidebar';

const useStyles = makeStyles(()=>({
  title:{
    display:'flex',
    alignItems:'center',
    flex:1,
    color:'gold',
    fontFamily:'Montserrat',
    fontWeight:'600',
    justifyContent:'space-between',
    cursor:'pointer',
    position:'inherit',
  },
}))

const Header = () => {

  const classes = useStyles();

  const navigate = useNavigate();

 const {currency, user, changeCurrency} = CryptoState();

  return (
    <ThemeProvider theme={darkTheme} >
      <AppBar position="static" color='transparent' >
        <Container>
          <Toolbar>
            <Typography variant='h6' onClick={()=>navigate('/welcome')} className={classes.title} >
              Crypto Tracker
            </Typography>
            <Select onChange={(e) => changeCurrency(e.target.value)} value={currency} variant='outlined' style={{
              color:'#fff',
              width: 150,
              height:40,
             marginRight:15
            }} >
              <MenuItem value='INR'>INR</MenuItem>
              <MenuItem value='USD'>USD</MenuItem>
            </Select>

           {user?<Sidebar  /> : <AuthModal/>}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header