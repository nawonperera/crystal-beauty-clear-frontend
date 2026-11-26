import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/user/wishlist";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
};

export const WISHLIST_UPDATED_EVENT = "wishlistUpdated";

const dispatchWishlistUpdate = (wishlist) => {
    window.dispatchEvent(new CustomEvent(WISHLIST_UPDATED_EVENT, { detail: wishlist }));
};

export const getWishlist = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: getAuthHeader()
        });
        return response.data.wishlist || [];
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        return [];
    }
};

export const toggleWishlistItem = async (productId) => {
    try {
        const response = await axios.post(
            `${API_URL}/toggle`,
            { productId },
            { headers: getAuthHeader() }
        );
        dispatchWishlistUpdate(response.data.wishlist);
        return response.data;
    } catch (error) {
        console.error("Error toggling wishlist:", error);
        throw error;
    }
};

export const addToWishlist = async (productId) => {
    try {
        const response = await axios.post(
            API_URL,
            { productId },
            { headers: getAuthHeader() }
        );
        dispatchWishlistUpdate(response.data.wishlist);
        return response.data;
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        throw error;
    }
};

export const removeFromWishlist = async (productId) => {
    try {
        const response = await axios.delete(`${API_URL}/${productId}`, {
            headers: getAuthHeader()
        });
        dispatchWishlistUpdate(response.data.wishlist);
        return response.data;
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        throw error;
    }
};

export const isInWishlist = (wishlist, productId) => {
    return wishlist.includes(productId);
};
