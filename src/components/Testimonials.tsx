"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Cybersecurity Engineer",
      content: "This platform helped me prepare for CTF competitions and ultimately land my dream job. The challenges are well-designed and progressively difficult.",
      avatar: "AJ",
    },
    {
      id: 2,
      name: "Maria Garcia",
      role: "Security Researcher",
      content: "I've tried many CTF platforms, but this one stands out for its comprehensive approach and real-world scenarios. Highly recommended for serious practitioners.",
      avatar: "MG",
    },
    {
      id: 3,
      name: "David Chen",
      role: "CTF Team Captain",
      content: "Our team uses this platform for training. The variety of challenges and the Supabase integration make it easy to manage our practice sessions.",
      avatar: "DC",
    },
  ];

  return (
    <div className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of cybersecurity enthusiasts who have improved their skills with our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}