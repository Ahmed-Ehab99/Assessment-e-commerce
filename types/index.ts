export type PropsMetadata = {
  params: {
    id: string;
  };
};

export type AuthFormProps = {
  onValidChange?: (valid: boolean) => void;
  disableRedirect?: boolean;
  onAuthSuccess?: () => void;
};

export type SignInData = {
  email: string;
  password: string;
};

export type SignUpData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

export type UserData = {
  id: number;
  name: string;
  description: string | null;
  email: string;
  image: string | null;
  lastname: string;
  token: string;
};

export type CategoryData = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export type ProductImage = {
  id: number;
  product_id: number;
  link: string;
  created_at: string;
  updated_at: string;
};

export type ProductColor = {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
};

export type ProductSize = {
  id: number;
  Size: string;
  created_at: string;
  updated_at: string;
};

export type ProductData = {
  id: number;
  title: string;
  description: string;
  information: string;
  shipping_return: string;
  price: string;
  discount: string;
  discount_Price: string;
  quantity: number;
  sold: string;
  featured_Product: number;
  best_Selling: number;
  new_Arrival: number;
  on_Sale: number;
  status: number;
  created_at: string;
  updated_at: string;
  categories: CategoryData[];
  colors: ProductColor[];
  sizes: ProductSize[];
  productimage: ProductImage[];
};

export type ProductsPaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type ProductsPaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type CartItem = {
  rowId: string;
  id: number;
  name: string;
  qty: number | string;
  price: number;
  weight: number;
  options: {
    sku: string | null;
    name: string;
    size: string | null;
    color: string | null;
    discount_price: string;
    discount_parcent: string;
    variant_id: string | null;
    variant_name: string | null;
  };
  discount: number;
  tax: number;
  subtotal: number;
};

export type ProductsApiResponse = {
  data: ProductData[];
  links: ProductsPaginationLinks;
  meta: ProductsPaginationMeta;
  success: boolean;
  message: string;
};

export type OrderDetails = {
  shipping_street_address: string;
  shipping_state: string;
  shipping_country: string;
  payment_method: string;
};

export type OrderItem = {
  id: number;
  Product_Id: number;
  Product_Name: string;
  Price: string;
  Quantity: number;
  Total_Price: string;
  image_link: string;
};

export type OrderUser = {
  id: number;
  name: string;
  lastname: string;
  email: string;
};

export type OrderData = {
  id: number;
  Order_Number: string;
  User_Id: number;
  shipping_address: string;
  Grand_Total: string;
  Payment_Method: string;
  Payment_Status: number;
  Order_Status: number;
  txn: string;
  session_url: string;
  created_at: string;
  updated_at: string;
  order_details: OrderItem[];
  user: OrderUser;
};

export type ApiResponse<T> = {
  isSuccessful: boolean;
  hasContent: boolean;
  code: number;
  message: string | null;
  detailed_error: string | null;
  data: T | null;
};

export type UserApiResponse = ApiResponse<UserData>;

export type SignOutApiResponse = ApiResponse<string>;

export type CategoriesApiResponse = ApiResponse<CategoryData[]>;

export type CategoryApiResponse = ApiResponse<CategoryData>;

export type ProductApiResponse = ApiResponse<ProductData>;

export type CartApiResponse = ApiResponse<CartItem[]>;

export type DeliveryApiResponse = ApiResponse<OrderData>;