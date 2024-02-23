import React, { useState } from "react";
import { useRouter } from 'next/router';
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ImageCreateForm from "../components/forms/ImageCreateForm.js"
import CreatorRoute from "../components/routes/CreatorRoute.js";
import Resizer from 'react-image-file-resizer';
import { toast } from "react-toastify";

const ImageCreate = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    expectedSalary: "",
    currentStatus: "",
    nodejsExperience: "",
    reactjsExperience: "",
    uploading: false,
    loading: false,
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [opencandidate, setOpencandidate] = useState(true);

  
  
  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    // Resize
    Resizer.default.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        console.log("image uploader reached here")
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("yes i reached here")
      const { data } = await axios.post("/api/imagecandidate", {
        ...values,
        image,
      });

      toast("Great! Candidate is created");
      router.push("/creator");
    } catch (err) {
      console.log("Error:", err);
      // Handle error and show appropriate message
    }
  };

  return (
    <div style={{ padding: "0 20px" }}> {/* Add padding on the sides */}
      <h1 style={{ textAlign: "center", background: "#000000", color: "#fff", padding: "20px" }}>Candidate Information</h1>
      <div className="pt-3 pb-3">
        <ImageCreateForm
          handleChange={handleChange}
          handleImage={handleImage}
          handleSubmit={handleSubmit}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          opencandidate = {opencandidate}
        />
      </div>
    </div>
  );
};

export default ImageCreate;
