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
import swal from "sweetalert";


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
    fetch('https://car-care-360.onrender.com/api/components/recentschedule')  // Replace with your actual backend endpoint
      .then((response) => response.json())
      .then((data) => {
        // Assuming your backend returns an array of recent bookings under the 'recentBookingData' key
        setRows(data.recentBookingData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures that this effect runs once on mount

  const handleSave = (id, field, value) => {
    // Send the updated data to the backend for modification
    fetch(`https://car-care-360.onrender.com/api/components/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [field]: value }),
    })
      .then((response) => response.json())
      .then((data) => {
        swal("Successfully Updated!", "", "success"); 

        // Handle success, update the state or perform any other necessary actions
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const handleSubmit = (id, field, value) => {
    // Implement your logic for submitting the changes
    handleSave(id, field, value);
  };

  const handleButtonClick = (id) => {
    // Implement your logic for button click
    // You can change the color or perform any other actions
    console.log(`Button clicked for row with ID: ${id}`);
  };

  // Display only the first 4 entries for upcoming schedules
  const upcomingSchedules = rows.slice(0, 4);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Service ID</StyledTableCell>
            <StyledTableCell align="left">Customer</StyledTableCell>
            <StyledTableCell align="left">Service Description</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {upcomingSchedules.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row._id}
              </StyledTableCell>
              <StyledTableCell align="left" contentEditable onBlur={(e) => handleSubmit(row._id, 'firstName', e.target.innerText)} style={{ borderBottom: '1px solid #ddd', padding: '8px', outline: 'none' }}>
                {`${row.firstName} ${row.lastName}`}
              </StyledTableCell>
              <StyledTableCell align="left" contentEditable onBlur={(e) => handleSubmit(row._id, 'serviceType', e.target.innerText)} style={{ borderBottom: '1px solid #ddd', padding: '8px', outline: 'none' }}>
                {row.serviceType}
              </StyledTableCell>
              <StyledTableCell align="left" contentEditable onBlur={(e) => handleSubmit(row._id, 'status', e.target.innerText)} style={{ borderBottom: '1px solid #ddd', padding: '8px', outline: 'none' }}>
                {row.status}
              </StyledTableCell>
              <StyledTableCell align="left">
                <button onClick={() => handleButtonClick(row._id)} style={{ backgroundColor: '#1E88E5', color: 'white', padding: '8px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Submit
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RecentServiceTable;
