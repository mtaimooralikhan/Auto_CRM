import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../Store/signUpSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setLoading(false);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    let userSignUp = {
      name,
      email,
      password,
    };

    dispatch(signUpUser(userSignUp)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Registered Successfully!");
        setLoading(false);
        navigation("/login");
      } else if (result.meta.requestStatus === "rejected") {
        toast.error("Please check existing email and all required fields!");
        setLoading(false);
        return;
      }
    });
  };

  return (
    <Grid sx={styles.paddingTop}>
      <Paper elevation={10} sx={styles.containerRegister}>
        <Grid align="center">
          <Avatar sx={styles.avatarColor}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Register Now</h2>
        </Grid>
        <Grid sx={styles.textField}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="First Name"
            id="outlined-basic"
            type="text"
            placeholder="Enter first name please"
            fullWidth
            required
            variant="outlined"
            sx={styles.textField}
          />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            id="outlined-basic"
            type="email"
            placeholder="Enter email please"
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            id="outlined-basic"
            type="password"
            placeholder="Enter password please"
            fullWidth
            required
            variant="outlined"
            sx={styles.textField}
          />

          <Button
            sx={styles.btnStyle}
            onClick={handleSignUp}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            {" "}
            Register{" "}
          </Button>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <ToastContainer />
          <Typography>
            {" "}
            Do you have an account?
            <Link href="/login" to="/login">
              Login Now
            </Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

const styles = {
  containerRegister: {
    padding: "2rem",
    minHeight: "600px",
    height: "100%",
    maxWidth: "35%",
    width: "100%",
    margin: "20px auto",
  },
  paddingTop: {
    paddingTop: "3em",
  },
  avatarColor: { backgroundColor: "#1bbd7e" },
  textField: { margin: "30px 0" },
  btnStyle: { margin: "2em 0em", height: "51px" },
  text: {
    margin: "10px 0",
  },
  link: {
    marignLeft: "10px",
  },
  loadingCont: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  },
};

export default Register;
