import React, { useEffect, useState } from "react";
import TakePhoto from './takePhoto';
import ImageForm from './ImageForm';
import Trashcan from './trashCan';
import { purple } from "@mui/material/colors";

export default function GarbageClassification({flag, setFlag}) {

    const [type, setType] = useState("");   
    const [image, setImage] = useState(null);
    useEffect(() => {
        setFlag(false)
      }, []);
    return (
        <div id="buttons">
            {!flag && <ImageForm setImage={setImage} image={image} setType={setType} type={type} flag={flag} setFlag={setFlag} />}
            <TakePhoto setImage={setImage} image={image} setType={setType} type={type} flag={flag} setFlag={setFlag}/>
            {/* <p>{type}</p> */}
        </div>

    );
};