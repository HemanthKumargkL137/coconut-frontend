import Navbar from "../components/Navbar";
import heroImage from "../assets/hero.png";
import Features from "./Features";
import { useEffect, useState } from "react";
import { getAllProducts } from "../lib/api/product/api";
import type { Product } from "../types/Product";
import BestSeller from "../components/bestSeller/BestSeller";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchProducts();
}, []);


  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-5 mt-6">

        {/* Hero Banner */}
        <div className="relative">
          <img
            src={heroImage}
            alt="Hero Banner"
            className="w-full rounded-2xl object-cover"
          />

          {/* Text Overlay */}
          <div className="absolute top-12 left-10 lg:top-16 lg:left-14 max-w-md">

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-green-700">
                Pure Coconut.
              </span>
              <br />
              <span className="text-gray-900">
                Pure Goodness.
              </span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg leading-8">
              Discover natural and authentic coconut
              products from Tiptur.
            </p>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="mt-8 bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-lg transition duration-300"
            >
              Shop Now
            </button>

          </div>
        </div>

        {/* Features */}
        <Features />

        <BestSeller products={products} />

        
      </section>
    </>
  );
};

export default Hero;
