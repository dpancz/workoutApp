const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const workoutLiveRoutes = require('./routes/workoutLiveRoutes');
const workoutAddRoutes = require('./routes/workoutAddRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const goalsRoutes = require('./routes/goalsRoutes');
const shareRoutes = require('./routes/shareRoutes');
const templateRoutes = require('./routes/templateRoutes');

const app = express();
const server = http.createServer(app);

const dbURI = "mongodb+srv://dominik:test123@cluster0.ec7cm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(dbURI)
    .then( (result) => {
        server.listen(process.env.PORT || 3000, function(){
            console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
        });
    })
    .catch((err) => {console.log(err)});

app.use("/public", express.static('./public/'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

//routing

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/mobile', (req, res) => {
    res.render('mobile');
});

app.use('/workout-live', workoutLiveRoutes);

app.use('/user', userRoutes);

app.use('/workout-add', workoutAddRoutes);

app.use('/calendar', calendarRoutes);

app.use('/statistics', statisticsRoutes);

app.use('/goals', goalsRoutes);

app.use('/share', shareRoutes);

app.use('/template', templateRoutes);