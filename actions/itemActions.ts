"use server";

import { initialValuesInterface } from "@/app/(pages)/product/[productId]/edit/_components/EditProductForm";
import { baseUrl } from "@/utils/baseUrl";
import { cookies } from "next/headers";

export const createItem = async (item: {
  mainPicture: any;
  pictures: any[];
  price: string;
  name: string;
  quantity: number;
  description: string;
  category: string;
  pastPrice: string;
}) => {
  const token = cookies().get("token");

  const res = await fetch(`${baseUrl}/api/item`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
    method: "POST",
    body: JSON.stringify(item),
  });

  const data = await res.json();

  return {
    status: res.status,
    data,
  };
};

export async function uploadImage(
  formData: FormData,
): Promise<string | undefined> {
  try {
    const resMain = await fetch(
      `https://api.cloudinary.com/v1_1/dw0j1mmbp/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    ).then((res) => res.json());

    return resMain.secure_url;
  } catch (error) {
    console.error(error);
  }
}

export default async function itemUpdate(
  id: string,
  editedProduct: Partial<initialValuesInterface>,
) {
  try {
    const token = cookies().get("token");

    console.log(token);

    console.log(editedProduct);

    const res = await fetch(`${baseUrl}/api/item/${id}`, {
      method: "PUT",
      body: JSON.stringify(editedProduct),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    });

    const data = await res.json();

    console.log(res);
    console.log(data);

    return {
      status: res.status,
      data,
    };
  } catch (error) {
    console.error(error);
  }
}

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

export async function getProductData(params: string) {
  try {
    const res = await fetch(`${baseUrl}/api/item/${params}`, {
      next: { revalidate: 1 },
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
}
