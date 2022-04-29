const addWorkout = document.querySelector('.addWorkout');
const calendar = document.querySelector('.calendar');
const statistics = document.querySelector('.statistics');
const yourGoals = document.querySelector('.yourGoals');
const templates = document.querySelector('.templates');
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    window.location.href = '/user/' + id;
});

addWorkout.addEventListener('click', () => {
    window.location.href = '/workout-add/' + id;
});

calendar.addEventListener('click', () => {
    window.location.href = '/calendar/' + id;
});

statistics.addEventListener('click', () => {
    window.location.href = '/statistics/workoutStats/' + id;
});

yourGoals.addEventListener('click', () => {
    window.location.href = '/goals/' + id;
});

templates.addEventListener('click', async () => {
    window.location.href = '/template/' + id;
});