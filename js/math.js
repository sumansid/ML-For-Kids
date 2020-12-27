var answer;
var score=0;
function nextQuestion() {
	/* Generate new questions*/
	const num1 = Math.floor(Math.random() * 5);
	document.getElementById('n1').innerHTML = num1;
	const num2 = Math.floor(Math.random() * 6);
	document.getElementById('n2').innerHTML = num2;
	answer = num2 + num1;
}

function checkAnswer(){
	const prediction = predictImage();
	if (prediction == answer ) {
		score ++;
		document.getElementById('user_score').innerHTML = score ;

	}else{
		score --;
		document.getElementById('user_score').innerHTML = score;
	}
}
