import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Box,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { loginUser } from "../Store/userSlice";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleClose = () => {
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    let userLogin = {
      email,
      password,
    };
    dispatch(loginUser(userLogin)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Logged In Successfully!");
        setLoading(false);
        console.log("Result", result.payload.token);
        localStorage.setItem("token", result.payload.token);
        navigation("/list-car");
      } else if (result.meta.requestStatus === "rejected") {
        toast.error("Please check your email and password!");
        setLoading(false);
        return;
      }
    });
  };

  if (loading)
    return (
      <Box sx={styles.loadingCont}>
        <CircularProgress />
      </Box>
    );
  else {
    return (
      <Grid style={styles.paddingTop}>
        <Paper elevation={10} style={styles.container}>
          <Grid align="center">
            <Avatar style={styles.avatarColor}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Login In</h2>
          </Grid>
          <Grid style={styles.textField}>
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
              style={styles.btnStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              id="outlined-basic"
              type="password"
              placeholder="Enter password please"
              fullWidth
              required
              variant="outlined"
            />
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Button
              onClick={handleLogin}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              style={styles.btnStyle}
            >
              {" "}
              Login{" "}
            </Button>
            <ToastContainer />
            <Typography sx={styles.text}>
              <Link href="#">Forget Password?</Link>
            </Typography>
            <Typography>
              {" "}
              Do you have an account?
              <Link sx={styles.link} href="/register" to="/register">
                Register Now
              </Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }
};

const styles = {
  container: {
    padding: "2rem",
    minHeight: "500px",
    height: "100%",
    maxWidth: "35%",
    width: "100%",
    margin: "20px auto",
  },
  paddingTop: {
    paddingTop: "3em",
  },
  avatarColor: { backgroundColor: "#1bbd7e" },
  textField: { marginTop: 60, marginBottom: 50 },
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

export default Login;
