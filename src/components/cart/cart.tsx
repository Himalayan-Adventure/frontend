/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import AddressDialog from "./AddressForm";
import PaymentDialog from "./Payment";

export default function Cart() {
  const router = useRouter();
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const handleCheckout = () => {
    setIsAddressDialogOpen(true);
  };

  const handleAddAddress = (address: {
    name: string;
    phoneNumber: string;
    address: string;
    landmark: string;
  }) => {
    console.log(address);
    setIsAddressDialogOpen(false);
    setIsPaymentDialogOpen(true);
  };

  const handleAddPaymentDetails = () => {
    alert("Payment Details Submitted");
  };

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Jacket",
      price: 650,
      quantity: 1,
      subtotal: 650,
      image:
        "https://res.cloudinary.com/dpu483bcg/image/upload/v1731651333/edb397_c1cb90cf60ce400da301fa0b14310823_mv2_k25a40_169e4d9927.png",
    },
    {
      id: 2,
      name: "Gloves",
      price: 550,
      quantity: 2,
      subtotal: 1100,
      image:
        "https://res.cloudinary.com/dpu483bcg/image/upload/v1731549956/k_1118310_yloc_removebg_preview_sbmu5b_71ed7a2deb.png",
    },
  ]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: newQuantity * item.price,
            }
          : item,
      ),
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "discount10") {
      setDiscount(10);
    } else {
      alert("Invalid coupon");
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  const discountAmount =
    (cartItems.reduce((acc, item) => acc + item.subtotal, 0) * discount) / 100;

  return (
    <section className="container relative mx-auto p-8 lg:mt-32 lg:py-16">
      <div className="mb-4 lg:mb-8">
        <button onClick={() => router.back()} className="">
          <FaArrowLeft size={20} />
        </button>
      </div>

      {/* Header Row */}
      <div className="hidden md:block">
        <div className="mb-4 grid grid-cols-4 rounded-lg border border-gray-100 p-4 text-sm font-normal uppercase tracking-wider text-gray-700 shadow-xl shadow-gray-100">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-3 items-center border border-gray-100 p-2 shadow-xl shadow-gray-100 md:grid-cols-4 md:p-4"
          >
            {/* Product Column */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
              <img
                src={item.image}
                alt={item.name}
                className="h-12 w-12 rounded-md object-cover md:h-16 md:w-16"
              />
              <span className="hidden font-normal text-gray-900 md:block">
                {item.name}
              </span>
            </div>

            {/* small screen name and price of product  */}
            <div className="flex flex-col items-center justify-center md:hidden">
              <div>{item?.name}</div>
              <div className="text-lg font-bold text-gray-600">
                Rs. {item?.subtotal}
              </div>
            </div>

            {/* Price Column */}
            <div className="hidden font-normal text-gray-900 md:block">
              ${item.price}
            </div>
            {/* Quantity Column */}
            <div className="flex justify-end md:flex-none md:justify-normal">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                min={1}
                className="w-16 rounded-md border border-gray-500 px-3 py-1 text-center outline-none"
              />
            </div>
            {/* Subtotal Column */}
            <div className="hidden font-normal text-gray-900 md:block">
              Rs.{item.subtotal}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="my-4 flex justify-between py-4">
        <button
          onClick={() => router.push("/shop")}
          className="rounded-md border border-gray-500 px-2 py-2 text-sm hover:bg-gray-100 md:px-4 md:text-base"
        >
          Return To Shop
        </button>
        <button
          onClick={() => {
            /* Add update cart functionality if needed */
          }}
          className="rounded-md border border-gray-500 px-2 py-2 text-sm hover:bg-gray-100 md:px-4 md:text-base"
        >
          Update Cart
        </button>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
        {/* Coupon Section */}
        <div className="w-full">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="max-w-[15rem] flex-grow rounded-md border border-gray-500 px-2 py-2 text-sm md:px-4 md:text-base"
            />
            <button
              onClick={applyCoupon}
              className="text-nowrap rounded-md bg-black px-2 py-2 text-sm text-white hover:bg-gray-800 md:px-4 md:text-base"
            >
              Apply Coupon
            </button>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="mt-4 w-full rounded border-[1.5px] border-gray-700 p-4 lg:w-1/3 lg:p-6">
          <h2 className="mb-2 text-lg font-semibold">Cart Total</h2>

          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>
              Rs.{cartItems.reduce((acc, item) => acc + item.subtotal, 0)}
            </span>
          </div>
          <hr className="my-2 lg:my-3" />
          <div className="flex justify-between">
            <span>Delivery:</span>
            <span>Free</span>
          </div>
          <hr className="my-2 lg:my-3" />

          {/* Discount Section */}
          {discount > 0 && (
            <>
              <div className="flex justify-between">
                <span>Discount ({discount}%)</span>
                <span>- Rs.{discountAmount}</span>
              </div>
              <hr className="my-2 lg:my-3" />
            </>
          )}

          <div className="flex justify-between">
            <span>Total:</span>
            <span>Rs.{calculateTotal()}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Proceed to checkout
          </button>
        </div>
      </div>

      <AddressDialog
        isOpen={isAddressDialogOpen}
        onClose={() => setIsAddressDialogOpen(false)}
        onAddressSubmit={handleAddAddress}
      />
      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
        onPaymentSubmit={handleAddPaymentDetails}
        amount={calculateTotal()}
      />
    </section>
  );
}
