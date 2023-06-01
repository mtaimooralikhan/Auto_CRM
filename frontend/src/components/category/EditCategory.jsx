import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCategorySlice } from "../../Store/updateCategorySlice";
import { categoryByIdSlice } from "../../Store/categoryByIdSlice";
import { useParams } from "react-router-dom";
import Navbar from "../header/Navbar";
import Box from "@mui/material/Box";
import SideNav from "../../pages/SideNav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
  const btnStyle = { margin: "1em 0em" };
  const [category, setCategory] = useState("");
  const [id, setCategoryId] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const params = useParams();

  useEffect(() => {

    dispatch(categoryByIdSlice(params.id)).then((result) => {
      if(result.meta.requestStatus === "fulfilled"){
        setCategory(result.payload.name);
      }else if(result.meta.requestStatus === "rejected"){
        return;
      }
    });

    setCategoryId(params.id);

  }, []);

  const handleCategory = (e, _id) => {
    if(category === "") {
      toast.error("Please check all required fields!");
      return;
    }
    e.preventDefault();
    let updateCategory = {
      name: category,
      _id,
    };

    dispatch(updateCategorySlice(updateCategory, _id)).then((result) => {
      if(result.meta.requestStatus === "fulfilled"){
        toast.success("Updated category successfully!");
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
          <h1>Update Category</h1>
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
            sx={styles.button}
            onClick={(e) => handleCategory(e, id)}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={btnStyle}
          >
            {" "}
            update{" "}
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
    margin: "auto !important",
  },
};

export default EditCategory;
