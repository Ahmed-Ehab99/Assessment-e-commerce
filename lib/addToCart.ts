import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

type AddToCartParams = {
  productId: string;
  qty: number;
  t: (key: string) => string;
  router: ReturnType<typeof useRouter>;
  toast: (opts: {
    title: string;
    description: string;
    variant: "destructive" | "default";
  }) => void;
  addItem: (params: { productId: string; qty: number }) => void;
};

export const handleAddToCart = ({
  productId,
  qty,
  t,
  router,
  toast,
  addItem,
}: AddToCartParams) => {
  const authToken = Cookies.get("authToken");
  if (!authToken) {
    toast({
      title: t("toast.authWarning"),
      description: t("toast.addItemhWarning"),
      variant: "destructive",
    });
    router.push("/auth");
    return false;
  } else {
    addItem({ productId, qty });
    return true;
  }
};
