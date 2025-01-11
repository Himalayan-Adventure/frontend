import Image from "next/image";
import Link from "next/link";
import footerBgImage from "/public/images/footer.png";
export default function FirstPart() {
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
        <div className="container absolute inset-0 z-0 flex flex-col justify-end divide-y-2 pt-4 text-white lg:pt-8">
          <div className="py-2 md:py-4 lg:py-8">
            <h1 className="text-lg font-medium lg:text-2xl">
              Subscribe For Newsletter
            </h1>
            <div className="my-2 max-w-full rounded-xl bg-[#6b6a6d] p-3 lg:my-4 lg:max-w-[880px] lg:p-6">
              <form className="flex flex-col gap-2 sm:flex-row lg:gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-xl p-2 text-sm text-black outline-none lg:flex-grow lg:p-4"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary p-2 text-sm text-white transition-colors sm:w-auto lg:p-4"
                >
                  Subscribe
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
