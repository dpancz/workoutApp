const Workout = require('../models/workout');
const Weight = require('../models/weight');
const Goal = require('../models/goal');

const goals_show = (req, res) => {
    const id = req.params.id;
    let goalsData = [];
    let weightData = [];
    let workoutData = [];
    Workout.find({ userID: id })
        .then(workoutResult => {
            workoutData = JSON.stringify(workoutResult);
            Weight.find({ userID: id })
                .then(weightResult => {
                    weightData = JSON.stringify(weightResult);
                    Goal.find({ userID: id })
                        .then(goalResult => {
                            goalsData = JSON.stringify(goalResult);
                            res.render('goalsShow', {id, goalsData, weightData, workoutData});
                        })
                        .catch(err3 => {
                            console.log(err3);
                        })
                })
                .catch(err2 => {
                    console.log(err2);
                })
        })
        .catch(err => {
            console.log(err);
        })
}

const goals_add = (req, res) => {
    let data = req.body.data;
    if (data.lastWeight == undefined){
        res.render('goalsNew', {weightCurrent: 0, id: data});
    } else {
        res.render('goalsNew', {weightCurrent: data.lastWeight, id: data.id});
    }
}

const goals_save = (req, res) => {
    let data = req.body;
    let goalType = data.goalType;
    let title = data.title;
    let userID = data.id;
    userID = JSON.parse(userID).id;
    let goal;
    if (goalType == 'Weight'){
        let weightStart = data.weightStart;
        let weightGoal = data.weightGoal;
        goal = {
            weightStart,
            weightGoal
        }
    } else if (goalType == 'Workout quantity'){
        let workouts = data.workouts;
        let days = data.days;
        goal = {
            workouts,
            days
        }
    }

    let newGoal = new Goal({userID, title, goal, goalType});
    newGoal.save()
        .then(result => {
            res.redirect('/goals/' + userID);
        })
        .catch(err => {
            console.log(err);
        });
}

const oneGoal_show = (req, res) => {
    const goalID = req.params.goalID;
    let id;
    let goalData;
    let weightData;
    let workoutData;
    Goal.findOne({ _id: goalID })
        .then(goalResult => {
            id = goalResult.userID;
            goalData = JSON.stringify(goalResult);
            Workout.find({ userID: id })
                .then(workoutResult => {
                    workoutData = JSON.stringify(workoutResult);
                    Weight.find({ userID: id })
                        .then(weightResult => {
                            weightData = JSON.stringify(weightResult);
                            res.render('oneGoalShow', {id, goalData, weightData, workoutData});
                        })
                        .catch(err3 => {
                            console.log(err3);
                        })
                })
                .catch(err2 => {
                    console.log(err2);
                })
        })
        .catch(err => {
            console.log(err);
        })
}

const oneGoal_delete = (req, res) => {
    const goalID = req.body.goalID;
    const id = req.body.id;
    Goal.findByIdAndDelete(goalID)
        .then(result => {
            res.end();
        })
        .catch(err => {
            console.log(err);
        })
}

const oneGoal_done = (req, res) => {
    const goalID = req.body.goalID;
    Goal.findByIdAndUpdate(goalID, {done: true})
        .then(result => {
            res.end();
        })
        .catch(err => {
            console.log(err);
            res.end();
        });
}

module.exports = {
    goals_show,
    goals_add,
    goals_save,

    oneGoal_show,
    oneGoal_delete,
    oneGoal_done
}