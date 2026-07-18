import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getAllCategories } from "../lib/api/category/api";
import { getAllProducts } from "../lib/api/product/api";
import Products from "../components/products/Products";
import type { Product } from "../types/Product";
import { getProductsByPriceSort } from "../lib/api/product/api";


interface Category {
    id: number;
    name: string;
}

const Home = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [search, setSearch] = useState("");
const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>();


   useEffect(() => {

    fetchCategories();

    fetchProducts();

}, []);




    const fetchCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data.data);
        } 
        
        catch (error) {
            console.log(error);
        }

    };

    const handleCategoryClick = async (categoryId: number) => {
  try {
    setSelectedCategoryId(categoryId);

    const data = await getAllProducts(categoryId, search);
    setProducts(data.data);
  } catch (error) {
    console.log("Category products failed", error);
  }
};

const handleSearch = async (value: string) => {
  try {
    setSearch(value);

    const data = await getAllProducts(selectedCategoryId, value);
    setProducts(data.data);
  } catch (error) {
    console.log("Search products failed", error);
  }
};


    

    const fetchProducts = async () => {

    try {

        const data = await getAllProducts();

        console.log("Home",data);

        setProducts(data.data);

    } catch (error) {

        console.log(error);

    }

};


const handleSortChange = async (sortValue: string) => {
    console.log("selected sort value", sortValue);
  try {
    if (sortValue === "price_low_to_high") {
      const data = await getProductsByPriceSort(
        "ASC",
        selectedCategoryId,
        search
      );

      console.log("sortdata", data);

      setProducts(data.data.data);
    }

    if (sortValue === "price_high_to_low") {
      const data = await getProductsByPriceSort(
        "DESC",
        selectedCategoryId,
        search
      );

      setProducts(data.data.data);
    }

    
  } catch (error) {
    console.log("Sort products failed", error);
  }
};

// const loadPageData = async () => {
//     try {

//         const [categoryResponse, productResponse] =
//             await Promise.all([
//                 getAllCategories(),
//                 getAllProducts(),
//             ]);

//         setCategories(categoryResponse.data);

//         setProducts(productResponse.data);

//     } catch (error) {

//         console.log(error);

//     }
// };


// useEffect(() => {
//     loadPageData();
// }, []);


    return (
        <>
            <Navbar
  search={search}
  handleSearch={handleSearch}
 
/>
            <div className="flex">
                <Sidebar
                    categories={categories}
                    handleCategoryClick={handleCategoryClick}
                     onSortChange={handleSortChange}
                />

                <Products
  products={products}
  
/>


            </div>
        </>
    );
};

export default Home;
