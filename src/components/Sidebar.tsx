interface Category {
  id: number;
  name: string;
}

interface SidebarProps {
  categories: Category[];
  handleCategoryClick: (categoryId: number) => void;
  onSortChange: (sortValue: string) => void;
}

const Sidebar = ({ categories ,handleCategoryClick,onSortChange}: SidebarProps) => {

  // console.log("i am inside side bar" ,onSortChange);
  return (
    <div className="w-72 bg-white rounded-xl shadow-md p-6">

      {/* Categories */}
      <h2 className="text-lg font-semibold mb-4">
        Categories
      </h2>

      <button className="w-full bg-green-100 text-green-700 font-medium py-2 rounded-lg mb-3">
        All Products
      </button>

      <div className="space-y-3">
        {categories.map((category) => (
          <p
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="text-gray-600 hover:text-green-600 cursor-pointer transition"
          >
            {category.name}
          </p>
        ))}
      </div>

      {/* Price */}
      <div className="mt-8">
        <h3 className="font-semibold mb-4">
          Filter by Price
        </h3>

        <input
          type="range"
          min="0"
          max="1000"
          className="w-full accent-green-600"
        />

        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>₹0</span>
          <span>₹1000</span>
        </div>
      </div>

      {/* Sort */}
      <div className="mt-8">
        <h3 className="font-semibold mb-3">
          Sort by
        </h3>

        <select className="w-full border rounded-lg px-3 py-2" onChange={(e) => onSortChange(e.target.value)}>
          <option>Sort By</option>
          <option value="price_low_to_high">Price: Low to High</option>
          <option value="price_high_to_low">Price: High to Low</option>
          {/* <option>Newest</option> */}
        </select>
      </div>

    </div>
  );
};

export default Sidebar;