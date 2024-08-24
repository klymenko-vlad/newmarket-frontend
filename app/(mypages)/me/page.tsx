import React from "react";

import { baseUrl } from "@/utils/baseUrl";
import { cookies } from "next/headers";

import Link from "next/link";
import Navigation from "./_components/Navigation";
import { redirect } from "next/navigation";
import { getMe } from "@/actions/authActions";

const tokenCheck = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    redirect("login");
  }
};

export default async function Page() {
  tokenCheck();
  const user = await getMe();

  if (!user) {
    return <div>Something is went very wrong</div>;
  }

  return (
    <div className="px-6">
      <div className="mb-16 flex justify-between">
        <div className="flex">
          <Link href="/" className="text-gray-500">
            Home
          </Link>
          <p className="ml-3">/</p>
          <p className="ml-3">My Account</p>
        </div>

        <div>
          <p>
            Hi, {user.name} ({user.role})
          </p>
        </div>
      </div>
      <Navigation
        name={user.name}
        email={user.email}
        role={user.role}
        id={user._id}
      />
    </div>
  );
}
