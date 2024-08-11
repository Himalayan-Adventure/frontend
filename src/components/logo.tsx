import Link from "next/link";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import logo from "/logo.png";
import Image from "next/image";

export default function Logo({
  variant = "large",
  className,
}: {
  variant?: "large" | "small";
  className?: string;
}): JSX.Element {
  return (
    <Link href={"/"} className={cn(className)}>
      <Image src={"/logo.png"} alt="logo" width={215} height={81} />
    </Link>
  );
}
