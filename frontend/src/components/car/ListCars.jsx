import React from "react";
import TableData from "../../pages/table/TableData";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SideNav from "../../pages/SideNav";
import { useNavigate } from "react-router-dom";
import Navbar from "../header/Navbar";

const ListCars = () => {
  const navigation = useNavigate();
  return (
    <Box sx={styles.cont}>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component="main" sx={styles.container}>
          <h1>Car List</h1>
          <Button
            variant="contained"
            style={{ marginLeft: "auto" }}
            onClick={() => navigation("/car/create-car")}
            sx={styles.button}
          >
            + Add Car
          </Button>
          <Box sx={{ backgroundColor: "#fff" }}>
            <TableData sx={{ flexGrow: 1, p: 3 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const styles = {
  container: {
    margin: "131px 0 10px 50px",
  },
  cont: {
    background: "#f4f2f2",
    height: "100vh",
  },
  button: {
    marginBottom: "20px",
  },
};

export default ListCars;
