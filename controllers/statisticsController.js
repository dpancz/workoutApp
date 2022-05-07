const Workout = require('../models/workout');
const Weight = require('../models/weight');
const User = require('../models/user');

const personalBest_show = (req, res) => {
    const id = req.params.id;
    let data = [];
    Workout.find({ userID: id })
        .then(result => {
            data = JSON.stringify(result);
            res.render('personalBest', {id, data});
        })
        .catch(err => {
            console.log(err);
        })
};

const yourWeight_show = (req, res) => {
    const id = req.params.id;
    let data = [];
    let height = 0;

    Weight.find({ userID: id })
        .then(result => {
            data = JSON.stringify(result);
            User.find({ userID: id })
                .then(resultUser => {
                    height = resultUser[0].height;
                    res.render('yourWeight', {id, data, height});
                })
                .catch(err2 => {
                    console.log(err2);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

const yourWeight_save = (req, res) => {
    const data = req.body;
    let date = new Date();
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    if (month.length < 2){
        month = '0' + month;
    }
    if (day.length < 2){
        day = '0' + day;
    }
    let newWeight = new Weight({userID: req.body.userID, weightNumber: req.body.weightNumber, date: `${year}-${month}-${day}`});
    newWeight.save()
        .then(result => {
            res.end(JSON.stringify({weight: result}));
        })
        .catch(err => {
            console.log(err);
        })
}

const stats_show = (req, res) => {
    const id = req.params.id;
    let data = [];

    Workout.find({ userID: id })
        .then(result => {
            data = JSON.stringify(result);
            res.render('workoutStats', {id, data});
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = {
    personalBest_show,
    yourWeight_show,
    yourWeight_save,
    stats_show
}