import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Login from "../_components/Login";

const tokenCheck = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (token) {
    redirect("me");
  }
};

export const metadata: Metadata = {
  title: "Login",
  description: "Here you can login in our newMarket app",
};

const page = () => {
  tokenCheck();

  return <Login />;
};

export default page;
