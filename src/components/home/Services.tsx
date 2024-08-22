import Image from "next/image";
import { Button } from "../ui/button";
import serviceImg from "/public/images/travel.jpeg";

const services = [
  {
    name: "Travel and Tour",
    image: serviceImg,
  },
  {
    name: "Mountaineering Expedition",
    image: serviceImg,
  },
  {
    name: "Luxury Travel",
    image: serviceImg,
  },
];

export default function Services() {
  return (
    <section className="py-8 lg:py-16">
      <div className="container">
        {/* Heading */}
        <div className="flex lg:justify-center lg:text-center">
          <div className="lg:max-w-2xl">
            <h1 className="comp-heading">Our Services</h1>
            <p className="comp-subheading mt-2 lg:mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
          </div>
        </div>
        {/* services Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-16">
          {services.map((svc, index) => (
            <div key={index} className="">
              <div className="group relative">
                <Image
                  src={svc.image}
                  alt={svc.name}
                  className="w-full rounded-2xl border border-gray-600 object-cover grayscale transition duration-300 lg:h-80"
                />
                {/* Overlay */}
                <div className="absolute inset-0 flex items-end rounded-2xl bg-black bg-opacity-40">
                  <h2 className="mb-4 w-full text-center text-base font-semibold text-white md:text-lg lg:text-2xl">
                    {svc.name}
                  </h2>
                </div>
              </div>
              <div className="py-4 text-center">
                <Button className="w-auto rounded-full border border-black bg-transparent px-12 text-sm">
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
