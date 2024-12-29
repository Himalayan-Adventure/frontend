/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { type BlocksContent } from "@strapi/blocks-react-renderer";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import BlockRendererClient from "../ui/block-renderer-client";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import debounce from "lodash.debounce";

interface RentalProductProps {
  product_id: number;
  product_name: string;
  category: string;
  size: string;
  manufacturer: string;
  quantity: number;
  condition: string;
  termsAndConditions: BlocksContent;
  rentalDetails: BlocksContent;
  images: any[];
  stock_count: number;
}

const RentDialog = ({
  product_id,
  product_name,
  category,
  size,
  manufacturer,
  quantity,
  condition,
  termsAndConditions,
  rentalDetails,
  images,
  stock_count,
}: RentalProductProps) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [existingOrder, setExistingOrder] = useState<any>(null);
  console.log("existing order", existingOrder);
  const [existingOrderList, setExistingOrderList] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isStockSufficient, setIsStockSufficient] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    message: "",
    email: "",
  });

  const fetchUserId = async () => {
    try {
      const { data } = await axios.get("/api/me");
      if (data?.id) {
        setUserId(data.id);
        setIsAuthenticated(true);
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          message: formData.message,
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setIsAuthenticated(false);
    }
  };

  const fetchExistingOrder = useCallback(async () => {
    if (!userId) return;

    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}api/product-orders?filters[user][id][$eq]=${userId}&populate[order_list][populate][0]=product`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        },
      );

      const orderData = data?.data?.[0];
      const orderList = orderData?.attributes?.order_list || [];

      const updatedOrderList = orderList.map((order: any) => ({
        product: order?.product?.data?.id,
        quantity: parseInt(order.quantity, 10),
      }));

      setExistingOrder(orderData || null);
      setExistingOrderList(updatedOrderList);
    } catch (error) {
      console.error("Error fetching existing order:", error);
    }
  }, [userId]);

  const debouncedHandleInputChange = useCallback(
    debounce((name: string, value: string) => {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }, 300),
    [],
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    debouncedHandleInputChange(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !userId || !isStockSufficient) {
      toast.error(
        !isAuthenticated
          ? "You are not authenticated. Please log in to proceed."
          : !isStockSufficient
            ? "Stock is insufficient. The requested quantity is not available."
            : "User ID is not identified. Please check your login status.",
      );
      return;
    }

    setIsLoading(true);

    try {
      const existingProductIndex = existingOrderList.findIndex(
        (order) => order.product === product_id,
      );

      let updatedOrderList = [...existingOrderList];

      if (existingProductIndex !== -1) {
        updatedOrderList[existingProductIndex].quantity += quantity;
      } else {
        updatedOrderList.push({ product: product_id, quantity });
      }

      const payload = {
        data: {
          is_rented: true,
          rent_description: formData.message,
          user: userId,
          order_list: updatedOrderList.map((order) => ({
            product: order.product,
            quantity: parseInt(order.quantity, 10),
          })),
        },
      };

      const apiUrl = existingOrder
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}api/product-orders/${existingOrder?.id}`
        : `${process.env.NEXT_PUBLIC_STRAPI_URL}api/product-orders`;

      await axios[existingOrder ? "put" : "post"](apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(
        existingOrder
          ? "Rental request updated successfully!"
          : "Rental request submitted successfully!",
      );
      setFormData({ firstName: "", lastName: "", message: "", email: "" });
    } catch (error) {
      console.error("Error submitting rental request:", error);
      toast.error("Failed to submit rental request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    fetchExistingOrder();
  }, [fetchExistingOrder]);

  useEffect(() => {
    setIsStockSufficient(stock_count >= quantity);
  }, [quantity, stock_count]);

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
        <div className="mb-8 p-4 md:p-8">
          {/* Product Details Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-8">
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
              <ul className="grid grid-cols-2 gap-2 text-gray-700 md:gap-x-8">
                {productDetails.map(({ label, value }, index) => (
                  <React.Fragment key={index}>
                    <li className="flex justify-between text-sm">
                      <span>{label}</span>:
                    </li>
                    <li className="text-right text-sm">{value}</li>
                  </React.Fragment>
                ))}
              </ul>
              <div className="mt-6 grid gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-orange-600">
                      View Details
                    </button>
                  </DialogTrigger>
                  <RentalDetails content={rentalDetails} />
                </Dialog>

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

          {/* Rental Form Section */}
          <form
            onSubmit={handleSubmit}
            className="mt-4 grid gap-4 sm:grid-cols-2 md:px-8"
          >
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Message", name: "message", component: "textarea" },
              { label: "Email", name: "email", type: "email" },
            ].map(
              ({ label, name, component = "input", type = "text" }, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  {component === "input" ? (
                    <input
                      type={type}
                      name={name}
                      value={formData[name as keyof typeof formData]}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border p-2 text-sm outline-none"
                      required
                    />
                  ) : (
                    <textarea
                      name={name}
                      value={formData[name as keyof typeof formData]}
                      onChange={handleInputChange}
                      className="mt-1 block w-full resize-none rounded-md border p-2 text-sm outline-none"
                      required
                    />
                  )}
                </div>
              ),
            )}

            <div className="w-full">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-primary py-2 text-sm text-white hover:bg-orange-600 disabled:bg-gray-400"
              >
                {isLoading ? "Submitting..." : "Submit Rental Request"}
              </button>
            </div>
          </form>
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
