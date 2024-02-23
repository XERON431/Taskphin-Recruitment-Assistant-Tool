import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ImageCard from "../components/cards/ImageCard";

const Index = ({ images }) => {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const [searchedImages, setSearchedImages] = useState([]);

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setSearchText(newValue);
    const filteredImages = images.filter((image) =>
      image.description.toLowerCase().includes(newValue.toLowerCase())
    );
    setSearchedImages(filteredImages);
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          background: "#000000",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h1>Global Candidate Showcase</h1>
      </div>
      <div className="container-fluid">
        <div className="row pt-2">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Search descriptions..."
              value={searchText}
              onChange={handleSearchChange}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="row pt-2">
          {(searchText ? searchedImages : images)?.map((image) => (
            <div key={image.id} className="col-md-4">
              <ImageCard key={image.id} image={image} />
            </div>
          ))}
        </div>
        {searchText && searchedImages.length === 0 && (
          <div>No candidate meets required skills</div>
        )}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const { data } = await axios.get("http://localhost:3000/api/images");
    return {
      props: {
        images: data,
      },
    };
  } catch (error) {
    console.error("Error fetching images:", error);
    return {
      props: {
        images: [],
      },
    };
  }
}

export default Index;
