import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea,Box } from '@mui/material';
import { Link } from 'react-router-dom';


export default function ActionAreaCard({thumb,title,channelName,id}) {
  const moveup=()=>{
    this.myRef.current.scrollTo(0, 0);
  }
  return (
    <Link to={`/watch/${id}`} style={{ textDecoration:"none"}}>
    <Box sx={{ width: {xs:350,md:400} ,backgroundColor:"#121212"}} onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }} >
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{height:{xs:200,md:228}}}
          image={thumb.url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="white">
            {title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
          {channelName} 
            
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Box>
    </Link>
  );
}