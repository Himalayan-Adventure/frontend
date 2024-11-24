/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa"; // Import icons from react-icons

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSubmit: (paymentDetails: {
    paymentMode: string;
    paymentType: string;
    amount: number; // Add amount to paymentDetails
  }) => void;
  amount: number;
}

const paymentTypes = [
  {
    name: "Khalti",
    logo: "/images/khalti-logo.png",
  },
  {
    name: "eSewa",
    logo: "/images/esewa-logo.png",
  },
];

const paymentOptions = [{ name: "Full Payment" }, { name: "Pay Advance" }];

export default function PaymentDialog({
  isOpen,
  onClose,
  onPaymentSubmit,
  amount,
}: PaymentDialogProps) {
  const [paymentMode, setPaymentMode] = useState<string>("Khalti");
  const [paymentType, setPaymentType] = useState<string>("Full Payment");
  const [advanceAmount, setAdvanceAmount] = useState<number>(0); // New state for advance amount
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!paymentMode || !paymentType) {
      setError("Please select both payment mode and payment type.");
      return;
    }

    if (paymentType === "Pay Advance" && advanceAmount <= 0) {
      setError("Please enter a valid advance amount.");
      return;
    }

    setError(null);
    onPaymentSubmit({
      paymentMode,
      paymentType,
      amount: paymentType === "Pay Advance" ? advanceAmount : amount, // Send advance amount if Pay Advance
    });
    onClose();
  };

  // Find the logo of the selected payment mode
  const selectedPaymentType = paymentTypes.find(
    (payment) => payment.name === paymentMode,
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="pb-8 sm:px-10">
        <DialogHeader>
          <h2 className="mb-4 text-center font-semibold md:text-lg">
            Payment Details
          </h2>
        </DialogHeader>

        {/* Payment Mode Selection */}
        <div className="space-y-4">
          <h3 className="font-semibold md:text-lg">Payment Mode</h3>
          <div className="flex space-x-4">
            {paymentTypes.map((payment) => (
              <div
                key={payment.name}
                onClick={() => setPaymentMode(payment.name)}
                className={`flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-lg border p-4 md:h-28 md:w-28 ${
                  paymentMode === payment.name
                    ? "border-orange-500 bg-orange-100 text-orange-500"
                    : "bg-white text-gray-400 grayscale"
                }`}
              >
                <img
                  src={payment.logo}
                  alt={`${payment.name} Logo`}
                  className="mb-2 h-8 w-8 object-contain md:h-12 md:w-12"
                />
                <p className="text-sm font-bold md:text-base">{payment.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Type Selection */}
        <div className="mt-6">
          <h3 className="font-semibold md:text-lg">Payment Type</h3>
          <div className="mt-2 flex space-x-4">
            {paymentOptions.map((option) => (
              <div
                key={option.name}
                onClick={() => setPaymentType(option.name)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg border px-6 py-2 font-poppins text-sm md:text-base ${
                  paymentType === option.name
                    ? "border-orange-500 bg-orange-100 text-orange-500"
                    : "bg-white text-gray-400"
                }`}
              >
                <p className="font-medium">{option.name}</p>
                {paymentType === option.name ? (
                  <FaCheckCircle className="text-orange-500 md:text-lg" />
                ) : (
                  <FaRegCircle className="text-gray-400 md:text-lg" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Advance Amount Input */}
        {paymentType === "Pay Advance" && (
          <div className="mt-6">
            <h3 className="font-semibold md:text-lg">Advance Amount</h3>
            <input
              type="text"
              value={advanceAmount}
              onChange={(e) => setAdvanceAmount(Number(e.target.value))}
              placeholder="Enter advance amount"
              className="mt-2 w-full rounded-lg border border-gray-300 p-2 text-gray-700 outline-none"
            />
          </div>
        )}

        {/* Payment Summary */}
        <div className="mt-6 flex items-center justify-between gap-4 border-b-2 border-t-2 py-2 text-center md:gap-8">
          {selectedPaymentType && (
            <div className="flex items-center justify-center space-x-1">
              <img
                src={selectedPaymentType.logo}
                alt={`${selectedPaymentType.name} Logo`}
                className="h-12 w-12"
              />
              <p className="font-semibold text-gray-700">
                {paymentMode} Payment
              </p>
            </div>
          )}
          <p className="font-semibold text-orange-500 md:text-lg">
            Rs. {paymentType === "Pay Advance" ? advanceAmount : amount}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-2 text-center text-sm text-red-500">{error}</p>
        )}

        <DialogFooter className="mt-6">
          <Button
            onClick={handleSubmit}
            className="w-full bg-primary text-white hover:bg-orange-600"
          >
            Next
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
