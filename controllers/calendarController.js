const Workout = require('../models/workout');

const calendar_show = (req, res) => {
    const id = req.params.id;
    let data = [];
    Workout.find({ userID: id })
        .then(result => {
            data = JSON.stringify(result);
            res.render('calendar', {id, data});
        })
        .catch(err => {
            console.log(err);
        })
};

const calendar_add = (req, res) => {

};

module.exports = {
    calendar_show,
    calendar_add
}