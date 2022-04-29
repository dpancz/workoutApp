const Template = require('../models/template');

//SHOW TEMPLATES

const template_show = (req, res) => {
    const id = req.params.id;
    let data;
    Template.find({ userID: id })
        .then(result => {
            data = JSON.stringify(result);
            res.render('templateShow', {id, data});
        })
        .catch(err => {
            console.log(err);
        });
};

//ADD TEMPLATE

const template_add_show = (req, res) => {
    const id = req.params.id;
    res.render('workoutTemplate', {id});
};

const template_add_save = (req, res) => {
    let data = req.body.workout;
    data = JSON.parse(data);
    const template = new Template(data);
    template.save()
        .then(result => {
            res.redirect('/template/' + data.userID);
        })
        .catch(err => {
            console.log(err);
        });
};

//DELETE TEMPLATE

const template_delete = (req, res) => {
    Template.findOneAndDelete({ _id: req.body.templateID })
        .then(result => {
            res.end();
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {

    template_show,

    template_add_show,
    template_add_save,

    template_delete

}