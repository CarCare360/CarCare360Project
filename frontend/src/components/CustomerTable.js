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
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

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
  const [page, setPage] = useState(1); // Page starts from 1
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page
  const [searchText, setSearchText] = useState(""); // State to hold search input text

  useEffect(() => {
    // Fetch customers from the backend when the component mounts
    axios
      .get("https://car-care-360.onrender.com/api/registercustomer/")
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

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, customers.length - (page - 1) * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Filter the customers based on the search input
  const filteredCustomers = customers.filter((customer) =>
    `${customer.fName} ${customer.lName} ${customer.email}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const displayCustomers = filteredCustomers.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPage(1); // Reset page to 1 when a new search is performed
  };

  return (
    <div>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <PersonSearchIcon /> {/* Bootstrap search icon */}
              </span>
            </div>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Search for users"
              value={searchText || ""}
              onChange={handleSearch}
            />
          </div>
        </div>
        {/* Add the search icon */}
      </div>
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
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredCustomers.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
    </div>
  );
};

export default CustomerTable;
