import { useState } from "react";

function QuestionTile(data) {
    const [prompt, setPrompt] = useState(data.prompt);
    const [options, setOptions] = useState(data.options);
	return (
		<div>
			<div>
				<h1>{data.prompt}</h1>
			</div>
			
		</div>
	);
}

export default QuestionTile;
