"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { app } from "/lib/firebaseConfig";
import BusinessHeader from "../components/BusinessHeader";

const auth = getAuth(app);
const db = getFirestore(app);

const BusinessDashboard = () => {
  const [user, setUser] = useState(null);
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        fetchInternships(user.uid);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchInternships = async (userId) => {
    const q = query(collection(db, "internships"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const fetchedInternships = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setInternships(fetchedInternships);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <BusinessHeader />
      <main className="p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Business Dashboard</h2>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Your Posted Internships</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {internships.length > 0 ? (
              internships.map((internship) => (
                <div key={internship.id} className="bg-gray-900 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold">{internship.title}</h3>
                  <p>{internship.location}</p>
                  <button 
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                    onClick={() => router.push(`/internship/${internship.id}`)}
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p>No internships posted yet.</p>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Applications Received</h3>
          <p>Feature coming soon...</p>
        </div>

        <button 
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
          onClick={() => router.push("/business-profile")}
        >
          Edit Company Profile
        </button>
      </main>
    </div>
  );
};

export default BusinessDashboard;
