"use client";

import { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "/lib/firebaseConfig";
import Header from "../components/Header";

const db = getFirestore(app);
const auth = getAuth(app);

const PostInternship = () => {
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    company: "",
    contactEmail: "",
    description: "",
    location: "",
    requirements: "",
    title: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("You must be logged in to post an internship.");
      return;
    }

    try {
      // Step 1: Add the internship without an ID field
      const docRef = await addDoc(collection(db, "internships"), {
        ...formData,
        userId, // Store the logged-in user's ID
      });

      // Step 2: Update the same document to include its own ID
      await updateDoc(doc(db, "internships", docRef.id), {
        id: docRef.id,
      });

      alert("Internship posted successfully!");
      setFormData({
        company: "",
        contactEmail: "",
        description: "",
        location: "",
        requirements: "",
        title: "",
      });

      console.log("Document ID saved:", docRef.id); // Debugging

    } catch (error) {
      console.error("Error posting internship:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-lg bg-opacity-90">
          <h2 className="text-3xl font-bold text-center mb-6">Post an Internship</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["company", "contactEmail", "title", "location", "description", "requirements"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 bg-transparent border-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
            ))}
            <button
              type="submit"
              className="block mx-auto mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-white"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostInternship;
