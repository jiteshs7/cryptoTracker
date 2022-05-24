import React from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { CryptoState } from '../../helper/CryptoContext';
import { makeStyles } from '@material-ui/styles';
import useInputReducer from '../../hooks/userInputReducer';
import { handleEmailValidation, handleError } from '../../helper/validation';
import { auth } from '../../helper/firebase';

const Login = ({handleClose}) => {

    const useStyles = makeStyles(() => ({
        btn:{
            backgroundColor:'#EEBC1D',
            color:'#000',
            fontWeight:'500',
            fontSize:14,
            '&:hover':{
                backgroundColor:'gold',
                fontWeight:'600',
            }
        },
        error:{
            color:'red',
            fontSize:12,
        }
    }))
   
    const {value:email,
        error:emailError,
        hasError:emailHasError,
        valueChangedHandler:emailHandler,
        inputBlurHandler:emailBlurHandler,
        reset:emailReset} = useInputReducer(val => handleEmailValidation(val));
    
    const {value:password,
        error:passwordError,
        hasError:passwordHasError,
        valueChangedHandler:passwordHandler,
        inputBlurHandler:passwordBlurHandler,
        reset:passwordReset} = useInputReducer(val => handleError('password',val,8));

    const {setAlert} = CryptoState();

    const handleSubmit = async () => {
        emailBlurHandler();
        passwordBlurHandler();

        if(emailHasError || passwordHasError) return;

        try {
            const result = await signInWithEmailAndPassword(auth,email,password);

            setAlert({
                open:true,
                message:`Success! Welcome ${email}`,
                type:'success'
            })

            emailReset();
            passwordReset();

            handleClose();

        } catch (error) {
            setAlert({
                open:true,
                message:error?.message,
                type:'error'
            })
        }
    }
    
    const classes = useStyles();

  return (
    <Box 
        p={3}
        style={{
            display:'flex',
            flexDirection:'column',
            gap:'20px'
        }}
    >
        <TextField
            variant='outlined'
            type='email'
            label='Enter email'
            value={email}
            onBlur={emailBlurHandler}
            onChange={emailHandler}
            fullWidth
        />
        {emailHasError && <p className={classes.error} >{emailError}</p>}
        <TextField
            variant='outlined'
            type='password'
            label='Enter password'
            value={password}
            style={{}}
            onChange={passwordHandler}
            onBlur={passwordBlurHandler}
            fullWidth
        />
         {passwordHasError && <p className={classes.error} >{passwordError}</p>}
        <Button
            variant='contained'
            size='large'
            onClick={handleSubmit}
            className={classes.btn}
        >
            Login
        </Button>
    </Box>
  )
}

export default Login