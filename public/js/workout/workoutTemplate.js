
const workoutList = document.querySelector('.workoutList');
const addFirst = document.querySelector('.addFirst');
const addingNew = document.querySelector('.addingNew');
const setsBtn = document.querySelector('.setsBtn');
const newSetsDiv = document.querySelector('.newSetsDiv');
const addingDoneBtn = document.querySelector('.addingDoneBtn');
const exerciseName = document.querySelector('#exerciseName');

const workoutName = document.querySelector('#workoutName');
const workoutInputSend = document.querySelector('#workoutInputSend');

let setsCounter = 0;
let set = {
    exerciseName: undefined,
    sets: []
}
let workoutToSave = {
    userID: id,
    workout: [],
    templateName: "My Template",
}

workoutName.addEventListener('input', () => {
    workoutToSave.workoutName = workoutName.value;
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

document.querySelector('.closeBtn').addEventListener('click', () => {
    window.location.href = '/template/' + id;
});

//cookies
wholeCookies('workout/workoutTemplate.css');

