import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4 text-white">
      {/* Top Right Buttons */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <Link href="/business-dashboard">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700">
            Business Portal
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-green-400 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-500">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-red-400 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-red-500">
            Sign Up
          </button>
        </Link>
      </div>
      
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">Campus Internship Hub</h1>
      <p className="text-lg text-gray-200 mb-6">Find the perfect internship or connect with local businesses.</p>
      
      <div className="flex space-x-4">
        <Link href="/internships">
          <button className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition">
            Browse Internships
          </button>
        </Link>
      </div>
    </div>
  );
}
