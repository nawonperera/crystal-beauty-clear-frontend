import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserData = () => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token != null) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    setUser(response.data.user);
                })
                .catch((e) => {
                    console.log(e);
                    setUser(null);
                });
        }
    }, []);

    return (
        <>
            {user == null ? (
                <div className="h-full flex justify-center items-center flex-row">
                    <Link to="/login" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ml-2">
                        Login
                    </Link>
                    <Link to="/register" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ml-2">
                        Register
                    </Link>
                </div>
            ) : (
                <div className="h-full flex justify-center items-center flex-row">
                    <button
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ml-2"
                        onClick={() => {
                            localStorage.removeItem("token");
                            setUser(null); // make sure your state is named `user`, not `setuser`
                            window.location = "/login";
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
        </>
    );
};

export default UserData;
