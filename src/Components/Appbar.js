import * as React from 'react';
import { useState, useEffect,useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Toolbar } from '@mui/material';
import logo from "./logo.svg"
import { TextField, Box } from '@mui/material';
import VideoCameraFrontOutlinedIcon from '@mui/icons-material/VideoCameraFrontOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Home from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CollectionsIcon from '@mui/icons-material/Collections';
import DownloadIcon from '@mui/icons-material/Download';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {FormControl} from "@mui/material"

function ResponsiveAppBar() {

  const [searchinput, setsearchinput] = useState("");
  const [openD, setopenD] = useState(false);
  const [searchdata,setsearchdata]=React.useState([])



///////////////////////////////API CALLING///////////////////////////////////////////
const options = {
  method: 'GET',
  headers: {
      'X-RapidAPI-Key': '666991f50bmsh2fb08ad7ac2b8a4p176330jsn14be24b156f1',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};
  const URL2 = `https://youtube-v31.p.rapidapi.com/search?q=${searchinput}&part=snippet%2Cid&maxResults=50&type=video`

  const Search2 = async () => {
    try {
      let response = await fetch(URL2,options);
      let data = await response.json();
      setsearchdata(data);
      move()
    } catch (error) {
      navigate(`/error`)
      console.log(error)
    }
  }
  console.log()
  const navigate=useNavigate()
  const move=async()=>{
    navigate(`/watch/${searchdata?.items[0].id.videoId}`)
  } 
  const searchapi=(e)=>{
    // e.preventDefault()
    console.log("hello")
    Search2();    
  }
console.log(searchinput)
///////////////////////////////API CALLING///////////////////////////////////////////
// useEffect(()=>{
//   move()
// },[searchdata])

  // console.log(searchdata)
  const icon = [<Home />, <SlowMotionVideoIcon />, <SubscriptionsIcon />, <CollectionsIcon />, <DownloadIcon />]
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
    setopenD(!openD)
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, marginTop: "10rem", backgroundColor: "#121212",height:"100%" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{marginTop:"8rem"}}>
        {['Home', 'Shorts', 'Subscriptions', 'Library', "Downloads"].map((text, index) => (
          <ListItem key={text} >
            <ListItemButton>
              <ListItemIcon>
                {icon[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#121212",height:{xs:"18rem",sm:"10rem"}, zIndex: (theme) => theme.zIndex.drawer + 1 }} elevation={0}>
        <Container maxWidth="x2">
          <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <IconButton sx={{ display: { xs: "block", sm: "none" } }} onClick={toggleDrawer("left", !openD)}>
                <MenuIcon sx={{ fontSize: "2.4rem", }} ></MenuIcon>
              </IconButton>
              <Link to="/">
              <img src={logo} alt="youtube.png" />
              </Link>
            </Box>
            <Box  sx={{ width: { xs:"100%",sm: "50%", md: "50%" },position:{xs:"absolute",sm:"relative"},top:{xs:"10rem",sm:"0"},display:"flex",columnGap:"1rem",justifyContent:"center",alignItems:"center"}} >
              <FormControl sx={{ width:"90%", fontSize: "2rem",  }}>
            <TextField inputProps={{style: {fontSize:"1.6rem"}}} id="outlined-basic" variant="outlined" placeholder='Search' sx={{ width:"100%", fontSize: "2rem",  }} value={searchinput} onChange={ (e)=>{
                    let original=e.target.value;
                    
                    setsearchinput(original)}} autoComplete="off" onKeyPress={(ev) => {
                      if (ev.key === 'Enter') {                       
                        searchapi()
                      }
                    }}/>
                    </FormControl>
                    <IconButton  onClick={Search2}>
                <SearchOutlinedIcon sx={{ fontSize: "2.4rem", }}></SearchOutlinedIcon>
              </IconButton>
              </Box>
            <Box sx={{ display: "flex" }}>
              
              <IconButton>
                <VideoCameraFrontOutlinedIcon sx={{ fontSize: "2.4rem" }}></VideoCameraFrontOutlinedIcon>
              </IconButton>
              <IconButton>
                <NotificationsNoneOutlinedIcon sx={{ fontSize: "2.4rem" }}></NotificationsNoneOutlinedIcon>
              </IconButton>
              <IconButton >
                <AccountCircleOutlinedIcon sx={{ fontSize: "2.4rem" }}></AccountCircleOutlinedIcon>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div>
        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </div>      
    </>
  );
}
export default ResponsiveAppBar;