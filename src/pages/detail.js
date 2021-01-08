import React from 'react'
import {Header} from './header'
import Box from '@material-ui/core/Box';
function detail() {
    return (
        <div style={{backgroundColor:"lightgray"}}>
            <Header/>
            <div style={{height:"400px"}}>
            <Box textAlign="center" m={1} fontWeight="fontWeightBold"  
              fontSize="2em" height="100px" color="#34495E" marginTop="50px"> 
              Proudct Details Here
              
            </Box>
                
            </div>
        </div>
    )
}

export default detail
