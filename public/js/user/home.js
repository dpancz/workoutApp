const startBtn = document.querySelector('.startBtn');
const bgDiv = document.querySelector('.bgDiv');
//MENU
const menuArrow = document.querySelector('.fa-chevron-down');
const myProfileOption = document.querySelector('.myProfileOption');
const settingsOption = document.querySelector('.settingsOption');
const deleteOption = document.querySelector('.deleteOption');
const logOutOption = document.querySelector('.logOutOption');
const menuList = document.querySelector('.menuList');
//MENU

startBtn.addEventListener('click', () => {
    const workoutLive = document.createElement('div');
    let height = 0;
    let width = 0;
    let top = 50;
    let left = 50;
    workoutLive.style.position = 'absolute';
    workoutLive.style.backgroundColor = '#111111';
    workoutLive.style.height = `${height}%`;
    workoutLive.style.width = `${width}%`;
    workoutLive.style.top = `${top}%`;
    workoutLive.style.left = `${left}%`;

    let timer1 = setInterval(() => {
        let doneTop = false;
        let doneLeft = false;
        if (top >= 0){
            workoutLive.style.height = `${height}%`;
            workoutLive.style.top = `${top}%`;
            console.log(workoutLive.style.top)
            height += 2;
            top--;
        } else {
            doneTop = true;
        }

        if (left >= 0){
            workoutLive.style.width = `${width}%`;
            workoutLive.style.left = `${left}%`;
            width += 2;
            left--;
        } else {
            doneLeft = true;
        }

        if(doneTop && doneLeft){
            clearInterval(timer1);
            window.location.href = '/workout-live/' + id;
            let timer2 = setTimeout(() => {
                workoutLive.remove();
                clearTimeout(timer2);
            }, 100)
        }
    }, 7);
    

    bgDiv.appendChild(workoutLive);
});

//MENU

let menuIsClicked = false;

menuArrow.addEventListener('click', () => {
    if(!menuIsClicked){
        menuArrow.style.animation = 'arrowRotate1 0.7s';
        menuList.style.animation = 'menuList1 0.7s';
        let timer1 = setTimeout(() => {
            menuArrow.style.animation = '';
            menuList.style.animation = '';
            menuArrow.style.transform = 'rotateZ(180deg)';
            menuList.style.height = '200px';
            menuIsClicked = true;
            clearTimeout(timer1);
        }, 700)
    } else {
        menuArrow.style.animation = 'arrowRotate2 0.7s';
        menuList.style.animation = 'menuList2 0.7s';
        let timer2 = setTimeout(() => {
            menuArrow.style.animation = '';
            menuList.style.animation = '';
            menuArrow.style.transform = 'rotateZ(0deg)';
            menuList.style.height = '0px';
            menuIsClicked = false;
            clearTimeout(timer2);
        }, 700)
    }
});

myProfileOption.addEventListener('click', () => {
    window.location.href = '/user/profile/' + id;
});

settingsOption.addEventListener('click', () => {
    window.location.href = '/user/settings/' + id;
});

deleteOption.addEventListener('click', () => {
    window.location.href = '/user/delete/' + id + '/' + false;
});

logOutOption.addEventListener('click', () => {
    window.location.href = '/';
});

//MENU

//GOALS

const allGoalsDiv = document.querySelector('.allGoalsDiv');
const goalsDiv = document.querySelector('.goalsDiv');
const scrollDots = document.querySelector('.scrollDots');

let lastWeight;
let workoutsInMonth;

goalsData = JSON.parse(goalsData);
weightData = JSON.parse(weightData);
workoutData = JSON.parse(workoutData);

let goalsCounter = countGoals();
//width 250px, gap 50px
let currentGoal = 0;
let initialLeft = 25;
goalsDiv.style.left = `${initialLeft}px`;
let firstSlide = true;

orderData();
let empty = false;
if (goalsData.length <= 0){
    goalsData.push({userID: id, title: 'Add your first goal!'});
    empty = true;
}
displayGoals();
if (goalsData.length > 1){
    slideGoals();
}

function displayGoals(){

    let index = 0;

    goalsData.forEach(oneGoal => {
        createDiv(index, oneGoal);
        index++;
    });

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
        createBackgroundCircle(i, goalDiv);

        goalsDiv.appendChild(goalDiv);
        createDot(i);

        if(info.done == 'true'){
            goalBackground.style.backgroundColor = 'lightgreen';
            goalTitle.style.color = '#000000';
        }

        goalDiv.addEventListener('click', () => {
            if(!empty){
                window.location.href = '/goals/one/' + goalsData[i]._id;
            } else {
                window.location.href = '/goals/' + id;
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
                    if(counter <= 100){
                        circle.style.strokeDashoffset = (440 - (440*counter)/100);
                    }
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

    function createDot(index){
        const dot = document.createElement('div');

        dot.classList.add(`dot`);
        dot.classList.add(`dot${index}`);

        scrollDots.appendChild(dot);

        dot.addEventListener('click', () => {
            dotClicked(index);
        });
    }

    function createBackgroundCircle(index, div){
        const percentInside = document.createElement('div');

        percentInside.classList.add('backgroundCircle');
        percentInside.classList.add(`backgroundCircle${index}`);

        div.appendChild(percentInside);
    }
}

function orderData(){
        
    if (weightData.length > 0){
    weightData = sortData(weightData, true);
    lastWeight = weightData[0].data.weightNumber;
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

function countGoals(){
    return goalsData.length;
}

function slideGoals(){

    highlightDot();

        if (currentGoal == 0){
            position = 25;
            slideToFirst();
        } else {

        let currentPosition = goalsDiv.style.left;
        currentPosition = currentPosition.substring(0, currentPosition.length - 2);
        currentPosition = Number(currentPosition);
        let position = currentPosition - 300;

        let timer2 = setInterval(() => {
            if (currentPosition > position){
                currentPosition--;
                goalsDiv.style.left = `${currentPosition}px`;
            } else if (currentPosition <= position){
                clearInterval(timer2);
            }
        }, 2);

        let timer1 = setTimeout(() => {
            currentGoal++;
            if (goalsCounter <= currentGoal){
                currentGoal = 0;
            }
            clearTimeout(timer1);
            slideGoals();
        }, 5000);

        }
        
}

function slideToFirst(){

    let currentPosition = goalsDiv.style.left;
    currentPosition = currentPosition.substring(0, currentPosition.length - 2);
    currentPosition = Number(currentPosition);
    position = 25;

    let timer2 = setInterval(() => {
        if (currentPosition < position){
            currentPosition += goalsCounter;
            goalsDiv.style.left = `${currentPosition}px`;
        } else if (currentPosition <= position){
            clearInterval(timer2);
        }
    }, 2);

    let timer1 = setTimeout(() => {
        currentGoal++;
        clearTimeout(timer1);
        slideGoals();
    }, 5000)

}

function highlightDot(){
    for(let i = 0; i < goalsCounter; i++){
        document.querySelector(`.dot${i}`).style.backgroundColor = '#aaaaaa';
    }
    document.querySelector(`.dot${currentGoal}`).style.backgroundColor = '#ffffff';
}

function dotClicked(index){
    let currentPosition = goalsDiv.style.left;
    currentPosition = currentPosition.substring(0, currentPosition.length - 2);
    currentPosition = Number(currentPosition);
    let position = 25 - (index * 300);
    currentGoal = index;
    highlightDot();

    let timer2 = setInterval(() => {
        if (currentPosition < position){
            currentPosition += 5;
            goalsDiv.style.left = `${currentPosition}px`;
        } else if (currentPosition > position){
            currentPosition -= 5;
            goalsDiv.style.left = `${currentPosition}px`;
        } else if (currentPosition = position){
            goalsDiv.style.left = `${currentPosition}px`;
            clearInterval(timer2);
        }
    }, 2);
}

//GOALS

//WEIGHT

const weightNumber = document.querySelector('.weightNumber');
if (lastWeight != undefined){
    weightNumber.textContent = `${lastWeight} kg`;
} else {
    weightNumber.style.fontSize = '20px';
    weightNumber.textContent = `Enter your first weight`;
}

const weightDiv = document.querySelector('.weightDiv');

weightDiv.addEventListener('click', () => {
    window.location.href = '/statistics/yourWeight/' + id;
});

//WEIGHT

//CHART

const chartDiv = document.querySelector('.chartDiv');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let dates = [];
let hours = [0, 0, 0, 0, 0, 0, 0];
let dateNow = new Date();

getDates();
getHours();
displayChart();

function displayChart(){
    let thisChart = new Chart(ctx, {
        type:'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Workout hours',
                data: hours,
                backgroundColor: '#00dfc0',
                borderColor: '#00dfc0',
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff',
            }],
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                ticks: {
                    color: "#ffffff"
                },
                grid: {
                    color: "transparent"
                }
                },
                y: {
                ticks: {
                    color: "#ffffff"
                },
                grid: {
                    color: "transparent"
                }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
            
        }, 
    });
}

function getDates(){
    
    let dateToDates = dateNow;
    dateToDates.setDate(dateToDates.getDate() - 6);

    for (let i = 0; i < 7; i++){
        dates.push(dateToDates.getDate());
        dateToDates.setDate(dateToDates.getDate() + 1);
    }

    dateToDates.setDate(dateToDates.getDate() - 1);

}

function getHours(){

    let dateWeekAgo = dateNow;
    dateWeekAgo.setDate(dateWeekAgo.getDate() - 6);

    for (let i = 0; i < 7; i++){

        workoutData.forEach(workout => {

            let dateWorkout = setMyDate(workout.data.workoutDate);

            if (
                dateWorkout.getDate() == dateWeekAgo.getDate() &&
                dateWorkout.getMonth() == dateWeekAgo.getMonth() &&
                dateWorkout.getFullYear() == dateWeekAgo.getFullYear()
            ){
                hours[i] = getWorkoutTime(workout.data.time);
            }

        });

        dateWeekAgo.setDate(dateWeekAgo.getDate() + 1);
    }

    function setMyDate(date){
        let year = Number(date.substring(0, 4));
        let month = Number(date.substring(5, 7) - 1);
        let day = Number(date.substring(8, 10));
        let thisDate = new Date();
        thisDate.setFullYear(year);
        thisDate.setMonth(month);
        thisDate.setDate(day);
        return thisDate;
    }

    function getWorkoutTime(time){
        
        let hours = Number(time.hours);
        let minutes = Number(time.minutes);
        let seconds = Number(time.seconds);

        if (seconds >= 30){
            minutes += 1;
        }

        if (minutes >= 60){
            minutes -= 60;
            hours += 1;
        }

        minutes = (minutes/60).toFixed(1);
        hours = Number(hours) + Number(minutes);

        return hours;

    }

}

chartDiv.addEventListener('click', () => {
    window.location.href = '/statistics/workoutStats/' + id;
});

//CHART

//cookies
wholeCookies('partials/leftMenu.css');
wholeCookies('user/home.css');