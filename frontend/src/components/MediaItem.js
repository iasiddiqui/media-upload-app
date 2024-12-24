import React from 'react';
import { Link } from 'react-router-dom';

const MediaItem = ({ media }) => (
  <div>
    <h3>{media.title}</h3>
    <Link to={`/video/${media._id}`}>View Video</Link>
  </div>
);

export default MediaItem;
