"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const easeCurve = [0.22, 1, 0.36, 1] as const;

type BentoCardProps = {
  children: ReactNode;
  className?: string;
} & HTMLMotionProps<"div">;

export function BentoCard({ children, className = "", ...props }: BentoCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "var(--shadow-hover)" }}
      transition={{ duration: 0.35, ease: easeCurve }}
      className={`soft-card relative rounded-[28px] ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
