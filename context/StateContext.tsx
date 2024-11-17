"use client";

import { Product } from "@/types/types";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface Context {
  cartItems: Product[];
  totalPrice: number;
  totalQuantities: number;
  quantities: number;
  wishListItems: Product[];

  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setWishListItems: React.Dispatch<React.SetStateAction<Product[]>>;
  setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;

  onRemoveWishList: (product: Product) => void;
  onAddWishList: (product: Product) => void;
  onRemove: (product: Product) => void;
  onAdd: (product: Product, quantity: number) => void;
  toggleCartItemQuantity: (id: string, value: "inc" | "dec") => void;
}

const Context = createContext<Context>({} as Context);

export const StateContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [quantities, setQuantities] = useState(1);

  const [showWishList, setShowWishList] = useState<boolean>(false);
  const [wishListItems, setWishListItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedWishListItems = localStorage.getItem("wishListItems");

    if (storedWishListItems) {
      setWishListItems(JSON.parse(storedWishListItems));
    }
    setShowWishList;
  }, []);

  useEffect(() => {
    localStorage.setItem("wishListItems", JSON.stringify(wishListItems));
  }, [wishListItems]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    const storedTotalPrice = localStorage.getItem("totalPrice");
    const storedTotalQuantities = localStorage.getItem("totalQuantities");

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    if (storedTotalPrice) {
      setTotalPrice(parseFloat(storedTotalPrice));
    }

    if (storedTotalQuantities) {
      setTotalQuantities(parseInt(storedTotalQuantities));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalQuantities", totalQuantities.toString());
    localStorage.setItem("totalPrice", totalPrice.toString());
  }, [cartItems, totalPrice, totalQuantities]);

  let foundProduct: Product | undefined;
  let index: number;

  const onAddWishList = (product: Product) => {
    if (wishListItems.length > 20) {
      return toast.error("You already have 20 products in wish list.");
    }
    const checkUpdatedWishListItems = wishListItems.find(
      (item) => item._id === product._id,
    );

    if (checkUpdatedWishListItems) {
      return toast.error("Already added to the wish list", { duration: 4000 });
    }

    const updatedWishListItems = [...wishListItems, { ...product }];

    setWishListItems(updatedWishListItems);
    toast.success(`${product.name} added to the wish list`);

    localStorage.setItem("wishListItems", JSON.stringify(updatedWishListItems));
  };

  const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id,
    );

    const newTotalPrice = totalPrice + product.price * quantities;
    setTotalPrice(newTotalPrice);

    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities + quantities,
    );

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${quantities} ${product.name} added to the cart`);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", newTotalPrice.toString());
    localStorage.setItem("totalQuantities", totalQuantities.toString());
  };

  const toggleCartItemQuantity = (id: string, value: "inc" | "dec") => {
    const foundProduct = cartItems.find((item) => item._id === id);

    if (!foundProduct) return;

    let updatedCartItems;
    let updatedTotalPrice = totalPrice;
    let updatedTotalQuantities = totalQuantities;

    if (value === "inc") {
      updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === id) {
          updatedTotalPrice += cartProduct.price;
          updatedTotalQuantities += 1;
          return { ...cartProduct, quantity: cartProduct.quantity + 1 };
        }
        return cartProduct;
      });
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        updatedCartItems = cartItems.map((cartProduct) => {
          if (cartProduct._id === id) {
            updatedTotalPrice -= cartProduct.price;
            updatedTotalQuantities -= 1;
            return { ...cartProduct, quantity: cartProduct.quantity - 1 };
          }
          return cartProduct;
        });
      } else {
        updatedCartItems = cartItems.filter(
          (cartProduct) => cartProduct._id !== id,
        );
      }
    }

    setCartItems(updatedCartItems!);
    setTotalPrice(updatedTotalPrice);
    setTotalQuantities(updatedTotalQuantities);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    localStorage.setItem("totalPrice", updatedTotalPrice.toString());
    localStorage.setItem("totalQuantities", updatedTotalQuantities.toString());
  };

  const onRemoveWishList = (product: Product) => {
    foundProduct = wishListItems.find((item) => item._id === product._id);
    if (!foundProduct) return;
    const newWishListItems = wishListItems.filter(
      (item) => item._id !== product._id,
    );

    setWishListItems(newWishListItems);

    localStorage.setItem("wishListItems", JSON.stringify(newWishListItems));
  };

  const onRemove = (product: Product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);

    if (foundProduct) {
      const newCartItems = cartItems.filter((item) => item._id !== product._id);

      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice - foundProduct!.price * foundProduct!.quantity,
      );
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities - foundProduct!.quantity,
      );
      setCartItems(newCartItems);

      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      localStorage.setItem(
        "totalPrice",
        (totalPrice - foundProduct!.price * foundProduct!.quantity).toString(),
      );
      localStorage.setItem("totalQuantities", totalQuantities.toString());
    }
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantities,
        quantities,
        wishListItems,

        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        setWishListItems,
        onAddWishList,
        onRemoveWishList,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
