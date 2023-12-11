const express = require('express'),
    app = express(),
    routes = require('./routes/api');

const host = '127.0.0.1';
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
);