"use client";
import Image from "next/image";
import Link from "next/link";
import footerBgImage from "/public/images/footer.png";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const usefulLinks = [
  { name: "Open Peak for Climbing", slug: "/open-peak-for-climbing" },
  { name: "Mountaineering Royalty", slug: "/mountaineering-royalty" },
  { name: "Terms and Conditions", slug: "/terms-and-conditions" },
  { name: "Gears and Equipment", slug: "/gears-and-equipment" },
  { name: "Visa Info", slug: "/visa-info" },
  { name: "Travel Insurance", slug: "/travel-insurance" },
  { name: "Trekking Permit Fee", slug: "/trekking-permit-fee" },
  { name: "FAQ", slug: "/faq" },
];

export default function FirstPart() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}api/newsletters`,
        { data: { email: email } }
      );

      if (response.status === 200) {
        toast.success("Subscription successful! Check your inbox for confirmation.");
        setEmail("");
      }
    } catch (err) {
      toast.error("There was an error subscribing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative">
      <div className="relative h-full w-full">
        <div>
          <Image
            src={footerBgImage}
            alt="Footer background image"
            className="-z-10 min-h-screen w-full object-cover lg:h-auto"
            quality={20}
          />
        </div>
        <div className="container absolute inset-0 z-20 flex flex-col justify-end divide-y-2 pt-4 text-white lg:pt-8">
          <div className="py-2 md:py-4 lg:py-8">
            <h1 className="text-lg font-medium lg:text-2xl">
              Subscribe For Newsletter
            </h1>
            <div className="my-2 max-w-full rounded-xl bg-[#6b6a6d] p-3 lg:my-4 lg:max-w-[880px] lg:p-6">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 sm:flex-row lg:gap-4"
              >
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl p-2 text-sm text-black outline-none lg:flex-grow lg:p-4"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary p-2 text-sm text-white transition-colors sm:w-auto lg:p-4"
                  disabled={loading}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
          <div className="py-2 md:py-4 lg:py-8">
            <h1 className="text-lg font-medium lg:text-2xl">Useful info</h1>
            <div className="mt-2 flex flex-wrap gap-3 md:gap-x-6 lg:mt-4 lg:gap-x-8">
              {usefulLinks.map((link, index) => (
                <Link
                  href={link.slug}
                  key={index}
                  className="text-sm md:text-base lg:text-lg"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="pt-2 md:pt-4 lg:pt-8">
            <Image
              src="/logo.png"
              alt="Logo"
              width={500}
              height={500}
              className="w-28 lg:w-52"
            />
            <div className="mt-2">
              <h1 className="font-medium lg:text-[25px] lg:text-lg">
                Lorem ipsum
              </h1>
              <p className="mt-2 text-sm lg:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
                temporibus! Consequuntur atque recusandae facere exercitationem,
                inventore unde nemo ipsa ipsum! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nemo veritatis consequatur
                molestias temporibus vel itaque natus sed? Amet, labore
                suscipit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}