import React, { useEffect, useState } from "react";
import Axios from 'axios';
import '../App.css';
import Table from './Table'

export default function History() {
    const [content, setContent] = useState([{}])

    const getData = async () => {
        const { data: response } = await Axios.get(`http://127.0.0.1:5000/getHistory`);
        const contentDB = Object.assign([], response)
        setContent(contentDB);
    }

    useEffect(() => {
        getData()
    }, [])

    return (
       <> <Table data={content} />
</>
    )
};
