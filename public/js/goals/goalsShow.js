
const goalsDiv = document.querySelector('.goalsDiv');
const dataSend = document.querySelector('#dataSend');

const addNewBtn = document.querySelector('.addNewBtn');

let lastWeight;
let workoutsInMonth;

goalsData = JSON.parse(goalsData);
weightData = JSON.parse(weightData);
workoutData = JSON.parse(workoutData);

orderData();
displayGoals();
if (lastWeight != null){
    dataSend.value = JSON.stringify({lastWeight, id});
} else {
    dataSend.value = JSON.stringify({id});
}

function displayGoals(){

    let index = 0;

    goalsData.forEach(oneGoal => {
        if (index % 3 == 0){
            createRow(index);
        }
        createDiv(index, oneGoal);
        index++;
    });

    function createRow(i){
        const goalRow = document.createElement('div');

        goalRow.classList.add('goalRow');
        goalRow.classList.add(`goalRow${i/3}`);

        goalsDiv.appendChild(goalRow);
    }

    function createDiv(i, info){
        const goalDiv = document.createElement('div');
        const goalBackground = document.createElement('div');
        const goalTitle = document.createElement('div');

        goalDiv.classList.add('goalDiv');
        goalDiv.classList.add(`goalDiv${i}`);

        goalTitle.classList.add('goalTitle');
        goalTitle.classList.add(`goalTitle${i}`);
        goalTitle.textContent = info.title;

        goalBackground.classList.add('goalBackground');

        goalDiv.appendChild(goalBackground);
        goalDiv.appendChild(goalTitle);
        createCircle(i, goalDiv);
        createInfoDiv(i, goalDiv);

        document.querySelector(`.goalRow${Math.floor(i/3)}`).appendChild(goalDiv);

        let clicked = false;

        goalDiv.addEventListener('click', () => {
            if (!clicked){
                clicked = true;
                document.querySelector(`.goalInfoDiv${i}`).style.animation = 'goalInfoDivShow 0.5s';
                let timer1 = setTimeout(() => {
                    document.querySelector(`.goalInfoDiv${i}`).style.top = '100%';
                    document.querySelector(`.goalInfoDiv${i}`).style.animation = '';
                    clearTimeout(timer1);
                }, 500);
            } else {
                clicked = false
                document.querySelector(`.goalInfoDiv${i}`).style.animation = 'goalInfoDivHide 0.5s';
                let timer1 = setTimeout(() => {
                    document.querySelector(`.goalInfoDiv${i}`).style.top = '0%';
                    document.querySelector(`.goalInfoDiv${i}`).style.animation = '';
                    clearTimeout(timer1);
                }, 500);
            }
        });
    }

    function createCircle(index, div){
        const goalCircle = document.createElement('div');
        var ns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(ns, "svg");
        const circle = document.createElementNS(ns, "circle");
        const percentNumber = document.createElement('div');

        goalCircle.classList.add('goalCircle');
        goalCircle.classList.add(`goalCircle${index}`);

        circle.classList.add('goalCircleIn');
        circle.classList.add(`goalCircleIn${index}`);

        percentNumber.classList.add('percentNumber');
        percentNumber.classList.add(`percentNumber${index}`);

        circle.setAttributeNS(null, 'cx', 70);
        circle.setAttributeNS(null, 'cy', 70);
        circle.setAttributeNS(null, 'r', 70);

        percentNumber.textContent = '0%';

        goalCircle.appendChild(svg);
        svg.appendChild(circle);

        goalCircle.appendChild(percentNumber);
        div.appendChild(goalCircle);

        displayInCircle(index, circle, percentNumber);
    }

    function createInfoDiv(index, div){
        const goalInfoDiv = document.createElement('div');

        goalInfoDiv.classList.add('goalInfoDiv');
        goalInfoDiv.classList.add(`goalInfoDiv${index}`);

        displayInInfo(index, goalInfoDiv);

        div.appendChild(goalInfoDiv);
    }

    function displayInCircle(index, circle, textPercent){
        switch(goalsData[index].goalType){
            case 'Weight':
                weightGoal(goalsData[index].goal);
                break;
            case 'Workout quantity':
                quantityGoal(goalsData[index].goal);
                break;
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

            circleAnimation(circle, textPercent, percent);
        }

        function quantityGoal(goal){
            goalDays = goal.days;
            workoutsInMonth = thisTime(goalDays);

            let workoutGoal = goal.workouts;
            let percent = (workoutsInMonth / workoutGoal) * 100;
            circleAnimation(circle, textPercent, percent);
        }

        function circleAnimation(circle, textPercent, percent){
            let counter = 0;
            let timer1 = setInterval(() => {
                if (percent >= counter){
                    circle.style.strokeDashoffset = (440 - (440*counter)/100);
                    textPercent.textContent = counter + '%';
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
    }

    function displayInInfo(index, goalInfo){
        switch(goalsData[index].goalType){
            case 'Weight':
                caseWeight();
                break;
            case 'Workout quantity':
                caseQuantity();
                break;
        }

        function caseWeight(){
            let weightStart = goalsData[index].goal.weightStart;
            let weightGoal = goalsData[index].goal.weightGoal;
            let weightCurrent = lastWeight;

            const weightStartDiv = document.createElement('div');
            const weightGoalDiv = document.createElement('div');
            const weightCurrentDiv = document.createElement('div');

            weightStartDiv.classList.add('infoText');
            weightGoalDiv.classList.add('infoText');
            weightCurrentDiv.classList.add('infoText');

            weightStartDiv.textContent = 'Initial Weight: ' + weightStart + 'kg';
            weightGoalDiv.textContent = 'Goal Weight: ' + weightGoal + 'kg';
            weightCurrentDiv.textContent = 'Current Weight: ' + weightCurrent + 'kg';

            goalInfo.appendChild(weightStartDiv);
            goalInfo.appendChild(weightGoalDiv);
            goalInfo.appendChild(weightCurrentDiv);
        }

        function caseQuantity(){
            let goalDays = goalsData[index].goal.days;
            let goalQuantity = goalsData[index].goal.workouts;
            let currentQuantity = workoutsInMonth;
            
            const goalDaysDiv = document.createElement('div');
            const goalQuantityDiv = document.createElement('div');
            const currentQuantityDiv = document.createElement('div');

            goalDaysDiv.classList.add('infoText');
            goalQuantityDiv.classList.add('infoText');
            currentQuantityDiv.classList.add('infoText');

            goalDaysDiv.textContent = 'Day limit: ' + goalDays;
            goalQuantityDiv.textContent = 'Workouts Goal Quantity: ' + goalQuantity;
            currentQuantityDiv.textContent = 'Current Quantity: ' + currentQuantity;

            goalInfo.appendChild(goalDaysDiv);
            goalInfo.appendChild(goalQuantityDiv);
            goalInfo.appendChild(currentQuantityDiv);
        }
    }
}

function orderData(){
        
    if (weightData.length > 0){
    weightData = sortData(weightData, true);
    lastWeight = weightData[0].data.weightNumber;
    dataSend.value = JSON.stringify({lastWeight, id});
    }

    workoutData = sortData(workoutData, false);
    
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
    
}