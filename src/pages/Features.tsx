import {
  FaLeaf,
  FaSeedling,
  FaAward,
  FaRecycle,
} from "react-icons/fa";

const features = [
  {
    icon: <FaLeaf />,
    title: "100% Natural",
    description: "No Additives",
  },
  {
    icon: <FaSeedling />,
    title: "From Tiptur",
    description: "Directly From Farmers",
  },
  {
    icon: <FaAward />,
    title: "Premium Quality",
    description: "Trusted by Thousands",
  },
  {
    icon: <FaRecycle />,
    title: "Eco Friendly",
    description: "Sustainable Living",
  },
];

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 mt-8">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xl">
                {item.icon}
              </div>

              <div>
                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;