let workout = data.workout;
let id = data.userID;
let timer = data.timer;
const workoutList = document.querySelector('.workoutList');
const clock = document.querySelector('.clock');
const saveForm = document.querySelector('.saveForm');
const workoutIDSend = document.querySelector('#workoutIDSend');
const workoutSend = document.querySelector('#workoutSend');
const workoutTimerSend = document.querySelector('#workoutTimerSend');

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