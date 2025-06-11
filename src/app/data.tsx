interface Product {
  _id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  variants: {
    color: string[];
    size: string[];
  };
  defaultVariant: {
    color: string;
    size: string;
  };
  stock: number;
}

const sampleProduct: Product[] = [];

for (let i = 1; i <= 20; i++) {
  sampleProduct.push({
    _id: `prod-${i.toString().padStart(3, "0")}`, // prod-001, prod-002, etc.
    image:
      "https://www.aaramkhor.com/cdn/shop/products/2924_25_Cotton_T_Shirt_Men_Round_Neck_Half_Sleeve_946ef81d-a283-40ef-9a4e-439c1da172ad_482x.progressive.jpg?v=1736791422",
    title: `Premium Cotton T-Shirt #${i}`,
    description:
      "Experience ultimate comfort with our premium cotton t-shirt. Soft, breathable, and perfect for everyday wear.",
    price: 1299,
    currency: "INR",
    variants: {
      color: ["Blue", "Black", "White"],
      size: ["S", "M", "L", "XL"],
    },
    defaultVariant: {
      color: "Blue",
      size: "M",
    },
    stock: 20,
  });
}

export default sampleProduct;
