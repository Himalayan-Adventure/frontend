"use client";
import Link from "next/link";
import { Text } from "@/components/ui/text";
import { redirect } from "next/navigation";
import Logo from "@/components/logo";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const NotFound = () => {
  const router = useRouter();
  // redirect("/home");
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6">
      <Logo variant="small" theme="light" />
      <Text bold className="text-red-600" variant="display-lg">
        Page Not Found :(
      </Text>
      <span className="flex items-center gap-x-4">
        <Link href="/">
          <Text bold className="text-yellow-600 underline" variant="text-lg">
            Return Home
          </Text>
        </Link>

        <Button
          className="border-none"
          variant="outline"
          onClick={() => router.back()}
        >
          <Text bold className="underline" variant="text-lg">
            Go back
          </Text>
        </Button>
      </span>
    </div>
  );
};
export default NotFound;
