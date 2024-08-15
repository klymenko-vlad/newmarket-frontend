"use server";

import { baseUrl } from "@/utils/baseUrl";
import { cookies } from "next/headers";

export const getMe = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (!token) {
      throw new Error("Failed to get token");
    }

    const res = await fetch(`${baseUrl}/api/auth`, {
      method: "GET",
      headers: {
        Authorization: token.value,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
};
