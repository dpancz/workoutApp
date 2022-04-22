const yourWeightBtn = document.querySelector('.yourWeightBtn');
const personalBestBtn = document.querySelector('.personalBestBtn');
const statisticsBtn = document.querySelector('.statisticsBtn');
const logo = document.querySelector('.logo');

yourWeightBtn.addEventListener('click', () => {
    window.location.href = '/statistics/yourWeight/' + id;
});

logo.addEventListener('click', () => {
    window.location.href = '/user/' + id;
});

personalBestBtn.addEventListener('click', () => {
    window.location.href = '/statistics/personalBest/' + id;
});

statisticsBtn.addEventListener('click', () => {
    window.location.href = '/statistics/workoutStats/' + id;
});