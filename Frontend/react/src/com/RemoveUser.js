import React, { useEffect, useState } from "react";
import TakePhoto from './takePhoto';
import { Form, Schema, FlexboxGrid } from 'rsuite';
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import Axios from 'axios';
import '../App.css';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

export default function RemoveUser({ title, flag, setFlag, nav }) {
    const [message, setMessage] = useState("akuoooooooooo");
    const [showMessage, setShowMessage] = useState(false);
    const [res, setRes] = useState("");
    const [filePath, setFilePath] = useState();
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);
    const { StringType, NumberType } = Schema.Types;
    const formRef = React.useRef();
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = React.useState({ name: '' });

    function asyncCheckUsername(name) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (name === 'abc') {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }, 500);
        });
    }

    const model = Schema.Model({
        name: StringType()
            .addRule((value, data) => {
                return asyncCheckUsername(value);
            }, 'Duplicate username')
            .isRequired('This field is required.')
    });

    const handleSubmit = () => {
        formRef.current.checkAsync().then(result => {
            console.log(result);
        });
        let blob = dataURItoBlob(image);
        send(blob)
    };
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
    async function send(file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", file.name);
        try {
            const res = await Axios.post(`http://127.0.0.1:5000/removeUser`, formData).then(result => {
                setRes(result.data)
                setMessage(result.data)
                setShowMessage(true)
            })
        } catch (ex) {
            console.log(ex);
        }
        setFilePath(file);
    }
    return (
       <div className="remove back" style={{backgroundImage: `url(./תמונה1.png)`}} >
            {!showMessage &&<Form ref={formRef} onChange={setFormValue} onCheck={setFormError} formValue={formValue} model={model}>
                <Form.Group>
                    <TakePhoto setImage={setImage} image={image} setType={setType} type={type} flag={false} setFlag={setFlag} />
                </Form.Group>
                <Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary" onClick={handleSubmit}>הסרה</Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>}
            {showMessage && <h3 className="back">{message}</h3>}
        </div>
    );
};
