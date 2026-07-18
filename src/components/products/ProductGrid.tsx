import type { Product } from "../../types/Product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
    products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
    console.log("products in product grid",products);
    return (
        <div className="grid grid-cols-4 gap-6">

            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}

        </div>
    );
};

export default ProductGrid;