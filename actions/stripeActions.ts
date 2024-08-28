"use server";

import { Product } from "@/types/types";
import { baseUrl } from "@/utils/baseUrl";
import { StripeCustomCheckoutSession } from "@stripe/stripe-js";

export const checkoutSession = async (
  cartItems: Product[],
): Promise<{
  status: number;
  data: StripeCustomCheckoutSession;
}> => {
  const res = await fetch(`${baseUrl}/api/buy/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      origin: baseUrl,
    },
    body: JSON.stringify(cartItems),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Request failed: ${error}`);
  }

  const data = await res.json();

  return {
    status: res.status,
    data,
  };
};
