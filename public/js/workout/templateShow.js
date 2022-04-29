const firstColumn = document.querySelector('.firstColumn');
const secondColumn = document.querySelector('.secondColumn');
const thirdColumn = document.querySelector('.thirdColumn');

const createNew = document.querySelector('.createNew');

if (data.length > 0){
    data = JSON.parse(data);

    displayDataTemplates();

    function displayDataTemplates(){

        let index = 1;
        data.forEach(template => {
            if (index%3 == 1){
                displayTemplate(template, firstColumn);
            } else if (index%3 == 2){
                displayTemplate(template, secondColumn);
            } else if (index%3 == 0){
                displayTemplate(template, thirdColumn);
            }
            index++;
        });

        function displayTemplate(template, column){
            const templateDiv = document.createElement('div');
            const templateTitle = document.createElement('div');
            const showIcon = document.createElement('i');
            const trashIcon = document.createElement('i');

            templateDiv.classList.add('templateDiv');
            templateTitle.classList.add('templateTitle');
            showIcon.classList.add('fa-solid');
            showIcon.classList.add('fa-angle-down');
            trashIcon.classList.add('fa-solid');
            trashIcon.classList.add('fa-trash');

            templateTitle.textContent = template.templateName;

            templateDiv.appendChild(templateTitle);
            templateDiv.appendChild(showIcon);
            templateDiv.appendChild(trashIcon);
            column.appendChild(templateDiv);

            let opened = false;
            let rollHeight = linesCounter(template.workout);

            showIcon.addEventListener('click', () => {
                if (!opened){
                    showIconClick(templateDiv, rollHeight, showIcon);
                    displayWorkout(template.workout, templateDiv);
                    opened = true;
                } else {
                    showIconClickHide(templateDiv, rollHeight, showIcon);
                    hideWorkout(templateDiv, templateTitle, showIcon, trashIcon);
                    opened = false;
                }
            });

            trashIcon.addEventListener('click', async () => {
                let templateID = template._id;
                fetch('/template/delete', {
                    method: 'post',
                    body: JSON.stringify({templateID}),
                    headers: { 'Content-Type' : 'application/json' }
                })
                    .then((response) => {
                        if (response.ok){
                            let index = 0;
                            data.forEach(thisTemplate => {
                                if (thisTemplate._id == templateID){
                                    data.splice(index, 1);
                                }
                                index++;
                            });
                            firstColumn.textContent = '';
                            secondColumn.textContent = '';
                            thirdColumn.textContent = '';
                            displayDataTemplates();
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });
            })

        function linesCounter(workout){
            let lines = 0;
            workout.forEach(exercise => {
                exercise.sets.forEach(set => {
                    lines++;
                });
                lines++;
            });
            return 300 + lines*30;
        }

        function showIconClick(templateDiv, rollHeight, showIcon){
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
                    showIcon.style.transform = `rotateZ(${angle}deg)`;
                    angle+=2;
                } else if (angle == 180){
                    clearInterval(timer2);
                }
            }, 2);
        }

        function showIconClickHide(templateDiv, rollHeight, showIcon){
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
                    showIcon.style.transform = `rotateZ(${angle}deg)`;
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

        function hideWorkout(templateDiv, templateTitle, showIcon, trashIcon){
            templateDiv.textContent = '';
            templateDiv.appendChild(templateTitle);
            templateDiv.appendChild(trashIcon);
            templateDiv.appendChild(showIcon);
        }
    }
}

    createNew.addEventListener('click', () => {
        window.location.href = '/template/add/' + id;
    });
}