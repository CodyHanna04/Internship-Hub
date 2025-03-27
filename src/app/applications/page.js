"use client";

import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { app } from "/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import Header from '../components/Header';
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const auth = getAuth();
const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Session persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchApplications = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) console.log("No User Logged In");

      const applicationsCollection = collection(db, "applications");
      const q = query(applicationsCollection, where("userId", "==", userId));
      const applicationSnapshot = await getDocs(q);
      const applicationList = applicationSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const internshipPromises = applicationList.map(async (application) => {
        const internshipDoc = await getDoc(doc(db, "internships", application.internshipId));
        if (internshipDoc.exists()) {
          return { ...application, internship: internshipDoc.data() };
        }
        return { ...application, internship: { title: "Unknown", company: "Unknown", location: "Unknown", description: "No description available." } };
      });

      const applicationsWithDetails = await Promise.all(internshipPromises);
      setApplications(applicationsWithDetails);
    };
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <Header />

      <main className="flex-grow p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Your Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((application, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold">{application.internship?.title || "Loading..."}</h3>
              <p>Status: {application.status}</p>
              <p>Company: {application.internship?.company || "Loading..."}</p>
              <p>Location: {application.internship?.location || "Loading..."}</p>
              <p>Description: {application.internship?.description || "Loading..."}</p>
              <button
                onClick={() => router.push(`/application/${application.id}`)}
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

export default Applications;
