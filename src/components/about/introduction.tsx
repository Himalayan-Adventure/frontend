/* eslint-disable @next/next/no-img-element */
import { socialIcons } from "@/config/constants";
import Image from "next/image";
import Link from "next/link";

export default function Introduction() {
  return (
    <section className="container relative grid gap-4 md:grid-cols-3 md:gap-8 lg:gap-16 lg:px-24 lg:py-16">
      <div className="flex items-center justify-center lg:col-span-1">
        <img
          src="https://s3-alpha-sig.figma.com/img/003a/9308/e8555ac899347748bf58aa4467d1acc8?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qXmmbV3i8LDcW7fRWChCZgM14f7TvNcZ7Oic2oyNzuB~hirPgfF1Hum6iu2L9JxabuZPwNH8ms8q7Oqh-~wgckiJzy6e0ovKHjlCABGVydgcDUbTOEogBG1h0YsCMXcwngPLqbIXLCjQjz6VZJXtCgRDGepFICWh9G7yEKpozb0zGhSlv7i-ggoVUWOgBfjNWM-6deZL87nxpRCnPHNQh3qx2m1qdHGGsjMHJ-MaCVHltDvT9PqAA~xrnd33xjv318Jsxz-xCv0b3X4kvuaNZRJRumblbyf-bNVaCDLdirvRFmJdOJ~xTRpLQ~vspIzaVpwyzn9lMcVRSdnrQgsDCA__" // Update with your image path
          alt="About Us"
          className="w-auto rounded-md rounded-ee-2xl rounded-ss-2xl object-cover grayscale lg:min-h-[480px] lg:rounded-ee-[50px] lg:rounded-ss-[50px]"
        />
      </div>
      <div className="py-2 lg:col-span-2">
        <h2 className="text-2xl font-[600] uppercase lg:text-[40px]">
          About Us
        </h2>
        <div className="mt-4 space-y-4 font-normal lg:mt-8 lg:text-[22px]">
          <p>
            Welcome to our organization! We are dedicated to providing the best
            services and experiences to our customers. Our mission is to create
            meaningful connections and deliver exceptional value.
          </p>
          <p>
            With a passionate team of professionals, we strive to exceed
            expectations in everything we do. Join us on our journey as we
            continue to innovate and lead in our industry.
          </p>
        </div>
        <div className="mt-8 font-normal lg:mt-8 lg:text-[22px]">
          <p>Follow our work on:</p>
          <div className="mt-4 flex gap-2">
            {socialIcons.map((item) => (
              <Link
                key={`social-link-${item.name}`}
                href={item.href}
                target="_blank"
              >
                <Image
                  src={item.icon}
                  alt={`${item.name} Icon`}
                  className="h-auto w-8"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
