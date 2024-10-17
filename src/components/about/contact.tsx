"use client";
import { useState } from "react";
import { socialIcons } from "@/config/constants";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="container py-8 lg:py-16">
      <div className="text-center text-2xl font-bold uppercase lg:text-[40px]">
        <h2 className="text-black">Get in Touch</h2>
        <div className="mt-3 flex justify-center lg:mt-6">
          <div className="h-1 w-40 rounded-xl bg-black" />
        </div>
      </div>

      <div className="relative mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 lg:mt-16">
        <div className="absolute inset-y-0 left-1/2 my-8 hidden w-[1px] -translate-x-1/2 transform bg-gray-400 md:block"></div>

        <div className="pr-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full rounded-md border-2 border-gray-800 p-3 placeholder-gray-500 placeholder:font-bold focus:border-black focus:outline-none"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full rounded-md border-2 border-gray-800 p-3 placeholder-gray-500 placeholder:font-bold focus:border-black focus:outline-none"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows={4}
                className="w-full resize-none rounded-md border-2 border-gray-800 p-3 placeholder-gray-500 placeholder:font-bold focus:border-black focus:outline-none"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-black py-3 font-bold text-white"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6 md:pl-8">
          <div>
            <h3 className="font-semibold text-gray-700 lg:text-lg">Phone</h3>
            <p>+977 912345678</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 lg:text-lg">Email</h3>
            <p>lorem@gmail.com</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 lg:text-lg">Address</h3>
            <p>1234, Kathmandu, Nepal</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 lg:text-lg">
              Social Media
            </h3>
            <div className="mt-2 flex gap-2">
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
      </div>
    </section>
  );
}
