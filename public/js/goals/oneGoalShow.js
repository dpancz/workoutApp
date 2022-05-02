const bgDiv = document.querySelector('.bgDiv');
const circle = document.querySelector('.goalCircleIn');
const percentNumber = document.querySelector('.percentNumber');
const mainPage = document.querySelector('.mainPage');
const goalDateOutput = document.querySelector('.goalDateOutput');
const goalTitle = document.querySelector('.goalTitle');

let lastWeight;
let workoutsInTime;

goalData = JSON.parse(goalData);
weightData = JSON.parse(weightData);
workoutData = JSON.parse(workoutData);

goalTitle.textContent = goalData.title;

switch(goalData.goalType){
    case 'Weight':
        caseWeight();
        displayStartDate();
        break;
    case 'Workout quantity':
        caseWorkoutQuantity();
        displayStartDate();
        break;
}

//MAIN

function caseWeight(){
    
    if (weightData.length > 0){

        weightData = sortData(weightData, true);

        lastWeight = weightData[0].data.weightNumber;

        weightGoal(goalData.goal);

        displayDataOfWeight();

    }

}

function caseWorkoutQuantity(){
    
    if (workoutData.length > 0){

        workoutData = sortData(workoutData, false);

        workoutsInTime = workoutsInTime;

        quantityGoal(goalData.goal);

        displayDataOfWorkoutQuantity();

    }

}

//HELPERS

function sortData(myArray, isWeight){
    let arrayReturn = [];
    myArray.forEach(one => {
        let myDate = new Date();
        let year;
        let month;
        let day;
        if (isWeight){
            year = Number(one.date.substring(0, 4));
            month = Number(one.date.substring(5, 7) - 1);
            day = Number(one.date.substring(8, 10));
        } else {
            year = Number(one.workoutDate.substring(0, 4));
            month = Number(one.workoutDate.substring(5, 7) - 1);
            day = Number(one.workoutDate.substring(8, 10));
        }
        myDate.setFullYear(year);
        myDate.setMonth(month);
        myDate.setDate(day);
        arrayReturn.push({data: one, date: myDate});
    });

    arrayReturn.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });

    return arrayReturn;
}

function weightGoal(goal){
        let percent;

        if ( goal.weightStart > goal.weightGoal ){
            let weightStart = goal.weightStart;
            let weightGoal = goal.weightGoal;
            let firstDifference = weightStart - weightGoal;
            let currentDifference = lastWeight - weightGoal;
            percent = (1 - (currentDifference / firstDifference)) * 100;
        } else {
            //if user wants to gain wait
            let weightStart = goal.weightStart;
            let weightGoal = goal.weightGoal;
            let firstDifference = weightGoal - weightStart;
            let currentDifference = weightGoal - lastWeight;
            percent = (1 - (currentDifference / firstDifference)) * 100;
        }

        circleAnimation(circle, percentNumber, percent);
}

function quantityGoal(goal){
        goalDays = goal.days;
        workoutsInTime = thisTime(goalDays);

        let workoutGoal = goal.workouts;
        let percent = (workoutsInTime / workoutGoal) * 100;
        circleAnimation(circle, percentNumber, percent);
}

function circleAnimation(circle, percentNumber, percent){
        let counter = 0;
        let timer1 = setInterval(() => {
            if (percent >= counter){
                circle.style.strokeDashoffset = (440 - (440*counter)/100);
                percentNumber.textContent = counter + '%';
                counter++;
            } else if (percent == counter) {
                clearInterval(timer1);
            }
        }, 10)
}

function thisTime(days){
        let dateNow = new Date();
        let timeAgo = new Date();
        timeAgo.setDate(timeAgo.getDate() - days);
        let counter = 0;

        workoutData.forEach(workout => {
            if (workout.date > timeAgo && workout.date < dateNow){
                counter++;
            }
        })

        return counter;
}

//DISPLAY DATA

function displayStartDate(){
    goalDateOutput.textContent = goalData.createdAt.substring(0, 10);
}

function displayDataOfWeight(){

    displayCurrentWeight();
    displayInitialWeight();
    displayGoalWeight();

    function displayCurrentWeight(){

        const currentWeightDiv = document.createElement('div');
        const currentWeightTitle = document.createElement('div');
        const currentWeightOutput = document.createElement('div');

        currentWeightDiv.classList.add('goalDiv');
        currentWeightDiv.classList.add('thirdDataDiv');
        currentWeightOutput.classList.add('goalOutput');

        currentWeightTitle.textContent = 'Current weight:';
        currentWeightOutput.textContent = lastWeight + 'kg';

        currentWeightDiv.appendChild(currentWeightTitle);
        currentWeightDiv.appendChild(currentWeightOutput);

        mainPage.appendChild(currentWeightDiv);

    }

    function displayInitialWeight(){

        const initialWeightDiv = document.createElement('div');
        const initialWeightTitle = document.createElement('div');
        const initialWeightOutput = document.createElement('div');

        initialWeightDiv.classList.add('goalDiv');
        initialWeightDiv.classList.add('firstDataDiv');
        initialWeightOutput.classList.add('goalOutput');

        initialWeightTitle.textContent = 'Initial weight:';
        initialWeightOutput.textContent = goalData.goal.weightStart + ' kg';

        initialWeightDiv.appendChild(initialWeightTitle);
        initialWeightDiv.appendChild(initialWeightOutput);

        mainPage.appendChild(initialWeightDiv);

    }

    function displayGoalWeight(){

    const goalWeightDiv = document.createElement('div');
    const goalWeightTitle = document.createElement('div');
    const goalWeightOutput = document.createElement('div');

    goalWeightDiv.classList.add('goalDiv');
    goalWeightDiv.classList.add('secondDataDiv')
    goalWeightOutput.classList.add('goalOutput');

    goalWeightTitle.textContent = 'Goal weight:';
    goalWeightOutput.textContent = goalData.goal.weightGoal + ' kg';

    goalWeightDiv.appendChild(goalWeightTitle);
    goalWeightDiv.appendChild(goalWeightOutput);

    mainPage.appendChild(goalWeightDiv);

    }

}

function displayDataOfWorkoutQuantity(){

    displayCurrentQuantity();
    displayDays();
    displayGoalQuantity();
    displayDaysRemaining();

    function displayCurrentQuantity(){

        const currentQuantityDiv = document.createElement('div');
        const currentQuantityTitle = document.createElement('div');
        const currentQuantityOutput = document.createElement('div');

        currentQuantityDiv.classList.add('goalDiv');
        currentQuantityDiv.classList.add('firstDataDiv');
        currentQuantityOutput.classList.add('goalOutput');

        currentQuantityTitle.textContent = 'Current workouts:';
        currentQuantityOutput.textContent = workoutsInTime;

        currentQuantityDiv.appendChild(currentQuantityTitle);
        currentQuantityDiv.appendChild(currentQuantityOutput);

        mainPage.appendChild(currentQuantityDiv);

    }

    function displayDays(){

        const daysDiv = document.createElement('div');
        const daysTitle = document.createElement('div');
        const daysOutput = document.createElement('div');

        daysDiv.classList.add('goalDiv');
        daysDiv.classList.add('thirdDataDiv');
        daysOutput.classList.add('goalOutput');

        daysTitle.textContent = 'Days for goal:';
        daysOutput.textContent = goalData.goal.days;

        daysDiv.appendChild(daysTitle);
        daysDiv.appendChild(daysOutput);

        mainPage.appendChild(daysDiv);
        
    }

    function displayGoalQuantity(){

        const goalQuantityDiv = document.createElement('div');
        const goalQuantityTitle = document.createElement('div');
        const goalQuantityOutput = document.createElement('div');

        goalQuantityDiv.classList.add('goalDiv');
        goalQuantityDiv.classList.add('secondDataDiv');
        goalQuantityOutput.classList.add('goalOutput');

        goalQuantityTitle.textContent = 'Goal workouts:';
        goalQuantityOutput.textContent = goalData.goal.workouts;

        goalQuantityDiv.appendChild(goalQuantityTitle);
        goalQuantityDiv.appendChild(goalQuantityOutput);

        mainPage.appendChild(goalQuantityDiv);

    }

    function displayDaysRemaining(){

        const daysRemainingDiv = document.createElement('div');
        const daysRemainingTitle = document.createElement('div');
        const daysRemainingOutput = document.createElement('div');

        daysRemainingDiv.classList.add('goalDiv');
        daysRemainingDiv.classList.add('forthDataDiv');
        daysRemainingOutput.classList.add('goalOutput');

        daysRemainingTitle.textContent = 'Days remaining:';
        daysRemainingOutput.textContent = daysRemainingCount();

        daysRemainingDiv.appendChild(daysRemainingTitle);
        daysRemainingDiv.appendChild(daysRemainingOutput);

        mainPage.appendChild(daysRemainingDiv);

    }

    function daysRemainingCount(){
        let startDate = goalData.createdAt;
        let currentDate = new Date();
        let year = Number(goalData.createdAt.substring(0,4));
        let month = Number(goalData.createdAt.substring(5,7) - 1);
        let day = Number(goalData.createdAt.substring(8,10));
        startDate = new Date();
        startDate.setFullYear(year);
        startDate.setMonth(month);
        startDate.setDate(day);
        
        const diffTime = Math.abs(currentDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));   

        return (goalData.goal.days - diffDays)
    }

}

//DELETE GOAL

const deleteDiv = document.querySelector('.deleteDiv');
const deleteBtn = document.querySelector('.fa-trash');
const yesButton = document.querySelector('.yesButton');
const noButton = document.querySelector('.noButton');

deleteBtn.addEventListener('click', () => {
    displayDeleteDiv();
});

noButton.addEventListener('click', () => {
    hideDeleteDiv();
});

yesButton.addEventListener('click', async () => {
    
    try{
        const res = await fetch('/goals/delete', {
            method: 'POST',
            body: JSON.stringify({goalID: goalData._id, id}),
            headers: { 'Content-Type': 'application/json' }
        });
        window.location.href = '/goals/' + id;
    } catch (err){
        console.log(err);
    }

});

function displayDeleteDiv(){
    deleteDiv.style.display = 'flex';
}

function hideDeleteDiv(){
    deleteDiv.style.display = 'none';
}

//MARK AS DONE

const markDoneDiv = document.querySelector('.markDoneDiv');

if (goalData.done == 'false'){
    let timer3 = setTimeout(() => {
        checkDone();
        clearTimeout(timer3);
    }, 1500)
} else {
    bgDiv.style.backgroundColor = 'lightgreen';
    setDone();
}

markDoneDiv.addEventListener('click', () => {
    markDoneDiv.textContent = '';
    markDoneDiv.style.animation = 'markDone 2s';
    let timer1 = setTimeout(() => {
        markDoneDiv.style.width = '45px';
        markDoneDiv.style.right = '-45px';
        markDoneDiv.style.bottom = '-45px';
        markDoneDiv.style.animation = 'markDoneFullScreen 1s';
        setDone();
        clearTimeout(timer1);
    }, 2000);
    let timer2 = setTimeout(() => {
        markDoneDiv.style.width = '100%';
        markDoneDiv.style.height = '100%';
        markDoneDiv.style.right = '0px';
        markDoneDiv.style.bottom = '0px';
        markDoneDiv.style.animation = '';
        //sendDone();
        confetti();
        clearTimeout(timer2);
    }, 3000);
});

function setDone(){

    deleteBtn.style.color = '#000000';
    goalTitle.style.color = '#111111';

    let goalDivs = document.getElementsByClassName('goalDiv');

    for (let i = 0; i < goalDivs.length; i++){
        goalDivs.item(i).style.color = '#111111';
    }

    let goalOutputs = document.getElementsByClassName('goalOutput');
    
    for (let i = 0; i < goalOutputs.length; i++){
        goalOutputs.item(i).style.color = '#533a71';
    }

    document.querySelector('.percentNumber').style.color = '#111111';
    document.querySelector('.goalCircleIn').style.stroke = 'blue';
    document.querySelector('.backgroundCircle').style.opacity = '0';
}

async function sendDone(){
    try{
        const res = await fetch('/goals/done', {
            method: 'POST',
            body: JSON.stringify({ goalID: goalData._id }),
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.log(err);
    }
}

function checkDone(){
    let percentNumber = document.querySelector('.percentNumber');
    percentNumber = percentNumber.textContent.replace('%', '');
    percentNumber = Number(percentNumber);
    if (percentNumber >= 100){
        markDoneDiv.style.display = 'flex';
    }
}

function confetti(){
    const confettiImg = document.createElement('img');

    confettiImg.classList.add('confettiImg');
    confettiImg.src = '/public/gifs/confetti.gif';

    mainPage.appendChild(confettiImg);

    let timerConfetti = setTimeout(() => {
        confettiImg.remove();
        clearTimeout(timerConfetti);
    }, 5000);
}