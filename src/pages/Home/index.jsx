import React from "react";
import { Button, Divider, Typography, Box, TextField } from '@mui/material';
import { Link } from "react-router-dom";
import QuizList from '../../components/UserQuizList.jsx';
import { db } from '../../firebase-config';
import { collection, getDoc } from 'firebase/firestore';
// import useUserId from "./helpers/userIdMaker";

function HomePage() {

	const [quizId, setQuizId] = React.useState("");

	return (
		<>
			<Box
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    height: "40vh",
                }}

            >
				<Button
					component={Link}
					to={`/create-quiz`}
					variant="outlined"
					size="large"
				>
					Create Quiz
				</Button>
				<div>
					<TextField
					id="standard-basic"
					label="Quiz Id"
					value={quizId}
					variant="standard"
					onChange={(event) => {
						setQuizId(event.target.value);
					}}
					/>
					<Button
						component={Link}
						onClick={() => {
							setQuizId("");
							//check if correct quiz id
							
						}}
						variant="outlined"
						size="large"
						>
						Take Quiz
					</Button>
				</div>
			</Box>
            <Divider>
                <Typography>
                    Your Quizzes
                </Typography>  
            </Divider>          
			<QuizList />
		</>
	);
}

export default HomePage;