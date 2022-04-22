const exercisesList = document.querySelector('.exercisesList');

data = JSON.parse(data);

let allSets = [];
let PBs = [];

countPBs();
displayPBs();

function countPBs(){
    data.forEach(thisWorkout => {
        thisWorkout.workout.forEach(inWorkout => {
            let topWeight = 0;
            inWorkout.sets.forEach(set => {
                if(Number(set.weight) > topWeight){
                    topWeight = Number(set.weight);
                }
            });
            allSets.push({exerciseName: inWorkout.exerciseName, topWeight, date: thisWorkout.workoutDate});
        });
    });

    getPBs();

    function getPBs(){
        let j = 0;
        allSets.forEach(setName => {
            if(setName != null){
                let thisName = setName.exerciseName;
                let topValue = setName.topWeight;
                let i = 0;
                allSets.forEach(set => {
                    if(i != j){
                        if (set.exerciseName == thisName){
                            if(set.topWeight > topValue){
                                topValue = set.topWeight;
                            }
                            setName.topWeight = topValue;
                            allSets.splice(i, 1);
                        }
                    }
                    i++;
                });
            }
            j++;
        });

        PBs = allSets;
    }
}

function displayPBs(){
    let index = 0;
    PBs.forEach(PB => {
        if (index % 3 == 0){
            const PBRow = document.createElement('div');

            PBRow.classList.add('PBRow');
            PBRow.classList.add(`PBRow${index/3}`);

            exercisesList.appendChild(PBRow);
        }

        const PBDiv = document.createElement('div');
        const PBTitle = document.createElement('div');
        const PBWeight = document.createElement('div');
        const PBDate = document.createElement('div');

        PBDiv.classList.add('PBDiv');
        PBDiv.classList.add(`PBDiv${index}`);
        PBTitle.classList.add('PBTitle');
        PBTitle.classList.add(`PBTitle${index}`);
        PBWeight.classList.add('PBWeight');
        PBWeight.classList.add(`PBWeight${index}`);
        PBDate.classList.add('PBDate');
        PBDate.classList.add(`PBDate${index}`);

        PBTitle.textContent = PB.exerciseName;
        PBWeight.textContent = PB.topWeight + " kg";
        PBDate.textContent = PB.date;

        PBDiv.appendChild(PBTitle);
        PBDiv.appendChild(PBWeight);
        PBDiv.appendChild(PBDate);
        document.querySelector(`.PBRow${Math.floor(index/3)}`).appendChild(PBDiv);

        PBDiv.addEventListener('mouseover', () => {
            
        });

        PBDiv.addEventListener('mouseout', () => {
            
        });

        index++;
    });
}