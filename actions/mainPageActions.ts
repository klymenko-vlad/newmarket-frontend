"use server";

import { baseUrl } from "@/utils/baseUrl";

export async function getSortedItems(sortParam: string, limit = 4) {
  try {
    const res = await fetch(
      `${baseUrl}/api/item?sort=${sortParam}&limit=${limit}`,
      {
        next: { revalidate: 1 },
        method: "GET",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
}
