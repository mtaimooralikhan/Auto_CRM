import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { categorySlice } from "../../Store/categorySlice";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SideNav from "../../pages/SideNav";
import Navbar from "../header/Navbar";
import { deleteCategorySlice } from "../../Store/deleteCategorySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Category = () => {
  // const deleteBtn = {backgroundColor: '#FF0000', marginLeft: 10};
  const navigation = useNavigate();
  const [categoryData, setTableData] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setLoading(false);
  };

  const onButtonClick = (e, id, btn) => {
    setLoading(true);
    e.stopPropagation();
    if (btn === "update") {
      navigation(`/car/update-category/${id}`);
      setLoading(false);
    } else if (btn === "delete") {
      dispatch(deleteCategorySlice(id)).then((result) => {
        if (result) {
          setLoading(false);
          dispatch(categorySlice()).then((result) => {
            if (result) {
              setLoading(false);
              console.log("Result", result);
              setTableData(result.payload.data);
            }
          });
          navigation("/car/category");
        }
      });
    }
    //do whatever you want with the row
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "__v", headerName: "Version", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => {
        return (
          <>
            {/* <Button
                onClick={(e) => onButtonClick(e,params.row._id,"update")}
                variant="contained"
              >
                Edit
              </Button> */}
            <EditIcon
              onClick={(e) => onButtonClick(e, params.row._id, "update")}
            />
            <DeleteIcon
              onClick={(e) => onButtonClick(e, params.row._id, "delete")}
            />

            {/* <Button style={deleteBtn}
                onClick={(e) => onButtonClick(e,params.row._id, "delete")}
                variant="contained"
              >
                Delete
              </Button> */}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(categorySlice()).then((result) => {
      if (result) {
        console.log("Result", result);
        setTableData(result.payload.data);
      }
    });
  }, []);

  return (
    <Box sx={styles.cont}>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component="main" sx={styles.container}>
          <h1>Categories List</h1>
          <Button
            variant="contained"
            sx={styles.button}
            onClick={() => navigation("/car/create-category")}
          >
            + Create Category
          </Button>
          <Box sx={{ backgroundColor: "#fff" }}>
            <DataGrid
              sx={{ flexGrow: 1, p: 3 }}
              rows={categoryData}
              columns={columns}
              pageSize={12}
              getRowId={(row) => row._id}
            />
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
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
export default Category;
