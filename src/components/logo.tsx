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
    <Link href={"/"} className={cn(className)}>
      <Image
        src={theme === "dark" ? logo : logoLight}
        alt="logo"
        width={215}
        height={81}
      />
    </Link>
  );
}
