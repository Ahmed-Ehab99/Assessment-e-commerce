import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { t } from "i18next";

export const useCart = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: () =>
      fetcher<{ cart_items: CartItem[] }>("/api/cart/items").then(
        (res) => res?.cart_items || [],
      ),
  });

  const addItem = useMutation({
    mutationFn: ({ productId, qty }: { productId: string; qty: number }) => {
      const formData = new FormData();
      formData.append("item_id", productId);
      formData.append("qty", qty.toString());

      return fetcher("/api/cart/add-item", {
        method: "POST",
        body: formData,
      });
    },
    onSettled: (data, error) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      if (error) {
        toast({ title: t("toast.itemActionFailed"), variant: "destructive" });
      } else {
        toast({ title: t("toast.addItemSuccess"), variant: "default" });
      }
    },
  });

  const increaseItem = useMutation({
    mutationFn: async (productId: string) => {
      return fetcher("/api/cart/increase-item", {
        method: "POST",
        body: JSON.stringify({ item_id: productId, qty: 1 }),
      });
    },
    onSettled: (data, error) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      if (error) {
        toast({ title: t("toast.itemActionFailed"), variant: "destructive" });
      }
    },
  });

  const decreaseItem = useMutation({
    mutationFn: async (productId: string) => {
      return fetcher("/api/cart/decrease-item", {
        method: "POST",
        body: JSON.stringify({ item_id: productId, qty: 1 }),
      });
    },
    onSettled: (data, error) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      if (error) {
        toast({ title: t("toast.itemActionFailed"), variant: "destructive" });
      }
    },
  });

  const removeItem = useMutation({
    mutationFn: (productId: string) =>
      fetcher("/api/cart/remove-item", {
        method: "POST",
        body: JSON.stringify({ item_id: productId }),
      }),
    onSettled: (data, error) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      if (error) {
        toast({ title: t("toast.itemActionFailed"), variant: "destructive" });
      } else {
        toast({ title: t("toast.removeItemSuccess"), variant: "default" });
      }
    },
  });

  const clearCart = useMutation({
    mutationFn: () =>
      fetcher("/api/cart/destroy-cart", {
        method: "POST",
      }),
    onSettled: (data, error) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      if (error) {
        toast({ title: t("toast.itemActionFailed"), variant: "destructive" });
      } else {
        toast({ title: t("toast.clearCartSuccess"), variant: "default" });
      }
    },
  });

  const totalPrice = (data || []).reduce((acc, item) => {
    return acc + Number(item.subtotal || 0);
  }, 0);

  return {
    cartItems: data || [],
    totalQty: (data || []).reduce(
      (acc, item) => acc + Number(item.qty || 0),
      0,
    ),
    totalPrice,
    isLoading,
    isError,
    refetch,

    addItem: addItem.mutate,
    increaseItem: increaseItem.mutate,
    decreaseItem: decreaseItem.mutate,
    removeItem: removeItem.mutate,
    clearCart: clearCart.mutate,

    isAdding: addItem.isPending,
    isIncreasing: increaseItem.isPending,
    isDecreasing: decreaseItem.isPending,
    isRemoving: removeItem.isPending,
    isClearing: clearCart.isPending,
  };
};
