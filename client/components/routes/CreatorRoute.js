import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CreatorNav from "../nav/CreatorNav";
//nkjnknk
const CreatorRoute = ({ children }) => {
  // state
  const [ok, setOk] = useState(false);
  // router
  const router = useRouter();

  useEffect(() => {
    console.log("this useeffect worked")
    fetchCreator();
  }, []);

  const fetchCreator = async () => {
    try {
      console.log("oh my god")
      const { data } = await axios.get("/api/current-creator");
      console.log("woah ")
        console.log(data);
      if (!data.ok) setOk(true);
    } catch (err) {
      console.log("yeah error is here")
      console.log(err);
      setOk(false);
      router.push("/");
    }
  };

  return (
    <>
      {!ok ? (
       <h1></h1>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <CreatorNav />
            </div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatorRoute;
