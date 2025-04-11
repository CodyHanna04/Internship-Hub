"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { app } from "/lib/firebaseConfig";  // Adjust the path to your firebaseConfig
import Header from '../components/Header';

const auth = getAuth(app);
const db = getFirestore(app);

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [resume, setResume] = useState(null); // For displaying user's resume if available
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const fetchData = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setResume(data.resume);
        }
      };
  
      fetchData();
    }
  }, []);  

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handleEditProfile = () => {
    router.push("/edit-profile");  // Redirect to an edit profile page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-md w-full text-center bg-opacity-90">
          <h2 className="text-3xl font-bold mb-4">Profile - {userData?.name || "User"}</h2>
        </div>
        <div className="mt-8 bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h3 className="text-xl font-bold mb-4">User Information</h3>
          <p><strong>Name:</strong> {userData?.name}</p>
          <p><strong>Email:</strong> {userData?.email}</p>
          
          <h3 className="text-xl font-bold mt-6 mb-4">Resume</h3>
          {resume ? (
            <a href={resume} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Resume</a>
          ) : (
            <p>No resume uploaded</p>
          )}
        </div>

        <div className="mt-8">
          <button onClick={handleEditProfile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            Edit Profile
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
