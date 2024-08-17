import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CollapseItem from "./CollapseItem";
import { Ajouteutlisateur } from "../Fetch";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      تم تصميم الموقع من طرف شادلي محمد أمين {" © "} {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const phone = data.get("Phone");
    const password = data.get("password");
    const cpassword = data.get("cpassword");
    const fullname = data.get("fullname");

    if (phone.length >= 1 && password.length >= 1 && cpassword.length >= 1 && password === cpassword && fullname.length >= 1) {
      Ajouteutlisateur(fullname, password, phone);
      setShowAlert(true); // Show the alert on successful submission
          setTimeout(() => {
            setShowAlert(false); // Hide the alert after a delay
            navigate('/login');
          }, 3000); // Adjust the delay as needed
        
            } else {
      setErr("Please enter correct information.");
    }
  };

  const Login = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        {showAlert && (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
               you add succes create compte
              </Alert>
            )}
          <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
         
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            تسجيل حساب جديد
            </Typography>
            <Box component="form" onSubmit={handleSubmit} validate="true" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="الإسم الكامل"
                name="fullname"
                autoComplete="fullname"
                autoFocus
              />
            
              <TextField
                margin="normal"
                required
                fullWidth
                id="Phone"
                label="رقم الهاتف"
                name="Phone"
                autoComplete="phone"
              />
              <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">كلمة السر</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="كلمة السر"
                />
              </FormControl>
              <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">تأكيد كلمة السر</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  name="cpassword"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="تأكيد كلمة السر"
                />
              </FormControl>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                تسجيل
              </Button>
              <a href="#" onClick={Login} role="button" tabIndex="0">
             إذا كنت تملك حساب سجل الدخول هنا
              </a>
            </Box>
            {err && <CollapseItem err={err} />}
          </Box>
          <Copyright sx={{ mt: 4, mb: 2 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
