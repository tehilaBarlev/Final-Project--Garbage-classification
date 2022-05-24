import React, { useEffect, useState } from "react";
import Axios from 'axios';
import Column from 'rsuite/Table';
import Cell from 'rsuite/Table';
import HeaderCell from 'rsuite/Table';
import Table from 'rsuite/Table';

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

        <table>
            {/* <th>{content[0].name}</th> */}
            {content.map((item)=>{<tr>{item.name}</tr>})}
            {content.map((item)=>{console.log(item.name)})}
            {/* {content.filter(c){}} */}
            {/* {content[0].name} */}
        </table>

    )


    // <Table
    //     height={420}
    //     // data={content[0]}
    //     onSortColumn={(sortColumn, sortType) => {
    //         console.log(sortColumn, sortType);
    //     }}
    // >
    //     <Column width={50} align="center" fixed>
    //         <HeaderCell>Id</HeaderCell>
    //         <Cell dataKey="id" />
    //     </Column>

    //     <Column width={100} fixed>
    //         <HeaderCell>First Name</HeaderCell>
    //         <Cell dataKey="firstName" />
    //     </Column>

    //     <Column flexGrow={1}>
    //         <HeaderCell>
    //             {/* City <code>flexGrow={1}</code> */}
    //         </HeaderCell>
    //         <Cell dataKey="city" />
    //     </Column>

    //     <Column flexGrow={2}>
    //         <HeaderCell>
    //             {/* Company Name <code>flexGrow={2}</code> */}
    //         </HeaderCell>
    //         <Cell dataKey="companyName" />
    //     </Column>
    // </Table>
    // );
};
