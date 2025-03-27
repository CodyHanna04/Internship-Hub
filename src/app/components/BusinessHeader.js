"use client";

import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "/lib/firebaseConfig";

const auth = getAuth(app);

const BusinessHeader = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/business-dashboard")}>
        Business Dashboard
      </h1>

      <nav className="flex gap-4">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          onClick={() => router.push("/post-internship")}
        >
          Post Internship
        </button>

        <button 
          className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
          onClick={() => router.push("/view-applications")}
        >
          View Applications
        </button>

        <button 
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
          onClick={() => router.push("/business-profile")}
        >
          Edit Company Profile
        </button>

        <button 
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default BusinessHeader;
