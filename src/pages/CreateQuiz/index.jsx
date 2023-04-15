import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

import { db } from "../../firebase-config";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import getUserId from "../../helpers/userIdMaker";

const generateQuizId = () => {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
	let result = "";
	for (let i = 0; i < 6; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}
	console.log(result);
	return result;
};

function CreateQuiz() {
	const [quizId, setQuizId] = useState(null);

	useEffect(() => {
		const createQuiz = async () => {
			const quizId = generateQuizId();
			const userId = getUserId();
			try {
				await setDoc(doc(db, "quizzes", quizId), {
					creatorId: userId,
					questions: [],
					lastUpdated: new Date(),
				});
			} catch (e) {
				console.error("Error adding document: ", e);
			}

			try {
				await addDoc(
					collection(db, "users", userId, "quizzes", quizId),
					{
						quizId: quizId,
					}
				);
			} catch (e) {
				console.error("Error adding document: ", e);
			}

			return quizId;
		};
		if (!quizId) {
			createQuiz().then((id) => {
				setQuizId(id);
			});
		}
	}, []);

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: 360,
				bgcolor: "background.paper",
			}}
		>
			{quizId ? (
				<Navigate to={`/edit-quiz/${quizId}`} />
			) : (
				<p>Loading...</p>
			)}
		</Box>
	);
}

export default CreateQuiz;
