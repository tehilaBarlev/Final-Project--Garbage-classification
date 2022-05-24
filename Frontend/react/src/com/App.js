import './App.css';
import React, { useEffect, useState } from "react";
import TakePhoto from './takePhoto';
import Trashcan from './trashCan';
import 'react-html5-camera-photo/build/css/index.css';
import axios from 'axios';



function App(props) {

  const [type, setType] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (image) {
      axios.post('https://616710c913aa1d00170a698e.mockapi.io/trash').then(({data}) => {
        console.log(data)
        setImage(null)
        setType(data.type);
      });
    }
  
  }, [image]);

  return (
    <>
      <h1 id="title">Green World!</h1>
      <div>
        <TakePhoto setImage={setImage} image={image} type={setType}/>
      </div>
      {/* <input id="type" onChange={useEffect}></input> */}
      <div>
        <Trashcan type={type} />
      </div>
<a href="https://www.recycling.co.il/%D7%97%D7%A9%D7%99%D7%91%D7%95%D7%AA-%D7%94%D7%9E%D7%99%D7%97%D7%96%D7%95%D7%A8" target="_blank" rel="noreferrer">Click Me</a>
    </>
  )
}
export default App;