import '../App.css';
import React, { useState } from 'react';
import Axios from 'axios';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreviewFace from './ImagePreview';
import Button from '@mui/material/Button';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import TrashCan from './trashCan';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function FaceRecognition({ image1, setImage1, setType, title, setFlag, type }) {
    console.log("setType", setType)
  const [openCamera, setOpenCamera] = useState(false);
  const [displayName, setDisplayName] = useState(false);
  let audio = new Audio('../saund.mp3')
  const [res, setRes] = useState("");
  const [filePath, setFilePath] = useState();
  const [name, setName] = useState("");
  function handleTakePhotoAnimationDone(dataUri) {
    console.log(dataUri);
    let blob = dataURItoBlob(dataUri)
    send(blob)
    setImage1(dataUri);
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
    setImage1(null);
    audio.play()
  }
  async function send(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);
    formData.append("color", type)
    console.log("setType:  ",setType);
    console.log(formData.filename)
    try {
      const res = await Axios.post(`http://127.0.0.1:5000/addClassification`, formData).then(result => {
        console.log(result.data)
        setName(result.data)
        setDisplayName(true)
      })
    } catch (ex) {
      console.log(ex);
    }
    setFilePath(file);
  }
  const isFullscreen = false;
  return (
    <div className="h4 back">
      <Button variant="contained" onClick={handleClick}> צילום משתמש <CameraAltIcon style={{ color: "white" }}/></Button>
      {openCamera && <Camera imageType={IMAGE_TYPES.JPG} onTakePhotoAnimationDone={handleTakePhotoAnimationDone} isFullscreen={isFullscreen} />}
      {displayName && (name !== "False" ? <h3 className="back">{name}, כל הכבוד👍 <br></br> יחד נשמור על העולם🌍</h3> : <h3 className="back">המשתמש לא קיים <Link to="/AddUser"  >הירשם</Link></h3>)}
    </div>
  );
}
export default FaceRecognition;