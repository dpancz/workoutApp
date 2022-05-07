
const newGoalForm = document.querySelector('.newGoalForm');
const goalType = document.querySelector('#goalType');

let chosen = 'Weight';
switchGoal();

function switchGoal(){
    switch(chosen){
        case 'Weight':
            clearForm();
            weightGoalDisplay();
            break;
        case 'Workout quantity':
            clearForm();
            quantityGoalDisplay();
            break;
    }
}

//clear

function clearForm(){
    const newSelect = document.createElement('select');
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    const inputID = document.createElement('input');

    newSelect.name = 'goalType';
    newSelect.id = 'goalType';

    option1.value = 'Weight';
    option1.textContent = 'Weight';

    option2.value = 'Workout quantity';
    option2.textContent = 'Workout quantity';

    newGoalForm.textContent = '';

    newSelect.appendChild(option1);
    newSelect.appendChild(option2);

    newSelect.value = chosen;

    inputID.style.display = 'none';
    inputID.name = 'id';
    inputID.value = id;

    newGoalForm.appendChild(newSelect);
    newGoalForm.appendChild(inputID);

    newSelect.addEventListener('input', () => {
        chosen = newSelect.value;
        switchGoal();
    })
}

//weight

function weightGoalDisplay(){
    const weightNameInput = document.createElement('input');
    const weightGoalInput = document.createElement('input');
    const weightStartLabel = document.createElement('label');
    const weightStartInput = document.createElement('input');
    const submitBtn = document.createElement('button');

    weightNameInput.placeholder = 'Goal Name';
    weightNameInput.type = 'text';
    weightNameInput.name = 'title';
    weightNameInput.id = 'goalTitle';

    weightGoalInput.placeholder = 'Weight Goal';
    weightGoalInput.type = 'number';
    weightGoalInput.name = 'weightGoal';
    weightGoalInput.id = 'weightGoal'

    weightStartInput.placeholder = 'Initial Weight';
    weightStartInput.type = 'number';
    weightStartInput.name = 'weightStart';
    weightStartInput.id = 'weightStart';
    weightStartInput.value = weightCurrent;

    weightStartLabel.htmlFor = 'weightStart';
    weightStartLabel.textContent = 'Initial Weight:';
    weightStartLabel.id = 'weightCurrentLabel';

    submitBtn.textContent = 'Submit';
    submitBtn.id = 'submitBtn';

    newGoalForm.appendChild(weightNameInput);
    newGoalForm.appendChild(weightStartLabel);
    newGoalForm.appendChild(weightStartInput);
    newGoalForm.appendChild(weightGoalInput);
    newGoalForm.appendChild(submitBtn);
}

//workout quantity

function quantityGoalDisplay(){
    const weightNameInput = document.createElement('input');
    const numberOfWorkoutsInput = document.createElement('input');
    const numberOfDaysInput = document.createElement('input');
    const submitBtn = document.createElement('button');

    weightNameInput.placeholder = 'Goal Name';
    weightNameInput.type = 'text';
    weightNameInput.name = 'title';
    weightNameInput.id = 'goalTitle';

    numberOfWorkoutsInput.placeholder = 'Number of Workouts';
    numberOfWorkoutsInput.type = 'number';
    numberOfWorkoutsInput.name = 'workouts';
    numberOfWorkoutsInput.id = 'workouts';

    numberOfDaysInput.placeholder = 'Number of Days';
    numberOfDaysInput.type = 'number';
    numberOfDaysInput.name = 'days';
    numberOfDaysInput.id = 'days';

    submitBtn.textContent = 'Submit';
    submitBtn.id = 'submitBtn';

    newGoalForm.appendChild(weightNameInput);
    newGoalForm.appendChild(numberOfWorkoutsInput);
    newGoalForm.appendChild(numberOfDaysInput);
    newGoalForm.appendChild(submitBtn);

}

//cookies
wholeCookies('partials/leftMenu.css');
wholeCookies('goals/goalsNew.css');