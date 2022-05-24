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
function TakePhotoProduct({ image, setImage, setType, type, setShowClassification, flag }) {
  const [openCamera, setOpenCamera] = useState(false);
  let audio = new Audio('../saund.mp3')

  function handleTakePhotoAnimationDone(dataUri) {
    console.log(dataUri);
    let blob = dataURItoBlob(dataUri)
    send(blob)
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
    setOpenCamera(true);
    setImage(null);
  }
  function getColorByType(type) {
    let color = ""
    audio.play()
    if (type == 'glass')
      return ('purple')
    if (type == 'plastic' || type === 'metal')
      return ('orange')
    if (type == 'cardboard' || type === 'paper')
      return ('blue')
    return ('green')
  }

  const send = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);
    formData.append("name", "tehila")
    console.log(formData.filename)
    const { data: response } = await Axios.post(`http://127.0.0.1:5000/uploadProduct`, formData);
    setType(getColorByType(response))
    setShowClassification(false)
  }
  const isFullscreen = false;
  return (
    <div>
      {!flag && <Button variant="contained" onClick={handleClick}>צלם מוצר<CameraAltIcon/></Button>}
      {image && !flag && <ImagePreview dataUri={image} isFullscreen={isFullscreen} setImage={setImage} setFlag={setShowClassification} flag={flag}/>}
      {openCamera && <Camera imageType={IMAGE_TYPES.JPG} onTakePhotoAnimationDone={handleTakePhotoAnimationDone} isFullscreen={isFullscreen}/>}
    </div>
  );
}
export default TakePhotoProduct;