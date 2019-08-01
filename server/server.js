const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database/database');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin: *");
    res.header("Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes/routes')(app);

const server = app.listen(3000, function() {
    let port = server.address().port;
    console.log('Server listening on http://localhost:%s', port);
});
