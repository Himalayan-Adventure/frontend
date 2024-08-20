import Link from "next/link";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "/public/logo.svg";
import logoLight from "/public/logo-light.svg";

export default function Logo({
  variant = "large",
  className,
  theme = "dark",
}: {
  variant?: "large" | "small";
  className?: string;
  theme?: "light" | "dark";
}): JSX.Element {
  return (
    <Link href={"/"}>
      <Image
        src={theme === "dark" ? logo : logoLight}
        alt="logo"
        className={cn(className)}
        priority
      />
    </Link>
  );
}
