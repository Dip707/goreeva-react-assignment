import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import QuizIcon from "@mui/icons-material/Quiz";
import { db } from "../firebase-config.js";
import { collection, getDocs, doc, orderBy } from "firebase/firestore";
import { redirect } from "react-router-dom";
import QuizCard from "./QuizCard";
import useUserId from "../helpers/userIdMaker";

export default function QuizList() {
	const [userQuizzes, setUserQuizzes] = useState([]);

	const userId = useUserId();
	console.log(`users/${userId}/quizzes`);
	useEffect(() => {
		console.log(`users/${userId}/quizzes`);
		const fetchUserQuizzes = async () => {
			const data = await getDocs(
				collection(db, `users/${userId}/quizzes`, orderBy("lastUpdated"))
			);
			console.log(`users/${userId}/quizzes`);
			console.log(data.docs);
			setUserQuizzes(data.docs.map((doc) => doc));
		};
		fetchUserQuizzes();
	}, [userQuizzes]);

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: "100%",
				bgcolor: "background.paper",
			}}
		>
			<List>
				{userQuizzes.length ? (
					<div>
						{userQuizzes.map((item) => (
							<QuizCard data={item} />
						))}
					</div>
				) : (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "left",
							flexDirection: "column",
							width: "100%",
							height: "100%",
						}}
					>
						<Typography variant="h6" component="h2" color="grey">
							You have no quizzes yet!
						</Typography>
					</Box>
				)}
			</List>
		</Box>
	);
}
