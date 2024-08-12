import React from "react";

import type { Metadata } from "next";
import Signup from "../_components/Signup";

export const metadata: Metadata = {
  title: "Signup",
  description: "Here you can signup in our newMarket app",
};

const page = () => {
  return <Signup />;
};

page.propTypes = {};

export default page;
