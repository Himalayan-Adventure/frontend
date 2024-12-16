"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WarningBoxProps {
  isOpen: boolean;
  onClose: () => void;
  isUserLoggedIn: boolean;
  stockCount: number;
  demand: number;
  onLoginRedirect: () => void;
}

const WarningBox: React.FC<WarningBoxProps> = ({
  isOpen,
  onClose,
  isUserLoggedIn,
  stockCount,
  demand,
  onLoginRedirect,
}) => {
  const isStockUnavailable = stockCount <= 0;
  const isDemandGreaterThanStock = demand > stockCount;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUserLoggedIn
              ? isStockUnavailable
                ? "Stock Unavailable"
                : isDemandGreaterThanStock
                  ? "High Demand"
                  : "Item Available"
              : "Login Required"}
          </DialogTitle>
          <DialogDescription>
            {isUserLoggedIn
              ? isStockUnavailable
                ? "Sorry, this item is currently out of stock. Please check back later."
                : isDemandGreaterThanStock
                  ? "The demand for this item exceeds the available stock. Please wait for restock."
                  : "The item is available for purchase."
              : "You need to be logged in to add items to the cart. Please log in to continue."}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default WarningBox;
