import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import axios from "axios";
import { SiTicktick } from "react-icons/si";
import { MdBlock } from "react-icons/md";
import { blockUser, unblockUser } from "../../utils/block.js";

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    //const navigate = useNavigate();

    useEffect(() => {
        if (!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user").then((response) => {
                console.log(response.data);
                setUsers(response.data);
                setLoaded(true);
            });
        }
    }, [loaded]);

    return (
        <div className="w-full h-full rounded-lg relative">
            {/* <Link
                to={"/admin/addProduct"}
                className="text-white absolute bg-gray-700 p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700 right-5 bottom-5"
            >
                <FaPlus />
            </Link> */}

            {loaded && (
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Phone</th>
                            <th className="p-2">Blocked</th>
                            <th className="p-2">Verified</th>
                            <th className="p-2">Block User</th>
                            <th className="p-2">Unblock User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={index}
                                className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-100"
                            >
                                <td className="p-2">{`${user.firstName} ${user.lastName}`}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.phone}</td>
                                <td className="p-2">{user.isDisabled ? "Yes" : "No"}</td>
                                <td className="p-2">{user.isVerified ? "Yes" : "No"}</td>
                                <td className="p-2">
                                    <div className="w-full h-full flex justify-center">
                                        <MdBlock
                                            onClick={() => {
                                                blockUser(user.email);
                                            }}
                                            className="text-[30px]  m-[10px] hover:text-red-500 "
                                        />
                                    </div>
                                </td>
                                <td className="p-2">
                                    <div className="w-full h-full flex justify-center">
                                        <SiTicktick
                                            onClick={() => {
                                                unblockUser(user.email);
                                            }}
                                            className="text-[25px]  m-[10px] hover:text-green-500"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {!loaded && <Loader />}
        </div>
    );
};

export default AdminUsersPage;
