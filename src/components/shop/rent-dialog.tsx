"use client";

import { useState } from "react";
import { toast } from "sonner"; // Sonner for success notifications
import { type BlocksContent } from "@strapi/blocks-react-renderer";
import React from "react";
import BlockRendererClient from "../ui/block-renderer-client";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

interface RentalProductProps {
  product_name: string;
  category: string;
  size: string;
  manufacturer: string;
  quantity: string;
  condition: string;
  termsAndConditions: BlocksContent;
  rentalDetails: BlocksContent;
  images: any[];
}

const RentDialog: React.FC<RentalProductProps> = ({
  product_name,
  category,
  size,
  manufacturer,
  quantity,
  condition,
  termsAndConditions,
  rentalDetails,
  images,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    message: "",
    email: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Show the form data using toast notification
    toast.success(
      `Rental request for ${product_name} submitted successfully! `,
    );
    console.log("Form Data:", formData);

    // Reset the form after submission
    setFormData({
      firstName: "",
      lastName: "",
      message: "",
      email: "",
    });
  };

  const productDetails = [
    { label: "Product Name", value: product_name },
    { label: "Category", value: category },
    { label: "Size", value: size },
    { label: "Manufacturer", value: manufacturer },
    { label: "Quantity", value: quantity },
    { label: "Condition", value: condition },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded bg-black px-4 py-1 text-xs text-white md:text-sm">
          RENT NOW
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-auto sm:max-w-[800px]">
        <div className="p-4 md:p-8 lg:space-y-8">
          {/* Product Details Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 overflow-hidden">
                <div className="col-span-1 grid gap-2">
                  {images?.map((image, index) => (
                    <img
                      key={index}
                      src={image?.attributes?.url}
                      alt={image.alt}
                      className="h-full w-full cursor-pointer rounded-md border border-gray-300"
                    />
                  ))}
                </div>
                <div className="col-span-3 rounded-md border border-gray-300">
                  <img
                    src={images?.[0]?.attributes?.url || ""}
                    alt={product_name}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
              <h1 className="text-center text-lg font-bold md:text-xl lg:text-2xl">
                {product_name}
              </h1>
            </div>

            {/* Rental Info Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Product For Rental</h2>
              <div className="flex max-w-72 flex-col">
                <ul className="grid grid-cols-2 gap-2 text-gray-700 md:gap-x-8">
                  {productDetails.map((detail, index) => (
                    <React.Fragment key={index}>
                      <li className="flex justify-between text-sm">
                        <span>{detail.label}</span>:
                      </li>
                      <li className="text-right text-sm">{detail.value}</li>
                    </React.Fragment>
                  ))}
                </ul>
                <div className="mt-6 grid gap-4">
                  {/* View Details Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-orange-600">
                        View Details
                      </button>
                    </DialogTrigger>
                    <RentalDetails content={rentalDetails} />
                  </Dialog>

                  {/* Terms & Conditions Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800">
                        Terms & Conditions
                      </button>
                    </DialogTrigger>
                    <TermsAndConditions content={termsAndConditions} />
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          {/* Rental Form Section */}
          <div className="mt-8 md:mt-0 md:px-8">
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  label: "First Name",
                  type: "text",
                  placeholder: "First Name",
                  name: "firstName",
                },
                {
                  label: "Last Name",
                  type: "text",
                  placeholder: "Last Name",
                  name: "lastName",
                },
              ].map((input, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700">
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    value={formData[input.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border p-2 text-sm outline-none"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  placeholder="Message"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-1 block w-full resize-none rounded-md border p-2 text-sm outline-none"
                />
              </div>

              <div className="grid w-full items-start gap-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border p-2 text-sm outline-none"
                  />
                </div>
                <div className="w-full">
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-primary px-6 py-2 text-white hover:bg-orange-600"
                  >
                    Request For Rental
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RentDialog;

export const TermsAndConditions: React.FC<{ content: BlocksContent }> = ({
  content,
}) => {
  return (
    <DialogContent className="max-h-[80vh] overflow-auto sm:max-w-[800px]">
      <div className="space-y-4">
        <h2 className="text-center text-lg font-bold text-primary md:text-xl">
          Terms and Conditions
        </h2>
        <p className="text-center font-bold">Your agreement</p>
        <BlockRendererClient content={content} />
      </div>
    </DialogContent>
  );
};

export const RentalDetails: React.FC<{ content: BlocksContent }> = ({
  content,
}) => {
  return (
    <DialogContent className="max-h-[80vh] overflow-auto sm:max-w-[800px]">
      <div className="space-y-4">
        <h2 className="text-center text-lg font-bold text-primary md:text-xl">
          Rental Details
        </h2>
        <p>Here are the rental details for this product:</p>
        <BlockRendererClient content={content} />
      </div>
    </DialogContent>
  );
};
