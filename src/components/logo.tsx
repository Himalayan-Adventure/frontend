import Link from "next/link";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "/public/logo.svg";
import logoLight from "/public/logo-light.svg";
import logoBlack from "/public/logo-black.svg";

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
    <Link href={"/"} className="block w-fit" prefetch={true}>
      <p className="sr-only">Himalayan Adventures logo</p>
      <Image
        src={theme === "dark" ? logo : logoLight}
        alt="logo"
        className={cn(className)}
        priority
      />
    </Link>
  );
}

export function BlackLogo({
  variant = "large",
  className,
  theme = "dark",
}: {
  variant?: "large" | "small";
  className?: string;
  theme?: "light" | "dark";
}): JSX.Element {
  return (
    <Link href={"/"} className="block w-fit" prefetch={true}>
      <p className="sr-only">Himalayan Adventures logo</p>
      <Image
        src={theme === "light" ? logo : logoBlack}
        alt="logo"
        className={cn(className)}
        priority
      />
    </Link>
  );
}
