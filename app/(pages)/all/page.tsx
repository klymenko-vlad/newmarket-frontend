import React from "react";
import type { Metadata } from "next";
import InfinitiveScroll from "@/components/Common/InfinitiveScroll";

export const metadata: Metadata = {
  title: "All Products",
  description: "",
};

function page() {
  return <InfinitiveScroll />;
}

export default page;
