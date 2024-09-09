import React from "react";

export default function Map({ location }: { location: string }) {
  return (
    <div className="relative">
      <div className="rounded-lg border bg-white p-2 shadow-2xl shadow-gray-300 grayscale lg:p-4">
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${location}`}
          // src="https://www.google.com/maps/embed/?q=Eiffel+Tower,Paris+France&pb=!1m18!1m12!1m3!1d3821.822903565693!2d85.30798877566433!3d27.71476002516401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fd1d28f85b%3A0x154125e1a5d816ba!2sHimalayan%20Spirit%20Adventure%20Treks%20%26%20Expedition!5e1!3m2!1sen!2snp!4v1725269194427!5m2!1sen!2snp"
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-96 w-full"
        ></iframe>
      </div>
    </div>
  );
}
