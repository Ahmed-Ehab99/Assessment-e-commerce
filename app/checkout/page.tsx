import CheckoutSec from "@/components/CheckoutSec";
import Image from "next/image";

const CheckoutPage = () => {
  return (
    <section className="relative">
      <CheckoutSec />
      <Image
        src="/shapes/shape11.svg"
        alt="Shape"
        width={300}
        height={300}
        className="absolute bottom-20 left-0 -z-10 h-auto w-auto opacity-0 md:opacity-100"
        loading="eager"
        priority
      />
      <Image
        src="/shapes/shape12.svg"
        alt="Shape"
        width={300}
        height={300}
        className="absolute right-0 top-40 -z-10 h-auto w-auto opacity-0 md:opacity-100"
        loading="eager"
        priority
      />
    </section>
  );
};

export default CheckoutPage;
