import React, { useState } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import TrashCan from './trashCan'
import ResultCard from './Result';

const ImageForm = ({ image, setImage, setType, type, setFlag, flag }) => {
    const [res, setRes] = useState("");
    // const [fileName, setFileName] = useState();
    const [filePath, setFilePath] = useState();
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
    const uploadFile = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.na);
        let filePath = null;
        console.log(formData);
        const res = await Axios.post(`http://127.0.0.1:5000/uploadProduct`, formData).then(res => {
            setType(getColorByType(res.data))
            setFlag(false)
        })

        setFilePath(file);
    };

    return (
        <>
            <input style={{ display: 'none' }} type="file" id="upload" onChange={uploadFile} />
            <Button component="label" for="upload" variant="contained" >העלאת תמונה מוצר למיחזור</Button>
            {/* {filePath ? <img alt="" src={filePath} /> : ''} */}
            {flag && <ResultCard color={type} setImage1={setImage} image1={image} type={type} setFlag={setFlag} />}

        </>
    );
}

export default ImageForm