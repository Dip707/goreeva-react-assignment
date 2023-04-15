import {
    db
} from '../firebase-config';
import {
    collection,
    addDoc
} from 'firebase/firestore';

export default async function getUserId(){
    let userId = localStorage.getItem('userId');
    if(!userId){
        try {
            const docRef = await addDoc(collection(db, 'users'), {
                name: 'Anonymous',
                quizzes: ["sampleQuizId"]
            });
            userId = localStorage.setItem('userId', docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return userId;
};