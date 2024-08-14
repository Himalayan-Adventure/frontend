import Image from "next/image";
import Link from "next/link";

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
      <div className="relative w-full h-full">
        <div>
          <Image
            src="/images/footer.png"
            alt="Footer background image"
            width={1000}
            height={1000}
            className="w-full min-h-screen lg:h-auto -z-10"
          />
        </div>
        <div className="absolute inset-0 container pt-4 lg:pt-8 text-white z-0 flex flex-col justify-end divide-y-2">
          <div className="py-2 md:py-4 lg:py-8">
            <h1 className="text-lg lg:text-2xl font-medium">
              Subscribe For Newsletter
            </h1>
            <div className="bg-[#6b6a6d] p-3 lg:p-6 my-2 lg:my-4 rounded-xl max-w-full lg:max-w-[880px]">
              <form className="flex flex-col sm:flex-row gap-2 lg:gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="p-2 lg:p-4 text-black outline-none rounded-xl w-full lg:flex-grow text-sm"
                />
                <button
                  type="submit"
                  className="p-2 lg:p-4 bg-[#FD9100] text-white transition-colors rounded-xl w-full sm:w-auto text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="py-2 md:py-4 lg:py-8">
            <h1 className="text-lg lg:text-2xl font-medium">Useful info</h1>
            <div className="flex flex-wrap gap-3 md:gap-x-6 lg:gap-x-8 mt-2 lg:mt-4">
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
            <Image
              src="/logo.png"
              alt="Logo"
              width={500}
              height={500}
              className="w-28 lg:w-52"
            />
            <div className="mt-2">
              <h1 className="lg:text-lg lg:text-[25px] font-medium">
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
