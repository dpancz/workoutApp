const Workout = require('../models/workout');
const Weight = require('../models/weight');

const calendar_show = (req, res) => {
    const id = req.params.id;
    let data = [];
    let weightData;
    Weight.find({ userID: id })
        .then(weightResult => {
            weightData = JSON.stringify(weightResult);
        Workout.find({ userID: id })
            .then(result => {
                data = JSON.stringify(result);
                res.render('calendar', {id, data, weightData});
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err2 => {
            console.log(err2);
        })
};

module.exports = {
    calendar_show,
}