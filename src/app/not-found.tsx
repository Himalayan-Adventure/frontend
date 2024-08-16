import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
};
export default NotFound;
