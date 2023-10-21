import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { blue } from '@mui/material/colors';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: blue[600],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function RecentServiceTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from your backend API
    fetch('YOUR_BACKEND_API_ENDPOINT')
      .then((response) => response.json())
      .then((data) => {
        // Update the component state with the fetched data
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures that this effect runs once on mount

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Service ID</StyledTableCell>
            <StyledTableCell align="right">Customer</StyledTableCell>
            <StyledTableCell align="right">Service Description</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Last Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.description}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right">{row.update}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RecentServiceTable;
