import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from '../../firebase-config';
import { collection, getDocs } from "firebase/firestore";

function TakeQuiz(userId) {
    
    const { quizId } = useParams();
	return (
		<div>
			<h1>Take Quiz</h1>
			<h2>Quiz Id: {quizId}</h2>
		</div>
	);
}

export default TakeQuiz;
