"use client";

import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { app } from "/lib/firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);

const AuthPage = ({ isSignUp }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    graduationYear: "",
    major: "",
    university: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match!");
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: formData.name,
          email: formData.email,
          graduationYear: formData.graduationYear,
          major: formData.major,
          university: formData.university,
          createdAt: new Date(),
        });
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-gray-900 p-8 shadow-xl rounded-2xl w-full max-w-md border border-gray-700 backdrop-blur-md bg-opacity-80">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="input-field text-gray-900 bg-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500" />
          )}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="input-field text-gray-900 bg-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="input-field text-gray-900 bg-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500" />
          {isSignUp && (
            <>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="input-field text-gray-900 bg-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              <input type="text" name="university" placeholder="University" value={formData.university} onChange={handleChange} className="input-field text-gray-900 bg-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              <input type="text" name="major" placeholder="Major" value={formData.major} onChange={handleChange} className="input-field text-gray-900 bg-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              <input type="number" name="graduationYear" placeholder="Graduation Year" value={formData.graduationYear} onChange={handleChange} className="input-field text-gray-900 bg-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500" />
            </>
          )}
          <button type="submit" className="btn-primary bg-pink-600 hover:bg-pink-700 text-white rounded-lg p-3 w-full text-lg font-semibold">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
