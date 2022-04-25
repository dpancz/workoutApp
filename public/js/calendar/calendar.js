let date = new Date();
let dateNow = new Date();
//let month = date.getMonth(); // 0-styczen 11-grudzien
const calendarDiv = document.querySelector('.calendarDiv');
const monthText = document.querySelector('.monthText');
const arrowLeft = document.querySelector('.arrowLeft');
const arrowRight = document.querySelector('.arrowRight');

let dateRectColor = [];
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
                    weight: 4,
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
                    weight: 4,
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
                        weight: 4,
                    }
                ]
            }
        ]
    }
];
*/

clearColors();
createDateRect();

function getDaysNumber(date){
    let year = date.getFullYear();
    let monthTextContent;
    switch(date.getMonth()){
        case 0:
            monthTextContent = 'January';
            break;
        case 1:
            monthTextContent = 'February';
            break;
        case 2:
            monthTextContent = 'March';
            break;
        case 3:
            monthTextContent = 'April';
            break;
        case 4:
            monthTextContent = 'May';
            break;
        case 5:
            monthTextContent = 'June';
            break;
        case 6:
            monthTextContent = 'July';
            break;
        case 7:
            monthTextContent = 'August';
            break;
        case 8:
            monthTextContent = 'September';
            break;
        case 9:
            monthTextContent = 'October';
            break;
        case 10:
            monthTextContent = 'November';
            break;
        case 11:
            monthTextContent = 'December';
            break;


    }
    monthText.textContent = monthTextContent;
    switch(date.getMonth()){
        case 0: case 2: case 4: case 6: case 7: case 9: case 11:
            return 31;
        case 3: case 5: case 8: case 10:
            return 30;
        case 1:
            if ((year % 4 == 0 && year % 100 != 0 ) || (year % 400 == 0)){
                return 29;
            } else {
                return 28;
            };
    }
};

function getFirstDateWeekday(date){
    let dateHelper = date;
    dateHelper.setDate(1);
    let dayOfWeek = dateHelper.getDay() - 1;
    if (dayOfWeek == -1){
        dayOfWeek = 6;
    }
    for (let i = 1; i <= getDaysNumber(dateHelper); i++){
        //console.log(getDaysNumber(dateHelper));
        //console.log(dayOfWeek)
        document.querySelector(`.dateRectText${dayOfWeek}`).textContent = i;
        dayOfWeek++;
    }
    for (let i = 0; i < 42; i++){
        let chosen = false;

        if (document.querySelector(`.dateRectText${i}`).textContent == ""){
            dateRectColor[i].mouseout = '#333333';
        }
        if (document.querySelector(`.dateRectText${i}`).textContent == dateNow.getDate() && date.getMonth() == dateNow.getMonth() && date.getFullYear() == dateNow.getFullYear()){
            dateRectColor[i].mouseout = '#049e87';
            document.querySelector(`.dateRect${i}`).style.color = '#ffffff';
        }

        colorDateRect(i, false);

        document.querySelector(`.dateRect${i}`).addEventListener('mouseover', () => {
            if (document.querySelector(`.dateRectText${i}`).textContent == ""){
                dateRectColor[i].mouseover = '#333333';
            } else {
                dateRectColor[i].mouseover = '#888888';
            }
            colorDateRect(i, true);
        });

        document.querySelector(`.dateRect${i}`).addEventListener('mouseout', () => {
            colorDateRect(i, false);
        });

        document.querySelector(`.dateRect${i}`).addEventListener('click', () => {
            if (chosen){
                chosen = false;
            } else {
                chosen = true;
            }
            dateRectClicked(i, chosen);
        });
    }

    displayWorkouts(data);
}

function createDateRect(){
    for(let i = 0; i < 42; i++){
        if(i % 7 == 0){
            const dateRectRow = document.createElement('div');
            dateRectRow.classList.add(`dateRectRow`);
            dateRectRow.classList.add(`dateRectRow${i / 7}`);
            calendarDiv.appendChild(dateRectRow);
        }
        const dateRect = document.createElement('div');
        dateRect.classList.add('dateRect');
        dateRect.classList.add(`dateRect${i}`);
        const dateRectText = document.createElement('div');
        dateRect.classList.add('dateRectText');
        dateRect.classList.add(`dateRectText${i}`);
        dateRect.appendChild(dateRectText);
        //dateRect.textContent = i;
        document.querySelector(`.dateRectRow${Math.floor(i / 7)}`).appendChild(dateRect);

        if(i % 7 == 5 || i % 7 == 6){
            dateRectColor[i].mouseout = '#666666';
        } else {
            dateRectColor[i].mouseout = '#444444';
        }
        colorDateRect(i, false);
    }

    getFirstDateWeekday(date);
}

function clearCalendar(){
    calendarDiv.textContent = "";
    clearColors(dateRectColor);
}

function clearColors(){
    dateRectColor = [];
    for (let i = 0; i < 42; i++){
        dateRectColor.push({ mouseover: "#ffffff", mouseout: "#ffffff", mouseoutBackup: "#ffffff"});
    }
}

function colorDateRect(index, over){
    if(over){
        document.querySelector(`.dateRect${index}`).style.backgroundColor = dateRectColor[index].mouseover;
    } else {
        document.querySelector(`.dateRect${index}`).style.backgroundColor = dateRectColor[index].mouseout;
    }
}

function dateRectClicked(index, chosen){
    if(chosen){
        dateRectColor[index].mouseoutBackup = dateRectColor[index].mouseout;
        dateRectColor[index].mouseout = dateRectColor[index].mouseover;
    } else {
        dateRectColor[index].mouseout = dateRectColor[index].mouseoutBackup;
    }
}

arrowRight.addEventListener('click', () => {
    let currentMonth = date.getMonth();
    date.setMonth(currentMonth + 1);
    clearCalendar();
    createDateRect();
});

arrowLeft.addEventListener('click', () => {
    let currentMonth = date.getMonth();
    date.setMonth(currentMonth - 1);
    clearCalendar();
    createDateRect();
});

//display workouts

function displayWorkouts(workoutsList){

    workoutsList.forEach(oneWorkout => {
        let oneWorkoutDate = getDateOf(oneWorkout);
        if (
            date.getFullYear() == oneWorkoutDate.year &&
            date.getMonth() == oneWorkoutDate.month - 1
        ){
            showWorkout(oneWorkoutDate.day, oneWorkout);
        } else {
            console.log("not here")
        }
    });

    function getDateOf(thisWorkout){
        let thisDate = thisWorkout.workoutDate;
        let thisYear = Number(thisDate.slice(0, 4));
        let thisMonth = Number(thisDate.slice(5, 7));
        let thisDay = Number(thisDate.slice(8, 10));
        return { year: thisYear, month: thisMonth, day: thisDay };
    }

    function showWorkout(day, thisWorkout){
        for(let i = 0; i < 42; i++){
            if(document.querySelector(`.dateRectText${i}`).textContent == day){
                const workoutShowDiv = document.createElement('div');
                const workoutInfo = document.createElement('div');

                workoutShowDiv.classList.add('workoutShowDiv');
                workoutInfo.classList.add('workoutInfo');

                insideWorkoutInfo(workoutInfo, thisWorkout);
                addShareButton(workoutInfo, thisWorkout);

                if( i / 7 >= 3){
                    workoutInfo.style.bottom = '70%';
                } else {
                    workoutInfo.style.top = '60%';
                }

                workoutShowDiv.textContent = thisWorkout.workoutName;
                workoutShowDiv.style.backgroundColor = thisWorkout.workoutColor;

                if(workoutShowDiv.style.backgroundColor == 'black'){
                    workoutShowDiv.style.color = 'white';
                }

                workoutShowDiv.appendChild(workoutInfo);
                document.querySelector(`.dateRect${i}`).appendChild(workoutShowDiv);

                workoutShowDiv.addEventListener('mouseover', () => {
                    workoutInfo.style.display = 'flex';
                });

                workoutShowDiv.addEventListener('mouseout', () => {
                    workoutInfo.style.display = 'none';
                });
            }
        }

        function insideWorkoutInfo(div, myWorkout){
            const title = document.createElement('div');
            const timeInfo = document.createElement('div');
            const exercisesInfoDiv = document.createElement('div');
            
            title.classList.add('workoutInfoTitle');
            timeInfo.classList.add('workoutInfoTime');
            exercisesInfoDiv.classList.add('exercisesInfoDiv');

            title.textContent = myWorkout.workoutName;
            timeInfo.textContent = "Duration: " + setTime(myWorkout.time.hours, myWorkout.time.minutes, myWorkout.time.seconds);

            div.appendChild(title);
            div.appendChild(timeInfo);
            div.appendChild(exercisesInfoDiv);

            myWorkout.workout.forEach(exercise => {
                const thisExercise = document.createElement('div');
                const thisExerciseSets = document.createElement('div');

                thisExercise.classList.add('exerciseInfo');
                thisExerciseSets.classList.add('exerciseSetsDiv');

                thisExercise.textContent = exercise.exerciseName;

                exercise.sets.forEach(set => {
                    const setInfo = document.createElement('div');

                    setInfo.classList.add('setInfo');

                    setInfo.textContent = `${set.reps} x ${set.weight}kg`;

                    thisExerciseSets.appendChild(setInfo);
                });

                let opened = false;

                thisExercise.addEventListener('click', () => {
                    if(!opened){
                        thisExerciseSets.style.display = 'flex';
                        opened = true;
                    } else {
                        thisExerciseSets.style.display = 'none'; 
                        opened = false
                    }
                });

                thisExercise.appendChild(thisExerciseSets);
                exercisesInfoDiv.appendChild(thisExercise);
            });
        }

        function addShareButton(div, myWorkout){
            const shareBtn = document.createElement('div');
            const shareIcon = document.createElement('i');

            shareBtn.classList.add('shareBtn');
            shareIcon.classList.add('fa-solid');
            shareIcon.classList.add('fa-share');

            shareBtn.appendChild(shareIcon);
            div.appendChild(shareBtn);

            let workoutID = myWorkout._id;

            let urlStart = document.location.origin + '/share/' + workoutID; // + link to workout

            shareBtn.addEventListener('click', () => {
                const myInput = document.createElement('input');
                shareBtn.appendChild(myInput);
                myInput.value = urlStart;
                myInput.select();
                document.execCommand('Copy');
                myInput.remove();
                displayCopied(shareBtn);
            });

            function displayCopied(div){
                const copiedDiv = document.createElement('div');

                copiedDiv.classList.add('copiedDiv');

                copiedDiv.textContent = 'Link Copied To Clipboard';

                div.appendChild(copiedDiv);

                let opacity = 1;

                let timer1 = setTimeout(() => {
                    let timer2 = setInterval(() => {
                        if(opacity > 0){
                            copiedDiv.style.opacity = opacity;
                            opacity -= 0.01;
                        } else if (opacity <= 0){
                            copiedDiv.remove();
                            clearInterval(timer2);
                        }
                    }, 5);
                    clearTimeout(timer1);
                }, 1500);
            }
        }
    }

    function setTime(hours, minutes, seconds){
        let hrs = hours.toString();
        let mins = minutes.toString();
        let secs = seconds.toString();

        if(hrs.length < 2){
            hrs = '0' + hrs;
        }
        if(mins.length < 2){
            mins = '0' + mins;
        }
        if(secs.length < 2){
            secs = '0' + secs;
        }

        return `${hrs}:${mins}:${secs}`;
    }

}