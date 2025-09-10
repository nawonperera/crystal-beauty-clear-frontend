import axios from "axios";
import toast from "react-hot-toast";

export async function blockUser(email) {
    const token = localStorage.getItem("token");
    if (token == null) {
        toast.error("Please login to block a user");
        return;
    }
    try {
        await axios.patch(
            import.meta.env.VITE_BACKEND_URL + "/api/user/" + email,
            { isDisabled: true },
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        );
        setLoaded(false);
        toast.success("User blocked successfully");
    } catch (error) {
        console.log(error);
        toast.error("Error blocking user");
    }
}

export async function unblockUser(email) {
    const token = localStorage.getItem("token");
    if (token == null) {
        toast.error("Please login to block a user");
        return;
    }
    try {
        await axios.patch(
            import.meta.env.VITE_BACKEND_URL + "/api/user/" + email,
            { isDisabled: false },
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        );
        setLoaded(false);
        toast.success("User blocked successfully");
    } catch (error) {
        console.log(error);
        toast.error("Error blocking user");
    }
}
