import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";


//nkjnknk
const StudentRoute = ({ children }) => {
  // state
  const [ok, setOk] = useState(false);
  // router
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      //   console.log(data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
    }
  };

  return (
    <>
      {ok ? (
       <h1></h1>
      ) : (
        <div className="container-fluid">
          {children}
        </div>
      )}
    </>
  );
};

export default StudentRoute;
