import Image from "next/image";
import Link from "next/link";
import Logo from "../logo";

export default function FirstPart() {
  const usefulLinks = [
    "Open Peak for climbing",
    "Mountaineering Royalty",
    "Terms and Condition",
    "Gears and Equipment",
    "Visa Info",
    "Travel Insurance",
    "Trekking Permit Fee",
    "FAQ",
  ];

  return (
    <section className="relative">
      <div className="relative h-full w-full">
        <div>
          <Image
            src="/images/footer.png"
            alt="Footer background image"
            width={1000}
            height={1000}
            className="-z-10 min-h-screen w-full lg:h-auto"
          />
        </div>
        <div className="container absolute inset-0 z-0 flex flex-col justify-end divide-y-2 pt-4 text-white lg:pt-8">
          <div className="py-2 md:py-4 lg:py-8">
            <h1 className="text-lg font-medium lg:text-2xl">
              Subscribe For Newsletter
            </h1>
            <div className="my-2 max-w-full rounded-xl bg-gray-500 p-3 lg:my-4 lg:max-w-[880px] lg:p-6">
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
                  href="#"
                  key={index}
                  className="text-sm md:text-base lg:text-lg"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
          <div className="pt-2 md:pt-4 lg:pt-8">
            <Logo />
            <div className="mt-2">
              <h1 className="font-medium lg:text-[25px]">Lorem ipsum</h1>
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
