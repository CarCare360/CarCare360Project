import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const CustomerTable = ({ selectedUsers, setSelectedUsers }) => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Fetch customers from the backend when the component mounts
    axios
      .get("http://localhost:4000/api/registercustomer/")
      .then((response) => {
        // Filter customers with the "customer" role and select specific fields
        const customerData = response.data
          .filter((customer) => customer.role === "customer")
          .map((customer) => ({
            _id: customer._id,
            fName: customer.fName,
            lName: customer.lName,
            email: customer.email,
          }));
        setCustomers(customerData);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  const itemsPerPage = 20;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const displayCustomers = customers.slice(startIndex, endIndex);

  const toggleCustomerSelection = (customer) => {
    if (
      selectedUsers.some((selectedUser) => selectedUser._id === customer._id)
    ) {
      setSelectedUsers(
        selectedUsers.filter(
          (selectedUser) => selectedUser._id !== customer._id
        )
      );
    } else {
      setSelectedUsers([...selectedUsers, customer]);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customer table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Select</StyledTableCell>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayCustomers.map((customer) => (
            <StyledTableRow key={customer._id}>
              <StyledTableCell>
                <input
                  type="checkbox"
                  checked={selectedUsers.some(
                    (selectedUser) => selectedUser._id === customer._id
                  )}
                  onChange={() => toggleCustomerSelection(customer)}
                />
              </StyledTableCell>
              <StyledTableCell>{`${customer.fName} ${customer.lName}`}</StyledTableCell>
              <StyledTableCell>{customer.email}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={endIndex >= customers.length}
        >
          Next
        </button>
      </div>
    </TableContainer>
  );
};

export default CustomerTable;
