"use client";

import {
  showIsCart,
  showIsWishList,
} from "@/lib/Features/showMenu/showMenuSlice";
import { MdFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function WishListBtn() {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={() => dispatch(showIsWishList(true))}
        className="cursor-pointer"
      >
        <MdFavoriteBorder className="inline-block text-2xl transition-colors hover:text-red-500" />
      </button>

      <button
        onClick={() => dispatch(showIsCart(true))}
        className="cursor-pointer"
      >
        <MdOutlineShoppingCart className="inline-block text-2xl transition-colors hover:text-red-500" />
      </button>
    </div>
  );
}
