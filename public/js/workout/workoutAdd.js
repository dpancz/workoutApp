const workoutList = document.querySelector('.workoutList');
const addFirst = document.querySelector('.addFirst');
const addingNew = document.querySelector('.addingNew');
const setsBtn = document.querySelector('.setsBtn');
const newSetsDiv = document.querySelector('.newSetsDiv');
const addingDoneBtn = document.querySelector('.addingDoneBtn');
const exerciseName = document.querySelector('#exerciseName');

const workoutName = document.querySelector('#workoutName');
const workoutDate = document.querySelector('#workoutDate');
const workoutColor = document.querySelector('#workoutColor');
const workoutHours = document.querySelector('#workoutHours');
const workoutMinutes = document.querySelector('#workoutMinutes');
const workoutInputSend = document.querySelector('#workoutInputSend');

let date = new Date();
let setsCounter = 0;
let set = {
    exerciseName: undefined,
    sets: []
}
let workoutToSave = {
    userID: id,
    workout: [],
    time: {
        hours: 1,
        minutes: 0,
        seconds: 0
    },
    workoutName: "Workout",
    workoutColor: "black",
    workoutDate: setDate()
}

setStart();

workoutName.addEventListener('input', () => {
    workoutToSave.workoutName = workoutName.value;
    allInputSend();
});

workoutColor.addEventListener('input', () => {
    workoutToSave.workoutColor = workoutColor.value;
    allInputSend();
});

workoutDate.addEventListener('input', () => {
    workoutToSave.workoutDate = workoutDate.value;
    allInputSend();
});

workoutHours.addEventListener('input', () => {
    workoutToSave.time.hours = workoutHours.value;
    allInputSend();
});

workoutMinutes.addEventListener('input', () => {
    workoutToSave.time.minutes = workoutMinutes.value;
    allInputSend();
});



addFirst.addEventListener('click', () => {
    showAddSet();
});

setsBtn.addEventListener('click', () => {
    addRep();
});

addingDoneBtn.addEventListener('click', () => {
    finishExercise();
});


function setStart(){
    workoutDate.value = setDate();
}

function setDate(){
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    if (month.length == 1){
        month = '0' + month;
    }
    if (day.length == 1){
        day = '0' + day;
    }
    return `${date.getFullYear()}-${month}-${day}`;
}

function addRep(){
    setsCounter += 1;

    const newRepDiv = document.createElement('div');
    const repsInput = document.createElement('input');
    const weightInput = document.createElement('input');
    const xDiv = document.createElement('div');
    const kgDiv = document.createElement('div');

    newRepDiv.classList.add('newRepDiv');
    newRepDiv.classList.add(`newRepDiv${setsCounter}`);
    repsInput.classList.add('repsWeightInput');
    repsInput.classList.add(`reps${setsCounter}`);
    weightInput.classList.add('repsWeightInput');
    weightInput.classList.add(`weight${setsCounter}`);

    xDiv.textContent = 'x';
    kgDiv.textContent = 'kg';
    repsInput.type = 'number';
    weightInput.type = 'number';
    repsInput.placeholder = 'Reps';
    weightInput.placeholder = 'Weight';
    repsInput.min = 1;
    weightInput.min = 1;


    newRepDiv.appendChild(repsInput);
    newRepDiv.appendChild(xDiv);
    newRepDiv.appendChild(weightInput);
    newRepDiv.appendChild(kgDiv);

    newSetsDiv.appendChild(newRepDiv);
}

function finishExercise(){
    set.exerciseName = exerciseName.value;

    for(let i = 1; i <= setsCounter; i++){
        getSet(i);
    }

    clearInput();
    hideAddSet();
    addExercise();
    allInputSend();

    function getSet(index){
        if (
            document.querySelector(`.reps${index}`).value != '' &&
            document.querySelector(`.weight${index}`).value != '' &&
            document.querySelector(`.reps${index}`).value > 0 && 
            document.querySelector(`.weight${index}`).value > 0
            ){

            let reps = document.querySelector(`.reps${index}`).value;
            let weight = document.querySelector(`.weight${index}`).value;
            set.sets.push({ reps, weight });

        }
    }

    function clearInput(){
        newSetsDiv.textContent = '';
    }
    
}

function showAddSet(){
    addingNew.style.display = 'flex';
}

function hideAddSet(){
    addingNew.style.display = 'none'
}

function addExercise(){

    setList();

    if (workoutToSave.workout.length > 0){
        let counter = workoutToSave.workout.length - 1;
        displayThis(counter);
        allInputSend();
    }

    function displayThis(index){

        const newExerciseDiv = document.createElement('div');
        const newExercise = document.createElement('div');

        newExerciseDiv.classList.add('exerciseInListDiv');
        newExercise.classList.add('exerciseInList');

        newExercise.textContent = workoutToSave.workout[index].exerciseName;

        newExerciseDiv.appendChild(newExercise);

        workoutToSave.workout[index].sets.forEach(oneSet => {
            const oneSetDisplay = document.createElement('div');
            oneSetDisplay.classList.add('newSetDisplay');
            let textInside = `${oneSet.reps} x ${oneSet.weight} kg`;
            oneSetDisplay.textContent = textInside;
            newExerciseDiv.appendChild(oneSetDisplay);
        });

        workoutList.appendChild(newExerciseDiv);

    }

    function setList(){
        workoutToSave.workout.push(set);
        setsCounter = 0;
        set = {
            exerciseName: undefined,
            sets: []
        }
    }
}

function allInputSend(){
    workoutInputSend.value = JSON.stringify(workoutToSave);
}

