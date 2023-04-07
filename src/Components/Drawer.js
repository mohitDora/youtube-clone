import * as React from 'react';
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Appbar from "./Appbar"
import Card from "./Card"
import Home from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CollectionsIcon from '@mui/icons-material/Collections';
import DownloadIcon from '@mui/icons-material/Download';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import Loader from "./Loader"
import { Link } from 'react-router-dom';

const drawerWidth = 240;

export default function ClippedDrawer() {

  const [search, setsearch] = useState([]);
  const [loading,setloading]=useState(true);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '99c25b4aa7msh39131be0d1fe146p1c024fjsna65d11b31811',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };

  const URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&key=AIzaSyCAlqJdSwxl-4ZIVwGCObwSPAtCz23JCPU`
  const Search = async () => {
    try {
      let response = await fetch(URL);
      let data = await response.json();
      setsearch(data);
      setloading(false)
    } catch (error) {
      console.log(error);
      setloading(true)
    }
  }
  console.log(search)
  useEffect(() => {
    Search();
    setloading(true)
  }, [])


const {items}=search;
console.log(items)
const feedresult=items?.map((item,index)=>{
  const {thumbnails,title,channelTitle}=item.snippet;
  return(
<Card thumb={thumbnails.high} title={title} key={index} channelName={channelTitle} id={item.id}></Card>
  )
  
})
  const icon = [<Link to="/" style={{textDecoration:"none"}}><Home sx={{ fontSize: "2.5rem",color:"white" }} /></Link>, <SlowMotionVideoIcon sx={{ fontSize: "2.5rem" }} />, <SubscriptionsIcon sx={{ fontSize: "2.5rem" }} />, <CollectionsIcon sx={{ fontSize: "2.5rem" }} />, <DownloadIcon sx={{ fontSize: "2.5rem" }} />]
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Appbar></Appbar>
      <Drawer
        variant="permanent"
        sx={{
          width: { sm: drawerWidth, xs: drawerWidth - 240 },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: { sm: drawerWidth, xs: drawerWidth - 240 }, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', marginTop: "5rem" }}>
          <List>
            {['Home', 'Shorts', 'Subscriptions', 'Library', "Downloads"].map((text, index) => (
              <ListItem key={text} >
                <ListItemButton >
                  <ListItemIcon>
                    {icon[index]}
                  </ListItemIcon>
                  <Typography sx={{ fontSize: "1.4rem" }}>{text}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: {xs:"10rem",sm:"5rem"}, gap: {xs:"2rem",md:"4rem"}, justifyContent: "center" }}>
          {
            !loading?feedresult:<Loader></Loader>
          }
          

        </Box>
      </Box>
    </Box>
  );
}