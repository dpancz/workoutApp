const workoutList = document.querySelector('.workoutList');
const addFirst = document.querySelector('.addFirst');
const addingNew = document.querySelector('.addingNew');
const setsBtn = document.querySelector('.setsBtn');
const newSetsDiv = document.querySelector('.newSetsDiv');
const addingDoneBtn = document.querySelector('.addingDoneBtn');
const exerciseName = document.querySelector('#exerciseName');

const templatesDiv = document.querySelector('.templatesDiv');

const workoutName = document.querySelector('#workoutName');
const workoutDate = document.querySelector('#workoutDate');
const workoutColor = document.querySelector('#workoutColor');
const workoutHours = document.querySelector('#workoutHours');
const workoutMinutes = document.querySelector('#workoutMinutes');
const workoutInputSend = document.querySelector('#workoutInputSend');

data = JSON.parse(data);
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
if (data.length > 0){
    displayTemplates();
}

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
    if(passedDate == null){
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        if (month.length == 1){
            month = '0' + month;
        }
        if (day.length == 1){
            day = '0' + day;
        }
        return `${date.getFullYear()}-${month}-${day}`;
    } else if (typeof(passedDate) == 'object'){
        document.querySelector('#workoutDate').remove();
        const rangeDiv = document.createElement('div');
        rangeDiv.id = 'workoutDate';
        rangeDiv.style.color = '#ffffff';
        rangeDiv.style.top = '57.5%';
        getDateRange();
        rangeDiv.textContent = getRangeDisplay();
        document.querySelector('.newWorkoutForm').appendChild(rangeDiv);
        return `${passedDate.toString()}`
    } else {
        return `${passedDate}`;
    }
}

function getDateRange(){
    let passedDates = [];
    passedDate.forEach(passed => {
        let myPassedDate = new Date(passed);
        passedDates.push(myPassedDate);
    });
    passedDates.sort((a,b)=>a.getTime()-b.getTime());
    passedDate = passedDates;

    let index = 0;
    passedDates.forEach(passed => {
        let year = passed.getFullYear();
        let month = Number(passed.getMonth()) + 1;
        let day = passed.getDate();
        if (month.toString().length < 2){
            month = '0' + month;
        }
        if (day.toString().length < 2){
            day = '0' + day;
        }
        passedDates[index] = `${year}-${month}-${day}`;
        index++;
    })
}

function getRangeDisplay(){
    return `from ${passedDate[0]} \n to ${passedDate[passedDate.length - 1]}`;
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

    

    function setList(){
        workoutToSave.workout.push(set);
        setsCounter = 0;
        set = {
            exerciseName: undefined,
            sets: []
        }
    }
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

function allInputSend(){
    workoutInputSend.value = JSON.stringify(workoutToSave);
}

function displayTemplates(){
    data.forEach(template => {
        displayTemplate(template);
    });

    function displayTemplate(template){
        const templateDiv = document.createElement('div');
        const templateTitle = document.createElement('div');
        const showTemplate = document.createElement('i');
        const addIcon = document.createElement('i');

        templateDiv.classList.add('templateDiv');
        templateTitle.classList.add('templateTitle');
        showTemplate.classList.add('fa-solid');
        showTemplate.classList.add('fa-angle-down');
        addIcon.classList.add('fa-solid');
        addIcon.classList.add('fa-plus');

        templateTitle.textContent = template.templateName;

        templateDiv.appendChild(templateTitle);
        templateDiv.appendChild(showTemplate);
        templateDiv.appendChild(addIcon);
        templatesDiv.append(templateDiv);

        let opened = false;
        let rollHeight = getLines(template.workout);

        showTemplate.addEventListener('click', () => {
            if (!opened){
                showDiv(templateDiv, showTemplate, rollHeight);
                displayWorkout(template.workout, templateDiv);
                opened = true;
            } else {
                hideDiv(templateDiv, showTemplate, rollHeight);
                hideWorkout(templateDiv, templateTitle, showTemplate, addIcon);
                opened = false;
            }
        });

        addIcon.addEventListener('click', () => {
            addTemplate(template.workout);
        });
    }

    function getLines(workout){
        let lines = 0;
        workout.forEach(exercise => {
            exercise.sets.forEach(set => {
                 lines++;
            });
            lines++;
        });
        return 300 + lines*30;
    }

    function showDiv(templateDiv, icon, rollHeight){
        let height = rollHeight;
            let currentHeight = 200;

            let timer1 = setInterval(() => {
                if (currentHeight < height){
                    templateDiv.style.height = `${currentHeight}px`;
                    currentHeight+=5;
                } else if (currentHeight == height){
                    clearInterval(timer1);
                }
            }, 2);

            let angle = 0;

            let timer2 = setInterval(() => {
                if(angle < 180){
                    icon.style.transform = `rotateZ(${angle}deg)`;
                    angle+=2;
                } else if (angle == 180){
                    clearInterval(timer2);
                }
            }, 2);
    }

    function hideDiv(templateDiv, icon, rollHeight){
        let height = rollHeight;
            let standardHeight = 200;

            let timer1 = setInterval(() => {
                if(height > standardHeight){
                    templateDiv.style.height = `${height}px`;
                    height-=5;
                } else if (height == standardHeight){
                    clearInterval(timer1);
                }
            }, 2);

            let angle = 180;

            let timer2 = setInterval(() => {
                if(angle > 0){
                    icon.style.transform = `rotateZ(${angle}deg)`;
                    angle-=2;
                } else if (angle == 180){
                    clearInterval(timer2);
                }
            }, 2);
    }

    function displayWorkout(workout, templateDiv){
        workout.forEach(exercise => {
            const exerciseName = document.createElement('div');
            exerciseName.classList.add('exerciseName');
            exerciseName.textContent = exercise.exerciseName;
            templateDiv.appendChild(exerciseName);
            exercise.sets.forEach(set => {
                const setDiv = document.createElement('div');
                setDiv.classList.add('setDiv');
                setDiv.textContent = `${set.reps} x ${set.weight}kg`;
                templateDiv.appendChild(setDiv);
            });
        });
    }

    function hideWorkout(templateDiv, templateTitle, showIcon, addIcon){
        templateDiv.textContent = '';
        templateDiv.appendChild(templateTitle);
        templateDiv.appendChild(addIcon);
        templateDiv.appendChild(showIcon);
    }

    function addTemplate(workout){
        let index = 0;
        workout.forEach(exercise => {
            workoutToSave.workout.push(exercise);
            index++;
            let counter = workoutToSave.workout.length - 1;
            displayThis(counter);
        });
        allInputSend();
    }
}

//cookies
wholeCookies('workout/workoutAdd.css');

