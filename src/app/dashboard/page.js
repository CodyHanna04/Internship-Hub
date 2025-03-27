"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { app } from "/lib/firebaseConfig";
import { Bell } from "lucide-react";
import Header from '../components/Header';

const auth = getAuth(app);
const db = getFirestore(app);

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [analytics, setAnalytics] = useState({ applications: 0, rejections: 0, views: 0, offers: 0 });
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

        const applicationsCollection = collection(db, "applications");
        const q = query(applicationsCollection, where("userId", "==", user.uid));
        const applicationSnapshot = await getDocs(q);

        let applicationCount = 0;
        let rejectionCount = 0;
        let offerCount = 0;

        applicationSnapshot.forEach((doc) => {
          applicationCount++;
          const applicationData = doc.data();
          if (applicationData.status === "rejected") rejectionCount++;
          if (applicationData.status === "offer") offerCount++;
        });

        setAnalytics({
          applications: applicationCount,
          rejections: rejectionCount,
          views: 0,  // Placeholder for now
          offers: offerCount
        });
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-md w-full text-center bg-opacity-90">
          <h2 className="text-3xl font-bold mb-4">Welcome {userData?.name || "User"}!</h2>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Application Analytics</h3>
            <p><strong>Total Applications:</strong> {analytics.applications}</p>
            <p><strong>Rejections:</strong> {analytics.rejections}</p>
            <p><strong>Views:</strong> {analytics.views}</p>
            <p><strong>Offers Received:</strong> {analytics.offers}</p>
          </div>
          <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Internship Recommendations</h3>
            {recommendations.length > 0 ? (
              recommendations.map((rec, index) => <p key={index} className="border-b py-2">{rec}</p>))
              : <p className="text-center">No recommendations available</p>}
          </div>
        </div>
        <div className="mt-8 bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h3 className="text-xl font-bold mb-4">Messages</h3>
          {messages.length > 0 ? (
            messages.map((msg, index) => <p key={index} className="border-b py-2">{msg}</p>))
            : <p className="text-center">No new messages</p>}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
