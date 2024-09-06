"use server";

import { baseUrl } from "@/utils/baseUrl";
import { cookies } from "next/headers";

interface User {
  createdAt: string;
  email: string;
  name: string;
  profilePicUrl: string;
  role: string;
  updatedAt: string;
  __v: number;
  _id: string;
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
  });

  console.log(res);

  const data = await res.json();

  console.log(data);

  return data.status;
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

interface PasswordsProps {
  oldPassword: string;
  newPassword: string;
}

export async function passwordUpdate(passwords: PasswordsProps) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const res = await fetch(`${baseUrl}/api/profile/updatePassword`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passwords),
  });

  const data = await res.json();

  return data;
}

interface ProfileUpdateProps {
  name: string;
  email: string;
  role: string;
}

export async function profileUpdate(user: ProfileUpdateProps) {
  console.log("look at me");

  const cookieStore = cookies();
  const token = cookieStore.get("token");

  console.log(token?.value, "look at me");

  const res = await fetch(`${baseUrl}/api/profile/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
    body: JSON.stringify(user),
  });

  console.log(res);

  // const data = await res.json();

  return {
    status: res.status,
    // data,
  };
}
