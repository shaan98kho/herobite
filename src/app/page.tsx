"use client"

import Image from "next/image";
import { useAuthListener } from "@/hooks/useAuthListener";

export default function Home() {
  useAuthListener()
  return (
    <>Home Page</>
  );
}
