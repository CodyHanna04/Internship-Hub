"use client";

import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { app } from "/lib/firebaseConfig";
import Header from "../../components/Header";
import { useParams } from "next/navigation";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth();

async function getInternship(id) {
  const docRef = doc(db, "internships", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

async function getUserId() {
    try {
      const userEmail = auth.currentUser?.email;
      const q = query(collection(db, "users"), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        return userDoc.id; // Return the document ID as the user ID
      } else {
        console.warn("User not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
    }
  }

  async function handleApply(params) {
    try {
      const userId = await getUserId();
      if (!userId) {
        console.error("User not authenticated");
        return;
      }
  
      const applicationData = {
        internshipId: params.id,
        userId: userId,
        status: "Pending",
        timestamp: new Date().toISOString(),
        viewed: false,
      };
  
      await addDoc(collection(db, "applications"), applicationData);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Application not submitted. Make sure you're logged in.")
    }
  }
  
  
export default function InternshipDetails() {
  const params = useParams();  // Get the params object
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Params:', params);  // Debugging: Check the params value

    if (params?.id) {  // Check if id exists in params
      const fetchInternship = async () => {
        try {
          const data = await getInternship(params.id);  // Fetch internship data
          setInternship(data);  // Set the fetched data to state
        } catch (error) {
          console.error("Error fetching internship:", error);
        } finally {
          setLoading(false);  // Set loading state to false
        }
      };

      fetchInternship();
    } else {
      setLoading(false);  // Stop loading if no id found
    }
  }, [params]);  // Only re-run when params change

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <h2 className="text-3xl font-bold">Loading...</h2>
        </div>
      </div>
    );
  }

  // Show "not found" if no internship data
  if (!internship) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <h2 className="text-3xl font-bold">Internship not found</h2>
        </div>
      </div>
    );
  }

  // Show the internship details
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <Header />
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-xl">
          <h2 className="text-3xl font-bold mb-4">{internship.title}</h2>
          <p className="mb-2"><strong>Company:</strong> {internship.company}</p>
          <p className="mb-2"><strong>Location:</strong> {internship.location}</p>
          <p className="mb-2"><strong>Description:</strong> {internship.description}</p>
          <p className="mb-2"><strong>Requirements:</strong> {internship.requirements}</p>
          <button 
            onClick={() => handleApply(params)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
  Apply Now
</button>

        </div>
      </div>
    </div>
  );
}
