import { Chip, Button, CircularProgress, Typography } from "@mui/material";

const SingleImageJumbotron = ({ image, user, loading, handleFreeEnrollment, enrolled, handleDelete }) => {
  return (
    <div style={{ textAlign: "center", background: "#000000", color: "#fff", padding: "20px" }}>
      <div className="row">
        <div className="col-md-8 p-4">
          <Typography variant="h1" className="font-weight-bold" style={{ color: "pink" }}>
            {image.name}
          </Typography>

          {image.category && (
            <Chip
              label={image.category}
              style={{
                backgroundColor: "#03a9f4",
                color: "#fff",
                marginRight: "4px",
              }}
              className="mr-10"
            />
          )}
          {image.currentStatus && (
            <Chip
              label={image.currentStatus}
              style={{
                backgroundColor: "#ff0000",
                color: "#fff",
                marginRight: "4px",
              }}
              className="mr-10"
            />
          )}
          {image.phone && (
            <Chip
              label={image.phone}
              style={{
                backgroundColor: "green",
                color: "#fff",
                marginRight: "4px",
              }}
              className="mr-10"
            />
          )}
          {image.email && (
            <Chip
              label={image.email}
              style={{
                backgroundColor: "violet",
                color: "white",
                marginRight: "4px",
              }}
              className="mr-10"
            />
          )}
          <br />
          <br />
          <Typography variant="body1" style={{ color: "white" }}>
            {image.description && image.description.substring(1, 160)}...
          </Typography>
          {loading ? (
            <div className="d-flex justify-content-center">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}> {/* Add flex container */}
              <Button
                className="mb-3 mt-3"
                variant="contained"
                color="secondary"
                fullWidth
                disabled={loading}
                onClick={handleFreeEnrollment}
              >
                <Typography variant="button" style={{ color: "white" }}>
                  {user ? enrolled.status ? "Saved" : "Save" : "Login to save"}
                </Typography>
              </Button>
              <Button
                className="mb-3 mt-3"
                variant="contained"
                color="secondary"
                fullWidth
                disabled={loading}
                onClick={handleDelete}
              >
                <Typography variant="button" style={{ color: "white" }}>
                  Delete
                </Typography>
              </Button>
            </div>
          )}
        </div>
        <div className="col-md-4 p-4">
          <img
            src={image.image.Location}
            alt={image.name}
            className="card-img-top"
            style={{ height: "500px", objectFit: "cover" }}
          />
          <hr />
          
        </div>
      </div>
    </div>
  );
};

export default SingleImageJumbotron;
