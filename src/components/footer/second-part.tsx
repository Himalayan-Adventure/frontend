import Image from "next/image";
import Link from "next/link";

export default function UsefulLinksSection() {
  const socialLinks = [
    { href: "#", src: "/icons/facebook.png", alt: "Facebook" },
    { href: "#", src: "/icons/instagram.png", alt: "Instagram" },
    { href: "#", src: "/icons/twitter.png", alt: "Twitter" },
    { href: "#", src: "/icons/whatsApp.png", alt: "WhatsApp" },
    { href: "#", src: "/icons/youtube.png", alt: "YouTube" },
  ];

  const usefulLinks = [
    {
      title: "Trekking In Nepal",
      links: [
        { name: "Everest region", href: "#" },
        { name: "Makalu region", href: "#" },
        { name: "Langtang region", href: "#" },
        { name: "Mustang region", href: "#" },
        { name: "Kanchenjanga region", href: "#" },
        { name: "Annapurna region", href: "#" },
        { name: "Manslu region", href: "#" },
        { name: "Dhaulagiri region", href: "#" },
      ],
    },
    {
      title: "Expeditions",
      links: [
        { name: "8000m", href: "#" },
        { name: "7000m", href: "#" },
        { name: "Peak climbing", href: "#" },
      ],
    },
    {
      title: "Other Activities",
      links: [
        { name: "Helicopter tour", href: "#" },
        { name: "Mountain bike", href: "#" },
        { name: "Tours", href: "#" },
      ],
    },
    {
      title: "Peak Climbing",
      links: [
        { name: "Helicopter tour", href: "#" },
        { name: "Mountain bike", href: "#" },
        { name: "Tours", href: "#" },
      ],
    },
    {
      title: "14 X 8000M",
      links: [
        { name: "Everest (8,848.86 m)", href: "#" },
        { name: "K2 (8,611 m)", href: "#" },
        { name: "Kanchenjunga (8,586 m)", href: "#" },
        { name: "Lhotse (8,516 m)", href: "#" },
        { name: "Makalu (8,485 m)", href: "#" },
        { name: "Cho Oyu (8,188 m)", href: "#" },
        { name: "Dhaulagiri (8,167 m)", href: "#" },
      ],
    },
    {
      title: "Manaslu",
      links: [
        { name: "Nanga Parbat (8,126 m)", href: "#" },
        { name: "Annapurna I (8,091 m)", href: "#" },
        { name: "Gasherbrum I (8,080 m)", href: "#" },
        { name: "Broad Peak (8,051 m)", href: "#" },
        { name: "Gasherbrum II (8,035 m)", href: "#" },
        { name: "Shishapangma (8,027 m)", href: "#" },
      ],
    },
  ];

  const paymentMethods = [
    { src: "/images/visa.png", alt: "Visa" },
    { src: "/images/visa.png", alt: "MasterCard" },
    { src: "/images/visa.png", alt: "American Express" },
  ];

  const affiliations = [
    { src: "/images/visa.png", alt: "Affiliation 1" },
    { src: "/images/visa.png", alt: "Affiliation 2" },
  ];

  const recommendations = [
    { src: "/images/visa.png", alt: "Recommendation 1" },
    { src: "/images/visa.png", alt: "Recommendation 2" },
  ];

  const renderList = (items: { src: string; alt: string }[]) =>
    items.map((item, index) => (
      <li key={index} className="inline-block">
        <Image src={item.src} alt={item.alt} width={50} height={24} />
      </li>
    ));

  return (
    <section className="-mt-4 bg-black py-8 text-white">
      <div className="container">
        <div className="flex flex-col justify-between gap-4 py-4 md:flex-row md:py-8">
          <div className="flex">
            <button className="rounded-lg border border-white px-6 py-2 text-sm text-white md:text-base">
              About Us
            </button>
          </div>
          <div className="flex gap-6">
            {socialLinks.map((social, index) => (
              <Link
                href={social.href}
                key={index}
                aria-label={social.alt}
                className="flex items-center"
              >
                <Image
                  src={social.src}
                  alt={social.alt}
                  width={24}
                  height={24}
                  className="h-6 w-6 bg-black" // Tailwind classes for consistent size
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="border-b-2 border-white pb-8">
          <h1 className="mb-6 text-xl font-semibold lg:text-2xl">
            Useful Links
          </h1>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {usefulLinks.map((column, idx) => (
              <div key={idx}>
                <h2 className="mb-4 font-semibold lg:text-lg">
                  {column.title}
                </h2>
                <ul className="space-y-2">
                  {column.links.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href}>
                        <div className="text-sm hover:underline md:text-base">
                          {link.name}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 border-b-2 border-white py-8 md:flex-row">
          <div>
            <h3 className="mb-4 font-semibold lg:text-lg">We Accept</h3>
            <ul className="flex gap-6">{renderList(paymentMethods)}</ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold lg:text-lg">Affiliated with</h3>
            <ul className="flex gap-6">{renderList(affiliations)}</ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold lg:text-lg">Recommended by</h3>
            <ul className="flex gap-6">{renderList(recommendations)}</ul>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <p className="text-center text-sm md:text-base">
            Copyright © 2024, Gurukul Hub Pvt. Ltd. All Rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
