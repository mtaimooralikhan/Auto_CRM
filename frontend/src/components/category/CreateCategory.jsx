import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCategorySlice } from "../../Store/createCategorySlice";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SideNav from "../../pages/SideNav";
import TextField from "@mui/material/TextField";
import Navbar from "../header/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCategory = () => {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleCategory = (e) => {
    e.preventDefault();
    let userCategory = {
      name: category,
    };
    dispatch(createCategorySlice(userCategory)).then((result) => {
      if(result.meta.requestStatus === "fulfilled"){
        toast.success("Created category successfully!");
        navigation("/car/category");
      }else if(result.meta.requestStatus === "rejected"){
        toast.error("Please check all required fields!");
        return;
      }
    });
  };

  return (
    <Box sx={styles.cont}>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component="main" sx={styles.container}>
          <h1>Create Category</h1>
          <TextField
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category Name"
            id="outlined-basic"
            type="text"
            placeholder="Enter category name please"
            fullWidth
            required
            variant="outlined"
          />
          <Button
            onClick={handleCategory}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            sx={styles.button}
          >
            {" "}
            Create{" "}
          </Button>
          <ToastContainer />
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    maxWidth: "50%",
    width: "100%",
    margin: "184px auto",
    border: "1px solid black",
    borderRadius: "12px",
    minHeight: "270px",
    height: "100%",
    background: "#fff",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  cont: {
    background: "#f4f2f2",
  },
  button: {
    width: "60%",
    margin: "auto",
  },
};

export default CreateCategory;
