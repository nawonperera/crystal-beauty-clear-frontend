import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/user/wishlist";

// Get auth header
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Check if user is logged in
export const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
};

// Custom event for wishlist updates
export const WISHLIST_UPDATED_EVENT = "wishlistUpdated";

// Dispatch wishlist update event
const dispatchWishlistUpdate = (wishlist) => {
    window.dispatchEvent(new CustomEvent(WISHLIST_UPDATED_EVENT, { detail: wishlist }));
};

// Get wishlist from backend
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

// Toggle wishlist item
export const toggleWishlistItem = async (productId) => {
    try {
        const response = await axios.post(
            `${API_URL}/toggle`,
            { productId },
            { headers: getAuthHeader() }
        );
        // Dispatch event to notify other components
        dispatchWishlistUpdate(response.data.wishlist);
        return response.data;
    } catch (error) {
        console.error("Error toggling wishlist:", error);
        throw error;
    }
};

// Add to wishlist
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

// Remove from wishlist
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

// Check if product is in wishlist
export const isInWishlist = (wishlist, productId) => {
    return wishlist.includes(productId);
};
