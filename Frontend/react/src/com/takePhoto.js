import '../App.css';
import React, { useState } from 'react';
import Axios from 'axios';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreview from './ImagePreview';
import Button from '@mui/material/Button';
import FaceRecognition from './FaceRecognition'
import ResultCard from './Result';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import TrashCan from './trashCan';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function TakePhoto({ image, setImage, setType, type, setFlag, flag }) {
  const [openCamera, setOpenCamera] = useState(false);
  let audio = new Audio('../saund.mp3')
  
  function handleTakePhotoAnimationDone(dataUri) {
    console.log(dataUri);
    let blob = dataURItoBlob(dataUri)
    setImage(dataUri);
    setOpenCamera(false);
  }
  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    // console.log(mimeString)

    let extension = mimeString.split("/")[1]
    return new File([ab], `image.${extension}`, { type: mimeString });
  }
  function handleClick() {
    audio.play()
    setOpenCamera(true);
    setImage(null);
  }
  function getColorByType(type) {
    let color = ""
    if (type == 'glass')
      return ('purple')
    if (type == 'plastic' || type === 'metal')
      return ('orange')
    if (type == 'cardboard' || type === 'paper')
      return ('blue')
    return ('green')
  }
  const isFullscreen = false;
  return (
    <div>
      {!flag && <Button variant="contained" onClick={handleClick}> צלם משתמש <CameraAltIcon style={{ color: "white" }}/></Button>}
      {image && !flag && <ImagePreview dataUri={image} isFullscreen={isFullscreen}  setFlag={setFlag} flag={flag}/>}
      {openCamera && <Camera imageType={IMAGE_TYPES.JPG} onTakePhotoAnimationDone={handleTakePhotoAnimationDone} isFullscreen={isFullscreen}/>}
      {flag && <ResultCard color={type} setImage1={setImage} image1={image} type={type} setFlag={setFlag}/>}
    </div>
  );
}
export default TakePhoto;