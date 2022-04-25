const Workout = require('../models/workout');
let workoutDate = setDate();

const start_workout = (req, res) => {
    const id = req.params.id;
    res.render('workoutLive', {id});
};

const workout_done = (req, res) => {
    const data = req.body.workoutInputSend;
    res.render('workoutLiveDone', {data});
};

const workout_save = (req, res) => {
    let id = req.body.workoutIDSend;
    id = JSON.parse(id);
    let workout = req.body.workoutSend;
    workout = JSON.parse(workout);
    let timer = req.body.workoutTimerSend;
    timer = JSON.parse(timer);
    console.log(`id: ${id}, workout: ${workout}, timer: ${timer}`);
    const newWorkout = {userID: id, workout, time: timer, workoutName: 'Live-Workout', workoutColor: 'lightcoral', workoutDate};
    const workoutToSave = new Workout(newWorkout);
    workoutToSave.save()
        .then((result) => {
            res.redirect('/user/' + id);
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    start_workout,
    workout_done,
    workout_save,
}

function setDate(){
    let date = new Date();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    if (month.length == 1){
        month = '0' + month;
    }
    if (day.length == 1){
        day = '0' + day;
    }
    return `${date.getFullYear()}-${month}-${day}`;
}