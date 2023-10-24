import * as React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Topbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const CustomerDashboard = () => {
  const sampleData = [
    {
      id: 1,
      title: "Corolla",
      content: "This is the content for Card 1.",
      reg: "CAB-1234",
      NextService: "53040 km",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/2010_Toyota_Corolla_CE%2C_Front_Left.jpg/420px-2010_Toyota_Corolla_CE%2C_Front_Left.jpg",
    },
    {
      id: 2,
      title: "Aqua",
      content: "This is the content for Card 2.",
      reg: "KK-2590",
      NextService: "78965 km",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/2017_Toyota_Aqua_%28cropped%29.jpg/300px-2017_Toyota_Aqua_%28cropped%29.jpg",
    },
    {
      id: 3,
      title: "Prius",
      content: "This is the content for Card 3.",
      reg: "KF-3269",
      NextService: "53040 km",
      image:
        "https://global.toyota/pages/news/images/2015/10/13/1330/20151013_01_15_s.jpg",
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "RegisterNumber", headerName: "Register number", width: 200 },
    { field: "ServiceType", headerName: "Service type", width: 200 },
    { field: "Date", headerName: "Date", width: 200 },
    { field: "TimeSlot", headerName: "Time slot", width: 200 },
    { field: "CurrentStatus", headerName: "Current status", width: 200 },
  ];

  const rows = [
    {
      id: 1,
      RegisterNumber: "CAB-1234",
      ServiceType: "Oil Change",
      Date: "2023-09-15",
      TimeSlot: "10:00 AM - 11:00 AM",
      CurrentStatus: "In Progress",
    },
    {
      id: 2,
      RegisterNumber: "KK-2590",
      ServiceType: "Brake Inspection",
      Date: "2023-09-16",
      TimeSlot: "2:00 PM - 3:00 PM",
      CurrentStatus: "Completed",
    },
    {
      id: 3,
      RegisterNumber: "KF-3269",
      ServiceType: "Tire Rotation",
      Date: "2023-09-17",
      TimeSlot: "9:00 AM - 10:00 AM",
      CurrentStatus: "Scheduled",
    },
    {
      id: 4,
      RegisterNumber: "AB-5678",
      ServiceType: "Engine Tune-up",
      Date: "2023-09-18",
      TimeSlot: "3:00 PM - 4:00 PM",
      CurrentStatus: "In Progress",
    },
    {
      id: 5,
      RegisterNumber: "XY-9876",
      ServiceType: "AC Inspection",
      Date: "2023-09-19",
      TimeSlot: "11:00 AM - 12:00 PM",
      CurrentStatus: "Scheduled",
    },
  ];

  return (
    <>
      <Topbar />
      <Box height={50} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            My Vehicles
          </Typography>
          <Grid
            container
            spacing={2}
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
          >
            {sampleData.map((card) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={card.id}
                style={{ padding: "30px" }}
              >
                <Card>
                  <CardMedia sx={{ height: 140 }} image={card.image} />
                  <CardHeader
                    title={card.title}
                    style={{ marginBottom: "-20px" }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {card.reg} <br />
                      Next service on {card.NextService}
                      <br />
                      {card.content}
                    </Typography>
                  </CardContent>
                  <Button variant="contained" style={{ margin: "10px" }}>
                    See more
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* Table below the grid */}
          <Box mt={4}>
            <Typography variant="h4" gutterBottom>
              My Appointments
            </Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CustomerDashboard;
