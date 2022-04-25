data = JSON.parse(data);

let workout = data.workout;
let date = data.workoutDate;

const mainTitle = document.querySelector('.mainTitle');
const subTitle = document.querySelector('.subTitle');
const workoutList = document.querySelector('.workoutList');

const logo = document.querySelector('.logo');

let first = true;

setTitle();

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

function setTitle(){
    mainTitle.textContent = username + '\'s workout';
    subTitle.textContent = date;
}

logo.addEventListener('click', () => {
    window.location.href = '/';
});