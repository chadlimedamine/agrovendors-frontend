import React from "react";
import { Grid, TextField, Button, Typography, Card, CardContent, CardActions } from "@mui/material";
// import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
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
  const [image, setImage] = React.useState(null);

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

      // Create a URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
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
               تم إضافة عرضك بنجاح
              </Alert>
            )}
            <Typography variant="h5" component="h5" gutterBottom style={{ paddingBottom: "0px", textAlign: "center" }}>
              أضف عرضك الخاص
            </Typography>
            <Typography variant="h6" component="h6" gutterBottom style={{ paddingBottom: "20px", textAlign: "center" }}>
              مثال: متوفر 10 أطنان تفاح قالة جودة عالية مباشرة من عند الفلاح
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="post-text"
                  label="أكتب عرضك هنا"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  onChange={handleChangePostText}
                />
              </Grid>
              {/* {image && (
                <Avatar
                  alt="Selected Image"
                  src={image}
                  sx={{ width: 100, height: 100, mt: 2 }}
                />
              )} */}
              
              {image && (
              <Box
                component="img"
                src={image} 
                sx={{
                  width: '80%',    // Fill the available width
                  height: 'auto',   // Maintain aspect ratio (or use '100%' to fill the height too)
                  mt: 2,
                  objectFit: 'cover' // Optional: covers the area without stretching
                }}
              />
            )}
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
                    أضف صورة
                  </Button>
                </label>
                {/* {postImageName && (
                  <Typography variant="body2" style={{ marginTop: "10px" }}>
                    الصورة المختارة: {postImageName}
                  </Typography>
                )} */}
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
              أضف العرض
            </Button>
          </CardActions>
        </Card>
      </Grid>
      
    </Grid>
  );
};

export default Addcontent;
