import React, {useState, useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import product from './images/Discounts.gif'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { red } from '@material-ui/core/colors';
const cheerio = require("cheerio");


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
  const [listProduct, setListProduct] = useState([]);
  const [data, setData] = useState('default data');
  //const { loading, error, datas, refetch } = useQuery(GET_PRODUCTS);
  //const [add_product] = useMutation(ADD_PRODUCT);

  useEffect(() => {    
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
      setListProduct(deals)
  }, [data]);

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
    console.log("item = ", item)
    const url = `https://www.amazon.com.au/s?k=${item}`  
    const html = await fethHtml(url);
    
  };


  return (
    <div>
      <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12}>
      <div style={{marginBottom:"0px"}}>
        <form noValidate autoComplete="off">
          <div style={{width:"70%", textAlign:"center", margin:"auto", marginTop:"10px"}}>
          
          <TextField id="searchBox" label="Search" variant="outlined" value={item} onChange={(e) => { setItem(e.target.value)}} fullWidth/>          
          </div>
          <div style={{width:"70%", textAlign:"center", margin:"auto", marginTop:"10px"}}>  
          <Button variant="outlined" color="primary" onClick={scrapSteam}>
            Search 
          </Button>
          </div>
          
        </form>
      </div>    
    
    </Grid>
    
    <Grid item xs={12} sm={6} md={6}>
      <div style={{ marginLeft:"50px"}}> 
      <div style={{textAlign:"center", fontWeight:"bold", fontSize:"3em", height:"100px", color:"purple", marginTop:"-30px"}}>                   
        
              Get Everything you Want
        </div>
        <div style={{textAlign:"center", fontWeight:"bold", fontSize:"1em", height:"100px", color:"#34495E"}}>                   
              Shop everything. Explore our range of products.
              <br/>
              Select the one you need
        </div>
      </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
      <div style={{marginTop:"0px",marginLeft:"50px"}}> <img src={product} alt="products" width="350px"/> </div>
      </Grid>           
        
        {listProduct.map(l => (
          <Grid item xs={12} sm={3} md={4} key={l.title} >
          <a href="/detail">
          <div style={{width:"70%", margin:"auto", borderTop:"2px solid grey"}} key={l.title}>
          <h4> {l.title} </h4>
          <img src={l.imgsrc} alt=""/>
          <h3> price: {l.price} </h3> 
          </div>
          </a>
    </Grid>
        ))}
     
      </Grid>
     
  </div>
  )
}
