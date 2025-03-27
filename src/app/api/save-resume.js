import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "/lib/firebaseConfig";

const db = getFirestore(app);

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { contactInfo, experience, education, skills } = req.body;
            await setDoc(doc(db, "resumes", contactInfo.email), {
                contactInfo,
                experience,
                education,
                skills,
            });
            res.status(200).json({ message: "Resume saved successfully!" });
        } catch (error) {
            res.status(500).json({ error: "Failed to save resume." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed." });
    }
}
