import CommonBanner from "@/components/ui/common-banner";
import bgImage from "/public/images/planPgBg.png";
import Cart from "@/components/cart/cart";



import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
export const metadata: Metadata = {
  title: `My Cart | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};
export default async function CartPage() {
  return (
    <main>
      <CommonBanner title="Cart" bgImage={bgImage} />
      <Cart />
    </main>
  );
}
