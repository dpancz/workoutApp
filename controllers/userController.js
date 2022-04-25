const User = require('../models/user');
const Weight = require('../models/weight');
const Goal = require('../models/goal');
const Workout = require('../models/workout');

const user_login = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let ipAddress = req.body.logged;
    let loggedUpdate = [];

    User.findOne({ username: username, password: password}, function (err, user) {
        if ( user != null ){
            loggedUpdate = user.logged;
            let isAlready = false;

            loggedUpdate.forEach(log => {
                if (log == ipAddress){
                    isAlready = true;
                }
            });

            if (!isAlready){
                loggedUpdate.push(ipAddress);
            }

            User.findByIdAndUpdate(user._id, {logged: loggedUpdate})
                .then(result => {
                    res.redirect('/user/' + user._id);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            res.redirect('/');
        }
    });
};

const user_create = (req, res) => {
    const input = req.body;
    let ipAddress = input.logged;
    if (input.password == input.password2){
        delete input.password2;
        input.logged = [];
        input.logged.push(ipAddress);
        const user = new User(input);
        user.save()
            .then((result) => {
                res.redirect('/user/' + result._id);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.redirect('/register');
    }
};

const user_logged = (req, res) => {
    const id = req.params.id;
    console.log(req.id);
    res.render('home', {id});
};

const user_registered = (req, res) => {
    //when user successfully registered first time
};

//DELETE

const user_deleteShow = (req, res) => {
    const id = req.params.id;
    const deleteStatus = req.params.deleteStatus;
    res.render('homeDelete', {id, deleteStatus});
}

const user_delete = (req, res) => {
    let thisID = req.body.userID;
    let thisPassword = req.body.password;
    User.findOneAndDelete({ _id: thisID, password: thisPassword })
        .then(result => {
            if (result == null){
                res.redirect('/user/delete/' + thisID + '/' + true);
            } else {
                Weight.find({ userID: thisID })
                    .remove()
                    .then(resultWeight => {
                        Goal.find({ userID: thisID })
                            .remove()
                            .then(resultGoal => {
                                Workout.find({ userID: thisID })
                                    .remove()
                                    .then(resultWorkout => {
                                        res.redirect('/');
                                    })
                                    .catch(err4 => {
                                        console.log(err4);
                                    });
                            })
                            .catch(err3 => {
                                console.log(err3);
                            })
                    })
                    .catch(err2 => {
                        console.log(err2);
                    })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

//MY PROFILE

const user_profileShow = (req, res) => {
    const id = req.params.id;
    let username;
    let height;
    let createdAt;
    User.find({ _id: id })
        .then(result => {
            result = result[0];
            username = result.username;
            height = result.height;
            createdAt = result.createdAt.toString();
            res.render('homeProfile', {id, username, height, createdAt});
        })
        .catch(err => {
            console.log(err);
        })
}

const user_profileSave = (req, res) => {
    console.log(req.body);
    let id = req.body.userID;
    let username = req.body.username;
    let height = Number(req.body.height);
    User.findByIdAndUpdate({ _id: id }, { username: username, height: height })
        .then(result => {
            res.redirect('/user/profile/' + id);
        })
        .catch(err => {
            console.log(err);
        });
}

const user_profilePasswordShow = (req, res) => {
    const id = req.params.id;
    const changeStatus = req.params.changeStatus;
    //0 - before, 1 - fine, 2 - wrong
    res.render('homePasswordDelete', { id, changeStatus });
}

const user_profilePasswordSave = (req, res) => {
    const id = req.body.userID;
    if (req.body.newPassword == req.body.newPassword2){
        const oldPassword = req.body.password;
        const newPassword = req.body.newPassword;
        User.findOneAndUpdate({ _id: id, password: oldPassword }, { password: newPassword })
            .then(result => {
                if (result != null){
                    res.redirect('/user/profile/' + id);
                } else {
                    res.redirect('/user/profile/password/' + id + '/' + 2);
                }
            })
            .catch(err => {
                console.log(err);
            })
    } else {
        res.redirect('/user/profile/password/' + id + '/' + 2);
    }
}

//SETTINGS

const user_settingsShow = (req, res) => {
    const id = req.params.id;
    let dayModeData;
    let languageData;

    User.find({ _id: id })
        .then(result => {
            dayModeData = result[0].dayMode;
            languageData = result[0].language;
            res.render('homeSettings', {id, dayModeData, languageData});
        })
        .catch(err => {
            console.log(err);
        });
}

const user_settingsSave = (req, res) => {
    const id = req.body.userID;
    let language = req.body.language;
    let dayMode = req.body.dayMode;
    User.findOneAndUpdate({ _id: id }, { language, dayMode })
        .then(result => {
            res.redirect('/user/settings/' + id);
        })
        .catch(err => {
            console.log(err);
        });
}

//LOG OUT

const user_logOut = (req, res) => {
    const id = req.params.id;
    const ip = req.params.ip;
    let loggedUpdate;
    User.findOne({ _id: id })
        .then(result => {
            loggedUpdate = result.logged;
            let isIn = false;
            let index;
            let i = 0;

            loggedUpdate.forEach(log => {
                if (log == ip){
                    isIn = true;
                    index = i;
                }
                i++;
            });

            if (isIn){
                loggedUpdate.splice(index, 1);
                User.findByIdAndUpdate(id, {logged: loggedUpdate})
                    .then(result => {
                        res.redirect('/');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                res.redirect('/');
            }
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    user_login,
    user_logged,
    user_create,
    user_registered,

    user_deleteShow,
    user_delete,

    user_profileShow,
    user_profileSave,
    user_profilePasswordShow,
    user_profilePasswordSave,

    user_settingsShow,
    user_settingsSave,

    user_logOut
}