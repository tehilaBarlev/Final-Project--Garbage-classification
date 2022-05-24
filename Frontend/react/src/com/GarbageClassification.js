import React, { useEffect, useState } from "react";
import FaceRecognition from './FaceRecognition';
import ImageForm from './ImageForm';
import TakePhotoProduct from './TakePhotoProduct';
import { purple } from "@mui/material/colors";
import '../App.css';

export default function GarbageClassification({ flag, setFlag }) {
    const [showClassification, setShowClassification] = useState(true);
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);
    useEffect(() => {
        setFlag(false)
        
    }, []);
    return (
        <div className="remove back" style={{backgroundImage: `url(./תמונה1.png)`}} >
            {showClassification && <div>
                {<ImageForm setImage={setImage} image={image} setType={setType} type={type} flag={flag} setShowClassification={setShowClassification} />}
                <TakePhotoProduct setImage={setImage} image={image} setType={setType} type={type} flag={flag} setShowClassification={setShowClassification} />
            </div>}
            {!showClassification && <div>
                
                {type == 'blue' ?(<h3 className="back" style={{ color: "#2375ca" }}>זיהיתי 😀 <br/> בפח הכחול</h3>) : (<br/>)}
                {type == 'orange' ?(<h3 className="back" style={{ color: "orange" }}>זיהיתי 😀 <br/>  בפח הכתום</h3>) : (<br/>)}
                {type == 'green' ?(<h3 className="back" style={{ color: "green" }}>זיהיתי 😀 <br/>  בפח הירוק</h3>) : (<br/>)}
                {type == 'purple' ?(<h3 className="back" style={{ color: "purple" }}>זיהיתי 😀 <br/>בפח הסגול</h3>) : (<br/>)}
                <img src={`./${type}.png`} ></img>
                <FaceRecognition setImage1={setImage} image1={image} type={type} setFlag={setFlag} />
            </div>}
        </div>

    );
};