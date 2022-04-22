const Workout = require('../models/workout');

const show_add = (req, res) => {
    const id = req.params.id;
    res.render('workoutAdd', {id});
}

const send_workout = (req, res) => {
    let workout = req.body.workoutInputSend;
    workout = JSON.parse(workout);
    
    const newWorkout = new Workout(workout);
    newWorkout.save()
        .then(result => {
            res.redirect('/user/' + workout.userID);
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = {
    show_add,
    send_workout
};