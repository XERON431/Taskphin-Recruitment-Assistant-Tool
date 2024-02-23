import axios from "axios";
import { useRouter } from "next/router";
import SingleImageJumbotron from "../../components/cards/SingleImageJumbotron";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context";
import { toast } from "react-toastify";

const SingleImage = ({ image }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState({});
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user && image) checkEnrollment();
  }, [user, image]);

  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${image.id}`);
    setEnrolled(data);
  };

  const handleFreeEnrollment = async (e) => {
    e.preventDefault();
    try {
      if (!user) router.push("/login");

      if (enrolled.status) return router.push(`/user/image/${enrolled.image.slug}`);
      setLoading(true);
      const { data } = await axios.post(`/api/free-enrollment/${image.id}`);
      toast(data.message);
      setLoading(false);
      setEnrolled(data);
    } catch (err) {
      toast("Saving failed");
      console.log(err);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/image/${image.id}`);
      toast(data.message);
      // Optionally redirect or update state after successful deletion
      router.push("/");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast("Error deleting candidate");
    }
  };

  return (
    <>
      <SingleImageJumbotron
        image={image}
        user={user}
        loading={loading}
        handleFreeEnrollment={handleFreeEnrollment}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
        handleDelete={handleDelete}
      />
    </>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/image/${query.slug}`);

    return {
      props: {
        image: data,
      },
    };
  } catch (err) {
    console.log("Error fetching image:", err);
    return {
      props: {
        image: null, // or handle error accordingly
      },
    };
  }
}

export default SingleImage;
