import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FaceRecognition from './FaceRecognition'
import '../App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
export default function ResultCard({ image, setImage, setType, color, setFlag, flag }) {
    return (
        <>
            <CardMedia
                component="img"
                alt="צבע הפח למיחזור:"
                height="140"
                image="/orange.png"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {color}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
            </CardContent>
            <CardActions>
                <FaceRecognition setImage1={setImage} image1={image} type={color} setFlag={setFlag} />
                {/* <Button size="small"></Button> */}
            </CardActions>
        </>
    );
}
