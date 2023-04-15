import { db } from '../firebase-config.js';
import { collection, getDocs } from "firebase/firestore";

export default function getQuizzes() {
    const data = getDocs(collection(db, "quizzes"));
    return data;
}