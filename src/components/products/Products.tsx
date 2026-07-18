import ProductHeader from "./ProductHeader";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import type { Product } from "../../types/Product";

interface ProductsProps {
  products: Product[];
  
}

const Products = ({ products }: ProductsProps) => {
    return (
        <div className="flex-1">

            <ProductHeader
  totalProducts={products.length}
  
/>

            <ProductGrid
                products={products}
            />

            <Pagination />

        </div>
    );
};

export default Products;