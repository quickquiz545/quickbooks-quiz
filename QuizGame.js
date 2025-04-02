import { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export default function QuizGame() {
  const [user, setUser] = useState(null);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestion();
    const unsubscribe = onSnapshot(query(collection(db, "leaderboard"), orderBy("score", "desc")), (snapshot) => {
      console.log("Leaderboard updated");
    });
    return () => unsubscribe();
  }, []);

  const fetchQuestion = async () => {
    const response = await fetch("https://api.example.com/generate-question");
    const data = await response.json();
    setQuestion(data.text);
    setOptions(data.options);
    setCorrectAnswer(data.answer);
  };

  return (
    <div>
      {!user ? (
        <button onClick={() => signInWithPopup(auth, provider).then(result => setUser(result.user))}>Sign in with Google</button>
      ) : (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={() => signOut(auth).then(() => setUser(null))}>Sign Out</button>
        </div>
      )}
      <h2>{question}</h2>
      {options.map((option, index) => (
        <button key={index} onClick={() => console.log(option === correctAnswer ? "Correct" : "Wrong")}>
          {option}
        </button>
      ))}
      <p>Score: {score}</p>
    </div>
  );
}