const User = require('../models/user');
const Workout = require('../models/workout');

const share_show = (req, res) => {
    const workoutID = req.params.workoutID;
    let data;
    let userID;
    let username;
    Workout.find({ _id: workoutID })
        .then(result => {
            data = result[0];
            userID = data.userID;
            User.find({ _id: userID })
                .then(resultUser => {
                    username = resultUser[0].username;
                    data = JSON.stringify(data);
                    res.render('shareShow', {data, username});
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    share_show,
}