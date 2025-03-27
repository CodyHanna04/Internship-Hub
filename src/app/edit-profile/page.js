"use client";

import { useEffect, useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app, storage } from "/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDoc } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const EditProfile = () => {
  const [name, setName] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [major, setMajor] = useState("");
  const [resume, setResume] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name);
          setGraduationYear(data.graduationYear);
          setMajor(data.major);
          setResume(data.resume);  // Presuming the user's resume is stored in Firestore as a URL
        }
      } else {
        router.push("/login");
      }
    };
    fetchUserData();
  }, [router]);

  const handleProfileUpdate = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        name,
        graduationYear,
        major
      });

      if (resume) {
        // Handle uploading the resume to Firebase Storage
        const storageRef = ref(storage, `resumes/${resume.name}`);
        const uploadTask = uploadBytesResumable(storageRef, resume);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.error("Error uploading file:", error);
          },
          async () => {
            const resumeURL = await getDownloadURL(uploadTask.snapshot.ref());
            // Update the user's resume URL in Firestore
            await updateDoc(userRef, { resume: resumeURL });
          }
        );
      }

      router.push("/profile"); // Redirect to the profile page after update
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <header className="w-full bg-gray-900 bg-opacity-80 py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
      </header>

      <main className="flex-grow p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Edit Your Information</h2>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-lg font-bold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 p-2 w-full rounded-lg bg-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold">Graduation Year</label>
            <input
              type="text"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="mt-2 p-2 w-full rounded-lg bg-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold">Major</label>
            <input
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="mt-2 p-2 w-full rounded-lg bg-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold">Upload Resume</label>
            <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              className="mt-2 p-2 w-full rounded-lg bg-gray-800 text-white"
            />
          </div>

          <button
            onClick={handleProfileUpdate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
