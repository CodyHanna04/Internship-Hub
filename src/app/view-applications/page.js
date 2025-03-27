"use client";

import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "/lib/firebaseConfig";
import Header from '../components/BusinessHeader';

const db = getFirestore(app);

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const applicationsCollection = collection(db, "applications");
        const q = query(applicationsCollection, where("companyId", "==", "yourCompanyId"));
        const applicationSnapshot = await getDocs(q);
        const applicationList = applicationSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setApplications(applicationList);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
      setLoading(false);
    };
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <Header />
      <main className="flex-grow p-6">
        <h2 className="text-3xl font-bold text-center mb-6">View Applications</h2>
        {loading ? (
          <p className="text-center">Loading applications...</p>
        ) : applications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app) => (
              <div key={app.id} className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">{app.position}</h3>
                <p><strong>Applicant:</strong> {app.applicantName}</p>
                <p><strong>Status:</strong> {app.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No applications found.</p>
        )}
      </main>
    </div>
  );
};

export default ViewApplications;