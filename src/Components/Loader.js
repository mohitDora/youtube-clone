import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function SimpleBackdrop() {
  return (
    <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <CircularProgress color="inherit" />
    </div>
  );
}