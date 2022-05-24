import '../App.css';
import React, { useState } from 'react';
import Axios from 'axios';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreview from './ImagePreview';
import Button from '@mui/material/Button';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import TrashCan from './trashCan';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function FaceRecognition({ image1, setImage1, setType, title, setFlag }) {
  console.log("setType", setType)
  const [openCamera, setOpenCamera] = useState(false);
  const [displayName, setDisplayName] = useState(false);

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
  }
  async function send(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);
    formData.append("color", setType)
    console.log("setType:  ", setType);
    console.log(formData.filename)
    try {
      const res = await Axios.post(`http://127.0.0.1:5000/addClassification`, formData).then(result => {
        console.log(result.data)
        setName("tehila")
        setDisplayName(true)
      })
    } catch (ex) {
      console.log(ex);
    }
    setFilePath(file);
  }
  const isFullscreen = false;
  return (
    <div>
      <Button variant="contained" onClick={handleClick}>צילום משתמש</Button>
      {image1 && <ImagePreview dataUri={image1} isFullscreen={isFullscreen} setImage={setImage1} setFlag={setFlag} />}
      {openCamera && <Camera imageType={IMAGE_TYPES.JPG} onTakePhotoAnimationDone={handleTakePhotoAnimationDone} isFullscreen={isFullscreen} />}
      {displayName && <div>שלום ל{name} </div>}
    </div>
  );
}
export default FaceRecognition;