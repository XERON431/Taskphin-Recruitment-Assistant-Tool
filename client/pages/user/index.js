import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import { FiRefreshCw } from "react-icons/fi";
import Link from "next/link";

const UserIndex = () => {
    const { state: { user } } = useContext(Context);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/user-images');
            setImages(data);
            setLoading(false);
        } catch (err) {
            console.log("shit here is the error")
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <UserRoute>
            {loading && (
                <FiRefreshCw className="d-flex justify-content-center display-1 text-danger p-5" />
            )}
            <h1 style={{ textAlign: "center", background: "#000000", color: "#fff", padding: "20px" }}>Saved Candidates</h1>
            {images && images.map(image => (
                <div key={image.id} style={{ display: "flex", alignItems: "center", padding: "10px" }}>
                    <img
                        className="mr-3 rounded"
                        src={image.image ? image.image.Location : '/background.jpg'}
                        alt={image.name}
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                    <div style={{ marginLeft: "20px" }}>
                    <Link href={`/creator/image/view/${image.slug}`} className="pointer">
                    <h5 className="mt-2 text-primary">{image.name}</h5></Link>
                    <h5 className="mt-2">{image.currentStatus}</h5>
                    </div>
                    
                    {/* <hr/> */}
                </div>
            ))}
        </UserRoute>
    );
};

export default UserIndex;