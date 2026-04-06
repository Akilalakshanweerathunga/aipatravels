import { notFound } from "next/navigation";

export default function CatchAll() {
  // This triggers the nearest not-found.tsx (the one you already wrote)
  notFound();
}