import React, { useState } from 'react';

const ImageCreateForm = ({
  values,
  handleChange,
  setValues,
  handleSubmit,
  handleImage,
  preview, 
  uploadButtonText,
  editPage = false,
  opencandidate = false,
}) => {
  const [buttonValue, setButtonValue] = useState('Save & Continue');

  return (
    <>
    {values && (
      <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-3">
        <input
          type="text"
          name="email"
          className="form-control"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-3">
        <input
          type="text"
          name="phone"
          className="form-control"
          placeholder="Phone"
          value={values.phone}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-3">
        <textarea
          name="description"
          cols="7"
          rows="7"
          placeholder="Description"
          value={values.description}
          className="form-control"
          onChange={handleChange}
        ></textarea>
      </div>
      
      <div className="form-group mb-3">
        <input
          type="text"
          name="category"
          className="form-control"
          placeholder="Category"
          value={values.category}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-3">
            <input
              type="text"
              name="expectedSalary"
              className="form-control"
              placeholder="Expected Salary"
              value={values.expectedSalary}
              onChange={handleChange}
            />
          </div> 
          <div className="form-group mb-3">
            <label>Current Status:</label>
            <select
              name="currentStatus"
              className="form-control"
              value={values.currentStatus}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              {opencandidate && (
                <>
                <option value="Listed">New Registered Candidate</option>
                </>
              )}
              {!opencandidate && (
                <>
                  <option value="Listed">Listed</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Offer Extended">Offer Extended</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </>
              )}
            </select>
          </div>
          <div className="form-group mb-3">
            <label>Node.js Experience:</label>
            <select
              name="nodejsExperience"
              className="form-control"
              value={values.nodejsExperience}
              onChange={handleChange}
            >
              <option value="">Select Node.js Experience</option>
              <option value="Less than 1 year">Less than 1 year</option>
              <option value="1-2 years">1-2 years</option>
              <option value="Over 2 years">Over 2 years</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label>ReactJS Experience:</label>
            <select
              name="reactjsExperience"
              className="form-control"
              value={values.reactjsExperience}
              onChange={handleChange}
            >
              <option value="">Select ReactJS Experience</option>
              <option value="Less than 1 year">Less than 1 year</option>
              <option value="1-2 years">1-2 years</option>
              <option value="Over 2 years">Over 2 years</option>
            </select>
          </div>
      <div className="form-row mb-3">
        <div className="col">
          <div className="form-group">
            <label className="btn btn-outline-secondary btn-block text-left">
              {uploadButtonText}
              <input
                type="file"
                name="image"
                onChange={handleImage}
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </div>
        {preview && (
          <div className="col">
            <img
              src={preview}
              alt="Preview"
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
        )}
        {editPage && values.image && (
          <div className="col">
            <img
              src={values.image.Location}
              alt="image not available"
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
        )}
      </div>
      {!editPage && 
      <div className="row">
      <div className="col">
        <button
          onClick={handleSubmit}
          disabled={values.loading || values.uploading}
          className="btn btn-primary"
          type="submit"
        >
          {values.loading ? 'Saving...' : buttonValue}
        </button>
      </div>
    </div>}
    </form>
    )}
    </>
  );
};

export default ImageCreateForm;
