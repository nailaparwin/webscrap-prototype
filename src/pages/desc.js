import React, {useState, useEffect} from "react"
//import product from './images/Discount.gif'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import useWebAnimations, { bounceInDown } from "@wellyshen/use-web-animations";
import { motion } from "framer-motion";
import product from './images/Discounts.gif'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { red } from '@material-ui/core/colors';
const cheerio = require("cheerio");
const axios = require("axios").default;


const useStyles = makeStyles((theme) => ({
  root: {
    
    fontSize: '24px',    
    paddingTop: '2%',
    paddingBottom: '5%',
    alignItems: 'center',
    textAlign: 'center',
    align: 'center',
    display: 'block'
  },
  rootcard: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    paddingTop: '56.25%', // 16:9
  },  
  avatar: {
    backgroundColor: red[500],
  },
}));

const GET_PRODUCTS = gql`
query GetProducts {
    products {        
    title
    imgsrc
    category
    mcategory
    price
    }
}
`

const ADD_PRODUCT = gql`
mutation AddProduct($title: String!, $imgsrc: String!, $category: String!, $mcategory: String!, $price: String!){
    addProduct(title: $title, imgsrc: $imgsrc, category: $category, mcategory: $mcategory, price: $price){
        title
        imgsrc
        category
        mcategory
        price
    }
}
`;

export default function Desc() {
  const classes = useStyles();    
  const [item, setItem] = useState('shampoo');
  const [search, setSearch] = useState(false)
  const [listProduct, setListProduct] = useState([]);
  const [data, setData] = useState('default data');
  //const { loading, error, datas, refetch } = useQuery(GET_PRODUCTS);
  //const [add_product] = useMutation(ADD_PRODUCT);

  useEffect(() => {
    console.log("useEffect Called");
    setSearch(false)
    // fetch(`/.netlify/functions/hello?name=from Serverless Function`)
    //   .then(response => response.json())
    //   .then(data => {
    //     //setData(data);
    //     console.log("Data: " + JSON.stringify(data));
        
    //   });
  }, [data, item, search]);

  const fethHtml = async url => {
    try {
      
      await fetch(`/.netlify/functions/getData?url=${url}`)
      .then(response => response.json())
      .then(data => {
        setData(data.data);        
      });      
      return data.data;     
    } catch {
      console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
    }
  };
  
  const extractDeal = selector => {
      try{
        const title = selector    
        .find("div.a-section.a-spacing-none.a-spacing-top-small > h2 > a > span")            
        .text()
        .trim();
        
    
        const imgsrc = selector.find("div.a-section.aok-relative.s-image-square-aspect > img")
        .attr("src").trim();
  
        const price = selector.find("div.a-section.a-spacing-none.a-spacing-top-small > div.a-row.a-size-base.a-color-base > div > div > a > span.a-price > span.a-offscreen")
        .text()
        .trim();
  
        return {
          title,
          imgsrc,
          price      
          };
      }
      catch(err){
          console.log('err')
      }
    };

  const scrapSteam = async () => {
    setSearch(true)
    console.log("item = ", item)
    const url = `https://www.amazon.com.au/s?k=${item}`  
    const html = await fethHtml(url);
    //console.log(html)
    const selector =  cheerio.load(data);    
    const searchResults = selector("body").find(        
         "div.a-section.a-spacing-medium"       
       );        
    const deals = searchResults
      .map((idx, el) => {
        const elementSelector = selector(el);        
        return extractDeal(elementSelector);
      })
      .get();
  
      console.log("deals" , deals)
      setListProduct(deals)
      //listOfProduct = listOfProduct.concat(deals)
      //console.log("listOfProduct ",listOfProduct)
  };


  return (
    <div>
      <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12}>
      <div style={{marginBottom:"0px"}}>
        <form className={classes.root} noValidate autoComplete="off">
          <Box width="70%" textAlign="center" margin="auto">
          <TextField id="searchBox" label="Search" variant="outlined" value={item} onChange={(e) => { setItem(e.target.value)}} fullWidth/>          
          </Box>
          <Box width="70%" textAlign="center" margin="auto" marginTop="10px">          
          <Button variant="outlined" color="primary" onClick={scrapSteam}>
            Search 
          </Button>
          </Box>
          
        </form>
      </div>    

    {/* <div id="head-div" > */}
    </Grid>
    
    <Grid item xs={12} sm={6} md={6}>
      <div style={{marginTop:"-50px", marginLeft:"20px"}}>  
        <Box textAlign="center" m={1} fontWeight="fontWeightBold"  
              fontSize="3em" height="100px" color="purple" marginTop="-30px"> 
              Get Everything you Want
        </Box>
        <Box textAlign="center" m={1} fontWeight="fontWeightBold"  
              fontSize="1em" height="100px" color="#34495E"> 
              Shop everything. Explore our range of products.
              <br/>
              Select the one you need
        </Box>
      </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
      <div style={{marginTop:"-100px",marginLeft:"20px"}}> <img src={product} alt="products" width="350px"/> </div>
      </Grid>
      
        {console.log(listProduct.length)}
        
        {listProduct.map(l => (
          <Grid item xs={12} sm={3} md={4} spacing={2} >
          <div style={{width:"70%", margin:"auto"}} key={l.title}>
          <h4> {l.title} </h4>
          <img src={l.imgsrc} alt=""/>
          <h3> price: {l.price} </h3> 
          </div>
          {/* <Card className={classes.rootcard} key={l.title}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={l.title}
        subheader={l.price}
      />
      <CardMedia
      component="img"
        //className={classes.media}
        height="200"
        
        image={l.imgsrc}
        title={item}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {l.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
       
      </CardActions>
    
    </Card> */}
    </Grid>
        ))}
     
      </Grid>
      {/* </div>   */}

     
  </div>
  )
}
