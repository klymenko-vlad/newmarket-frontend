"use client";

import { useStateContext } from "@/context/StateContext";
import { showIsCart } from "@/lib/Features/showMenu/showMenuSlice";
import { Product } from "@/types/types";
import { useDispatch } from "react-redux";

interface ItemProps {
  product: Product;
}

export default function ProductBuyBtn({ product }: ItemProps) {
  const { onAdd, quantities } = useStateContext();

  const dispatch = useDispatch();

  const handleBuyNow = () => {
    onAdd(product, quantities);

    dispatch(showIsCart(true));
  };

  return (
    <div className="inline-flex items-center justify-start">
      <button
        onClick={handleBuyNow}
        className="mb-2 mr-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 transition-colors duration-500 ease-in-out hover:bg-red-800 hover:text-white focus:outline-none focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white"
      >
        Buy Now
      </button>
    </div>
  );
}
