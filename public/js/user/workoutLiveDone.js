let workout = data.workout;
let id = data.userID;
let timer = data.timer;
const bgDiv = document.querySelector('.bgDiv');
const workoutList = document.querySelector('.workoutList');
const clock = document.querySelector('.clock');
const saveForm = document.querySelector('.saveForm');
const workoutIDSend = document.querySelector('#workoutIDSend');
const workoutSend = document.querySelector('#workoutSend');
const workoutTimerSend = document.querySelector('#workoutTimerSend');

const closeBtn = document.querySelector('.closeBtn');

let first = true;

displayTime();

workout.forEach(element => {
    let exerciseContainer = document.createElement('div');
    let nameContainer = document.createElement('div');
    exerciseContainer.classList.add('exerciseContainer');
    nameContainer.classList.add("name");
    nameContainer.textContent = element.exerciseName;

    if(!first){
        let breakDiv = document.createElement('div');
        let breakDiv2 = document.createElement('div');
        breakDiv.classList.add('break');
        breakDiv2.classList.add('break2');
        breakDiv.appendChild(breakDiv2);
        exerciseContainer.appendChild(breakDiv);
    } else {
        let breakDiv = document.createElement('div');
        breakDiv.classList.add('break');
        exerciseContainer.appendChild(breakDiv);
        first = false;
    }

    exerciseContainer.appendChild(nameContainer);
    element.sets.forEach(set => {
        const eachSet = document.createElement('div');
        eachSet.classList.add('exr');
        eachSet.textContent = `${set.reps} x ${set.weight}kg`;
        exerciseContainer.appendChild(eachSet);
    });
    workoutList.appendChild(exerciseContainer);
});

workoutIDSend.value = JSON.stringify(id);
workoutSend.value = JSON.stringify(workout);
workoutTimerSend.value = JSON.stringify(timer);

closeBtn.addEventListener('click', () => {
    const windowDiv = document.createElement('div');
    const alertInfo1 = document.createElement('div');
    const alertInfo2 = document.createElement('div');
    const closeButtons = document.createElement('div');
    const yesButton = document.createElement('div');
    const noButton = document.createElement('div');

    windowDiv.classList.add('closingWindow');
    alertInfo1.classList.add('alertInfo');
    alertInfo2.classList.add('alertInfo');
    closeButtons.classList.add('closeButtons');
    yesButton.classList.add('yesButton');
    noButton.classList.add('noButton');

    alertInfo1.textContent = 'Are you sure you want to close?';
    alertInfo2.textContent = 'Workout will not be saved';
    yesButton.textContent = 'Yes';
    noButton.textContent = 'No';

    closeButtons.appendChild(yesButton);
    closeButtons.appendChild(noButton);
    windowDiv.appendChild(alertInfo1);
    windowDiv.appendChild(alertInfo2);
    windowDiv.appendChild(closeButtons);
    bgDiv.appendChild(windowDiv);

    noButton.addEventListener('click', () => {
        windowDiv.remove();
    });

    yesButton.addEventListener('click', () => {
        window.location.href = '/user/' + id;
    });
});

function displayTime(){
    let timeShow;
    let hrs = timer.hours;
    let mts = timer.minutes;
    let scs = timer.seconds;

    if (hrs.toString().length < 2){
        hrs = '0' + hrs;
    }

    if (mts.toString().length < 2){
        mts = '0' + mts;
    }

    if (scs.toString().length < 2){
        scs = '0' + scs;
    }

    if(timer.hours > 0){
        timeShow = `${hrs}:${mts}:${scs}`;
    } else {
        timeShow = `${mts}:${scs}`;
    }
    clock.textContent = timeShow;
}