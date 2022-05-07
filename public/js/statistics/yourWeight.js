
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const addWeightBtn = document.querySelector('.addWeightBtn');
const addWeightDiv = document.querySelector('.addWeightDiv');
const closeBtn = document.querySelector('.fa-xmark'); 
const monthImprovement = document.querySelector('.monthImprovement');
const BMINumber = document.querySelector('.BMINumber');

let myData = JSON.parse(data);
//height = height
let weightChart;
let colorMode = '#ffffff';

//cookies
wholeCookies('partials/statisticsLeftMenu.css');
wholeCookies('statistics/yourWeight.css');

if (checkCookiesDayMode() == 'true'){
    colorMode = '#000000';
}

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
    weightChart = new Chart(ctx, {
        type:'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Weight',
                data: weights,
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

function getImprovement(){
    let dateNow = new Date();
    let actualDates = [];
    getActualDates();
    let closestWeight = weightCloseToMonth();
    let difference = actualDates[0].weightNumebr - closestWeight.weightNumebr;
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
        return weights[weights.length - 1];
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

// send

const addWeightBtn2 = document.querySelector('#addWeightBtn');

addWeightBtn2.addEventListener('click', () => {
    sendAll();
});

async function sendAll(){

    if (document.querySelector('#weightInput').value != ''){

        let userIDSend = id;
        let weightSend = document.querySelector('#weightInput').value;

        await fetch('/statistics/yourWeight', {
            method: 'POST',
            body: JSON.stringify({ userID: userIDSend, weightNumber: weightSend }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(result => result.json())
        .then(resData => {
            let newDate = resData.weight.date;
            let newWeight = resData.weight.weightNumber;
            dates.push(newDate);
            weights.push(newWeight);
            weightChart.destroy();
            displayChart();
            getBMI();
            differenceSecond();
            addingHide();
        })
        .catch(err => {
            console.log(err);
            somethingWrong('Something went wrong...');
        })

    } else {

        somethingWrong('Weight is required');

    }

}

function differenceSecond(){

    let lastImprovement = Number(monthImprovement.textContent);
    let currentDate = Number(weights[weights.length - 1]);
    let dateBefore = Number(weights[weights.length - 2]);

    let newDifference = currentDate - (dateBefore - lastImprovement);

    let newDifferenceDisplay = null;

    if (newDifference >= 0){
        newDifferenceDisplay = "+" + newDifference.toString();
        monthImprovement.style.color = 'lightgreen';
    } else {
        newDifferenceDisplay = newDifference.toString();
        monthImprovement.style.color = 'lightcoral';
    }
    monthImprovement.textContent = newDifferenceDisplay;

}

function somethingWrong(text){
    const alertDiv = document.createElement('div');

    alertDiv.classList.add('alertDiv');

    alertDiv.textContent = text

    addWeightDiv.appendChild(alertDiv);
}