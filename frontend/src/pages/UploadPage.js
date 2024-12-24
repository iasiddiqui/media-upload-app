import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const UploadPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !video) {
      alert('Both image and video are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('video', video);

    try {
      const response = await axios.post('http://localhost:5000/api/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Media uploaded successfully!');
    } catch (error) {
      console.error('Error uploading media', error);
      alert('Error uploading media');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, maxWidth: 500, margin: '0 auto', backgroundColor: '#f4f4f9', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" gutterBottom>Upload Media</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
            onChange={(e) => setImage(e.target.files[0])}
            hidden
          />
        </Button>
        <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
          Upload Video
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            hidden
          />
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Upload
        </Button>
      </form>
    </Box>
  );
};

export default UploadPage;
