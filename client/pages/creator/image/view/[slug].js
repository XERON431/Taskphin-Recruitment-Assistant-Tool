import React, { useState, useEffect, useContext } from 'react'; // Import useContext from react
import { useRouter } from 'next/router';
import CreatorRoute from '../../../../components/routes/CreatorRoute';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Button, CircularProgress, Chip, Typography } from '@mui/material';
import { FaEdit, FaToggleOn, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Context } from "../../../../context/index.js";

const ImageView = () => {
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  
  const {state: {user}}=useContext(Context)
  useEffect(() => {
    loadImage();
  }, [slug]);

  const loadImage = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/image/${slug}`);
      setImage(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading image:', error);
      setLoading(false);
    }
  };

  const handlePublish = async (imageId) => {
    try {
      let answer = window.confirm('Are you sure you want to publish? It will be live.');
      if (!answer) return;

      setLoading(true);
      const { data } = await axios.put(`/api/image/publish/${imageId}`);
      setImage(data);
      setLoading(false);
      toast('Congratulations! Your Candidate is live!');
    } catch (err) {
      console.error('Error publishing candidate:', err);
      setLoading(false);
      toast('Image publish failed. Try again.');
    }
  };

  const handleUnpublish = async (imageId) => {
    try {
      let answer = window.confirm('Are you sure you want to unpublish?');
      if (!answer) return;

      setLoading(true);
      const { data } = await axios.put(`/api/image/unpublish/${imageId}`);
      setImage(data);
      setLoading(false);
      toast('Candidate is taken down from showcase!');
    } catch (err) {
      console.error('Error unpublishing image:', err);
      setLoading(false);
      toast('Image unpublish failed. Try again.');
    }
  };

  const handleDelete = async (imageId) => {
    try {
      let answer = window.confirm('Are you sure you want to delete this image?');
      if (!answer) return;

      setLoading(true);
      await axios.delete(`/api/image/${imageId}`);
      setLoading(false);
      toast('Image deleted successfully.');
      router.push('/');
    } catch (err) {
      console.error('Error deleting image:', err);
      setLoading(false);
      toast('Image deletion failed. Try again.');
    }
  };

  return (
    <CreatorRoute>
      <div className="container-fluid pt-3">
        {image && (
          <div style={{ textAlign: 'center', background: '#000000', color: '#fff', padding: '20px' }}>
            <div className="row">
              <div className="col-md-8 p-4">
                <Typography variant="h1" className="font-weight-bold" style={{ color: 'pink' }}>
                  {image.name}
                </Typography>
                
                <div className="mt-2">
                  {image.category && (
                    <Chip
                      label={image.category}
                      style={{ backgroundColor: '#03a9f4', color: '#fff', marginRight: '4px' }}
                    />
                  )}
                  {image.currentStatus && (
                    <Chip
                      label={image.currentStatus}
                      style={{ backgroundColor: '#ff0000', color: '#fff', marginRight: '4px' }}
                    />
                  )}
                  {image.phone && (
                    <Chip
                      label={image.phone}
                      style={{ backgroundColor: 'green', color: '#fff', marginRight: '4px' }}
                    />
                  )}
                  {image.email && (
                    <Chip
                      label={image.email}
                      style={{ backgroundColor: 'violet', color: 'white', marginRight: '4px' }}
                    />
                  )}
                </div>
                <hr/>
                <br />
                <br />
                <Typography variant="body1" style={{ color: 'white' }}>
                  {image.description && image.description.substring(1, 160)}...
                </Typography>
                <div className="mt-4">
                  <Button
                    className="mb-3 m-3"
                    variant="contained"
                    color="secondary"
                    disabled={loading}
                    onClick={() => {
                      router.push(`/creator/image/edit/${slug}`);
                    }}
                  >
                    <Typography variant="button" style={{ color: 'white' }}>
                      Update status
                    </Typography>
                  </Button>
                  {image.published ? (
                    <Button
                      className="mb-3 m-3"
                      variant="contained"
                      color="secondary"
                      disabled={loading}
                      onClick={() => handleUnpublish(image.id)}
                    >
                      <Typography variant="button" style={{ color: 'white' }}>
                        Unpublish
                      </Typography>
                    </Button>
                  ) : (
                    <Button
                      className="mb-3 m-3"
                      variant="contained"
                      color="secondary"
                      disabled={loading}
                      onClick={() => handlePublish(image.id)}
                    >
                      <Typography variant="button" style={{ color: 'white' }}>
                        Publish
                      </Typography>
                    </Button>
                  )}


                  <Button
                    className="mb-3 m-3"
                    variant="contained"
                    color="secondary"
                    disabled={loading}
                    onClick={() => handleDelete(image.id)}
                  >
                    <Typography variant="button" style={{ color: 'white' }}>
                      Delete
                    </Typography>
                  </Button>
                </div>
              </div>
              <div className="col-md-4 p-4">
                <img
                  src={image.image ? image.image.Location : '/1-8.jpg'}
                  alt={image.name}
                  className="card-img-top"
                  style={{ height: '500px', objectFit: 'cover' }}
                />
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  
                </div>
              </div>
            </div>
            {loading && (
              <div className="d-flex justify-content-center">
                <CircularProgress color="secondary" />
              </div>
            )}
          </div>
        )}
      </div>
    </CreatorRoute>
  );
};

export default ImageView;
