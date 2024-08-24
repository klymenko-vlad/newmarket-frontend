"use server";

import { Product } from "@/types/types";
import { baseUrl } from "@/utils/baseUrl";

export const checkoutSession = async (
  cartItems: Product[],
): Promise<{ status: number; data: any }> => {
  const res = await fetch(`${baseUrl}/api/buy/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(cartItems),
  });

  if (!res.ok) {
    // Handle errors if the request fails
    const error = await res.text();
    throw new Error(`Request failed: ${error}`);
  }

  const data = await res.json();

  console.log(data);

  return {
    status: res.status,
    data,
  };
};
