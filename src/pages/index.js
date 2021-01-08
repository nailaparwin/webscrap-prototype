import React from "react"
import Header from './header'
import Desc from './desc'
import Grid from '@material-ui/core/Grid';
export default function Home() {
  return (
    <div>
       <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12}>
      <Header/>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
      <Desc/>
      </Grid></Grid>
    </div>
  )
}
