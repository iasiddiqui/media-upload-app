import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [imageName, setImageName] = useState("");
  const [videoName, setVideoName] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !video) {
      setSnackbar({
        open: true,
        message: "Both image and video are required.",
        severity: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("video", video);

    setLoading(true); // Start loading
    try {
      await axios.post(`${API_URL}/api/media`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSnackbar({
        open: true,
        message: "Media uploaded successfully!",
        severity: "success",
      });
      // Clear all fields after successful upload
      setTitle("");
      setDescription("");
      setImage(null);
      setVideo(null);
      setImageName("");
      setVideoName("");
    } catch (error) {
      console.error("Error uploading media", error);
      setSnackbar({
        open: true,
        message: "Error uploading media. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
      setSnackbar({
        open: true,
        message: `Image "${file.name}" selected.`,
        severity: "info",
      });
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setVideoName(file.name);
      setSnackbar({
        open: true,
        message: `Video "${file.name}" selected.`,
        severity: "info",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        maxWidth: 500,
        margin: "0 auto",
        backgroundColor: "#f4f4f9",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Upload Media
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </Button>
        {imageName && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Selected Image: {imageName}
          </Typography>
        )}
        <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
          Upload Video
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            hidden
          />
        </Button>
        {videoName && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Selected Video: {videoName}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          disabled={loading} // Disable button during loading
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} /> Uploading...
            </>
          ) : (
            "Upload"
          )}
        </Button>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Top-right corner
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UploadPage;
