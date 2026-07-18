import { type FormEvent, useState } from "react";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Contact = () => {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessageSent(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-12 rounded border border-gray-200 bg-white p-8 md:grid-cols-[0.9fr_1.1fr]">
          <section>
            <h1 className="text-2xl font-semibold">Contact Us</h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-600">
              We would love to hear from you. Reach out to us for any questions
              or support.
            </p>

            <div className="mt-8 space-y-6 text-sm">
              <div className="flex gap-4">
                <FaMapMarkerAlt className="mt-1 text-green-700" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="mt-1 text-gray-600">Tiptur, Karnataka - 572201</p>
                  <p className="text-gray-600">India</p>
                </div>
              </div>
              <div className="flex gap-4">
                <FaPhoneAlt className="mt-1 text-green-700" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="mt-1 text-gray-600">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex gap-4">
                <FaEnvelope className="mt-1 text-green-700" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="mt-1 text-gray-600">support@tipturcoconut.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <FaClock className="mt-1 text-green-700" />
                <div>
                  <p className="font-semibold">Working Hours</p>
                  <p className="mt-1 text-gray-600">Mon - Sat: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                required
                placeholder="Enter your name"
                className="h-11 w-full rounded border border-gray-200 px-3 text-sm outline-none"
              />
              <input
                required
                type="email"
                placeholder="Enter your email"
                className="h-11 w-full rounded border border-gray-200 px-3 text-sm outline-none"
              />
              <textarea
                required
                placeholder="Type your message..."
                className="h-36 w-full resize-none rounded border border-gray-200 px-3 py-3 text-sm outline-none"
              />

              {messageSent && (
                <p className="text-sm font-semibold text-green-700">
                  Message sent successfully
                </p>
              )}

              <button
                type="submit"
                className="h-10 rounded bg-green-800 px-5 text-sm font-semibold text-white"
              >
                Send Message
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Contact;
