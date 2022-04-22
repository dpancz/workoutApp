
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const addWeightBtn = document.querySelector('.addWeightBtn');
const addWeightDiv = document.querySelector('.addWeightDiv');
const closeBtn = document.querySelector('.fa-xmark'); 
const monthImprovement = document.querySelector('.monthImprovement');
const BMINumber = document.querySelector('.BMINumber');

const userID = document.querySelector('#userID');

userID.value = id;
let myData = JSON.parse(data);
//height = height

let dates = [];
let weights = [];
if (myData.length > 0){
getDatesWeights();
displayChart();
getImprovement();
getBMI();
}

addWeightBtn.addEventListener('click', () => {
    addingShow();
});

closeBtn.addEventListener('click', () => {
    addingHide();
});

function addingShow(){
    addWeightDiv.style.display = 'flex';
}

function addingHide(){
    addWeightDiv.style.display = 'none';
}

function getDatesWeights(){
    myData.forEach(data => {
        dates.push(data.date);
        weights.push(data.weightNumber);
    });
}

function displayChart(){
    let weightChart = new Chart(ctx, {
        type:'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Weight',
                data: weights,
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

function getImprovement(){
    let dateNow = new Date();
    let actualDates = [];
    getActualDates();
    let closestWeight = weightCloseToMonth();
    let difference = closestWeight.weightNumebr - actualDates[0].weightNumebr;
    let differenceDisplay;
    if (difference >= 0){
        differenceDisplay = "+" + difference.toString();
        monthImprovement.style.color = 'lightgreen';
    } else {
        differenceDisplay = difference.toString();
        monthImprovement.style.color = 'lightcoral';
    }
    monthImprovement.textContent = differenceDisplay;


    function getActualDates(){
        myData.forEach(dataOne => {
            let myDate = dataOne.date;
            let myNewDate = new Date();
            myNewDate.setFullYear(Number(myDate.substring(0, 4)));
            myNewDate.setMonth(Number(myDate.substring(5, 7))-1);
            myNewDate.setDate(Number(myDate.substring(8, 10)));
            myNewDate.setHours(0, 0, 0, 0);
            actualDates.push({weightNumebr: dataOne.weightNumber, date: myNewDate});
        });
        actualDates.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
        })
    }

    function weightCloseToMonth(){
        let closestDate = undefined;
        let monthAgo = new Date();
        monthAgo.setHours(0, 0, 0, 0);
        monthAgo.setMonth(monthAgo.getMonth() - 1);

        for (let i = 0; i <= 31; i++){
            actualDates.forEach(myDate => {
                if (myDate.date.getFullYear() == monthAgo.getFullYear() &&
                    myDate.date.getMonth() == monthAgo.getMonth() &&
                    myDate.date.getDate() == monthAgo.getDate()
                ){
                    closestDate = myDate;
                    i = 32;
                    return closestDate;
                }
            });
            monthAgo.setDate(monthAgo.getDate() + 1);
        }
        return closestDate;
    }
}

function getBMI(){
    let currentWeight = getCurrentWeight();
    let currentBMI = BMICount();
    let BMIstatus = checkBMIStatus();
    BMINumber.textContent = currentBMI + " " + BMIstatus;


    function getCurrentWeight(){
        return myData[myData.length - 1].weightNumber;
    }

    function BMICount(){
        return (currentWeight / Math.pow(height/100, 2)).toFixed(2);
    }

    function checkBMIStatus(){
        if (currentBMI < 18.5){
            BMINumber.style.color = 'lightyellow';
            return '(underweight)';
        } else if (currentBMI >= 18.5 && currentBMI < 25){
            BMINumber.style.color = 'lightgreen';
            return '(healthy weight)';
        } else if (currentBMI >= 25 && currentBMI < 30){
            BMINumber.style.color = 'lightyellow';
            return '(overweight)';
        } else if (currentBMI >= 30){
            BMINumber.style.color = 'red';
            return '(obesity)';
        }
    }
}