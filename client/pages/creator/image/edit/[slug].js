import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import ImageCreateForm from "../../../../components/forms/ImageCreateForm.js";
import CreatorRoute from "../../../../components/routes/CreatorRoute.js";
import Resizer from 'react-image-file-resizer';
import { toast } from "react-toastify";

const ImageEdit = () => {
  const router = useRouter();
  const [buttonValue, setButtonValue] = useState('Save & Continue');
  const [values, setValues] = useState({
    name: "",
    description: "",
    uploading: false,
    category: "",
    price: "0",
    loading: false,
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const { slug } = router.query;

  useEffect(() => {
    loadImage();
  }, []);

  const loadImage = async () => {
    const { data } = await axios.get(`/api/image/${slug}`);
    if (data) setValues(data);
    if (data && data.image) setImage(data.image);
  }

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    // Resize
    Resizer.default.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/image/upload-image", {
          image: uri,
        });
        console.log("IMAGE UPLOADED", data);
        // Set image in state
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Candidate upload failed. Try later.");
      }
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setButtonValue("Update");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/image/${slug}`, {
        ...values,
        image,
      });
      toast("Candidate info updated");
      router.push(`/creator/image/view/${slug}`);
    } catch (err) {
      console.log("Error:", err);
      // Handle error and show appropriate message
    }
  };

  return (
    <CreatorRoute>
      <h1 style={{ textAlign: "center", background: "#000000", color: "#fff", padding: "20px" }}>Update Image</h1>
      <div className="pt-3 pb-3">
        <ImageCreateForm
          handleChange={handleChange}
          handleImage={handleImage}
          handleSubmit={handleSubmit}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          editPage={true}
        />
      </div>
      <div className="row">
        <div className="col">
          <button
            onClick={handleSubmit}
            disabled={values.loading || values.uploading}
            className="btn btn-primary "
            type="submit"
          >
            {values.loading ? 'Saving...' : buttonValue}
          </button>
        </div>
      </div>
    </CreatorRoute>
  );
};

export default ImageEdit;
