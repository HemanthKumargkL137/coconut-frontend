interface ProductHeaderProps {
  totalProducts: number;
  
}

const ProductHeader = ({
    totalProducts,
}: ProductHeaderProps) => {
    return (
        <div className="flex justify-between items-center mb-6">

            <div>

                <h1 className="text-3xl font-bold">
                    All Products
                </h1>

                <p className="text-gray-500 mt-1">
                    Showing {totalProducts} Products
                </p>

            </div>

            

        </div>
    );
};

export default ProductHeader;