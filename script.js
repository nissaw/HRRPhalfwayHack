// first is that the div appears (with ready? button) or question appears
// timer starts
// mouse enter div
// log coordinates of mouse position - distance traveled
//log radio button clicks
// stop timer when submit button is hit // check that one radio button is selected
// div changes to button ready for next question

// Questions are stored and Answers recorded here
var myersBriggs = [];

myersBriggs[0] = {
	questionNumber: 1,
	text: "You are almost never late for your appointments.",
	answer: undefined,
	timeElapsed: undefined,
	distance: undefined,
	answerCode: undefined,
	completed: false
};

myersBriggs[1] = {
	questionNumber: 2,
	text: "You enjoy having a wide circle of acquaintances.",
	answer: undefined,
	timeElapsed: undefined,
	distance: undefined,
	answerCode: undefined,
	completed: false
};

myersBriggs[2] = {
	questionNumber: 3,
	text: "Strict observance of the established rules is likely to prevent attaining a good outcome.",
	answer: undefined,
	timeElapsed: undefined,
	distance: undefined,
	answerCode: undefined,
	completed: false
};

// the text of all questions is appended to the DOM (in a hidden div) and a property 'key' is added with a value = to (question # - 1)
// for (var i = 0; i < myersBriggs.length; i++) {
// 	$('#question_bank').append('<p>'+ myersBriggs[i]['text'] + '</p>').data('key', i);
// }

// global variable
var answeredQuestions = [],
	notAnswered = [],
	current_q_num,
	startTime,
	endTime,
	timeElapsed;


// function will filter the array into two new arrays: notAnswered and answeredQuestions.
// commented out code will remove from the DOM a question that has been answered / use filter

var not_answered = function() {
	notAnswered = [];
	for (var i = 0; i < myersBriggs.length; i++) {
		if (myersBriggs[i]['completed']) {
			answeredQuestions.push(myersBriggs[i]);
			//$('#question_bank').remove('<p>' + myersBriggs[i] + '</p>')
		} else {
			notAnswered.push(myersBriggs[i]);
		}
	}
	if (notAnswered.length == 0) {
		$('.inprogress').hide();
		$('#test_completed').text('You have completed this Test')
	}
	return notAnswered;
}

// generate a random question from the not answered array
var random =function(){
	var n = Math.floor(Math.random() * (notAnswered.length))
	current_q_num = notAnswered[n]['questionNumber'];
	$('#current').text(notAnswered[n]['text'])
}

// Event Handlers

// Start Button is Clicked - First RANDOM UNANSWERED Question Appears

$('#start').click(function(e) {
	startTime = e.timeStamp;
	e.preventDefault();
	not_answered();
	random();
	$('input[name=agreedisagree]').removeAttr('checked');
	$('#start').text('Next Question')
	$('.inprogress').show();
})

// The CODE WORKS UP TO THIS POINT! :)

$('#submit').click(function(e) {
	e.preventDefault();
	// if ($('input[name='agreedisagree']'.is(':checked'))) {//if ($('.agreedisagree')// { confirm radio button has been selected}
	// 	$('#answer_req').text('');
		endTime = e.timeStamp;
		elapsed();
		recorder();
		return endTime;
	// }
	// else {
	// 	$('#answer_req').text('Please Provide an Answer')
		//myersBriggs[$(this).data('key')]['timeElapsed'] = timeElapsed;
	//}
})
// $('input[name=agreedisagree]:checked').val(); // which radio button is selected
// $('input[name=agreedisagree]').removeAttr('checked'); // clears check between
// here variables are recorded

function recorder() {
	for (var i = 0; i < myersBriggs.length; i++) {
		if (current_q_num == myersBriggs[i]['questionNumber']){
			myersBriggs[i]['timeElapsed'] = timeElapsed;
			myersBriggs[i]['completed'] = true;
			myersBriggs[i]['answer'] = $('input[name=agreedisagree]:checked').val();
		}
	}
}

function elapsed() {
	timeElapsed = endTime - startTime;
	return timeElapsed;
}



