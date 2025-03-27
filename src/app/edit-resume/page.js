"use client";

import { useState } from "react";
import handler from "../api/save-resume";

const ResumeEntry = () => {
    const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "" });
    const [portfolioLink, setPortfolioLink] = useState("");
    const [education, setEducation] = useState("");
    const [skills, setSkills] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("../api/save-resume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contactInfo, portfolioLink, education, skills }),
            });

            const result = await response.json();
            setMessage(response.ok ? result.message : result.error);
        } catch (error) {
            setMessage("An error occurred while saving the resume.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <main className="flex-grow flex flex-col items-center justify-center p-6">
                <div className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-xl w-full bg-opacity-90">
                    <h1 className="text-3xl font-bold mb-6 text-center">Resume Entry</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-lg font-semibold">Name:</label>
                            <input
                                type="text"
                                value={contactInfo.name}
                                onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold">Email:</label>
                            <input
                                type="email"
                                value={contactInfo.email}
                                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold">Phone:</label>
                            <input
                                type="tel"
                                value={contactInfo.phone}
                                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold">Portfolio Link:</label>
                            <input
                                value={portfolioLink}
                                onChange={(e) => setPortfolioLink(e.target.value)}
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold">Education:</label>
                            <input
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold">Skills:</label>
                            <textarea
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                        >
                            Save Resume
                        </button>
                    </form>
                    {message && <p className="mt-4 text-center">{message}</p>}
                </div>
            </main>
        </div>
    );
};

export default ResumeEntry;
