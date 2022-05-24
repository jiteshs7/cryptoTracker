import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Coin from './screens/coin/Coin';
import Header from './components/Header';
import Home from './screens/home/Home';
import Alert from './components/Alert';

const useStyles = makeStyles({
  app: {
    backgroundColor:'#14161A',
    color:'#fff',
    minHeight:'100vh',
  },
  routes:{
    // paddingTop:'8%'
  }
});

function App() {

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.app} >
        <Header/>
        <div className={classes.routes} >
          <Routes>
            <Route path='/' element={<Home/>} exact />
            <Route path='/coin/:id' element={<Coin/>} />
          </Routes>
        </div>
      </div>
      <Alert/>
    </BrowserRouter>
  );
}

export default App;
