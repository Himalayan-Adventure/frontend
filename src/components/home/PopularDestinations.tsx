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
        <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-16 lg:grid-cols-4 lg:gap-16">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="destination-card relative rounded-3xl border border-gray-200 bg-white"
            >
              <div className="absolute top-12 -z-10 w-full">
                <div className="h-16 lg:h-36 w-full bg-gray-700 blur-lg"></div>
              </div>
              <div className="absolute -bottom-2 -z-10 flex w-full justify-center">
                <div className="h-12 md:h-24 w-12 md:w-24 rounded-full bg-gray-700 blur-2xl"></div>
              </div>
              <div className="">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  objectFit="cover"
                  className="lg:h-60 rounded-t-3xl grayscale transition duration-300"
                />
              </div>
              <div className="space-y-1 lg:space-y-3 py-4 text-center">
                <p className="text-xs md:text-sm text-gray-500">{destination.location}</p>
                <h2 className="text-sm md:text-lg lg:text-[22px]">{destination.name}</h2>
                <div className="flex items-center justify-center space-x-3">
                  <div className="h-3 lg:h-6 w-3 lg:w-6 rounded border bg-gray-200"></div>
                  <div className="h-3 lg:h-6 w-3 lg:w-6 rounded border bg-gray-200"></div>
                  <div className="h-3 lg:h-6 w-3 lg:w-6 rounded border bg-gray-200"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
