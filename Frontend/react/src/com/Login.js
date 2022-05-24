import React, { useEffect, useState } from "react";
import TakePhoto from './takePhoto';

export default function Login ({title}) {
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);
    return (
        <div>
            <TakePhoto setImage={setImage} image={image} type={setType} text={title} />
        </div>
    );
};
