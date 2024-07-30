import React from "react";
import { Grid, TextField, Button, Typography, Card, CardContent, CardActions } from "@mui/material";
import { Ajoutepost } from "../../Fetch";

const Addcontent = () => {
  const [postText, setPostText] = React.useState("");
  const [postImage, setPostImage] = React.useState(null);
  const [postImageName, setPostImageName] = React.useState("");
  const [postImageError, setPostImageError] = React.useState("");
  const localStorageToken = localStorage.getItem('token');
  console.log(localStorageToken);
  const handleChangePostText = (event) => {
    setPostText(event.target.value);
  };

  const handleChangePostImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setPostImageError("Invalid file type. Please upload an image file (jpeg, png, gif).");
        return;
      }

      // Check file size (e.g., max 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        setPostImageError("File size too large. Please upload an image smaller than 2MB.");
        return;
      }

      setPostImage(file);
      setPostImageName(file.name);
      setPostImageError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (postText.trim() !== "" && postImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        AjoutepostText(postText,toke);
        AjouterpostImage(base64String,token)
        alert('Post created successfully');
      };
      reader.readAsDataURL(postImage);
    } else {
      alert("Both text and image are required");
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" style={{ marginTop: "10%" }}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom style={{ paddingBottom: "20px", textAlign: "center" }}>
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
                {postImageName && (
                  <Typography variant="body2" style={{ marginTop: "10px" }}>
                    Selected file: {postImageName}
                  </Typography>
                )}
                {postImageError && (
                  <Typography variant="body2" color="error" style={{ marginTop: "10px" }}>
                    {postImageError}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
              style={{ height: "50px", marginBottom: "40px" }}
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
