"use client";
import React, { useState } from "react";
type TFAQProps = { id: string; question: string; answer: string };
export default function Faqs({ data }: { data: TFAQProps[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container py-4 lg:py-8">
      <div className="max-w-3xl">
        <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">FAQ</h2>
        <div className="mt-4 space-y-4">
          {data?.map((faq, index) => (
            <div key={index} className="overflow-hidden">
              <button
                className="flex w-full items-center justify-between bg-gray-800 p-4 text-left font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                onClick={() => toggleFaq(index)}
              >
                <span className="text-sm md:text-base">Q. {faq.question}</span>
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              <div
                className={`transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="bg-white p-4 text-gray-700">
                  <p className="text-sm md:text-base">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
