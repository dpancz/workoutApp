
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const firstInfo = document.querySelector('.firstInfo');
const secondInfo = document.querySelector('.secondInfo');
const thirdInfo = document.querySelector('.thirdInfo');
const firstData = document.querySelector('.firstData');
const secondData = document.querySelector('.secondData');
const thirdData = document.querySelector('.thirdData');

const chartPick = document.querySelector('#chartPick');

data = JSON.parse(data);

/*
let data = [{
    workoutName: 'Live-Workout',
    workoutColor: 'lightcoral',
    workoutDate: '2022-04-15',
    time: {
        hours: 1,
        minutes: 0,
        seconds: 0,
    },
    workout: [
        {
            exerciseName: 'Bench press',
            sets: [
                {
                    reps: 3,
                    weight: 80,
                }
            ]
        },
        {
            exerciseName: 'Push ups',
            sets: [
                {
                    reps: 20,
                    weight: 4,
                },
                {
                    reps: 20,
                    weight: 50,
                }
            ]
        },
        {
            exerciseName: 'Deadlift',
            sets: [
                {
                    reps: 20,
                    weight: 100,
                },
                {
                    reps: 20,
                    weight: 120,
                }
            ]
        },
    ]
    },
    {
        workoutName: 'Workout',
        workoutColor: 'white',
        workoutDate: '2022-04-04',
        time: {
            hours: 0,
            minutes: 4,
            seconds: 20,
        },
        workout: [
            {
                exerciseName: 'Bench press',
                sets: [
                    {
                        reps: 3,
                        weight: 80,
                    },
                    {
                        reps: 3,
                        weight: 90,
                    },
                    {
                        reps: 1,
                        weight: 110,
                    }
                ]
            },
            {
                exerciseName: 'Push ups',
                sets: [
                    {
                        reps: 20,
                        weight: 4,
                    },
                    {
                        reps: 20,
                        weight: 5,
                    }
                ]
            },
            {
                exerciseName: 'Pull ups',
                sets: [
                    {
                        reps: 20,
                        weight: 2,
                    },
                    {
                        reps: 20,
                        weight: 30,
                    }
                ]
            },
        ]
    }
];
*/

let allExercises = [];
let exercisesValues = {};

let dates = [];
let exercisesWeight = [];

let chosen = 'All workouts';
let thisChart;
let colorMode = '#ffffff';

//cookies
wholeCookies('partials/statisticsLeftMenu.css');
wholeCookies('statistics/workoutStats.css');

if(checkCookiesDayMode() == 'true'){
    colorMode = '#000000';
}

getNames();
getToChart(chosen);
displayChart(true);
displayInfo(chosen);


chartPick.addEventListener('input', () => {
    chosen = chartPick.value;
    getToChart(chosen);
    displayChart(false);
    displayInfo(chosen);
});


function getNames(){
    data.forEach(workout => {
        workout.workout.forEach(exercise => {
            let exists = false;
            allExercises.forEach(oneExercise => {
                if (oneExercise == exercise.exerciseName){
                    exists = true;
                }
            });
            if (!exists){
                allExercises.push(exercise.exerciseName);
            }
        });
    });

    displayOptions();

    function displayOptions(){
        allExercises.forEach(exercise => {
            const newOption = document.createElement('option');
            newOption.value = exercise;
            newOption.textContent = exercise;
            chartPick.appendChild(newOption);
            exercisesValues[`${exercise}`] = [];
            getValues(exercise);
        });
    }

    function getValues(exerciseName){
        data.forEach(workout => {
            let thisDate = workout.workoutDate;
            workout.workout.forEach(oneExercise => {
                if (oneExercise.exerciseName == exerciseName){
                    let averageWeight = getAverageWeight(oneExercise.sets);
                    let topWeight = getTopWeight(oneExercise.sets);
                    let myNewDate = new Date();
                    myNewDate.setFullYear(Number(thisDate.substring(0, 4)));
                    myNewDate.setMonth(Number(thisDate.substring(5, 7))-1);
                    myNewDate.setDate(Number(thisDate.substring(8, 10)));
                    myNewDate.setHours(0, 0, 0, 0);
                    exercisesValues[`${exerciseName}`].push({weight: averageWeight, date: thisDate, dateSort: myNewDate, topWeight});
                }
            });
        });

        function getAverageWeight(sets){
            let weight = 0;
            let reps = 0;
            sets.forEach(set => {
                weight += set.weight * set.reps;
                reps += set.reps;
            });
            return Math.round(weight/reps);
        }

        function getTopWeight(sets){
            let topValue = 0;
            sets.forEach(set => {
                if (set.weight > topValue){
                    topValue = set.weight;
                }
            });
            return topValue;
        }
    }
}

function getToChart(exerciseName){
    dates = [];
    exercisesWeight = [];

    if (exerciseName == 'All workouts'){
        let myData = [];
        data.forEach(workout => {
            let year = Number(workout.workoutDate.substring(0, 4));
            let month = Number(workout.workoutDate.substring(5, 7) - 1);
            let day = Number(workout.workoutDate.substring(8, 10));
            let myDate = new Date();
            myDate.setFullYear(year);
            myDate.setMonth(month);
            myDate.setDate(day);
            let time = Number(workout.time.hours) + Number((workout.time.minutes / 60).toFixed(2));
            myData.push({date: myDate, time});
        });

        myData.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
        })

        myData.forEach(oneData => {
            let year = oneData.date.getFullYear();
            let month = oneData.date.getMonth() + 1;
            let day = oneData.date.getDate();
            dates.push(`${year}-${month}-${day}`);
            exercisesWeight.push(oneData.time);
        });

    } else {
        exercisesValues[`${exerciseName}`].sort(function(a,b){
            return new Date(a.dateSort) - new Date(b.dateSort);
        })

        exercisesValues[`${exerciseName}`].forEach(workout => {
            dates.push(workout.date);
            exercisesWeight.push(workout.weight);
        });
    }
}

function displayChart(first){
    if(!first){
        thisChart.destroy();
    }
    if (chosen == 'All workouts'){
        thisChart = new Chart(ctx, {
            type:'bar',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Workout hours',
                    data: exercisesWeight,
                    backgroundColor: '#00dfc0',
                    borderColor: '#00dfc0',
                    hoverBorderWidth: 3,
                    hoverBorderColor: colorMode,
                }],
            },
            options:{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                    ticks: {
                        color: colorMode
                    },
                    grid: {
                        color: "transparent"
                    }
                    },
                    y: {
                    ticks: {
                        color: colorMode
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
    } else {
        thisChart = new Chart(ctx, {
            type:'bar',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Average Weight',
                    data: exercisesWeight,
                    backgroundColor: '#00dfc0',
                    borderColor: '#00dfc0',
                    hoverBorderWidth: 3,
                    hoverBorderColor: colorMode,
                }],
            },
            options:{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                    ticks: {
                        color: colorMode
                    },
                    grid: {
                        color: "transparent"
                    }
                    },
                    y: {
                    ticks: {
                        color: colorMode
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
}

function displayInfo(exerciseName){
    if(exerciseName == 'All workouts'){
        firstData.style.fontSize = '25px';
        thirdData.style.fontSize = '25px';
        thirdData.style.color = '#00dfc0';

        firstInfo.textContent = 'Monthly hours';
        secondInfo.textContent = 'Monthly workouts';
        thirdInfo.textContent = 'Average duration';

        firstData.textContent = getMonthlyHours();
        secondData.textContent = getMonthlyWorkouts();
        thirdData.textContent = getAverageDuration();

    } else {
        firstData.style.fontSize = '50px';
        thirdData.style.fontSize = '50px';

        firstInfo.textContent = 'Average';
        secondInfo.textContent = 'Personal Best';
        thirdInfo.textContent = 'Progress';

        firstData.textContent = getAverageExercise() + 'kg';
        secondData.textContent = getTopExercise() + 'kg';
        progressDisplay(getProgress());

    }

    function getAverageExercise(){
        let sum = 0;
        exercisesWeight.forEach(one => {
            sum += one;
        });
        return (sum/exercisesWeight.length).toFixed(1);
    }

    function getTopExercise(){
        let topValue = 0;
        exercisesValues[`${exerciseName}`].forEach(oneTop => {
            if(oneTop.topWeight > topValue){
                topValue = oneTop.topWeight;
            };
        });
        return topValue;
    }

    function getProgress(){
        let currentTop = exercisesValues[`${exerciseName}`][exercisesValues[`${exerciseName}`].length - 1].topWeight;
        let monthAgo = new Date();
        let topValueThen = 0;
        let answer = 0;
        monthAgo.setHours(0, 0, 0, 0);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        for (let i = 0; i <= 31; i++){
            exercisesValues[`${exerciseName}`].forEach(myDate => {
                if (myDate.dateSort.getFullYear() == monthAgo.getFullYear() &&
                    myDate.dateSort.getMonth() == monthAgo.getMonth() &&
                    myDate.dateSort.getDate() == monthAgo.getDate()
                ){
                    topValueThen = myDate.topWeight;
                    i = 32;
                    answer = (currentTop - topValueThen);
                    return answer;
                }
            });
            monthAgo.setDate(monthAgo.getDate() + 1);
        }
        return answer;
    }

    function progressDisplay(myProgress){
        if (myProgress >= 0){
            thirdData.textContent = '+' + myProgress + 'kg';
            thirdData.style.color = 'lightgreen';
        } else {
            thirdData.textContent = myProgress + 'kg';
            thirdData.style.color = 'lightcoral';
        }
    }

    function getMonthlyHours(){
        let nowDate = new Date();
        let monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        let workouts = [];
        let allHours = {
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
        data.forEach(workout => {
            let year = Number(workout.workoutDate.substring(0, 4));
            let month = Number(workout.workoutDate.substring(5, 7)) - 1;
            let day = Number(workout.workoutDate.substring(8, 10));
            let myDate = new Date();
            myDate.setFullYear(year);
            myDate.setMonth(month);
            myDate.setDate(day);
            workouts.push({date: myDate, time: workout.time});
        });
        for (let i = 0; i <= 31; i++){
            workouts.forEach(workoutOne => {
                if (workoutOne.date.getFullYear() == monthAgo.getFullYear() &&
                workoutOne.date.getMonth() == monthAgo.getMonth() &&
                workoutOne.date.getDate() == monthAgo.getDate()
            ){
                allHours.hours += Number(workoutOne.time.hours);
                allHours.minutes += Number(workoutOne.time.minutes);
                allHours.seconds += Number(workoutOne.time.seconds);
            }
            });
            monthAgo.setDate(monthAgo.getDate() + 1);
        }
        while(allHours.seconds >= 60){
            allHours.seconds -= 60;
            allHours.minutes += 1;
        }
        while(allHours.minutes >= 60){
            allHours.minutes -= 60;
            allHours.hours += 1;
        }
        if (allHours.seconds.toString().length < 2){
            allHours.seconds = '0' + allHours.seconds;
        }
        if (allHours.minutes.toString().length < 2){
            allHours.minutes = '0' + allHours.minutes;
        }
        if (allHours.hours.toString().length < 2){
            allHours.hours = '0' + allHours.hours;
        }
        return `${allHours.hours}:${allHours.minutes}:${allHours.seconds}`
    }
    
    function getMonthlyWorkouts(){
        return data.length;
    }

    function getAverageDuration(){
        let workoutCount = 0;
        let hoursSum = 0;
        let minutesSum = 0;
        let secondsSum = 0;
        data.forEach(workout => {
            hoursSum += Number(workout.time.hours);
            minutesSum += Number(workout.time.minutes);
            secondsSum += Number(workout.time.seconds);
            workoutCount += 1;
        });
        let hoursHelper = hoursSum;
        let minutesHelper = minutesSum;
        
        hoursSum = Math.floor(hoursSum / workoutCount);
        minutesSum = Math.floor(minutesSum / workoutCount);
        secondsSum = Math.round(secondsSum / workoutCount);

        minutesSum += ((hoursHelper % workoutCount) / workoutCount * 60);
        secondsSum += ((minutesHelper % workoutCount) / workoutCount * 60);

        while (secondsSum >= 60){
            secondsSum -= 60;
            minutesSum += 1;
        }

        while (minutesSum >= 60){
            minutesSum -= 60;
            hoursSum += 1;
        }

        hoursSum = Math.round(hoursSum);
        minutesSum = Math.round(minutesSum);
        secondsSum = Math.round(secondsSum);
        hoursSum = hoursSum.toString();
        minutesSum = minutesSum.toString();
        secondsSum = secondsSum.toString();

        if (hoursSum.length < 2){
            hoursSum = '0' + hoursSum;
        }

        if (minutesSum.length < 2){
            minutesSum = '0' + minutesSum;
        }

        if (secondsSum.length < 2){
            secondsSum = '0' + secondsSum;
        }

        return `${hoursSum}:${minutesSum}:${secondsSum}`
    }
}