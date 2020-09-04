const clock = document.querySelector('#clock');
const stopwatch = document.querySelector('#stopwatch');

//variable for clock
const secondHand = document.querySelector('#second-hand');
const minsHand = document.querySelector('#min-hand');
const hourHand = document.querySelector('#hour-hand');
const merdianValue = document.querySelector('#meridian-value');
const noneVal = document.querySelector('#none-val');
var clockInterval 
var flag = false

//variables for stopwatch
const hour = document.getElementById('hour');
const min = document.getElementById('min');
const sec = document.getElementById('sec');
const milliSecond = document.getElementById('milli-second');

const start = document.getElementById("start")
const stop = document.getElementById("stop")
const reset = document.getElementById("reset")

var timeElapsed  = 0
var timeStarted = 0
var splitCount = 0
var stopwatchInterval;

function LoadJS() {


// Here set Date is called after every 1 sec
clockInterval =  setInterval(setDate, 1000);
}

// Switch from Clock to StopWatch
function ChangeToStopWatch() {
	clock.style.display = 'flex';
	stopwatch.style.display ='none' ;
	document.title = "Clock"
	clearInterval(clockInterval)
}

// Switch from StopWatch to Clock
function ChangeToClock() {
	clock.style.display ='none' ;
	stopwatch.style.display ='flex' ;
	document.title = "StopWatch" 

	resetTimer()
	clockInterval =  setInterval(setDate, 1000);
}

//Date is returned here
function DateNew(pars) {
	var month = ''
	
	switch(pars.getMonth()) {
		case 0 : month = 'Jan'
			break
		case 1 : month = 'Feb'
			break
		case 2 : month = 'Mar'
			break
		case 3 : month = 'Apr'
			break
		case 4 : month = 'May'
			break
		case 5 : month = 'Jun'
			break
		case 6 : month = 'Jul'
			break
		case 7 : month = 'Aug'
			break
		case 8 : month = 'Sep'
			break
		case 9 : month = 'Oct'
			break
		case 10 : month = 'Nov'
			break
		case 11 : month = 'Dec'
			break
		default: month = ''
	}
	return makeTwoDigits(pars.getDay()) + ' ' + month + ' ' +pars.getFullYear()
}


// Switch from 24 hour fromat to 12 hour format and vice-versa
function switchFormat(event) {
	flag = event.target.value === "Switch to 24-hour format" ? true : false;
	event.target.value = flag ? "Switch to 12-hour format" : "Switch to 24-hour format";
	merdianValue.style.display = flag ?  "none" : "block";
	noneVal.style.display = flag ?  "none" : "block";
}


//function used to set Date 
function setDate() {
    const now = new Date();

	var seconds = now.getSeconds();
	secondHand.innerHTML = makeTwoDigits(seconds);
	
    var mins = now.getMinutes();
	minsHand.innerHTML = makeTwoDigits(mins);

	var hour = now.getHours();
	var isPM  = hour >= 12;

	if(flag && isPM) hour +=12;    
	hourHand.innerHTML = makeTwoDigits(hour);

	merdianValue.innerHTML = isPM  ? ' pm' : 'am';
	document.getElementById('date').innerHTML = DateNew(now)
}

// Start timer or continue from paused time
function startTimer() {
    timeStarted = new Date().getTime() - timeElapsed; 
	stopwatchInterval = setInterval(setTime, 10);
    reset.disabled = false;	
	startButtons();
}

// Disable start button, enable stop and split
function startButtons(){
	start.disabled = true;
	stop.disabled = false;
}


//Reset the timer to zero and clear splits
function resetTimer(){
	clearInterval(stopwatchInterval);
	timeStarted = 0;
	timeElapsed = 0;
    splitCount = 0;
    
    hour.innerHTML =  makeTwoDigits(0)
    min.innerHTML = makeTwoDigits(0)
    sec.innerHTML =  makeTwoDigits(0)
    milliSecond.innerHTML = makeTwoDigits(0)

	reset.disabled = true;	

	stopButtons()
}

//Freeze the timer
function stopTimer(){
	clearInterval(stopwatchInterval);
    stopButtons();
}

// Enable start button, disable stop and split
function stopButtons(){
	start.disabled = false;
	stop.disabled = true;
}

// Set the time in the timer div
function setTime() {
	timeElapsed = new Date().getTime() - timeStarted;
    var timming  = timeElapsed
    hour.innerHTML =  makeTwoDigits(Math.floor(timming/3600000))
    timming %= 3600000;
    min.innerHTML = makeTwoDigits( Math.floor(timming/60000))
    timming %= 60000;
    sec.innerHTML =  makeTwoDigits(Math.floor(timming/1000))
    timming %= 1000;
    milliSecond.innerHTML = makeTwoDigits( Math.floor(timming/10))
}

function makeTwoDigits(number) {
    // display double digits for numbers less than 10
    if (number < 10) {
      return "0" + number;
    }
	return number;
}