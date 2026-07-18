import ProductGrid from "../products/ProductGrid";
import type { Product } from "../../types/Product";
import { Link } from "react-router-dom";

interface BestSellerProps {
  products: Product[];
}

const BestSeller = ({ products }: BestSellerProps) => {
  return (
    <section className="mt-16">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Best Sellers
          </h2>

          <p className="text-gray-500 mt-2">
            Our most loved coconut products.
          </p>
        </div>

        <Link
          to="/shop"
          className="text-green-700 font-semibold hover:underline"
        >
          View All →
        </Link>

      </div>

      {/* Only first 4 products */}
      <ProductGrid
        products={products.slice(0, 4)}
      />

    </section>
  );
};

export default BestSeller;