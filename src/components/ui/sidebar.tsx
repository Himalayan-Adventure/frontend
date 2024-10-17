"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "lucide-react";

import { Button } from "./button";

export default function Sidebar({
  show,
  onClose,
  children,
}: {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-[130] lg:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <Button
                    variant="ghost"
                    type="button"
                    className="-m-2.5 p-2.5 hover:bg-transparent"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </Button>
                </div>
              </Transition.Child>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
