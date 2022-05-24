import React from 'react';
import { makeStyles } from '@material-ui/styles';

const CustomBtn = ({children,onClick,selected}) => {

    const useStyles = makeStyles(() => ({
        btn:{
            border:'1px solid gold',
            borderRadius:5,
            cursor:'pointer',
            padding:10,
            paddingLeft:20,
            paddingRight:20,
            fontFamily:'Montserrat',
            backgroundColor: selected?'gold':'',
            color:selected?'#000':'',
            fontWeight: selected?'600':'300',
            '&:hover':{
                backgroundColor:'gold',
                color:'#000'
            },
            width:'22%'
        }
    }))

    const classes = useStyles();

  return (
    <span 
        className={classes.btn} 
        onClick={onClick}
    >{children}</span>
  )
}

export default CustomBtn