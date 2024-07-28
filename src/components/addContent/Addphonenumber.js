import React from "react";
import { Grid, TextField, Button, Typography, Card, CardContent, CardActions } from "@mui/material";
import { Ajouternmr } from "../../Fetch";

export const AddPhonenumber = () => {
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (phoneNumber.trim() !== "") {
      console.log({ phoneNumber });
      Ajouternmr(phoneNumber);
 alert('created')
    } else {
      alert("Phone number is required");
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" style={{ marginTop: "10%" }}>
      <Grid item xs={12} md={6}>
        <Card style={{padding:'40px'}} >
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom style={{paddingBottom:"20px",textAlign:"center"}}>
              Add Phone Number
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  onChange={handleChangePhoneNumber}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              
              style={{ height: "50px" }}
            >
              Submit Phone Number
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddPhonenumber;
