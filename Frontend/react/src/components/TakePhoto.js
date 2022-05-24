import '../App.css';
import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import Axios from 'axios';
import 'react-html5-camera-photo/build/css/index.css';
// import TrashCan from './trashCan';

function TakePhoto({ image, setImage, setType }) {
  function handleTakePhotoAnimationDone(dataUri) {
    console.log('takePhoto');
    setImage(dataUri);
    setOpenCamera(false);
  }
  try {
    const res = await Axios.post(`http://127.0.0.1:5000/uploadProduct`, image).then(res => {
      // console.log(res.data);
      setRes(res.data)
    })

    const [openCamera, setOpenCamera] = useState(false);
    function handleClick() {
      setOpenCamera(true);
      setImage(null);
    }

    const isFullscreen = false;
    return (
      <div>
        <div>{res}</div>
        <button type="button" class="btn btn-outline-success" onClick={handleClick}>TAKE IMAGE</button>
        {/* {image && <ImagePreview dataUri={image}isFullscreen={isFullscreen}/>} */}
        {openCamera && <Camera onTakePhotoAnimationDone={handleTakePhotoAnimationDone} isFullscreen={isFullscreen} />}
      </div>
    );
  }

export default TakePhoto;