import Link from "next/link";
import { redirect } from "next/navigation";
const NotFound = () => {
  redirect("/home");
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
};
export default NotFound;
