/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
        port: "",
      },
      {
        protocol:"https",
        hostname:"fastly.picsum.photos",
      },

      {
        protocol:"https",
        hostname:"unsplash.it",
      },
      {
        protocol:"https",
        hostname:"s3-alpha-sig.figma.com",
      },
    ],
  },
};

export default nextConfig;
