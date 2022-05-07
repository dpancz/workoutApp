const Workout = require('../models/workout');
const Template = require('../models/template');

const show_add = (req, res) => {
    const id = req.params.id;
    Template.find({ userID: id })
        .then(result => {
            let data = JSON.stringify(result)
            res.render('workoutAdd', {id, data, date: 1});
        })
        .catch(err => {
            console.log(err);
        })
}

const show_add_date = (req, res) => {
    const id = req.params.id;
    const date = req.params.date;
    Template.find({ userID: id })
        .then(result => {
            let data = JSON.stringify(result)
            res.render('workoutAdd', {id, data, date});
        })
        .catch(err => {
            console.log(err);
        })
}

const send_workout = (req, res) => {
    let workout = req.body.workoutInputSend;
    workout = JSON.parse(workout);
    
    let workoutDate = workout.workoutDate;
    if (workoutDate.length > 12){
        let workoutDateHelper = workoutDate;
        workoutDate = [];
        let smallerThanTen = false;
        while(!smallerThanTen){
            workoutDate.push(workoutDateHelper.substring(0, 10));
            workoutDateHelper = workoutDateHelper.replace(workoutDateHelper.substring(0, 11), '');
            if(workoutDateHelper.length < 10){
                smallerThanTen = true;
            }
        }
        console.log(workoutDate);
        workoutDate.forEach(thisDate => {
            workout.workoutDate = thisDate;
            const newWorkout = new Workout(workout);
            newWorkout.save()
                .catch(err => {
                    console.log(err);
                })
        })
        res.redirect('/user/' + workout.userID);
    } else {
        const newWorkout = new Workout(workout);
        newWorkout.save()
            .then(result => {
                res.redirect('/user/' + workout.userID);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = {
    show_add,
    send_workout,
    show_add_date
};