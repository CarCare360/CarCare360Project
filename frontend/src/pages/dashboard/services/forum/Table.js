import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { visuallyHidden } from "@mui/utils";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// // Create dummy data for discussions
// const discussions = [
//   {
//     id: 1,
//     discussion: "General Discussion",
//     startedBy: "Ethan James",
//     lastPostBy: "Jackson Michael",
//     numPosts: 7,
//   },
//   {
//     id: 2,
//     discussion: "Best Practices for Customer Engagement",
//     startedBy: "John Doe",
//     lastPostBy: "John Doe",
//     numPosts: 5,
//   },
//   {
//     id: 3,
//     discussion: "Customer Service Queries",
//     startedBy: "Noah Benjamin",
//     lastPostBy: "Christopher Aiden",
//     numPosts: 6,
//   },
//   {
//     id: 4,
//     discussion: "Technical Issues",
//     startedBy: "Oliver Henry",
//     lastPostBy: "Ethan James",
//     numPosts: 8,
//   },
// ];

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Discussion",
  },
  {
    id: "creator",
    numeric: false,
    disablePadding: false,
    label: "Started By",
  },
  {
    id: "lastPostBy",
    numeric: false,
    disablePadding: false,
    label: "Last Post By",
  },
  {
    id: "posts",
    numeric: true,
    disablePadding: false,
    label: "No of Posts",
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ fontWeight: "bold" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        display: "flex", // Add display: flex to horizontally align items
        alignItems: "center", // Center vertically
      }}
    >
      <Typography
        sx={{
          flex: "1 1 auto", // Auto-grow to take available space
          fontWeight: "bold", // Make the text bold
          textAlign: "left", // Align text to the left
          padding: "1rem",
        }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Discussions
      </Typography>
    </Toolbar>
  );
}

export default function EnhancedTable() {
  const [discussions, setdiscussions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchDiscussions() {
    const response = await axios.get(
      "http://localhost:4000/api/forum/getDiscussions"
    );
    const reversedData = response.data.reverse();

    setdiscussions(reversedData);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchDiscussions();
  }, []);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const navigate = useNavigate();
  const currentUrl = useLocation().pathname;
  const nextUrl = currentUrl.replace("/forum", "/discussion");
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - discussions.length) : 0;
  const visibleRows = React.useMemo(() => {
    const sortedData = stableSort(discussions, getComparator(order, orderBy));
    return sortedData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [discussions, order, orderBy, page, rowsPerPage]);
  const handleClick = (row) => {
    const details = JSON.stringify(row);
    localStorage.setItem("discussion_details", details);
    navigate(nextUrl + "/" + row._id);
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {visibleRows.map((row, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell
                        align="left"
                        style={{ width: "50%" }}
                        onClick={() => {
                          handleClick(row);
                        }}
                      >
                        {row.title}
                      </TableCell>
                      <TableCell align="left" style={{ width: "20%" }}>
                        <AccountCircle />
                        {row.creator}
                      </TableCell>
                      <TableCell align="left" style={{ width: "20%" }}>
                        <AccountCircle />
                        {row.lastPostBy ? row.lastPostBy : ""}
                      </TableCell>
                      <TableCell align="right" style={{ width: "10%" }}>
                        {row.posts.length}
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={4} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Bottom part of the table */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={discussions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      )}
    </>
  );
}
