import CommonBanner from "@/components/ui/common-banner";
import bgImage from "/public/images/planPgBg.png";
import Cart from "@/components/cart/cart";

export default async function CartPage() {
  return (
    <main>
      <CommonBanner title="Cart" bgImage={bgImage} />
      <Cart />
    </main>
  );
}
