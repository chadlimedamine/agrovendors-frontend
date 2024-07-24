import React from "react";
import { Grid, TextField, Button, Typography, Card, CardContent, CardActions } from "@mui/material";

export const Addcontent = () => {
  const [postText, setPostText] = React.useState("");
  const [postImage, setPostImage] = React.useState(null);

  const handleChangePostText = (event) => {
    setPostText(event.target.value);
  };

  const handleChangePostImage = (event) => {
    setPostImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (postText.trim() !== "" && postImage) {
      console.log({ postText, postImage });
      // You can handle the form submission logic here, such as sending the data to a server.
    } else {
      alert("Both text and image are required");
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" style={{ marginTop: "10%" }}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom style={{paddingBottom:"20px",textAlign:"center"}}>
              Add Post
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="post-text"
                  label="Post Text"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  onChange={handleChangePostText}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="post-image"
                  type="file"
                  onChange={handleChangePostImage}
                />
                <label htmlFor="post-image">
                  <Button variant="contained" component="span" fullWidth>
                    Upload Image
                  </Button>
                </label>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
              style={{ height: "50px",maringBottom:"40px" }}
            >
              Submit Post
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Addcontent;
