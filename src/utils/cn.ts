import clsx from "clsx";
import { twMerge } from "tailwind-merge";

//@ts-ignore
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}