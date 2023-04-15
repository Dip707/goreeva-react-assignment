import React from "react";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
	Outlet,
} from "react-router-dom";
import HomePage from "./pages/Home";
import EditQuizPage from "./pages/EditQuiz";
import TakeQuizPage from "./pages/TakeQuiz";
import CreateQuizPage from "./pages/CreateQuiz";
import getUserId from "./helpers/userIdMaker";

function App() {
	const [userId, setUserId] = React.useState(null);

	const router = createBrowserRouter([
		{
			path: "/home",
			element: <HomePage />,
		},
		{
			path: "/edit-quiz/:quizId",
			element: <EditQuizPage />,
		},
		{
			path: "/take-quiz/:quizId",
			element: <TakeQuizPage />,
		},
		{
			path: "/create-quiz",
			element: <CreateQuizPage />,
		},
		{
			path: "*",
			element: <Navigate to="/home" replace />,
		},
	]);

	return (
		<>
			{userId ? (
                <div> 
                    {setUserId(getUserId())}
                    Loading...
                </div>
			) : (
				<RouterProvider router={router} />
			)}
		</>
	);
}

export default App;
