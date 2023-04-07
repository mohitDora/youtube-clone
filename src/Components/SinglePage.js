import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Appbar from "./Appbar"
import { Box, IconButton, Typography,Button} from '@mui/material'
import ReactPlayer from "react-player"
import Card from "./Card"
import Loader from "./Loader"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SinglePage() {

  const [videoDetails, setvideoDetails] = useState([]);
  const [loading,setloading]=useState(true);
  const [topvideo,settopvideo]=useState([]);
  const [like,setlike]=useState(false)
  const [dislike,setdislike]=useState(false)
  const [subs,setsubs]=useState(false)

  const { id } = useParams();


  ///////////////////API CALLING//////////////////////////////
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '666991f50bmsh2fb08ad7ac2b8a4p176330jsn14be24b156f1',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };

  const URL = `https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=${id}&part=id%2Csnippet&type=video&maxResults=20`
  const Search = async () => {
    try {
      let response = await fetch(URL, options);
      let data = await response.json();
      setvideoDetails(data)
      setloading(false)
    } catch (error) {
      
      console.log(error)
    }
  }

  // const URL2 = `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`
  // const Search2 = async () => {
  //   try {
  //     let response = await fetch(URL2, options);
  //     let data = await response.json();
  //     settopvideo(data)
  //     setloading(false)
      
      
      
  //   } catch (error) {
      
  //     console.log(error)
  //   }
  // }


  useEffect(() => {
    Search();
    setloading(true);
    setdislike(false);
    setlike(false)
  }, [])
  useEffect(() => {
    Search();
    setdislike(false);
    setlike(false)
  }, [id])
  
  // useEffect(()=>{
  //   Search2();
  // },[])
  // console.log(topvideo)


  
    
  
  // console.log(details)

///////////////////API CALLING//////////////////////////////

  const { items } = videoDetails;
  // console.log(topvideo)
  const feedresult = items?.map((item, index) => {
    const { thumbnails, title, channelTitle } = item.snippet;
    return (
      <Card thumb={thumbnails.high} title={title} key={index} channelName={channelTitle} id={item.id.videoId}></Card>
    )
  })
  const notify = () => {
  if(!like){
    toast("You Liked The Video");
  }
}
const notify2 = () => {
  if(!dislike){
    toast("You Disliked The Video");
  }
}
const notify3 = () => {
  if(!subs){
    toast("You Subscribes The Channel");
  }
}
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss={false}
draggable
pauseOnHover
theme="light"
/>
      <Appbar></Appbar>
      <Box>
      <Box sx={{  width: {xs:"100%",md:"90%"}, height: {xs:"30rem",md:"55rem",lg:"65rem"},display: "flex", justifyContent: "center",flexDirection: "column",margin:{xs:"20rem auto 0 auto",sm:"12rem auto 0 auto"} }} >     
        <ReactPlayer width="100%" height="100%" url={`https://www.youtube.com/watch?v=${id}`} controls></ReactPlayer>
        </Box>
        {/* {details} */}
        <Box sx={{display:"flex",width:"100%",gap:"2rem",margin:{xs:"2rem",md:"2rem 10rem"},alignItems:"center"}}>
          <IconButton onClick={()=>{setlike(!like);setdislike(false);notify()}}>
            {!like?<ThumbUpOffAltIcon sx={{color:"white",fontSize:"2rem"}}></ThumbUpOffAltIcon>:<ThumbUpAltIcon sx={{color:"white",fontSize:"2rem"}}></ThumbUpAltIcon>}
          
          </IconButton>
          <IconButton onClick={()=>{setdislike(!dislike);setlike(false);notify2()}}>
            {!dislike?<ThumbDownOffAltIcon sx={{color:"white",fontSize:"2rem"}}></ThumbDownOffAltIcon>:<ThumbDownAltIcon sx={{color:"white",fontSize:"2rem"}}></ThumbDownAltIcon>}         
          </IconButton>        
        <Button variant={!subs?'contained':"text"} color="error" sx={{color:"white",padding:"1rem 1.6rem",}} onClick={()=>{setsubs(!subs);notify3()}}>{!subs?"Subscribe":"Subscribed"}</Button>
        </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "5rem", gap: { xs: "2rem", md: "4rem" }, justifyContent: "center" }}>
        {
            !loading?feedresult:<Loader></Loader>
          }
        </Box>
    </>
  )
}

export default SinglePage