"use client";

import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import Header from '../components/Header';

const db = getFirestore(app);

const FindInternships = () => {
  const [internships, setInternships] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchInternships = async () => {
      const internshipsCollection = collection(db, "internships");
      const internshipSnapshot = await getDocs(internshipsCollection);
      const internshipList = internshipSnapshot.docs.map((doc) => doc.data());
      setInternships(internshipList);
    };
    fetchInternships();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <Header />

      <main className="flex-grow p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Available Internships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {internships.map((internship) => (
  <div key={internship.id} className="bg-gray-900 p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-bold">{internship.title}</h3>
    <p>{internship.company}</p>
    <p>{internship.location}</p>
    <button
      onClick={() => router.push(`/internship/${internship.id}`)}
      className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
    >
      View Details
    </button>
  </div>
))}
        </div>
      </main>
    </div>
  );
};

export default FindInternships;
