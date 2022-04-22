const exerciseAddBtn = document.querySelector('#exerciseAddBtn');
const exerciseNameInput = document.querySelector('#exerciseName');
const exerciseNameDiv = document.querySelector('#exerciseNameDiv');
const repsXWeight = document.querySelector('.repsXWeight');
const rWAddBtn = document.querySelector('#rWAddBtn');
const exerciseReps = document.querySelector('#exerciseReps');
const exerciseWeight = document.querySelector('#exerciseWeight');
const setList = document.querySelector('.setList');
const endExercise = document.querySelector('.endExercise');
const workoutList = document.querySelector('.workoutList');
const clock = document.querySelector('.clock');
const startWorkout = document.querySelector('.startWorkout');
const workoutLive = document.querySelector('.workoutLive');

const endWorkout = document.querySelector('.endWorkout');
const workoutInputSend = document.querySelector('#workoutInputSend');
const finishForm = document.querySelector('.finishForm');




startWorkout.addEventListener('click', () => {
    startWorkout.style.display = 'none';
    workoutLive.style.display = 'flex';
    startLiveWorkout();
});





function startLiveWorkout(){

let currentExercise;
let workout = [];

let seconds = 0;
let minutes = 0;
let hours = 0;

setInterval(() => {
    seconds++;
    if (seconds == 60){
        seconds = 0;
        minutes++;
    }
    if (minutes == 60){
        minutes = 0;
        hours++;
    }
    displayTime();
}, 1000);

class Set{
    constructor({
        reps,
        weight
    }){
        this.reps = reps;
        this.weight = weight;
    }
}

class Exercise{
    constructor({
        exerciseName,
        sets = []
    }){
        this.exerciseName = exerciseName;
        this.sets = sets;
    }

    addSet(set){
        this.sets.push(set);
    }
}

exerciseAddBtn.addEventListener('click', () => {
    if(exerciseNameInput.value != null){
        currentExercise = new Exercise({
            exerciseName: exerciseNameInput.value
        });
        exerciseAddBtn.style.display = 'none';
        exerciseNameInput.style.display = 'none';
        exerciseNameInput.value = null;
        exerciseNameDiv.style.display = 'flex';
        repsXWeight.style.display = 'flex';
        endExercise.style.display = 'block';
        exerciseNameDiv.textContent = currentExercise.exerciseName;
    }
});

rWAddBtn.addEventListener('click', () => {
    if(exerciseWeight.value > 0 && exerciseReps.value > 0){
        currentExercise.sets.push({
            reps: exerciseReps.value,
            weight: exerciseWeight.value,
        });
        const newLi = document.createElement('li');
        newLi.textContent = `set ${currentExercise.sets.length} : ${exerciseReps.value} reps x ${exerciseWeight.value}kg`;
        setList.appendChild(newLi);
        exerciseWeight.value = null;
        exerciseReps.value = null;
    }
    console.log(currentExercise);
});

endExercise.addEventListener('click', () => {
    exerciseAddBtn.style.display = 'flex';
    exerciseNameInput.style.display = 'flex';
    exerciseNameInput.value = null;
    exerciseNameDiv.style.display = 'none';
    repsXWeight.style.display = 'none';
    endExercise.style.display = 'none';
    workout.push(currentExercise);
    displayWorkout();
    currentExercise = undefined;
    setList.textContent = "";
    
    let timer = {hours, minutes, seconds};
    let data = {userID: id, workout, timer};
    workoutInputSend.value = JSON.stringify(data);
    console.log(workoutInputSend.value); 
});

function displayWorkout(){
    let exerciseContainer = document.createElement('div');
    let nameContainer = document.createElement('div');
    exerciseContainer.classList.add('exerciseContainer');
    nameContainer.classList.add("name");
    nameContainer.textContent = currentExercise.exerciseName;

    if(workout.length > 1){
    let breakDiv = document.createElement('div');
    let breakDiv2 = document.createElement('div');
    breakDiv.classList.add('break');
    breakDiv2.classList.add('break2');
    breakDiv.appendChild(breakDiv2);
    exerciseContainer.appendChild(breakDiv);
    }

    exerciseContainer.appendChild(nameContainer);
    currentExercise.sets.forEach(set => {
        const eachSet = document.createElement('div');
        eachSet.classList.add('exr');
        eachSet.textContent = `${set.reps} x ${set.weight}kg`;
        exerciseContainer.appendChild(eachSet);
    });
    workoutList.appendChild(exerciseContainer);
}

function displayTime(){
    let timeShow;
    let hrs = hours;
    let mts = minutes;
    let scs = seconds;

    if (hrs.toString().length < 2){
        hrs = '0' + hrs;
    }

    if (mts.toString().length < 2){
        mts = '0' + mts;
    }

    if (scs.toString().length < 2){
        scs = '0' + scs;
    }

    if(hours > 0){
        timeShow = `${hrs}:${mts}:${scs}`;
    } else {
        timeShow = `${mts}:${scs}`;
    }
    clock.textContent = timeShow;
}

}