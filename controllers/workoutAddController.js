const Workout = require('../models/workout');
const Template = require('../models/template');

const show_add = (req, res) => {
    const id = req.params.id;
    Template.find({ userID: id })
        .then(result => {
            let data = JSON.stringify(result)
            res.render('workoutAdd', {id, data});
        })
        .catch(err => {
            console.log(err);
        })
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