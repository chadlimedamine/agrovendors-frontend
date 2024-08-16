import React from "react";
import { Grid, TextField, Button, Typography, Card, CardContent, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AjoutepostText } from "../../Fetch";
import { UploadImage } from '../../Fetch';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
const Addcontent = () => {
  const [postText, setPostText] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);
  const [postImage, setPostImage] = React.useState(null);
  const [postImageName, setPostImageName] = React.useState("");
  const [postImageError, setPostImageError] = React.useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChangePostText = (event) => {
    setPostText(event.target.value);
  };

  const handleChangePostImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setPostImageError("Invalid file type. Please upload an image file (jpeg, png).");
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

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    
    if (postText.trim() !== "") {
      try {
        const response = await AjoutepostText(postText, token);
        
        setShowAlert(true); // Show the alert on successful submission

        console.log(response.id);
  
        if (!postImage) {
          alert("Please select a file first!");
          return;
        }
    
        try {
          const imageResponse = await UploadImage(postImage, response.id, token);
        } catch (error) {
          console.error('Error uploading file:', error);
          alert('error uploading file', error);
        }
      } catch (error) {
        console.error('Error creating post:', error);
        alert(error);
      }
    } else {
      alert("Post text is required");
    }

    
  };

  return (
    <Grid container spacing={2} justifyContent="center" style={{ marginTop: "10%" }}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            
          {showAlert && (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
               you add succes add offers
              </Alert>
            )}
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
                  <Button variant="contained" component="span" fullWidth color="secondary">
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
              color="success"
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
