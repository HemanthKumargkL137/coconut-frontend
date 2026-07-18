import { FaArrowRight } from "react-icons/fa";
import Navbar from "../components/Navbar";

const posts = [
  {
    title: "Benefits of Virgin Coconut Oil",
    date: "May 10, 2024",
    category: "Health",
    description:
      "Learn about the amazing benefits of using virgin coconut oil daily.",
    image:
      "https://images.unsplash.com/photo-1627894006066-b4575d6ae4d8?w=700&auto=format&fit=crop&q=80",
  },
  {
    title: "How Coconut Sugar is Healthier?",
    date: "Apr 25, 2024",
    category: "Nutrition",
    description:
      "Why coconut sugar is a better alternative to refined sugar.",
    image:
      "https://images.unsplash.com/photo-1588413335653-34b770bca7c1?w=700&auto=format&fit=crop&q=80",
  },
  {
    title: "Uses of Coconut Flour in Daily Life",
    date: "Apr 15, 2024",
    category: "Tips",
    description:
      "Different ways to include coconut flour in your regular diet.",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&auto=format&fit=crop&q=80",
  },
];

const Blog = () => {
  return (
    <>
      <Navbar />

      <main className="bg-[#f7faf5] min-h-screen py-10 px-6">
        <section className="max-w-6xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-8 md:p-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              From Our Blog
            </h1>

            <button className="text-green-700 font-semibold text-sm hover:text-green-900">
              View All
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.title}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-56 object-cover rounded-xl mb-5"
                />

                <h2 className="text-xl font-semibold text-gray-900 leading-7 mb-2">
                  {post.title}
                </h2>

                <p className="text-sm text-gray-500 mb-4">
                  {post.date}
                  <span className="mx-2">-</span>
                  <span className="text-green-700">{post.category}</span>
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                  {post.description}
                </p>

                <button className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-900">
                  Read More
                  <FaArrowRight className="text-sm" />
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;
