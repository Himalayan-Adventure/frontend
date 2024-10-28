import Link from "next/link";
import { Text } from "@/components/ui/text";
import { redirect } from "next/navigation";
import Logo from "@/components/logo";
const NotFound = () => {
  // redirect("/home");
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6">
      <Logo variant="small" theme="light" />
      <Text bold className="text-red-600" variant="display-lg">
        Page Not Found :(
      </Text>
      <Text bold className="text-yellow-600 underline" variant="text-lg">
        <Link href="/">Return Home</Link>
      </Text>
    </div>
  );
};
export default NotFound;
