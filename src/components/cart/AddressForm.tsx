import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AddressDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressSubmit: (address: {
    name: string;
    phoneNumber: string;
    address: string;
    landmark: string;
  }) => void;
}

export default function AddressDialog({
  isOpen,
  onClose,
  onAddressSubmit,
}: AddressDialogProps) {
  const [address, setAddress] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    landmark: "",
  });

  const [error, setError] = useState<string | null>(null);

  // Handle address form submission
  const handleAddAddress = () => {
    if (
      !address.name ||
      !address.phoneNumber ||
      !address.address ||
      !address.landmark
    ) {
      setError("Please fill in all fields.");
      return;
    }
    setError(null); // Reset error message
    onAddressSubmit(address); // Pass the address data to parent
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="z-[101] pb-8 sm:px-20"
        overlayClassName="z-[101]"
      >
        <DialogHeader>
          <h2 className="mb-4 text-center font-semibold md:text-lg">
            Delivery Address
          </h2>
        </DialogHeader>
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="mb-1 block text-sm font-medium"
            >
              Phone Number
            </label>
            <Input
              id="phoneNumber"
              value={address.phoneNumber}
              onChange={(e) =>
                setAddress({ ...address, phoneNumber: e.target.value })
              }
              placeholder="Enter your phone number"
            />
          </div>

          {/* Address Field */}
          <div>
            <label htmlFor="address" className="mb-1 block text-sm font-medium">
              Address
            </label>
            <Input
              id="address"
              value={address.address}
              onChange={(e) =>
                setAddress({ ...address, address: e.target.value })
              }
              placeholder="Enter your address"
            />
          </div>

          {/* Landmark Field */}
          <div>
            <label
              htmlFor="landmark"
              className="mb-1 block text-sm font-medium"
            >
              Landmark (Optional)
            </label>
            <Input
              id="landmark"
              value={address.landmark}
              onChange={(e) =>
                setAddress({ ...address, landmark: e.target.value })
              }
              placeholder="Enter a nearby landmark (optional)"
            />
          </div>

          {/* Error message */}
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        <DialogFooter className="mt-3">
          <Button onClick={handleAddAddress} className="w-full">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
