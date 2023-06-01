import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SideNav from "../../pages/SideNav";
import { useNavigate } from "react-router-dom";
import Navbar from "../header/Navbar";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { createCarSlice } from "../../Store/createCarSlice";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import React, { useState, useEffect } from "react";
import { categorySlice } from "../../Store/categorySlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreateCar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [registration_no, setRegisteration] = useState("");

  const handleChange = (event, id) => {
    setCategory(event.target.value);
    setCategoryId(id.props.id);
  };

  const handleCar = (e) => {
    e.preventDefault();
    let userCar = {
      category: categoryId,
      make,
      model,
      color,
      registration_no,
    };

    dispatch(createCarSlice(userCar)).then((result) => {
      if(result.meta.requestStatus === "fulfilled"){
        toast.success("Added car successfully!");
        navigation('/list-car');
      }else if(result.meta.requestStatus === "rejected"){
        toast.error("Please check all required fields!");
        return;
      }
    });
  };

  useEffect(() => {
    dispatch(categorySlice()).then((result) => {
      if (result) {
        console.log("Result", result);
        setCategoryList(result.payload.data);
      }
    });
  }, []);

  return (
    <Box sx={styles.cont}>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <SideNav />

        <Box component="main" sx={styles.container}>
          <h1>Create Car</h1>
          {/* <TextField value={category} onChange={(e) => setCategory(e.target.value)} label="Category Name" id="outlined-basic" type='text' placeholder='Enter name please' fullWidth required variant="outlined"/> */}
          <FormControl>
            <InputLabel id="demo-multiple-checkbox-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              value={category}
              onChange={(id, e) => handleChange(id, e)}
              name={category}
              label="Select Category"
              input={<OutlinedInput label="Select Category" />}
              MenuProps={MenuProps}
              sx={styles.select}
            >
              {categoryList?.map((category) => (
                <MenuItem
                  id={category._id}
                  key={category._id}
                  value={category.name}
                >
                  <ListItemText primary={category.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            value={make}
            onChange={(e) => setMake(e.target.value)}
            label="Make Name"
            id="outlined-basic"
            type="text"
            placeholder="Enter make please"
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            value={model}
            onChange={(e) => setModel(e.target.value)}
            label="Model Name"
            id="outlined-basic"
            type="text"
            placeholder="Enter model please"
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            value={color}
            onChange={(e) => setColor(e.target.value)}
            label="Color Name"
            id="outlined-basic"
            type="text"
            placeholder="Enter color please"
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            value={registration_no}
            onChange={(e) => setRegisteration(e.target.value)}
            label="Registeration No"
            id="outlined-basic"
            type="text"
            placeholder="Enter registeration please"
            fullWidth
            required
            variant="outlined"
          />
          <Button
            variant="contained"
            style={{ marginLeft: "auto" }}
            onClick={handleCar}
            sx={styles.button}
          >
            Add Car
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
  select: {
    minWidth: "100%",
    margin: "0",
  },
};

export default CreateCar;
