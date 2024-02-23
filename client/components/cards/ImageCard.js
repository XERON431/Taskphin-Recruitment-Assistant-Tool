import Link from "next/link";
import { Typography, Chip } from "@mui/material";

const ImageCard = ({ image }) => {
  // Extract Node.js and ReactJS experience from the image object
  const { name, nodejsExperience, reactjsExperience, expectedSalary, currentStatus, category } = image;

  // Function to calculate score based on experience level
  const calculateScore = (experience) => {
    switch (experience) {
      case "Less than 1 year":
        return 1;
      case "1-2 years":
        return 2;
      case "Over 2 years":
        return 3;
      default:
        return 0;
    }
  };

  // Calculate scores for Node.js and ReactJS
  const nodejsScore = calculateScore(nodejsExperience);
  const reactjsScore = calculateScore(reactjsExperience);

  // Calculate total score
  const totalScore = nodejsScore + reactjsScore;

  return (
    <div className="card mb-4" style={{
      backgroundColor: "black",
      color: "#fff",
      marginRight: "4px",
    }}>
      <Link href="/image/[slug]" as={`/image/${image.slug}`} legacyBehavior>
        <a className="text-decoration-none">
        <img
          src={image.image.Location}
          alt={name}
          className="card-img-top"
          style={{ maxWidth: "100%", maxHeight: "300px" }}
        />
          <div className="card-body">
            <Typography variant="h6" className="font-weight-bold" style={{
      backgroundColor: "#f0000",
      color: "#fff",
      marginRight: "4px",
    }}>
              Name - {name}
            </Typography>
            <Typography variant="h7" className="font-weight-bold">
              Score - {totalScore}
            </Typography>
            <br/>
            <Typography variant="h8" className="font-weight-bold">
              Expected Salary - Rs. {expectedSalary}
            </Typography>
            <br/><br/>
            <Chip
              label={currentStatus}
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                marginRight: "4px",
              }}
              className="mr-10"
            />
            <Chip
              label={category}
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                marginRight: "4px",
              }}
              className="mr-10"
            />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ImageCard;
