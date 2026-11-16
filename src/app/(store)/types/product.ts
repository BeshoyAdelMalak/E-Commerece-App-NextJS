export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
  category: {
    _id: string;
    name: string;
    image: string;
  };
  brand: {
    _id: string;
    name: string;
    image: string;
  };
}

export interface ProductsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: Product[];
}

