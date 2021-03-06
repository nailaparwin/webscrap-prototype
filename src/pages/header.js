import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useWebAnimations, { bounceInDown } from "@wellyshen/use-web-animations";
import { motion } from "framer-motion";
import Image1 from './images/bg.png';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {    
    fontSize: '24px',    
    //backgroundColor: '#0080FF',
    backgroundColor: '#34495E ',   
    backgroundImage: `url(${Image1})`,
    //backgroundImage: `url(${productImage}) , url(${productImage2})`,
    backgroundRepeat: 'no-repeat',
    //backgroundPosition: `left top, right top`,
    backgroundSize: "100%",
    height:"200px",
    color:'black',
    paddingTop: '2%',
    paddingBottom: '5%',
    alignItems: 'center',
    textAlign: 'center',
    align: 'center',
    display: 'block'
  },
  
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    //margin: 'auto',
    marginLeft: '5px',
    color:"purple"
  },
  btn: {
    backgroundColor: '#34495E ',
    color:'white',
    width:'110px',
    height:'30px',
    padding:'5px',
    margin:'5px',
  }
}));

export default function Header() {
  //document.documentElement.style.setProperty('--animate-duration', '2s');

    const classes = useStyles();    
    const { ref } = useWebAnimations({ ...bounceInDown });
    
    return (     

      <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12}>
        <div>
      <div style={{display:'flex'}}>
      {/* <motion.div whileHover={{ scale: 1.2  }}>
      <Avatar  className={classes.large}   align={'center'}> Logo </Avatar>
      </motion.div> */}
      <div id="menu" style={{display:'flex', margin:'auto'}}>
      <motion.div whileHover={{ scale: 1.2  }} whileTap={{ scale: 0.8 }} className={classes.btn} >
        <a  href="#about" className={classes.btn}> About </a> 
        </motion.div>

        <motion.div whileHover={{ scale: 1.2  }} whileTap={{ scale: 0.8 }} className={classes.btn}>
        <a className={classes.btn} href="#services"> Services </a> 
        </motion.div>

        <motion.div whileHover={{ scale: 1.2  }} whileTap={{ scale: 0.8 }} className={classes.btn}>
        <a className={classes.btn} href="#products"> Products </a> 
        </motion.div>

        <motion.div whileHover={{ scale: 1.2  }} whileTap={{ scale: 0.8 }} className={classes.btn}>
        <a className={classes.btn} href="#contact"> Contact </a> 
        </motion.div>
      </div>
      </div>
      </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
      <div className={classes.root} id="main-heading">                       
        <Typography component="div" ref={ref} id="top-heading">                  
            <motion.div whileHover={{ scale: 2  }}>
            prototype app
            </motion.div>           
        </Typography>   
        
      </div> 
    </Grid>
    </Grid>
    );
  }