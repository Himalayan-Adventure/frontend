import Image from "next/image";
import destinationImg from "/public/images/destination.jpg";

const destinations = [
  {
    name: "Mustang Region",
    location: "Lorem Ipsum",
    image: destinationImg,
  },
  {
    name: "ABC Trekking",
    location: "Lorem Ipsum",
    image: destinationImg,
  },
  {
    name: "Everest Region",
    location: "Lorem Ipsum",
    image: destinationImg,
  },
  {
    name: "Makalu Region",
    location: "Lorem Ipsum",
    image: destinationImg,
  },
];

export default function PopularDestinations() {
  return (
    <section className="pb-8 lg:pb-16">
      <div className="container">
        {/* Heading */}
        <div className="flex lg:justify-center lg:text-center">
          <div className="lg:max-w-2xl">
            <h1 className="comp-heading">Popular Destinations</h1>
            <p className="comp-subheading mt-2 lg:mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="mt-8 grid grid-cols-2 gap-2 md:gap-8 lg:mt-16 lg:grid-cols-4 lg:gap-16">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="destination-card relative rounded-3xl border border-gray-200 bg-white"
            >
              <div className="absolute top-12 -z-10 w-full">
                <div className="h-16 w-full bg-gray-700 blur-lg lg:h-36"></div>
              </div>
              <div className="absolute -bottom-2 -z-10 flex w-full justify-center">
                <div className="h-12 w-12 rounded-full bg-gray-700 blur-2xl md:h-24 md:w-24"></div>
              </div>
              <div className="">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  objectFit="cover"
                  className="rounded-t-3xl grayscale transition duration-300 lg:h-60"
                />
              </div>
              <div className="space-y-1 py-4 text-center lg:space-y-3">
                <p className="text-xs text-gray-500 md:text-sm">
                  {destination.location}
                </p>
                <h2 className="text-sm md:text-lg lg:text-[22px]">
                  {destination.name}
                </h2>
                <div className="flex items-center justify-center space-x-3">
                  <div className="h-3 w-3 rounded border bg-gray-200 lg:h-6 lg:w-6"></div>
                  <div className="h-3 w-3 rounded border bg-gray-200 lg:h-6 lg:w-6"></div>
                  <div className="h-3 w-3 rounded border bg-gray-200 lg:h-6 lg:w-6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
