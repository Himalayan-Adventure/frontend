import Image from "next/image";
import testimonialImg from "/public/images/testimonial.png";

const testimonials = [
  {
    name: "Binita Shrestha",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    image: testimonialImg,
  },
  {
    name: "Binita Shrestha",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    image: testimonialImg,
  },
  {
    name: "Binita Shrestha",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    image: testimonialImg,
  },
];

export default function Testimonials() {
  return (
    <section className="py-8 lg:py-16">
      <div className="container">
        {/* Heading */}
        <div className="flex lg:justify-center lg:text-center">
          <div className="lg:max-w-2xl">
            <h1 className="comp-heading">Testimonials</h1>
            <p className="comp-subheading mt-2 lg:mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="relative mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0 lg:mt-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative flex w-full justify-center ${
                index !== testimonials.length - 1 ? "md:border-r-0" : ""
              }`}
            >
              <div
                className={`${
                  index !== testimonials.length - 1
                    ? "before:absolute before:bottom-0 before:right-0 before:top-0 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent md:before:w-[2px]"
                    : ""
                } px-8 text-center`}
              >
                <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-full w-auto object-cover grayscale"
                  />
                </div>
                <p className="mt-4 text-base font-normal text-gray-600 lg:text-lg">
                  {testimonial.message}
                </p>
                <p className="mt-2 text-lg font-bold lg:text-[20px]">
                  {testimonial.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
