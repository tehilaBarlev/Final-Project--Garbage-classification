import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chart from './Chart'
import { Avatar } from 'rsuite';
import '../App.css';
import ImagePreview from './ImagePreview';
import Axios from 'axios';



function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable({ data }) {
  const [img, setImg] = useState("");

  const getData = async () => {
    const { data: response } = await Axios.get(`http://127.0.0.1:5000/getHistory`);
    setImg(response)
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">פרופיל</TableCell>
            <TableCell align="right">שם</TableCell>
            <TableCell align="right">ירוק</TableCell>
            <TableCell align="right">כחול</TableCell>
            <TableCell align="right">כתום</TableCell>
            <TableCell align="right">סגול</TableCell>
            <TableCell align="right">תרשים</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="right">
                <Avatar circle size="lg" color="red" alt="@SevenOutman" >{row.name ? (row.name)[0] : ""}</Avatar>
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.green}</TableCell>
              <TableCell align="right">{row.blue}</TableCell>
              <TableCell align="right">{row.orange}</TableCell>
              <TableCell align="right">{row.purple}</TableCell>
              <TableCell align="right"><Chart innerData={[row.green, row.blue, row.orange, row.purple]} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}