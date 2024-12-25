import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Box, CircularProgress, Grid, Alert } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

const VideoPage = () => {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/media/${id}`);
        setMedia(response.data);
      } catch (error) {
        console.error("Error fetching media", error);
        setError(true);
      }
    };

    fetchMedia();
  }, [id]);

  return (
    <Box sx={{ padding: 2 }}>
      {error ? (
        <Alert severity="error" sx={{ textAlign: "center" }}>
          Failed to load media. Please try again later.
        </Alert>
      ) : media ? (
        <>
          <Typography variant="h4" align="center">
            {media.title}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
            {media.description}
          </Typography>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={media.imageUrl}
                alt={media.title || "Media Image"}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <video
                controls
                autoPlay
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              >
                <source src={media.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Grid>
          </Grid>
        </>
      ) : (
        <CircularProgress sx={{ display: "block", margin: "0 auto" }} />
      )}
    </Box>
  );
};

export default VideoPage;
