let secs = 0;
let mins = 0;
let paused = true;
let session = true;
let sessionTime = 25;
let breakTime = 5;
let timerId;
let audio = $('#beep')[0];

$(document).ready(function() {
	setBreak(breakTime);
	setSession(sessionTime);
	setTimer(sessionTime, 'Session');
});

function reset() {
	pause();
	secs = 0;
	mins = 0;
	sessionTime = 25;
	breakTime = 5;
	setSession(sessionTime);
	setBreak(breakTime);
	setTimer(sessionTime, 'Session');
	session = true;
	paused = true;
	audio.pause();
	audio.currentTime = 0;
	$('#session button, #break button').attr('disabled', false);
}

function decrementBreak() {
    if (breakTime > 1) {
    	breakTime--;
    }   
    setBreak(breakTime);
}

function incrementBreak() {
    if (breakTime < 60) {
    	breakTime++;
    }
    setBreak(breakTime);
}

function sessionPlus() {
	if (sessionTime < 60) {
		sessionTime++;
	}
	setSession(sessionTime);
	setTimer(sessionTime);
}

function sessionMinus() {
	if (sessionTime > 1) {
		sessionTime--;
	}
	setSession(sessionTime);
	setTimer(sessionTime);
}

function setSession(time) {
	$('#session-length').text(time);
	sessionTime = time;
}

function setBreak(time) {
	$('#break-length').text(time);
	breakTime = time;
}

function setTimer(time, label) {
	$('#timer-label').text(label);
	time = time < 10 ? '0' + time : '' + time;
	$('#time-left').text(time + ':0' + secs); 
	mins = time;
}

function pause() {
	window.clearInterval(timerId);
	paused = true;
}

function toggle() {

	$('#session button, #break button').prop('disabled', true);

	if (!paused) {
		pause();
		return;
	}

	timerId = window.setInterval(counter, 1000);
}

function counter() {
	if (mins === 0 && secs === 0) {
		pause();

		if (session) {
			session = false;
			setTimer(breakTime, 'Break');
		} else {
			session = true;
			setTimer(sessionTime, 'Session');
		}
		audio.play();
		toggle();
	} else {
		secs = secs - 1;

		if (secs === -1) {
			secs = 59;
			mins = mins - 1;
		}

		let m = mins < 10 ? '0' : '';
		let s = secs < 10 ? '0' : '';

		$('#time-left').text(m + mins + ':' + s + secs);

		paused = false;
	}
}



