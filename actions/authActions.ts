"use server";

import { baseUrl } from "@/utils/baseUrl";
import { cookies } from "next/headers";

interface User {
  // user: {
  createdAt: string;
  email: string;
  name: string;
  profilePicUrl: string;
  role: string;
  updatedAt: string;
  __v: number;
  _id: string;
  // };
}

export async function getMe(): Promise<User | undefined> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    const res = await fetch(`${baseUrl}/api/auth`, {
      next: { revalidate: 1 },
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
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

export interface AuthReturns {
  token?: string;
  error?: string;
}

export async function login(user: {
  email: string;
  password: string;
}): Promise<AuthReturns | undefined> {
  const res = await fetch(`${baseUrl}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());

  return res;
}

export async function checkEmail(email: string): Promise<boolean> {
  const res = await fetch(`${baseUrl}/api/signup/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return res;
}

interface SignupProps {
  name: string;
  email: string;
  password: string;
  terms: boolean;
  role: string;
}

export async function signup(
  user: SignupProps,
): Promise<AuthReturns | undefined> {
  const res = await fetch(`${baseUrl}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());

  return res;
}
