"use client";

import { useInView } from "framer-motion";
import React, { useRef } from "react";

const AnimationItem = ({
  children,
  className,
  animationType = "translate",
}: {
  children: React.ReactNode;
  className?: string;
  animationType?: "translate" | "fade";
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className={className}
      ref={ref}
      style={{
        transform:
          animationType === "translate"
            ? isInView
              ? "none"
              : "translateX(-200px)"
            : "none",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
    >
      {children}
    </div>
  );
};

export default AnimationItem;
