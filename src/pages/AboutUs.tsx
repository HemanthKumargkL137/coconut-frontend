import { FaAward, FaLeaf, FaRecycle, FaSeedling } from "react-icons/fa";
import Navbar from "../components/Navbar";

const reasons = [
  {
    title: "Direct From Farmers",
    description: "We source directly from local farmers.",
    icon: FaSeedling,
  },
  {
    title: "100% Natural",
    description: "No chemicals or preservatives.",
    icon: FaLeaf,
  },
  {
    title: "Premium Quality",
    description: "Carefully processed for the best quality.",
    icon: FaAward,
  },
  {
    title: "Sustainable",
    description: "Eco-friendly packaging and processes.",
    icon: FaRecycle,
  },
];

const AboutUs = () => {
  return (
    <>
      <Navbar />

      <main className="bg-[#f7faf5] min-h-screen py-10 px-6">
        <section className="max-w-6xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 items-center bg-[#f2f7ed]">
            <div className="p-8 md:p-12">
              <h1 className="text-4xl font-bold text-green-800 mb-5">
                About Tiptur Coconut
              </h1>

              <p className="text-gray-600 leading-7 mb-5 max-w-lg">
                Tiptur Coconut is on a mission to bring you the finest coconut
                products from the land of Tiptur, Karnataka, known for its rich
                soil and the best coconuts.
              </p>

              <p className="text-gray-600 leading-7 max-w-lg">
                We work directly with local farmers and ensure every product is
                100% natural, pure and environment friendly.
              </p>
            </div>

            <div className="h-80 md:h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?w=900&auto=format&fit=crop&q=80"
                alt="Fresh coconuts and palm leaves"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Why Choose Us?
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {reasons.map((reason) => {
                const Icon = reason.icon;

                return (
                  <article key={reason.title} className="text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-green-300 text-green-700 flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-2xl" />
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2">
                      {reason.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-6">
                      {reason.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutUs;
