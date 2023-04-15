import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	Box,
	Button,
	TextField,
	Typography,
	IconButton,
	Grid,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import TimerIcon from "@mui/icons-material/Timer";

import { db } from "../../firebase-config";
import {
	doc,
	getDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from "firebase/firestore";

function EditQuiz() {
	const { quizId } = useParams();
	const [quiz, setQuiz] = useState(null);
	const [timeLimit, setTimeLimit] = useState(0);

	useEffect(() => {
		const getQuiz = async () => {
			const storedQuiz = localStorage.getItem(`quiz-${quizId}`);
			if (storedQuiz) {
				const parsedQuiz = JSON.parse(storedQuiz);
				setQuiz(parsedQuiz);
				setTimeLimit(parsedQuiz.timeLimit);
			} else {
				const quizDoc = await getDoc(doc(db, "quizzes", quizId));
				if (quizDoc.exists()) {
					setQuiz(quizDoc.data());
					setTimeLimit(quizDoc.data().timeLimit);
				} else {
					console.log("No such document!");
				}
			}
		};
		if (!quiz) {
			getQuiz();
		}
	}, [quizId, quiz]);

	const handleAddQuestion = () => {
		const newQuestion = { prompt: "", options: [] };
		setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
	};

	const handleDeleteQuestion = (index) => {
		setQuiz({
			...quiz,
			questions: quiz.questions.filter((_, i) => i !== index),
		});
	};

	const handleSaveQuiz = async () => {
		localStorage.removeItem(`quiz-${quizId}`);
		await updateDoc(doc(db, "quizzes", quizId), {
			name: quiz.name,
			description: quiz.description,
			timeLimit: timeLimit,
			questions: quiz.questions,
		});
	};

	useEffect(() => {
		if (quiz) {
			localStorage.setItem(`quiz-${quizId}`, JSON.stringify(quiz));
		}
	}, [quiz]);

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: "100%",
				bgcolor: "background.paper",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Typography variant="h4" component="h1">
				Edit Quiz
			</Typography>
			{quiz && (
				<>
					<TextField
						label="Quiz Name"
						value={quiz.name}
						onChange={(e) =>
							setQuiz({ ...quiz, name: e.target.value })
						}
						fullWidth
					/>
					<TextField
						label="Quiz Description"
						value={quiz.description}
						onChange={(e) =>
							setQuiz({ ...quiz, description: e.target.value })
						}
						fullWidth
					/>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<TimerIcon />
						<TextField
							label="Time Limit (minutes)"
							value={timeLimit}
							onChange={(e) => setTimeLimit(e.target.value)}
							type="number"
							InputProps={{ inputProps: { min: 0 } }}
						/>
					</Box>
					<Button
						variant="contained"
						color="primary"
						startIcon={<SaveIcon />}
						onClick={handleSaveQuiz}
						sx={{ my: 2 }}
					>
						Save Quiz
					</Button>
					<Typography variant="h5" component="h2">
						Questions
					</Typography>
					<Grid container spacing={2}>
						{quiz.questions.map((question, index) => (
							<Grid item xs={12} sm={6} key={index}>
								<Box
									sx={{
										border: "1px solid #ccc",
										borderRadius: "4px",
										p: 2,
										bgcolor: "background.paper",
									}}
								>
									<TextField
										label={`Question ${index + 1}`}
										value={question.prompt}
										onChange={(e) => {
											const updatedQuestions = [
												...quiz.questions,
											];
											updatedQuestions[index].prompt =
												e.target.value;
											setQuiz({
												...quiz,
												questions: updatedQuestions,
											});
										}}
										fullWidth
									/>
									<IconButton
										color="error"
										onClick={() =>
											handleDeleteQuestion(index)
										}
										sx={{ float: "right" }}
									>
										<DeleteIcon />
									</IconButton>
								</Box>
							</Grid>
						))}
					</Grid>
					<Button
						variant="outlined"
						color="primary"
						startIcon={<AddCircleOutlineIcon />}
						onClick={handleAddQuestion}
						sx={{ my: 2 }}
					>
						Add Question
					</Button>
				</>
			)}
		</Box>
	);
}

export default EditQuiz;
