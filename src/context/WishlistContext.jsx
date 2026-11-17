import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save wishlist in localStorage
  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Add or remove product
  const toggleWishlist = (product) => {
    setWishlist((previous) => {
      const exists = previous.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return previous.filter(
          (item) => item.id !== product.id
        );
      }

      return [...previous, product];
    });
  };

  // Check wishlist
  const isWishlisted = (id) => {
    return wishlist.some(
      (item) => item.id === id
    );
  };

  // Remove product
  const removeFromWishlist = (id) => {
    setWishlist((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
};